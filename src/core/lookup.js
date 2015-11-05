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
		multiSelect: false,
		menuFooterElement: true,
		menuHeaderElement: false, // Defaulting to hidden for the single scope version
		searchIcon: 'utility.search'
	},
	
	_defaultState: {
		searchString: ''
	},

	/* Accessors: These may be supplied in the options hash to override default behavior

	 textProp ()
	 Return the name of the property that contains the text

	 getText (item)
	 Return the text value to display in the list
	 item => object wrapped in an Item Adapter

	 getKey (item)
	 Return either an object with key/value pairs to match or a match function
	 Use this to reduce the number of fields required for searching if a unique key is available
	 item => object wrapped in an Item Adapter

	 getIcon (item)
	 Return a string that points to the appropriate icon
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
	},
	
	_initializer () {
		this.elements.menuItems = [];
		
		this.setState({
			inputId: Lib.uniqueId(CONTROL + '-input-')
		});
	},
	
	_onSelected () {
		this.search('');
		this.close();
	},
	
	_onExpandOrCollapse () {
		this.setState({
			focusedIndex: this._defaultState.focusedIndex
		});
	},
	
	getMenuItemId (index) {
		if (index >= 0) {
			return this.getState('inputId') + '-item-' + index;
		}
	},
	
	search (searchString) {
		if (this.getState(searchString) !== searchString) {
			this.setState({
				searchString
			});
			
			this.trigger('filter', searchString);
		}
	}
});

export default LookupCore;
