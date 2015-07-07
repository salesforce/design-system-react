// UMD wrapper
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['jquery', 'landmark/core'], factory);
	} else if ( typeof exports === 'object' ) {
		// Node/CommonJS
		module.exports = factory(require('jquery'), require('landmark/core'));
	} else {
		// Browser globals
		factory(this.jQuery, this.landmark);
	}
}(this, function ($, landmark) {

	if (typeof $ !== 'function') {
		throw new Error('jQuery must be included prior to landmark jQuery core');
	}

	if (typeof landmark !== 'object') {
		throw new Error('landmark core must be included prior to landmark jQuery core');
	}

// -- BEGIN MODULE CODE HERE -- //

	landmark.utilities = $.extend(landmark.utilities, {

		addClass: function (element, classNames) {
			$(element).addClass(classNames);
		},

		data: function (element) {
			return $(element).data();
		},

		extend: $.extend,

		hasClass: function (element, className) {
			return $(element).hasClass(className);
		},

		proxy: $.proxy,

		remove: function (elements) {
			$(elements).remove();
		},

		removeClass: function (element, className) {
			$(element).removeClass(className);
		},

		trigger: function (element, eventType, eventName, details) {
			return $(element).trigger(eventName, details);
		}

	});

// -- END MODULE CODE HERE -- //
}));
