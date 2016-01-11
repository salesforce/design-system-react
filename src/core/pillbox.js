// # Pillbox Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

export const CONTROL = 'Pillbox';

const PillboxCore = Lib.merge({}, Base, {
	CONTROL,
	
	accessors: {
		// Return the text value to display in the list.
		getText (item) {
			return item.get('text');
		},

		// Return either an object with key/value pairs to match or a match function. Use this to reduce the number of fields required for searching if a unique key is available.
		getKey (item) {
			return item.get();
		},

		// Return a string that points to the appropriate icon.
		getIcon (item) {
			return item.get('icon');
		}
	},

	_defaultProperties: {
		autoFocusOnNewItems: false,
		multiSelect: true,
		selection: []
	}
});

export default PillboxCore;
