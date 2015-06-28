/*!
 * Landmark JS POC - jQuery Extension v0.0.1
 */

// UMD wrapper
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery', 'landmark'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'), require('landmark'));
	} else {
		// Browser globals
		factory(this.jQuery, this.landmark);
	}
}(this, function ($, landmark) {

	if (typeof $ !== 'function') {
		throw new Error('jQuery must be included prior to landmark jQuery extension');
	}

	if (typeof landmark !== 'object') {
		throw new Error('landmark must be included prior to landmark jQuery extension');
	}

	(function ($, landmark) {

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
		$(document).on('click.landmark.dropdown.data-api', dropdown.Constructor.prototype.clearMenus).on('click.landmark.dropdown.data-api', '.dropdown form', function (e) {
			e.stopPropagation()
		}).on('click.landmark.dropdown.data-api', '[data-toggle="dropdown"]', function (e) {
			var $control = $(e.target);
			if (!$control.data('landmark.dropdown')) {
				$control.dropdown($control.data());
				$control.dropdown('toggleMenu', e);
			}
			return false;
		}).on('keydown.landmark.dropdown.data-api', '[data-toggle="dropdown"]', dropdown.Constructor.prototype.keydown).on('keydown.landmark.dropdown.data-api', '.dropdown-menu', dropdown.Constructor.prototype.keydown);

	}($, landmark));


	(function ($, landmark) {

		var selectlist = landmark.controls.selectlist;

		var old = $.fn.selectlist;

		// Selectlist jQuery plugin definition
		$.fn.selectlist = function (option) {
			var args = Array.prototype.slice.call(arguments, 1);
			var methodReturn;

			var $set = this.each(function () {
				var $this = $(this);
				var data = $this.data('landmark.selectlist');
				var options = typeof option === 'object' && option;

				if (!data) {
					$this.data('landmark.selectlist', (data = new selectlist.Constructor(this, options)));
				}

				if (typeof option === 'string') {
					methodReturn = data[option].apply(data, args);
				}
			});

			return (methodReturn === undefined) ? $set : methodReturn;
		};

		$.fn.selectlist.Constructor = selectlist.Constructor;

		$.fn.selectlist.noConflict = function () {
			$.fn.selectlist = old;
			return this;
		};

		// Data-api
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

	}($, landmark));

}));