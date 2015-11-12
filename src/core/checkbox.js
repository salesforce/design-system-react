// # Checkbox Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Checkable from '../traits/checkable';

export const CONTROL = 'Checkbox';

const CheckboxCore = Lib.merge({}, Base, Disableable, Checkable, {
	CONTROL,
	
	cssClasses: {
		CONTROL: 'slds-checkbox',
		FAUX: 'slds-checkbox--faux'
	},

	_defaultProperties: {
		labelText: '',
		value: '',
		name: ''
	},

	_canCheck () {
		if (this.getProperty('disabled')) {
			// Component is disabled, do not allow a toggle to occur.
			return false;
		}

		return true;
	},

	toggle () {
		this._toggleChecked();
	}
});

export default CheckboxCore;
