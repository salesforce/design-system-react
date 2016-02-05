'use strict';

// https://github.com/assemble/handlebars-helpers/tree/master/lib/helpers

//var moment = require('moment');
var blocks = {};

exports.extend = function(name, options) {
	var blocks = this._blocks || (this._blocks = {});
	var block = blocks[name] || (blocks[name] = []); //Changed this to [] instead of {}
	block.push(options.fn(this));

	/*var block = blocks[name];
	if (!block) {
		block = blocks[name] = [];
	}

	block.push(context.fn(this));*/
};

exports.block = function(name) {
	var blocks = this._blocks;
	var content = blocks && blocks[name];
	return content ? content.join('\n') : null;
	/*var val = (blocks[name] || []).join('\n');

	// clear the block
	blocks[name] = [];
	return val;*/
};

exports.escapeJSON = function(str) {
	var myEscapedJSONString = str.replace(/\\n/g, "\\n")
										.replace(/\\'/g, "\\'")
										.replace(/\\"/g, '\\"')
										.replace(/\\&/g, "\\&")
										.replace(/\\r/g, "\\r")
										.replace(/\\t/g, "\\t")
										.replace(/\\b/g, "\\b")
										.replace(/\\f/g, "\\f");
	return myEscapedJSONString;
};

/*
exports.addCommas = function(number) {
	return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

exports.formatDate = function(date, format) {
	return moment(date).format(format);
};*/
