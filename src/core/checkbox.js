// # Checkbox Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

export const CONTROL = 'Checkbox';

const CheckboxCore = Lib.merge({}, Base, {
	CONTROL,
	
	cssClasses: {
		CONTROL: 'slds-checkbox',
		FAUX: 'slds-checkbox--faux'
	},

	_defaultProperties: {
		labelText: '',
		value: '',
		name: '',
		checked: false
	},

	checked () {
		return !!this.getProperty('checked');
	},

	_setChecked (checked) {
		if (this.getProperty('disabled')) {
			return false;
		}

		if (checked === this.checked()) {
			return false;
		}

		this.setProperties({ checked });

		if (Lib.isFunction(this._onToggled)) this._onToggled(checked);

		this.trigger('changed', checked);

		return true;
	},

	toggle () {
		if (this.checked()) {
			this.uncheck();
		} else {
			this.check();
		}
	},

	check () {
		if (this._setChecked(true)) {
			this.trigger('checked');
		}
	},

	uncheck () {
		if (this._setChecked(false)) {
			this.trigger('unchecked');
		}
	}
});

export default CheckboxCore;
