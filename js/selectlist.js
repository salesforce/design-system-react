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
// -- BEGIN MODULE CODE HERE -- //

	landmark.controls = landmark.controls || {};
	landmark.controls.selectlist = landmark.controls.selectlist || {};

	//code goes here

	return landmark.controls.selectlist;

// -- END MODULE CODE HERE -- //
}));
