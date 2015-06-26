// UMD wrapper
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['jquery', 'landmark/core', 'landmark/dropdown'], factory);
	} else if ( typeof exports === 'object' ) {
		// Node/CommonJS
		module.exports = factory(require('jquery'), require('landmark/core'), require('landmark/dropdown'));
	} else {
		// Browser globals
		factory(this.jQuery, this.landmark);
	}
}(this, function ($, landmark) {

	if (typeof $ !== 'function') {
		throw new Error('jQuery must be included prior to landmark jQuery dropdown extension');
	}

	if (typeof landmark !== 'object' || typeof landmark.controls.dropdown !== 'object') {
		throw new Error('landmark core and landmark dropdown must be included prior to landmark jQuery dropdown extension');
	}

// -- BEGIN MODULE CODE HERE -- //

	var dropdown = landmark.controls.dropdown;

	var old = $.fn.dropdown;

	// Selectlist jQuery plugin definition

	$.fn.dropdown = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('landmark.dropdown');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('landmark.dropdown', (data = new dropdown.Constructor(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.dropdown.Constructor = dropdown.Constructor;

	$.fn.dropdown.noConflict = function () {
		$.fn.dropdown = old;
		return this;
	};

	// Data-api

	$(document)
		.on('click.landmark.dropdown.data-api', dropdown.clearMenus)
		.on('click.landmark.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
		.on('click.landmark.dropdown.data-api', '[data-toggle="dropdown"]', function (e) {
			var $control = $(e.target);
			if (!$control.data('landmark.dropdown')) {
				$control.dropdown($control.data());
				$control.dropdown('toggleMenu', e);
			}
			return false;
		});
		//.on('keydown.landmark.dropdown.data-api', toggle, Dropdown.prototype.keydown)
		//.on('keydown.landmark.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

// -- END MODULE CODE HERE -- //
}));
