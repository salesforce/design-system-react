// PILLBOX CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Multiselectable from '../traits/multiselectable';

export const CONTROL = 'pillbox';

const PickerCore = Lib.merge({}, Base, Disableable, Multiselectable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
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

export default PickerCore;
