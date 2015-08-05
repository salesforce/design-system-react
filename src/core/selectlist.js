// SELECTLIST CONTROL

import Lib from '../core/lib';
import Base from './base';
import classNames from 'classnames';

export var CONTROL = 'selectlist';

var SelectlistCore = Object.assign({}, Base, {
	// CSS classes used within this control
	_cssClasses: {
		CONTROL: CONTROL,
		SELECTED: 'selected',
		BTN_GROUP: 'btn-group',
		TOGGLE: 'dropdown-toggle',
		HIDDEN: 'hidden-field',
		LABEL: 'selected-label',
		MENU: 'dropdown-menu'
	},

	// Set the defaults
	__getInitialState () {
		return {
			selection: null,
			disabled: false
		};
	},

	// TO-DO: Basically a bunch of if-else blocks. Can this be improved?
	__initializeOptions (options) {
		if (options && options.collection) {
			this._collection = options.collection;
		} else if (this.collection) {
			this._collection = this.collection;
		} else if (!this._collection) {
			this._collection = [];
		}

		if (options && Lib.isNumber(options.selection)) {
			this.setSelection({ id: options.selection });
		} else if (options && Lib.isObject(options.selection)) {
			this.setSelection(options.selection);
		} else {
			this.clearSelection();
		}

		if (options && options.disabled === true) {
			this.disable();
		} else if (options && options.disabled === false) {
			this.enable();
		}

		if (options && options.resize === 'auto') {
			if (Lib.isFunction(this.resize)) this.resize();
		}
	},
	
	__jumpToLetter (letter) {
		var selection;
		
		if (Lib.isNumber(letter)) {
			letter = String.fromCharCode(letter);
		}
		
		if (letter.length !== 1) {
			return;
		}
		
		this._collection.forEach(function (item) {
			var name = Lib.getProp(item, 'name');
			
			if (!selection && name && name.charAt(0).toLowerCase() === letter.toLowerCase()) {
				selection = item;
			}
		});
		
		if (selection) this.__setSelection(selection);
	},

	__setSelection (newSelection) {
		if (Lib.getProp(newSelection, 'disabled')) {
			return;
		}
		
		if (this.__getState('selection') !== newSelection) {
			if (Lib.isFunction(this.onBeforeSelection)) this.onBeforeSelection(this.__getState('selection'), newSelection);
			this.__setState({ selection: newSelection });
			if (Lib.isFunction(this.onSelected)) this.onSelected(newSelection);
		}
	},

	getSelection () {
		return Lib.findWhere(this._collection, this.__getState('selection'));
	},

	// Pass any combination of key / value pairs
	setSelection (criteria) {
		var item = Lib.findWhere(this._collection, criteria);

		return this.__setSelection(item);
	},

	// Legacy Lib functionality - select by position
	setSelectionByIndex (index) {
		if (!this._collection) {
			return;
		}

		var item;

		if (Lib.isFunction(this._collection.at)) {
			item = this._collection.at(index);
		} else {
			item = this._collection[index];
		}

		return this.__setSelection(item);
	},

	clearSelection () {
		this.__setSelection();
	},

	// These methods make sense for jQuery components but much less sense for React components
	// TO-DO: Should methods that don't make sense for a particular facade be overidden with warnings?
	enable () {
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, false);
		this.__setState({ disabled: false });
		if (Lib.isFunction(this.onEnabled)) this.onEnabled();
	},

	disable () {
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, true);
		this.__setState({ disabled: true });
		if (Lib.isFunction(this.onDisabled)) this.onDisabled();
	},

	// Vanilla js implementation of this to be shared by the libraries
	resize () {
		var self = this;
		var newWidth = 0;
		var sizer = document.createElement('div');
		var width = 0;
		var parent, label, control, name;

		sizer.className = 'selectlist-sizer';
		sizer.innerHTML = '<div class="' + classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP) + '"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button"><span class="selected-label"></span><span class="caret"></span></button></div>';

		if (Lib.hasClass(document.querySelector('html'), this.cssClasses.NAMESPACE)) {
			parent = document.querySelector('body');
		} else {
			parent = document.querySelector('.' + this.cssClasses.NAMESPACE);
		}

		if (parent) {
			parent.appendChild(sizer);
		} else {
			return;
		}

		// This works great except that we need to remember to check the key for 'None selected' as well once it's internationalized

		// This list could be long, we might want to cycle through the collection and find the longest name and just select it,
		// and use that width value. That would make less DOM touches. - @interactivellama
		
		// @interactivellama: True, this is just how it was already implemented in current Fuel UX. However, "longest" doesn't always mean widest...

		label = sizer.querySelector('.' + self._cssClasses.LABEL);
		control = sizer.querySelector('.' + self.cssClasses.CONTROL);
		this._collection.forEach(function(item) {
			name = Lib.getProp(item, 'name');

			label.textContent = name;
			newWidth = control.offsetWidth;
			if (newWidth > width) {
				width = newWidth;
			}
		});

		parent.removeChild(sizer);

		this.__setState({ width: width });
		if (Lib.isFunction(this.resetWidth)) this.resetWidth(width);
	}
});

export default SelectlistCore;