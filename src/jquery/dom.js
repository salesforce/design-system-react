/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// DOM - JQUERY FACADE

// Core
import * as Lib from '../lib/lib';

import $ from 'jquery';

const DOM = {
	// `_onBeforeInitialize` is an optional lifecycle event that individual components may choose to implement. During this step the options are still available and still free to be modified. Initial state can be set here.
	_onBeforeInitialize (options) {
		this.elements = {};

		if (options.wrapper) {
			this.appendTo(options.wrapper);
			delete options.wrapper;
		}
	},

	// `_onInitialized` is an beginning of lifecycle event that may be overwritten by individual controls.
	_onInitialized () {
		if (Lib.isFunction(this._onBeforeRender)) this._onBeforeRender();

		if (!this.rendered) {
			if (Lib.isFunction(this.render)) this.render();
			this.rendered = true;
		}

		if (Lib.isFunction(this._addToDOM)) this._addToDOM();

		if (Lib.isFunction(this._onRendered)) this._onRendered();
	},

	destroy () {
		// `_onDestroy` is an optional end of lifecycle event that individual components may choose to implement.
		if (Lib.isFunction(this._onDestroy)) this._onDestroy();

		this.element.remove();
		return this.element[0].outerHTML;
	},

	// `appendTo` is similar to jQuery's `appendTo()` and appends the control to the DOM node or jQuery element passed. See [jQuery documentation](http://api.jquery.com/appendto/)
	appendTo (wrapper) {
		this.elements.wrapper = $(wrapper);

		if (this.rendered) {
			this.element.appendTo(this.elements.wrapper);
		} else {
			this._addToDOM = Lib.bind(this.appendTo, this, wrapper);
		}

		return this;
	},

	// `on` is similar to jQuery's `on()` and is a shortcut to adding an event listener to the primary element. See [jQuery documentation](http://api.jquery.com/on/).
	on () {
		if (this.element) {
			this.element.on.apply(this.element, arguments);
		}

		return this;
	},

	// `prependTo` is similar to jQuery's `prependTo()` and prepends the control to the DOM node or jQuery element passed. See [jQuery documentation](http://api.jquery.com/prependto/).
	prependTo (wrapper) {
		this.elements.wrapper = $(wrapper);

		if (this.rendered) {
			this.element.prependTo(this.elements.wrapper);
		} else {
			this._addToDOM = Lib.bind(this.prependTo, this, wrapper);
		}

		return this;
	},

	// `replaceAll` is similar to jQuery's `replaceAll()` and replaces jQuery elements passed to it with the control's element. See [jQuery documentation](http://api.jquery.com/replaceall/).
	replaceAll (target) {
		this.elements.wrapper = $(target).parent();

		if (this.rendered) {
			this.element.replaceAll(target);
		} else {
			this._addToDOM = Lib.bind(this.replaceAll, this, target);
		}

		return this;
	}
};

export default DOM;
