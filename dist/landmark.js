/*!
 * Landmark JS POC v0.0.1 
 */

// UMD wrapper
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory();
	} else {
		// Browser globals
		root.landmark = factory();
	}
}(this, function () {
	// Create landmark core object
	var landmark = {
		controls: {},
		utilities: {},
		version: '0.0.1'
	};

	(function (landmark) {

		landmark.controls = landmark.controls || {};
		landmark.controls.selectlist = landmark.controls.selectlist || {};

		//code goes here
		return landmark.controls.selectlist;

	}(landmark));

	return landmark;
}));