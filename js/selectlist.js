//TODO: this needs to be updated since I have moved it to dropdown!

// UMD wrapper
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['landmark/core', 'landmark/dropdown'], factory);
	} else if ( typeof exports === 'object' ) {
		// Node/CommonJS
		module.exports = factory(require('landmark/core'), require('landmark/dropdown'));
	} else {
		// Browser globals
		factory(this.landmark);
	}
}(this, function (landmark) {

	//if (typeof landmark !== 'object' && ()) {
	//	throw new Error('landmark core must be included prior to landmark selectlist control');
	//}

// -- BEGIN MODULE CODE HERE -- //

	landmark.controls = landmark.controls || {};

	// Module vars
	var lu = landmark.utilities;

	// Constructor and defaults

	landmark.controls.selectlist = {
		Constructor: function (element, options) {
		},

		defaults: {}
	};

	return landmark.controls.selectlist;

// -- END MODULE CODE HERE -- //
}));
