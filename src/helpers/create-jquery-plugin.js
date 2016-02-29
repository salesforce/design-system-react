/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// PLUGIN DEFINITION HELPER
// Include this helper to create jQuery plugin versions of jQuery controls.
// Without the helper, jQuery controls can still be instantiated directly via their constructors.

// Core
import * as Lib from '../lib/lib';

// Framework specific
import $ from 'jquery';

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
