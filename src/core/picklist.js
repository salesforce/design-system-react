// # Picklist Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Selectable from '../traits/selectable';
import KeyboardNavigable from '../traits/keyboard-navigable';

export const CONTROL = 'Picklist';

const PicklistCore = Lib.merge({}, Base, Disableable, Selectable, KeyboardNavigable, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-picklist',
		LABEL: 'slds-truncate',
		MENU: 'slds-dropdown',
		LIST: 'slds-dropdown__list',
		TOGGLE: 'slds-button',
		HEADER: 'slds-dropdown__header',
		HEADERTEXT: 'slds-text-heading--label',
		DIVIDER: 'slds-has-divider',
		ICON: 'slds-icon'
	},

	_defaultProperties: {
		collection: [],
		
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
	 
	 isSelectable (item)
	 Return true for items that are not of the type 'header' or 'divider' and are not disabled
	 item => object wrapped in an Item Adapter

	 */

	accessors: {
		textProp () {
			return 'text';
		},

		getText (item) {
			return item.get(item.textProp());
		},

		getType (item) {
			return item.get('_itemType');
		},

		getDisabled (item) {
			return item.get('disabled') === true;
		},

		getKey (item) {
			return item.get();
		},

		getIcon (item) {
			return item.get('icon');
		},
		
		isSelectable (item) {
			const type = item.getType();
			
			return type !== 'header' && type !== 'divider' && !item.getDisabled();
		}
	},
	
	_onClosed () {
		this.setState({
			focusedIndex: this._defaultState.focusedIndex
		});
	},

	_canSelect (newSelection, select) {
		const item = this._getItemAdapter(newSelection);

		if (item.isSelectable()) {
			select();
		}
	},
	
	_getTriggerId () {
		return this.getState('id') + '-trigger';
	},
	
	_getMenuId () {
		return this.getState('id') + '-menu';
	},
	
	_getMenuItemId (index) {
		if (index !== undefined) {
			return this._getMenuId() + '-item-' + index;
		}
	}
});

export default PicklistCore;
