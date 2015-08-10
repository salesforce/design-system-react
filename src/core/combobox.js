// COMBOBOX CONTROL

import Lib from './lib';
import Base from './base';

// Mixins
import Disableable from '../mixins/disableable';
import Selectable from '../mixins/selectable';

export var CONTROL = 'combobox';

var ComboboxCore = Lib.extend({}, Base, Disableable, Selectable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
		BUTTON: 'btn',
		INPUT: 'input',
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

	// TO-DO: Did this need to set the width of the menu each time?
	resize () {
		var width = this.elements.wrapper.outerWidth();
		
		this.__setState({ width: width });
		if (Lib.isFunction(this.resetWidth)) this.resetWidth(width);
	}
});

export default ComboboxCore;
