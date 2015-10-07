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
		selection: []
	},

	accessors: {
		getText (item) {
			return item.get('text');
		}
	},

	_canSelect () {
		return true;
	}
});

export default PickerCore;
