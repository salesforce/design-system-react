// SELECTLIST CONTROL

import Lib from './lib';
import Base from './base';
import classNames from 'classnames';

// Mixins
import Disableable from '../mixins/disableable';
import Selectable from '../mixins/selectable';

export var CONTROL = 'selectlist';

var SelectlistCore = Lib.extend({}, Base, Disableable, Selectable, {
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
			this._collection = options.collection;
		} else if (this.collection) {
			this._collection = this.collection;
		} else if (!this._collection) {
			this._collection = [];
		}

		this.__initializeSelectable(options);

		this.__initializeDisableable(options);

		if (options && options.resize === 'auto') {
			if (Lib.isFunction(this.resize)) this.resize();
		}
	},

	// Vanilla js implementation of this to be shared by the libraries
	resize () {
		var self = this;
		var newWidth = 0;
		var sizer = document.createElement('div');
		var width = 0;
		var parent;
		var label;
		var control;
		var name;

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

		label = sizer.querySelector('.' + self.cssClasses.LABEL);
		control = sizer.querySelector('.' + self.cssClasses.CONTROL);
		this._collection.forEach(function (item) {
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
