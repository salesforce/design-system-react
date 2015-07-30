// PLUGIN DEFINITION

// Core
import Landmark from '../landmark';

// Framework specific
// TO-DO: This might not work with require, need to confirm that it does
var $ = window.$;

var createPlugin = function (name, Constructor, legacyMethods) {
	var old = $.fn[name];
	
	$.fn[name] = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;
	
		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('fu.' + name);
	
			// If object, this is an initialization, only overwrite options and init if no data exists
			var options = typeof option === 'object' && option;
			if (!data) {
				$this.data('fu.' + name, (data = new Constructor(this, options)));
			}
	
			// If string, this is a method call, and apply with args
			if (typeof option === 'string') {
				if (!legacyMethods || Landmark.isFunction(data[option])) {
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
	
	$(document).on('mousedown.fu.' + name + '.data-api', '[data-initialize=' + name + ']', function (e) {
		var $control = $(e.target).closest('.' + name);
		if (!$control.data('fu.' + name)) {
			$control[name]($control.data());
		}
	});
	
	// Must be domReady for AMD compatibility
	$(function () {
		$('[data-initialize=' + name + ']').each(function () {
			var $this = $(this);
			if (!$this.data('fu.' + name)) {
				$this[name]($this.data());
			}
		});
	});
}

export default createPlugin;