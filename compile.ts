/// <reference path='typings/node/node.d.ts' />
/// <reference path='typings/optimist/optimist.d.ts' />	
/// <reference path='typings/winston/winston.d.ts' />
/// <reference path='typings/colors/colors.d.ts' />
/// <reference path='typings/async/async.d.ts' />
/// <reference path='typings/stylus/stylus.d.ts' />	

// Dependencies

var _ = require('lodash');
var c = require('colors');

// Forget dependence

function forget(name) {
	delete require.cache[require.resolve(name)];
}

// Arguments

var argv = require('optimist').argv;

var env: string;
if (argv.env == 'production') env = 'remote';
else /* if(argv.env == 'development') */ env = 'local';

var errors: boolean = false;
if (argv.errors == true) errors = true;

// Path

class Path {
	path: string;
	steps: string[];
	dirs: string[];
	dir: string;
	file: string;
	type: string;
	name: string;

	constructor(path: string) {
		this.path = path;
		this.steps = this.path.split(require('path').sep);
		this.dirs = _.initial(this.steps);
		this.dir = this.dirs.join('/') + '/';
		this.file = this.steps[this.steps.length - 1];
		this.type = require('path').extname(this.file);
		this.name = _.initial(this.file.split('.')).join('');
	}
}

// Watcher

function Watcher(paths: string[]) {
	var worker = require('chokidar')
	.watch(paths, {
		ignored: /(\.git)/,
		persistent: true
	});

	return (handler: (path: Path) => void) => {
		worker.on('change', (path) => {
			handler(new Path(path));
		});
	}
}

function ReadDir(dir: string, callback: Function) {
	require('fs').readdir(dir, (error, files: string[]) => {
		if (error) {
			if (!errors) console.log(c.red('ReadDir'), c.white(error.message));
			else callback(error, files);
		} else {
			console.log(c.gray('ReadDir'), c.gray(files.length));
			callback(null, files);
		}
	});
};

function ReadFile(path: string, callback: Function) {
	require('fs').readFile(path, 'utf-8', (error, file) => {
		if (error) {
			if (!errors) console.log(c.red('ReadFile'), c.white(error.message));
			else callback(error, file);
		} else {
			console.log(c.gray('ReadFile'), c.gray(path));
			callback(null, file);
		}
	});
};

function WriteFile(path: string, data: string, callback: Function) {
	require('fs').writeFile(path, data, (error) => {
		if (error) {
			if (!errors) console.log(c.red('WriteFile'), c.white(error.message));
			else callback(error);
		} else {
			console.log(c.gray('WriteFile'), c.gray(path));
			callback(null);
		}
	});
};

function stylus(from: string, source: string, callback: Function) {
	require('stylus')(source)
	.set('filename', from)
	.use(require('osws-stylus')())
	.render((error, result) => {
		if (error) {
			if (!errors) console.log(c.red('stylus'), c.white(error.message));
			else callback(error, result);
		} else {
			console.log(c.green('stylus'), c.gray(from));
			callback(null, result);
		}
	});
};

function ejs(from: string, source: string, callback: Function) {
	try {
		var target = require('ejs').render(source, {
			filename: from,
			locals: {
				_: _
			}
		});
		console.log(c.blue('ejs'), c.gray(from));
		callback(null, target);
	} catch(error) {
		throw error
		if (!errors) console.log(c.red('ejs'), c.white(error.message));
		else callback(error);
	}
};

function minifyHtml(code: string): string {
	return require('html-minifier').minify(code, {
		collapseWhitespace: true, removeComments: true
	});
}

function Stylus(from: string, to: string) {
	var source: string;
	var target: string;

	require('async').series([
		(callback) => { ReadFile(from, (error, result) => { source = result; callback(error, result); }); },
		(callback) => { stylus(from, source, (error, result) => { target = result; callback(error, result); }); },
		(callback) => { WriteFile(to, target, (error) => { callback(error); }); }
	], (error, results) => {
		if (error) {
			console.log(c.red('Stylus'), c.white(error.message));
		} else {
			console.log(c.green.bold('Stylus'), c.white(from), c.green('>'), c.white(to));
		}
	});
};

function EJS(from: string, to: string) {
	var source: string;
	var target: string;

	require('async').series([
		(callback) => { ReadFile(from, (error, result) => { source = result; callback(error, result); }); },
		(callback) => { ejs(from, source, (error, result) => { target = minifyHtml(result); callback(error, result); }); },
		(callback) => { WriteFile(to, target, (error) => { callback(error); }); }
	], (error, results) => {
		if (error) {
			console.log(c.red('EJS'), c.white(error.message));
		} else {
			console.log(c.blue.bold('EJS'), c.white(from), c.green('>'), c.white(to));
		}
	});
};

// Watchers

var wModules = Watcher(['./node_modules/osws-stylus']);
var wSources = Watcher(['./sources']);

wSources((path) => {
	if (path.type == '.styl' || path.type == '.ejs') console.log(c.magenta.bold('change'), c.gray(path.path));

	if (path.type == '.styl') Stylus(__dirname + '/sources/index.styl', __dirname + '/index.css');
	else if (path.type == '.ejs') EJS(__dirname + '/sources/index.ejs', __dirname + '/index.html');
});

wModules((path) => {
	if (path.type == '.styl') {
		console.log(c.magenta.bold('change'), c.gray(path.path));
		Stylus(__dirname + '/sources/index.styl', __dirname + '/index.css');
	}
});

// Start

Stylus(__dirname + '/sources/index.styl', __dirname + '/index.css');
EJS(__dirname + '/sources/index.ejs', __dirname + '/index.html');

// Fast exit

process.stdin.on("data", process.exit);
console.log('press enter for exit');