// LOOKUP CORE

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Openable from '../traits/openable';
import Multiselectable from '../traits/multiselectable';
import KeyboardNavigable from '../traits/keyboard-navigable';

export const CONTROL = 'slds-lookup';

const LookupCore = Lib.merge({}, Base, Disableable, Openable, Multiselectable, KeyboardNavigable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
		INPUT: 'slds-input',
		MENU: 'slds-lookup__menu',
		LIST: 'slds-lookup__list'
	},

	_defaultProperties: {
		collection: [],
		multiSelect: false
	},

	/* Accessors: These may be supplied in the options hash to override default behavior

	 textProp ()
	 Return the name of the property that contains the text

	 getText (item)
	 Return the text value to display in the list
	 item => object wrapped in an Item Adapter

	 getType (item)
	 Return the type of the current item - can be 'header', 'divider', or nothing
	 item => object wrapped in an Item Adapter

	 getDisabled (item)
	 Return true if the item is disabled
	 item => object wrapped in an Item Adapter

	 getKey (item)
	 Return either an object with key/value pairs to match or a match function
	 Use this to reduce the number of fields required for searching if a unique key is available
	 item => object wrapped in an Item Adapter

	 */

	accessors: {
		textProp () {
			return 'text';
		},

		getText (item) {
			return item.get(item.textProp());
		},

		getKey (item) {
			return item.get();
		},

		getIcon (item) {
			return item.get('icon');
		}
	}
});

export default LookupCore;
