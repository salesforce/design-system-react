// SEARCH CORE

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

export const CONTROL = 'search';

const SearchCore = Lib.merge({}, Base, Disableable, {
	_defaultProperties: {
		clearOnEmpty: false
	},

	cssClasses: {
		ICON: 'glyphicon',
		INPUT_GROUP: 'input-group',
		REMOVE_ICON: 'glyphicon-remove',
		SEARCH: 'search',
		SEARCH_ICON: 'glyphicon-search',
		SEARCHED: 'searched'
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

	_onEnabledOrDisabled: function () {
		if (this.getProperty('disabled')) {
			Lib.addClass(this.elements.root, this.cssClasses.DISABLED);
			this.elements.input.setAttribute('disabled', 'disabled');
			Lib.addClass(this.elements.button, this.cssClasses.DISABLED);
		} else {
			Lib.removeClass(this.elements.root, this.cssClasses.DISABLED);
			this.elements.input.removeAttribute('disabled');
			Lib.removeClass(this.elements.button, this.cssClasses.DISABLED);
		}
	}
});

export default SearchCore;
