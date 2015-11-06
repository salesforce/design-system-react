// CHECKBOX CORE

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Checkable from '../traits/checkable';

// Styles
// require('../../scss/components/forms/flavors/form-element/index.scss');
// require('../../scss/components/forms/flavors/checkbox/index.scss');

export const CONTROL = 'slds-checkbox';

const CheckboxCore = Lib.merge({}, Base, Disableable, Checkable, {
	cssClasses: {
		CONTROL: CONTROL,
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
