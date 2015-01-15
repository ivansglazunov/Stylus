var plugin = function() {
    return function(stylus){
    	require('./native.js')(stylus);
    	require('./tags.js')(stylus);
        stylus.include(__dirname);
    };
}

module.exports = plugin;