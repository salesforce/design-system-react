// SELECTLIST CONTROL

import * as Lib from './lib';
import Base from './base';
import classNames from 'classnames';

// Traits
import Disableable from '../traits/disableable';
import Selectable from '../traits/selectable';

export const CONTROL = 'selectlist';

const SelectlistCore = Lib.extend({}, Base, Disableable, Selectable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
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
			this._collection = Lib.getDataAdapter(options.collection);
		} else if (!this._collection) {
			this._collection = Lib.getDataAdapter([]);
		}

		this.__initializeSelectable(options);

		this.__initializeDisableable(options);

		if (options && options.resize === 'auto') {
			if (Lib.isFunction(this.resize)) this.resize();
		}
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

		this._collection.forEach(function (item) {
			const text = item.get('text');
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
