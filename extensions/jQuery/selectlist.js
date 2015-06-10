// UMD wrapper
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['jquery', 'landmark/core', 'landmark/selectlist'], factory);
	} else if ( typeof exports === 'object' ) {
		// Node/CommonJS
		module.exports = factory(require('jquery'), require('landmark/core'), require('landmark/selectlist'));
	} else {
		// Browser globals
		factory(this.jQuery, this.landmark, this.landmark.controls.selectlist);
	}
}(this, function ($, landmark) {

	if (typeof $ !== 'function') {
		throw new Error('jQuery must be included prior to landmark jQuery selectlist extension');
	}

	if (typeof landmark !== 'object' || typeof landmark.controls.selectlist !== 'function') {
		throw new Error('landmark core and landmark selectlist must be included prior to landmark jQuery selectlist extension');
	}

// -- BEGIN MODULE CODE HERE -- //

	var Selectlist = landmark.controls.selectlist;

	var old = $.fn.selectlist;

	// SELECTLIST PLUGIN DEFINITION

	$.fn.selectlist = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('landmark.selectlist');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('landmark.selectlist', (data = new Selectlist(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.selectlist.defaults = {};

	$.fn.selectlist.Constructor = Selectlist;

	$.fn.selectlist.noConflict = function () {
		$.fn.selectlist = old;
		return this;
	};


	// DATA-API

	$(document).on('mousedown.landmark.selectlist.data-api', '[data-initialize=selectlist]', function (e) {
		var $control = $(e.target).closest('.selectlist');
		if (!$control.data('landmark.selectlist')) {
			$control.selectlist($control.data());
		}
	});

	// Must be domReady for AMD compatibility
	$(function () {
		$('[data-initialize="selectlist"]').each(function () {
			var $this = $(this);
			if (!$this.data('landmark.selectlist')) {
				$this.selectlist($this.data());
			}
		});
	});

// -- END MODULE CODE HERE -- //
}));
