// UMD wrapper
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['landmark/core'], factory);
	} else if ( typeof exports === 'object' ) {
		// Node/CommonJS
		module.exports = factory(require('landmark/core'));
	} else {
		// Browser globals
		factory(this.landmark);
	}
}(this, function (landmark) {

	if (typeof landmark !== 'object') {
		throw new Error('landmark core must be included prior to landmark selectlist control');
	}

// -- BEGIN MODULE CODE HERE -- //

	landmark.controls = landmark.controls || {};

	landmark.controls.selectlist = {
		Constructor: function (element, options) {
			this.element = element;
			this.options = landmark.utilities.extend({}, landmark.controls.selectlist.defaults, options);
		},

		defaults: {}
	};

	landmark.controls.selectlist.Constructor.prototype = {

		constructor: landmark.controls.selectlist.Constructor
		
	};

	return landmark.controls.selectlist;

// -- END MODULE CODE HERE -- //
}));
