var regexps = {
	gradientStops: /([\(\,]\s*)(-?(?:\d*\.)?\d+(?:%|px|em))(\s+)((hsl|rgb)a?\([^\)]+\)|#[^\)\,]+)/g,
	gradientVal: /(\(\s*)(?:(-?(\d*\.)?\d+)deg|((to )?(top|bottom|left|right)( (top|bottom|left|right))?))/g,
	gradientType: /((repeating-)?(linear|radial)-gradient\()/g,
	transform: /\b(transform)\b/g,
	fillKeyword: /\s*\b(fill)\b\s*/g,
};

var directions = {
	top: 'bottom',
	bottom: 'top',
	left: 'right',
	right: 'left'
};

var normalize = function(property, value, prefix) {
	var result = value.toString(),
		args;

	 // Fixing the gradients 
	if (~result.indexOf('gradient(')) {

		 // Normalize color stops 
		result = result.replace(regexps.gradientStops, '$1$4$3$2');

		 // Normalize legacy gradients 
		result = result.replace(regexps.gradientVal, function() {
			args = [].slice.call(arguments, 1);
			return normalizeGradient(args, prefix);
		});

		 // Adding prefixes to the legacy gradients 
		if (prefix) result = result.replace(regexps.gradientType, '-' + prefix + '-$1');
	}

	 // Adding prefixes to the `transform` values of legacy `transition` property 
	if (prefix && (property == "'transition'" || property == "'transition-property'")) {
		result = result.replace(regexps.transform, '-' + prefix + '-$1');
	}

	 // Removing `fill` keyword from the legacy `border-image` property 
	if (prefix && (property == "'border-image'" || property == "'border-image-slice'")) {
		result = result.replace(regexps.fillKeyword, ' ');
	}

	return result;
}

var normalizeGradient = function(parts, prefix) {
	// Fix the degrees to the legacy syntax
	var val = parts[0];

	// when the gradients were unprefixed, the w3c changed the way that the
	// angle direction is interpreted. see:
	// http://blogs.msdn.com/b/ie/archive/2012/06/25/unprefixed-css3-gradients-in-ie10.aspx
	if (parts[1]) val += (prefix ? parseFloat((Math.abs(450 - parts[1]) % 360).toFixed(3)) : parts[1]) + 'deg';

	 // Fix the directions to the legacy syntax 
	if (prefix && parts[4]) {
		// `to top` to `bottom` etc.
		if (parts[5]) val += directions[parts[5]];
		if (parts[6]) val += ' ' + directions[parts[7]];

	} else if (!prefix && !parts[4]) {
		// `top` to `to bottom` etc.
		if (parts[5]) val += 'to ' + directions[parts[5]];
		if (parts[6]) val += ' ' + directions[parts[7]];

	} else {
		if (parts[3]) val += parts[3];
	}

	return val;
}

module.exports = function(stylus) {
	stylus.define('osws-options-generate--normalize', function(option, value, prefix) {
		return new stylus.nodes.Ident(normalize(option, value, prefix));
	});
}