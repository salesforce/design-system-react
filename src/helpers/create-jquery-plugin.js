// PLUGIN DEFINITION HELPER
// Include this helper to create jQuery plugin versions of jQuery controls.
// Without the helper, jQuery controls can still be instantiated directly via their constructors.

// Core
import * as Lib from '../lib/lib';

// Framework specific
const $ = Lib.global.jQuery || Lib.global.$;

// TODO: Move this out to a configurable property of Lib
const namespace = 'facades';

const createPlugin = function (CONTROL, Constructor) {
	const namespaced = [namespace, CONTROL.toLowerCase()].join('_');
	const old = $.fn[namespaced];
	const initializeSelector = ['[data-initialize=\'', namespaced, '\']'].join('');
	
	$.fn[namespaced] = function (option) {
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
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn[namespaced].Constructor = Constructor;

	$.fn[namespaced].noConflict = function () {
		$.fn[namespaced] = old;
		return this;
	};

	// DATA-API
	// TODO: This is Fuel only, can it be deleted for now?
	// $(document).on(['mousedown', namespaced, 'data-api'].join('.'), initializeSelector, function (e) {
	// 	const $control = $(e.target).closest('.' + name);
	// 	if (!$control.data(namespaced)) {
	// 		$control[name]($control.data());
	// 	}
	// });

	// Must be domReady for AMD compatibility
	$(function () {
		$(initializeSelector).each(function () {
			const $this = $(this);
			if (!$this.data(namespaced)) {
				$this[namespaced]($this.data());
			}
		});
	});
	
	return Constructor;
};

Lib.registerHelper('createPlugin', createPlugin, ['jquery']);

export default createPlugin;
