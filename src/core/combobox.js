// COMBOBOX CONTROL

import * as Lib from '../lib/lib';
import SelectlistCore from './selectlist';

// TODO: This doesn't actually exist, should we name some variant of picklist or something equivalent?
export const CONTROL = 'slds-combobox';

const ComboboxCore = Lib.merge({}, SelectlistCore, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
		INPUT: 'slds-input',
		DROPDOWN: 'slds-dropdown',
		MENU: 'slds-dropdown__list',
		TOGGLE: 'slds-button',
		HEADER: 'slds-dropdown__header',
		HEADERTEXT: 'slds-text-heading--label',
		DIVIDER: 'slds-has-divider'
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
