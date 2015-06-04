// ---- LANDMARK CORE FILE ---- //

// -- BEGIN MODULE CODE HERE -- //
// UMD wrapper
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if ( typeof exports === 'object' ) {
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
// -- END MODULE CODE HERE -- //
	return landmark;
}));
