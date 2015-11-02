// DROPDOWN CORE

import * as Lib from '../lib/lib';
import PicklistCore from './picklist';

// TODO: This doesn't actually exist, should we name some variant of picklist or something equivalent?
// require('../../scss/components/forms/flavors/input/index.scss');

export const CONTROL = 'slds-dropdown';

const DropdownCore = Lib.merge({}, PicklistCore, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
		ICON_DOWN_SIZE: 'slds-button__icon--x-small',
		TRIGGER: 'slds-dropdown-trigger',
		DROPDOWN: 'slds-dropdown',
		MENU: 'slds-dropdown__list',
		HEADER: 'slds-dropdown__header',
		HEADERTEXT: 'slds-text-heading--label',
		DIVIDER: 'slds-has-divider'
	},

	_defaultProperties: {
		icon: 'standard.empty',
		swapIcon: true,
		renderArrow: true
	},

	resize () {
		if (this.elements.wrapper) {
			const width = this.elements.wrapper.outerWidth();

			this.setState({ width });
			if (Lib.isFunction(this.resetWidth)) this.resetWidth(width);
		}
	}
});

export default DropdownCore;
