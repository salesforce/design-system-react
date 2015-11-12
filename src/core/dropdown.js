// DROPDOWN CORE

import * as Lib from '../lib/lib';
import PicklistCore from './picklist';

export const CONTROL = 'Dropdown';

const DropdownCore = Lib.merge({}, PicklistCore, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-dropdown',
		ICON_DOWN_SIZE: 'slds-button__icon--x-small',
		TRIGGER: 'slds-dropdown-trigger'
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
