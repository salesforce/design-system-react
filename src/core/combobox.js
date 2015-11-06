// COMBOBOX CORE

import * as Lib from '../lib/lib';
import PicklistCore from './picklist';

// TODO: This doesn't actually exist, should we name some variant of picklist or something equivalent?
// require('../../scss/components/forms/flavors/input/index.scss');

export const CONTROL = 'slds-combobox';

const ComboboxCore = Lib.merge({}, PicklistCore, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
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
