// COMBOBOX CORE

import * as Lib from '../lib/lib';
import PicklistCore from './picklist';

// TODO: This doesn't actually exist, should we name some variant of picklist or something equivalent?
// require('../../scss/components/forms/flavors/input/index.scss');

export const CONTROL = 'slds-combobox';

const ComboboxCore = Lib.merge({}, PicklistCore, {
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
