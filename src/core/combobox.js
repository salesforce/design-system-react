// COMBOBOX CONTROL

import * as Lib from '../lib/lib';
import SelectlistCore from './selectlist';
import '../data/string';

require('../../less/combobox.less');

export const CONTROL = 'combobox';

const ComboboxCore = Lib.merge({}, SelectlistCore, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
		BUTTON: 'btn',
		INPUT: 'form-control',
		INPUT_APPEND: 'input-append',
		INPUT_GROUP: 'input-group',
		INPUT_GROUP_BUTTON: 'input-group-btn',
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
