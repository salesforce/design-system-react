// PLUGIN DEFINITION HELPER
// Include this helper to create jQuery plugin versions of jQuery controls.
// Without the helper, jQuery controls can still be instantiated directly via their constructors.

// Core
import * as Lib from '../lib/lib';

// Framework specific
const $ = Lib.global.jQuery || Lib.global.$;

const createPlugin = function (name, Constructor, helperOptions) {
	const old = $.fn[name];
	const namespaced = ['fu', name].join('.');
	const initializeSelector = ['[data-initialize=', name, ']'].join('');
	const legacyMethods = helperOptions && helperOptions.legacyMethods || {};
	
	$.fn[name] = function (option) {
		const args = Array.prototype.slice.call(arguments, 1);
		let methodReturn;

		const $set = this.each(function () {
			const $this = $(this);
			let data = $this.data(namespaced);

			// If object, this is an initialization, only overwrite options and init if no data exists
			const options = typeof option === 'object' && option;
			if (!data) {
				$this.data(namespaced, (data = new Constructor(this, options)));
			}

			// If string, this is a method call, and apply with args
			if (typeof option === 'string') {
				if (!legacyMethods || Lib.isFunction(data[option])) {
					methodReturn = data[option].apply(data, args);
				} else {
					methodReturn = legacyMethods[option].apply(data, args);
				}
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn[name].Constructor = Constructor;

	$.fn[name].noConflict = function () {
		$.fn[name] = old;
		return this;
	};

	// DATA-API

	$(document).on(['mousedown', namespaced, 'data-api'].join('.'), initializeSelector, function (e) {
		const $control = $(e.target).closest('.' + name);
		if (!$control.data(namespaced)) {
			$control[name]($control.data());
		}
	});

	// Must be domReady for AMD compatibility
	$(function () {
		$(initializeSelector).each(function () {
			const $this = $(this);
			if (!$this.data(namespaced)) {
				$this[name]($this.data());
			}
		});
	});
	
	return Constructor;
};

Lib.registerHelper('createPlugin', createPlugin, ['jquery']);

export default createPlugin;
