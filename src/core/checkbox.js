// # Checkbox Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Traits
import Checkable from '../traits/checkable';

export const CONTROL = 'Checkbox';

const CheckboxCore = Lib.merge({}, Base, Checkable, {
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

	// Disabled controls cannot be checked
	_canCheck () {
		return !this.getProperty('disabled');
	},

	toggle () {
		this._toggleChecked();
	}
});

export default CheckboxCore;
