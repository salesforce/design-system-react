// SELECTLIST CONTROL

import * as Lib from './lib';
import Base from './base';
import classNames from 'classnames';

// Traits
import Disableable from '../traits/disableable';
import Selectable from '../traits/selectable';
import KeyboardNavigable from '../traits/keyboard-navigable';

export const CONTROL = 'selectlist';

const SelectlistCore = Lib.merge({}, Base, Disableable, Selectable, KeyboardNavigable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
		BTN_DEFAULT: 'btn btn-default',
		BTN_GROUP: 'btn-group',
		CARET: 'caret',
		DIVIDER: 'divider',
		HEADER: 'dropdown-header',
		HIDDEN: 'hidden-field',
		LABEL: 'selected-label',
		MENU: 'dropdown-menu',
		TOGGLE: 'dropdown-toggle'
	},
	
	_defaultProperties: {
		collection: []
	},
	
	_defaultState: {
		isOpen: false
	},

	_initializer () {
		if (this.getProperty('resize') === 'auto') {
			this.resize();
		}
	},
	
	accessors: {
		getText (item) {
			return item.get('text');
		},

		getType (item) {
			return item.get('_itemType');
		},

		getDisabled (item) {
			return !!item.get('disabled');
		},

		// Reduce the number of fields here if a unique key is available
		// Result can be either an object with key/value pairs to match or a function
		getKey (item) {
			return item.get();
		}
	},
	
	_canSelect (newSelection) {
		const item = this._getItemAdapter(newSelection);
		
		return !item.getType() && !item.getDisabled();
	},

	// Vanilla js implementation of this to be shared by the libraries
	resize () {
		const self = this;
		const sizer = document.createElement('div');

		let newWidth = 0;
		let width = 0;
		let parent = undefined;

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

		const label = sizer.querySelector('.' + self.cssClasses.LABEL);
		const control = sizer.querySelector('.' + self.cssClasses.CONTROL);

		this._collection.forEach(item => {
			const text = item.getText();
			label.textContent = text;
			newWidth = control.offsetWidth;
			if (newWidth > width) {
				width = newWidth;
			}
		});

		parent.removeChild(sizer);

		this.setState({ width: width });
		if (Lib.isFunction(this.resetWidth)) this.resetWidth(width);
	}
});

export default SelectlistCore;
