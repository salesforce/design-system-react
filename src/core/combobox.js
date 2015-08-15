// COMBOBOX CONTROL

import * as Lib from './lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Selectable from '../traits/selectable';

export const CONTROL = 'combobox';

const ComboboxCore = Lib.merge({}, Base, Disableable, Selectable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
		TOGGLE: 'dropdown-toggle',
		BUTTON: 'btn',
		INPUT: 'input',
		MENU: 'dropdown-menu'
	},

	// Set the defaults
	__getDefaultStore () {
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

	// TO-DO: Did this need to set the width of the menu each time?
	resize () {
		const width = this.elements.wrapper.outerWidth();

		this.setState({ width: width });
		if (Lib.isFunction(this.resetWidth)) this.resetWidth(width);
	}
});

export default ComboboxCore;
