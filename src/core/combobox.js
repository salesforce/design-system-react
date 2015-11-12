// # Combobox Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

import PicklistCore from './picklist';

export const CONTROL = 'Combobox';

const ComboboxCore = Lib.merge({}, PicklistCore, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-combobox',
		INPUT: 'slds-input',
		TOGGLE: 'slds-button'
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
