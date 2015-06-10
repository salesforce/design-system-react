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
	var landmark = (function () {
		function allKeys (obj) {
			if (!isObject(obj)) {
				return [];
			}
			var keys = [];
			for (var key in obj) {
				keys.push(key);
			}
			return keys;
		}

		function extend (obj) {
			var length = arguments.length;
			if (length < 2 || obj == null) {
				return obj;
			}
			for (var index = 1; index < length; index++) {
				var source = arguments[index];
				var keys = allKeys(source);
				var l = keys.length;
				for (var i = 0; i < l; i++) {
					var key = keys[i];
					obj[key] = source[key];
				}
			}
			return obj;
		}

		function isObject (obj) {
			var type = typeof obj;
			return type === 'function' || type === 'object' && !!obj;
		}

		return {
			controls: {},
			utilities: {
				allKeys: allKeys,
				extend: extend,
				isObject: isObject
			},
			version: '0.0.1'
		};
	}());

// -- END MODULE CODE HERE -- //
	return landmark;
}));
