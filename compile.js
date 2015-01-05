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
var env;
if (argv.env == 'production')
    env = 'remote';
else
    env = 'local';
var errors = false;
if (argv.errors == true)
    errors = true;
// Path
var Path = (function () {
    function Path(path) {
        this.path = path;
        this.steps = this.path.split(require('path').sep);
        this.dirs = _.initial(this.steps);
        this.dir = this.dirs.join('/') + '/';
        this.file = this.steps[this.steps.length - 1];
        this.type = require('path').extname(this.file);
        this.name = _.initial(this.file.split('.')).join('');
    }
    return Path;
})();
// Watcher
function Watcher(paths) {
    var worker = require('chokidar').watch(paths, {
        ignored: /(\.git)/,
        persistent: true
    });
    return function (handler) {
        worker.on('change', function (path) {
            handler(new Path(path));
        });
    };
}
function ReadDir(dir, callback) {
    require('fs').readdir(dir, function (error, files) {
        if (error) {
            if (!errors)
                console.log(c.red('ReadDir'), c.white(error.message));
            else
                callback(error, files);
        }
        else {
            console.log(c.gray('ReadDir'), c.gray(files.length));
            callback(null, files);
        }
    });
}
;
function ReadFile(path, callback) {
    require('fs').readFile(path, 'utf-8', function (error, file) {
        if (error) {
            if (!errors)
                console.log(c.red('ReadFile'), c.white(error.message));
            else
                callback(error, file);
        }
        else {
            console.log(c.gray('ReadFile'), c.gray(path));
            callback(null, file);
        }
    });
}
;
function WriteFile(path, data, callback) {
    require('fs').writeFile(path, data, function (error) {
        if (error) {
            if (!errors)
                console.log(c.red('WriteFile'), c.white(error.message));
            else
                callback(error);
        }
        else {
            console.log(c.gray('WriteFile'), c.gray(path));
            callback(null);
        }
    });
}
;
function stylus(from, source, callback) {
    require('stylus')(source).set('filename', from).use(require('osws-stylus')()).render(function (error, result) {
        if (error) {
            if (!errors)
                console.log(c.red('stylus'), c.white(error.message));
            else
                callback(error, result);
        }
        else {
            console.log(c.green('stylus'), c.gray(from));
            callback(null, result);
        }
    });
}
;
function ejs(from, source, callback) {
    try {
        var target = require('ejs').render(source, {
            filename: from,
            locals: {
                _: _
            }
        });
        console.log(c.blue('ejs'), c.gray(from));
        callback(null, target);
    }
    catch (error) {
        throw error;
        if (!errors)
            console.log(c.red('ejs'), c.white(error.message));
        else
            callback(error);
    }
}
;
function minifyHtml(code) {
    return require('html-minifier').minify(code, {
        collapseWhitespace: true,
        removeComments: true
    });
}
function Stylus(from, to) {
    var source;
    var target;
    require('async').series([
        function (callback) {
            ReadFile(from, function (error, result) {
                source = result;
                callback(error, result);
            });
        },
        function (callback) {
            stylus(from, source, function (error, result) {
                target = result;
                callback(error, result);
            });
        },
        function (callback) {
            WriteFile(to, target, function (error) {
                callback(error);
            });
        }
    ], function (error, results) {
        if (error) {
            console.log(c.red('Stylus'), c.white(error.message));
        }
        else {
            console.log(c.green.bold('Stylus'), c.white(from), c.green('>'), c.white(to));
        }
    });
}
;
function EJS(from, to) {
    var source;
    var target;
    require('async').series([
        function (callback) {
            ReadFile(from, function (error, result) {
                source = result;
                callback(error, result);
            });
        },
        function (callback) {
            ejs(from, source, function (error, result) {
                target = minifyHtml(result);
                callback(error, result);
            });
        },
        function (callback) {
            WriteFile(to, target, function (error) {
                callback(error);
            });
        }
    ], function (error, results) {
        if (error) {
            console.log(c.red('EJS'), c.white(error.message));
        }
        else {
            console.log(c.blue.bold('EJS'), c.white(from), c.green('>'), c.white(to));
        }
    });
}
;
// Watchers
var wModules = Watcher(['./node_modules/osws-stylus']);
var wSources = Watcher(['./sources']);
wSources(function (path) {
    if (path.type == '.styl' || path.type == '.ejs')
        console.log(c.magenta.bold('change'), c.gray(path.path));
    if (path.type == '.styl')
        Stylus(__dirname + '/sources/index.styl', __dirname + '/index.css');
    else if (path.type == '.ejs')
        EJS(__dirname + '/sources/index.ejs', __dirname + '/index.html');
});
wModules(function (path) {
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
