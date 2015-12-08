// # Pillbox Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

export const CONTROL = 'Pillbox';

const PillboxCore = Lib.merge({}, Base, Disableable, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-pill'
	},

	_defaultProperties: {
		multiSelect: true,
		selection: [],
		acceptKeyCodes: [13, 188]
	},

	accessors: {
		getText (item) {
			return item.get('text');
		},

		getValue (item) {
			return item.get('value');
		}
	},

	_isAcceptKeyCode (keyCode) {
		const acceptKeys = this.getProperty('acceptKeyCodes');
		let isAccepted;

		acceptKeys.forEach( (key) => {
			if (key === keyCode) {
				isAccepted = true;
			}
		});

		return isAccepted;
	}
});

export default PillboxCore;
