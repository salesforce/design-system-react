// # Lookup Control
// ### Core

// Implements basic functionality required for the Lookup [design pattern](https://www.lightningdesignsystem.com/components/lookups) and pulls in any appropriate traits. This file is shared between all facades and should not know anything about specific frameworks.

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

/* TODO: Finish documenting the core. */
// Traits
import Disableable from '../traits/disableable';
import Openable from '../traits/openable';
import Multiselectable from '../traits/multiselectable';
import KeyboardNavigable from '../traits/keyboard-navigable';
import positionable from '../traits/positionable';

export const CONTROL = 'Lookup';

const LookupCore = Lib.merge({}, Base, Disableable, Openable, positionable, KeyboardNavigable, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-lookup',
		INPUT: 'slds-input',
		MENU: 'slds-lookup__menu',
		LIST: 'slds-lookup__list'
	},

	_defaultProperties: {
		collection: [],
		multiSelect: false,
		searchIcon: 'utility.search',
		filterPredicate (text, pattern) {
			return text.substr(0, pattern.length).toLowerCase() === pattern;
		},

		// positionable trait
		positionedTargetVerticalAttachment: 'bottom',
		constrainWidthToTarget: true,
		constrainPositionedToWindow: true,
		modalMenu: false,
		positionedOffset: 0,
		positionedTargetHorizontalAttachment: 'left',
		positionedZIndex: '10001',
		supportedCSSTransformKey: Lib.getSupportedCSSTransformKey()
	},
	
	_defaultState: {
		searchString: ''
	},

	// ### Accessors
	// These may be supplied in the options hash / properties to override default behavior. All accessors take 'item' as their first properties, which is an object from the collection wrapped in an item adapter.
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
		
		/* TODO: Not using wrapped elements here, but jQuery facade will either have to use them or the underlying element. */
		if (this.elements.menu) this.elements.menu.scrollTop = 0;
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
	
	_getFilteredCollection (collection, searchString) {
		const _filterPredicate = this.getProperty('filterPredicate');
		let _collection;
		
		if (searchString && searchString.length > 0) {
			const pattern = searchString.toLowerCase();
			
			_collection = this._getDataAdapter(collection.filter(item => {
				return _filterPredicate(item.getText(), pattern);
			}));
		} else {
			_collection = collection;
		}
		
		return _collection;
	},
	
	_configureKeyboardNavigation (filteredCollection) {
		const navigableItems = this._getNavigableItems(filteredCollection);
		
		if (this.getProperty('menuFooterRenderer')) navigableItems.indexes.push('footer');
		
		return navigableItems;
	},
	
	_scrollMenuItems () {
		const _menu = this.elements.menu;
		let _menuItem = _menu.getElementsByClassName('slds-theme--shade');

		if (_menuItem && _menuItem.length === 1) {
			_menuItem = _menuItem[0];
			
			const menuHeight = _menu.offsetHeight;
			
			const menuTop = _menu.scrollTop;
			const menuItemTop = _menuItem.offsetTop - _menu.offsetTop;
			
			if (menuItemTop < menuTop) {
				_menu.scrollTop = menuItemTop;
			} else {
				const menuBottom = menuTop + menuHeight + _menu.offsetTop;
				const menuItemBottom = menuItemTop + _menuItem.offsetHeight + _menu.offsetTop;
				
				if (menuItemBottom > menuBottom) {
					_menu.scrollTop = menuItemBottom - menuHeight - _menu.offsetTop;
				}
			}
		}
	},
	
	_keyboardSelect (item) {
		Multiselectable.selectItem.call(this, item, this.getProperty('selection'));
	},
	
	search (searchString) {
		if (this.getState(searchString) !== searchString) {
			const searchResults = this._getFilteredCollection(this._collection, searchString);
			const navigableItems = this._configureKeyboardNavigation(searchResults);
			
			this.setState({
				searchString,
				searchResults,
				navigableItems
			});
		}
	}
});

export default LookupCore;
