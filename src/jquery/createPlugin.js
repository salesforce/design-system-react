// PLUGIN DEFINITION

// Core
import FuelUX from '../fuelux';

// Framework specific
// TO-DO: This might not work with require, need to confirm that it does
var $ = window.$;

var createPlugin = function (name, Constructor, legacyMethods) {
	var old = $.fn[name];
	var namespaced = ['fu', name].join('.');
	var initializeSelector = ['[data-initialize=', name, ']'].join('');
	
	$.fn[name] = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;
	
		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data(namespaced);
	
			// If object, this is an initialization, only overwrite options and init if no data exists
			var options = typeof option === 'object' && option;
			if (!data) {
				$this.data(namespaced, (data = new Constructor(this, options)));
			}
	
			// If string, this is a method call, and apply with args
			if (typeof option === 'string') {
				if (!legacyMethods || FuelUX.isFunction(data[option])) {
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
		var $control = $(e.target).closest('.' + name);
		if (!$control.data(namespaced)) {
			$control[name]($control.data());
		}
	});
	
	// Must be domReady for AMD compatibility
	$(function () {
		$(initializeSelector).each(function () {
			var $this = $(this);
			if (!$this.data(namespaced)) {
				$this[name]($this.data());
			}
		});
	});
}

export default createPlugin;