var _ = require('lodash');
var S = require('string');

var memory = {};

memory["all"] = {"html": true, "body": true, "h1": true, "h2": true, "h3": true, "h4": true, "h5": true, "h6": true, "hgroup": true, "div": true, "p": true, "address": true, "blockquote": true, "pre": true, "ul": true, "ol": true, "li": true, "dl": true, "dt": true, "dd": true, "fieldset": true, "legend": true, "form": true, "noscript": true, "object": true, "table": true, "thead": true, "tbody": true, "tfoot": true, "tr": true, "td": true, "th": true, "col": true, "colgroup": true, "caption": true, "span": true, "b": true, "big": true, "strong": true, "i": true, "var": true, "cite": true, "em": true, "q": true, "del": true, "s": true, "strike": true, "tt": true, "code": true, "kbd": true, "samp": true, "small": true, "sub": true, "sup": true, "dfn": true, "bdo": true, "abbr": true, "acronym": true, "a": true, "button": true, "input": true, "textarea": true, "select": true, "option": true, "article": true, "aside": true, "figcaption": true, "figure": true, "footer": true, "header": true, "section": true, "main": true, "nav": true, "menu": true, "audio": true, "video": true, "embed": true, "canvas": true, "output": true, "details": true, "summary": true, "mark": true, "meter": true, "progress": true, "template": true, "comment": true, "br": true, "hr": true, "img": true, "base": true, "frame": true, "link": true, "meta": true};
memory["html4"] = {"html": true, "body": true, "h1": true, "h2": true, "h3": true, "h4": true, "h5": true, "h6": true, "hgroup": true, "div": true, "p": true, "address": true, "blockquote": true, "pre": true, "ul": true, "ol": true, "li": true, "dl": true, "dt": true, "dd": true, "fieldset": true, "legend": true, "form": true, "noscript": true, "object": true, "table": true, "thead": true, "tbody": true, "tfoot": true, "tr": true, "td": true, "th": true, "col": true, "colgroup": true, "caption": true, "span": true, "b": true, "big": true, "strong": true, "i": true, "var": true, "cite": true, "em": true, "q": true, "del": true, "s": true, "strike": true, "tt": true, "code": true, "kbd": true, "samp": true, "small": true, "sub": true, "sup": true, "dfn": true, "bdo": true, "abbr": true, "acronym": true, "a": true, "button": true, "input[type=button]": true, "input[type=reset]": true, "input[type=submit]": true, "input[type=image]": true, "input[type=text]": true, "input[type=password]": true, "textarea": true, "input[type=email]": true, "input[type=number]": true, "input[type=checkbox]": true, "input[type=radio]": true, "input[type=file]": true, "select": true, "option": true, "br": true, "hr": true, "img": true, "base": true, "frame": true, "link": true, "meta": true};
memory["html5"] = {"article": true, "aside": true, "figcaption": true, "figure": true, "footer": true, "header": true, "section": true, "main": true, "nav": true, "menu": true, "audio": true, "video": true, "embed": true, "canvas": true, "output": true, "details": true, "summary": true, "mark": true, "input[type=date]": true, "input[type=datetime]": true, "input[type=datetime-local]": true, "input[type=range]": true, "input[type=search]": true, "input[type=tel]": true, "input[type=time]": true, "input[type=url]": true, "input[type=month]": true, "input[type=week]": true, "input[type=color]": true, "meter": true, "progress": true, "template": true, "comment": true};
memory["document"] = {"html": true, "body": true};
memory["header"] = {"h1": true, "h2": true, "h3": true, "h4": true, "h5": true, "h6": true};
memory["list"] = {"ul": true, "ol": true, "li": true, "dl": true, "dt": true, "dd": true, "menu": true};
memory["item"] = {"li": true, "dt": true, "dd": true};
memory["group"] = {"h1": true, "h2": true, "h3": true, "h4": true, "h5": true, "h6": true, "hgroup": true, "div": true, "p": true, "address": true, "blockquote": true, "pre": true, "ul": true, "ol": true, "li": true, "dl": true, "dt": true, "dd": true, "fieldset": true, "form": true, "noscript": true, "object": true, "tr": true, "td": true, "th": true, "caption": true, "span": true, "article": true, "aside": true, "figure": true, "footer": true, "header": true, "section": true, "main": true, "nav": true, "menu": true};
memory["block"] = {"h1": true, "h2": true, "h3": true, "h4": true, "h5": true, "h6": true, "hgroup": true, "div": true, "p": true, "address": true, "blockquote": true, "pre": true, "ul": true, "ol": true, "dl": true, "dt": true, "dd": true, "fieldset": true, "legend": true, "form": true, "noscript": true, "object": true, "table": true, "article": true, "aside": true, "figcaption": true, "figure": true, "footer": true, "header": true, "section": true, "main": true, "nav": true, "menu": true, "audio": true, "video": true, "embed": true, "canvas": true, "output": true, "details": true, "summary": true, "input[type=text]": true, "input[type=password]": true, "textarea": true, "input[type=email]": true, "input[type=number]": true, "input[type=date]": true, "input[type=datetime]": true, "input[type=datetime-local]": true, "input[type=range]": true, "input[type=search]": true, "input[type=tel]": true, "input[type=time]": true, "input[type=url]": true, "input[type=month]": true, "input[type=week]": true, "select": true, "option": true, "br": true, "hr": true, "img": true};
memory["inline"] = {"span": true, "b": true, "big": true, "strong": true, "i": true, "var": true, "cite": true, "em": true, "q": true, "del": true, "s": true, "strike": true, "tt": true, "code": true, "kbd": true, "samp": true, "small": true, "sub": true, "sup": true, "dfn": true, "bdo": true, "abbr": true, "acronym": true, "a": true, "button": true, "input[type=button]": true, "input[type=reset]": true, "input[type=submit]": true, "input[type=image]": true, "input[type=checkbox]": true, "input[type=radio]": true, "input[type=file]": true, "mark": true, "input[type=color]": true, "meter": true, "progress": true};
memory["text"] = {"h1": true, "h2": true, "h3": true, "h4": true, "h5": true, "h6": true, "p": true, "address": true, "blockquote": true, "pre": true, "b": true, "big": true, "strong": true, "i": true, "var": true, "cite": true, "em": true, "q": true, "del": true, "s": true, "strike": true, "tt": true, "code": true, "kbd": true, "samp": true, "small": true, "sub": true, "sup": true, "dfn": true, "bdo": true, "abbr": true, "acronym": true, "a": true, "mark": true};
memory["baseline"] = {"object": true, "sub": true, "sup": true, "audio": true, "video": true, "embed": true, "canvas": true};
memory["button"] = {"a": true, "button": true, "input[type=button]": true, "input[type=reset]": true, "input[type=submit]": true, "input[type=image]": true, "input[type=file]": true, "input[type=color]": true};
memory["input"] = {"input[type=text]": true, "input[type=password]": true, "textarea": true, "input[type=email]": true, "input[type=number]": true, "input[type=date]": true, "input[type=datetime]": true, "input[type=datetime-local]": true,"input[type=search]": true, "input[type=tel]": true, "input[type=time]": true, "input[type=url]": true, "input[type=month]": true, "input[type=week]": true};
memory["switcher"] = {"input[type=checkbox]": true, "input[type=radio]": true};
memory["select"] = {"select": true, "option": true};
memory["bold"] = {"h1": true, "h2": true, "h3": true, "h4": true, "h5": true, "h6": true, "dt": true, "b": true, "strong": true};
memory["italic"] = {"address": true, "i": true, "var": true, "cite": true, "em": true, "q": true};
memory["del"] = {"del": true, "s": true, "strike": true};
memory["table"] = {"table": true, "thead": true, "tbody": true, "tfoot": true, "tr": true, "td": true, "th": true, "col": true, "colgroup": true, "caption": true};
memory["mono"] = {"tt": true, "code": true, "kbd": true, "samp": true};
memory["tips"] = {"abbr": true, "acronym": true};
memory["spec"] = {"fieldset": true, "legend": true, "form": true, "noscript": true, "object": true, "a": true, "button": true, "input[type=button]": true, "input[type=reset]": true, "input[type=submit]": true, "input[type=image]": true, "input[type=text]": true, "input[type=password]": true, "textarea": true, "input[type=email]": true, "input[type=number]": true, "input[type=checkbox]": true, "input[type=radio]": true, "input[type=file]": true, "select": true, "option": true, "audio": true, "video": true, "embed": true, "canvas": true, "output": true, "details": true, "summary": true, "input[type=date]": true, "input[type=datetime]": true, "input[type=datetime-local]": true, "input[type=range]": true, "input[type=search]": true, "input[type=tel]": true, "input[type=time]": true, "input[type=url]": true, "input[type=month]": true, "input[type=week]": true, "input[type=color]": true, "meter": true, "progress": true};
memory["hidden"] = {"template": true, "comment": true};
memory["double"] = {"html": true, "body": true, "h1": true, "h2": true, "h3": true, "h4": true, "h5": true, "h6": true, "hgroup": true, "div": true, "p": true, "address": true, "blockquote": true, "pre": true, "ul": true, "ol": true, "li": true, "dl": true, "dt": true, "dd": true, "fieldset": true, "legend": true, "form": true, "noscript": true, "object": true, "table": true, "thead": true, "tbody": true, "tfoot": true, "tr": true, "td": true, "th": true, "col": true, "colgroup": true, "caption": true, "span": true, "b": true, "big": true, "strong": true, "i": true, "var": true, "cite": true, "em": true, "q": true, "del": true, "s": true, "strike": true, "tt": true, "code": true, "kbd": true, "samp": true, "small": true, "sub": true, "sup": true, "dfn": true, "bdo": true, "abbr": true, "acronym": true, "a": true, "button": true, "textarea": true, "select": true, "option": true, "article": true, "aside": true, "figcaption": true, "figure": true, "footer": true, "header": true, "section": true, "main": true, "nav": true, "menu": true, "audio": true, "video": true, "embed": true, "canvas": true, "output": true, "details": true, "summary": true, "mark": true, "meter": true, "progress": true, "template": true, "comment": true};
memory["single"] = {"br": true, "hr": true, "img": true, "input": true, "base": true, "frame": true, "link": true, "meta": true}
memory["info"] = {"template": true, "comment": true, "link": true, "meta": true, "base": true};

var search = function(hash, tags, ignore) {
	var object = {};

	if (tags.length > 0) {
		for (var i = 0; i < tags.length; i++) {
			if (_.has(hash, tags[i])) {
				if (i == 0) {
					for (var j in hash[tags[i]]) {
						object[j] = true;
					}
				} else {
					for (var j in object) {
						if (hash[tags[i]][j] != true) {
							object[j] = false;
						}
					}
				}
			} else throw new Error(tags[i] + ' key not found in hash');
		}
	}

	var array = [];
	_.each(object, function(value, key) {
		if (value) {
			for (var i in ignore) {
				if (ignore[i] == 1 && S(key).contains(i)) return true;
				else if (ignore[i] == 2 && key == i) return true;
			}
			array.push(key);
		}
	 });
	return array;
};

module.exports = function(stylus) {
	// string string string
	stylus.define('tags-search', function() {
		var ignore = {};
		var tags = [];

		_.each(arguments, function(value) {
			if (_.isEmpty(value)) return false;
			if (!_.isString(value.val)) throw new Error('must be a string');
			
			if (value.val == '') return true;
			else if (value.val.slice(0, 2) == '--') ignore[value.val.slice(2, value.val.length)] = 2;
			else if (value.val.slice(0, 1) == '-') ignore[value.val.slice(1, value.val.length)] = 1;
			else tags.push(value.val);
		});
		if (tags.length == 0) throw new Error('tags can not be empty');
		return search(memory, tags, ignore);
	});
};