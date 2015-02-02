stylus = require 'stylus'
assert = require('chai').assert
Clean = require 'clean-css'

minify = (css) -> new Clean(
		advanced: false
	).minify(css).styles

compile = (userCode, callback) ->
	code =	"""
			@import 'osws-stylus'
			#{userCode}
			"""
	stylus code
	.set 'filename', "#{__dirname}/test.styl"
	.use require('osws-stylus')
	.render (error, result) ->
		if error then throw error
		callback minify result

equal = (done, styl, css) ->
	compile styl, (result) ->
		assert.equal result, minify css
		do done

describe 'OSWS-Stylus', ->
	describe 'Selectors', ->
		it 'selection', (done) ->
			equal done,
				"""
				+selection()
					background black
				"""
				"""
				::-moz-selection {
				  background-color: #000;
				}
				::selection {
				  background-color: #000;
				}
				"""
		it 'placeholder', (done) ->
			equal done,
				"""
				input
					+placeholder()
						background black
				"""
				"""
				input::-webkit-input-placeholder {
					background-color: #000;
				}
				input:-moz-placeholder {
					background-color: #000;
				}
				input::-moz-placeholder {
					background-color: #000;
				}
				input:-ms-input-placeholder {
					background-color: #000;
				}
				"""
	describe 'Options', ->
		describe 'Position', ->
			describe 'position', ->
				it 'default syntax', (done) ->
					equal done,
						"""
						div
							position relative
						"""
						"""
						div {
						    position: relative;
						}
						"""
				it 'add z-index', (done) ->
					equal done,
						"""
						div
							position 4 absolute
						"""
						"""
						div {
						    z-index: 4;
						    position: absolute;
						}
						"""
				it 'add directions', (done) ->
					equal done,
						"""
						div
							position 7 fixed left 15px bottom 5px
						"""
						"""
						div {
						    z-index: 7;
						    position: fixed;
						    left: 15px;
						    bottom: 5px;
						}
						"""
				it 'inherit', (done) ->
					equal done,
						"""
						div
							position inherit z-index inherit left inherit
						"""
						"""
						div {
						    position: inherit;
						    z-index: inherit;
						    left: inherit
						}
						"""