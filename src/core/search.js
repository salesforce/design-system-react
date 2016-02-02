/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Search Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

export const CONTROL = 'Search';

const SearchCore = Lib.merge({}, Base, {
	CONTROL,
	
	cssClasses: {
		ICON: 'glyphicon',
		INPUT_GROUP: 'input-group',
		REMOVE_ICON: 'glyphicon-remove',
		SEARCH: 'search',
		SEARCH_ICON: 'glyphicon-search',
		SEARCHED: 'searched',
		DISABLED: 'slds-disabled'
	},
	
	_defaultProperties: {
		clearOnEmpty: false
	},

	_getElements: function (root) {
		this.elements = {
			root: root,
			icon: root.querySelector('.' + this.cssClasses.ICON),
			input: root.querySelector('input'),
			button: root.querySelector('button')
		};
	},

	_events: [],

	_addEventListener: function (target, name, handler) {
		this._events.push({target: target, name: name, handler: handler});
	},

	_addEventListeners: function () {
		this._addEventListener(this.elements.button, 'click', this._click.bind(this));
		this._addEventListener(this.elements.input, 'keydown', this._keydown.bind(this));
		this._addEventListener(this.elements.input, 'keyup', this._keyup.bind(this));

		this._events.forEach(function (e) {
			e.target.addEventListener(e.name, e.handler);
		});
	},

	_removeEventListeners: function () {
		this._events.forEach(function (e) {
			e.target.removeEventListener(e.name, e.handler);
		});
	},

	_search: function (text) {
		if (Lib.hasClass(this.elements.icon, this.cssClasses.ICON)) {
			Lib.removeClass(this.elements.icon, this.cssClasses.SEARCH_ICON);
			Lib.addClass(this.elements.icon, this.cssClasses.REMOVE_ICON);
		}

		this.setState({activeSearch: text});
		Lib.addClass(this.elements.root, this.cssClasses.SEARCHED);
		this.trigger('searched', text);
	},

	_clear: function () {
		if (Lib.hasClass(this.elements.icon, this.cssClasses.ICON)) {
			Lib.removeClass(this.elements.icon, this.cssClasses.REMOVE_ICON);
			Lib.addClass(this.elements.icon, this.cssClasses.SEARCH_ICON);
		}

		this.setState({activeSearch: ''});
		this.elements.input.value = '';
		Lib.removeClass(this.elements.root, this.cssClasses.SEARCHED);
		this.trigger('cleared');
	},

	_action: function () {
		const val = this.elements.input.value;
		const search = this.getState('activeSearch');
		const inputEmptyOrUnchanged = (val === '' || val === search);

		if (search && inputEmptyOrUnchanged) {
			this._clear();
		} else if (val) {
			this._search(val);
		}
	},

	_click: function (e) {
		e.preventDefault();

		if (this.getProperty('disabled')) {
			return;
		}

		this._action();
	},

	_keydown: function (e) {
		if (e.which === 13) {
			e.preventDefault();
		}
	},

	_keyup: function (e) {
		let val;

		if (e.which === 13) {
			e.preventDefault();
			this._action();
		} else if (e.which === 9) {
			e.preventDefault();
		} else {
			val = this.elements.input.value;

			if (val !== this.getState('activeSearch') || !val) {
				Lib.removeClass(this.elements.icon, this.cssClasses.REMOVE_ICON);
				Lib.addClass(this.elements.icon, this.cssClasses.SEARCH_ICON);

				if (val) {
					Lib.removeClass(this.elements.root, this.cssClasses.SEARCHED);
				} else if (this.getProperty('clearOnEmpty')) {
					this._clear();
				}
			} else {
				Lib.removeClass(this.elements.icon, this.cssClasses.SEARCH_ICON);
				Lib.addClass(this.elements.icon, this.cssClasses.REMOVE_ICON);
			}
		}
	},

	enable: function () {
		Lib.removeClass(this.elements.root, this.cssClasses.DISABLED);
		this.elements.input.removeAttribute('disabled');
		Lib.removeClass(this.elements.button, this.cssClasses.DISABLED);
	},
	
	disable: function () {
		Lib.addClass(this.elements.root, this.cssClasses.DISABLED);
		this.elements.input.setAttribute('disabled', 'disabled');
		Lib.addClass(this.elements.button, this.cssClasses.DISABLED);
	}
});

export default SearchCore;
