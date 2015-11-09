// # Lookup Control
// ### Core

// Implements basic functionality required for the Lookup [design pattern](https://www.lightningdesignsystem.com/components/lookups) and pulls in any appropriate traits. This file is shared between all facades and should not know anything about specific frameworks.

// Bring in the [shared library functions](../lib/lib).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base).
import Base from './base';

/* TODO: Finish documenting the core. */
// Traits
import Disableable from '../traits/disableable';
import Openable from '../traits/openable';
import Multiselectable from '../traits/multiselectable';
import KeyboardNavigable from '../traits/keyboard-navigable';

export const CONTROL = 'slds-lookup';

const LookupCore = Lib.merge({}, Base, Disableable, Openable, Multiselectable, KeyboardNavigable, {
	CONTROL,
	
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
		searchIcon: 'utility.search'
	},
	
	_defaultState: {
		searchString: ''
	},

	// ### Accessors
	// These may be supplied in the options hash / properties to override default behavior. All accessors take 'item' as their first properties, which is an object from the collection wrapped in an item adapter.
	accessors: {
		// Return the text value to display in the list
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
		},

		// Return a function that renders the contents of each menu item. Defaults to a single renderer for the whole control.
		getRenderer () {
			return this.getProperty('menuItemRenderer');
		}
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
	
	_getInputId () {
		return this.getState('id') + '-input';
	},
	
	_getMenuId () {
		return this.getState('id') + '-menu';
	},
	
	_getMenuItemId (index) {
		if (index !== undefined) {
			return this._getMenuId() + '-item-' + index;
		}
	},
	
	_scrollMenuItems () {
		const _menu = this.elements.menu[0];
		let _menuItem = _menu.getElementsByClassName('slds-theme--shade');
		
		if (_menuItem && _menuItem.length === 1) {
			_menuItem = _menuItem[0];
			
			const menuHeight = _menu.offsetHeight;
			
			const menuTop = _menu.scrollTop;
			const menuItemTop = _menuItem.offsetTop;
			
			if (menuItemTop < menuTop) {
				_menu.scrollTop = menuItemTop;
			} else {
				const menuBottom = menuTop + menuHeight + _menu.offsetTop;
				const menuItemBottom = menuItemTop + _menuItem.offsetHeight;
				
				if (menuItemBottom > menuBottom) {
					_menu.scrollTop = menuItemBottom - menuHeight;
				}
			}
		} else {
			_menu.scrollTop = 0;
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
