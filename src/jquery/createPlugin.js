// PLUGIN DEFINITION

// Core
import * as Lib from '../core/lib';

// Framework specific
// TO-DO: This might not work with require, need to confirm that it does
const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

const createPlugin = function (name, Constructor, legacyMethods) {
	const old = $.fn[name];
	const namespaced = ['fu', name].join('.');
	const initializeSelector = ['[data-initialize=', name, ']'].join('');

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
};

export default createPlugin;
