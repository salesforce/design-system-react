// CHECKBOX CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

export const CONTROL = 'checkbox';

const CheckboxCore = Lib.merge({}, Base, Disableable, {
	cssClasses: {
		CONTROL: CONTROL + '-custom',
		CHECKED: 'checked',
		INLINE: 'checkbox-inline',
		ADDON: 'input-group-addon',
		HIGHLIGHT: 'highlight'
	},

	// Set the defaults
	_defaultProperties: {
		checked: false,
		inline: false,
		addon: false,
		highlight: false
	}
});

export default CheckboxCore;
