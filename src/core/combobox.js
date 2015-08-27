// COMBOBOX CONTROL

import * as Lib from './lib';
import SelectlistCore from './selectlist';
import '../data/string';

export const CONTROL = 'combobox';

const ComboboxCore = Lib.merge({}, SelectlistCore, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
		BUTTON: 'btn',
		INPUT: 'input',
		MENU: 'dropdown-menu',
		TOGGLE: 'dropdown-toggle'
	},

	resize () {
		if (this.elements.wrapper) {
			const width = this.elements.wrapper.outerWidth();
	
			this.setState({ width });
			if (Lib.isFunction(this.resetWidth)) this.resetWidth(width);
		}
	}
});

export default ComboboxCore;
