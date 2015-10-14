// SELECTLIST CONTROL

import * as Lib from '../lib/lib';
import Base from './base';
import classNames from 'classnames';

// Traits
import Disableable from '../traits/disableable';
import Openable from '../traits/openable';
import Selectable from '../traits/selectable';
import KeyboardNavigable from '../traits/keyboard-navigable';

require('../../scss/components/button-groups/flavors/base/index.scss');
require('../../scss/components/buttons/flavors/base/index.scss');
require('../../scss/components/buttons/flavors/neutral/index.scss');
require('../../scss/components/buttons/flavors/brand/index.scss');
require('../../scss/components/picklists/flavors/base/index.scss');
require('../../scss/components/picklists/flavors/multi-select/index.scss');
require('../../scss/components/picklists/flavors/quickfind/index.scss');
require('../../scss/components/dropdowns/flavors/base/index.scss');
require('../../scss/components/dropdowns/flavors/action-overflow/index.scss');
require('../../scss/components/dropdowns/flavors/base/index.scss');
require('../../scss/components/dropdowns/flavors/menu/index.scss');
require('../../scss/components/dropdowns/flavors/menu-with-icons/index.scss');
require('../../scss/components/dropdowns/flavors/menu-with-search/index.scss');
require('../../scss/components/dropdowns/flavors/positioning/index.scss');
require('../../scss/components/dropdowns/flavors/search-overflow/index.scss');

export const CONTROL = 'picklist';

const resizeCache = {};

const SelectlistCore = Lib.merge({}, Base, Disableable, Openable, Selectable, KeyboardNavigable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-' + CONTROL,
		BTN_DEFAULT: 'slds-button slds-button--neutral',
		BTN_GROUP: 'slds-button-group',
		CARET: 'caret',
		DIVIDER: 'divider',
		HEADER: 'dropdown-header',
		HIDDEN: 'hidden-field',
		LABEL: 'selected-label',
		MENU: 'slds-dropdown__list',
		TOGGLE: 'slds-button slds-button--neutral slds-picklist__label'
	},

	_defaultProperties: {
		collection: []
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

		getType (item) {
			return item.get('_itemType');
		},

		getDisabled (item) {
			return item.get('disabled') === true;
		},

		getKey (item) {
			return item.get();
		}
	},

	_canSelect (newSelection, select) {
		const item = this._getItemAdapter(newSelection);

		if (!item.getType() && !item.getDisabled()) {
			select();
		}
	},

	_onInitialized () {
		if (this.getProperty('resize') === 'auto') {
			this.resize();
		}
	},

	// Vanilla js implementation of this to be shared by the libraries
	// TO-DO: Look into creating a generic implementation as a trait
	resize () {
		const sizer = document.createElement('div');

		sizer.className = 'selectlist-sizer';
		sizer.innerHTML = '<div class="' + classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP) + '"><button class="slds-button slds-button--neutral dropdown-toggle" data-toggle="dropdown" type="button"><span class="' + this.cssClasses.LABEL + '"></span><span class="caret"></span></button></div>';

		let parent;
		if (Lib.hasClass(document.querySelector('html'), this.cssClasses.NAMESPACE)) {
			parent = document.querySelector('body');
		} else {
			parent = document.querySelector('.' + this.cssClasses.NAMESPACE);
		}

		if (parent) {
			parent.appendChild(sizer);
		} else {
			return;
		}

		const label = sizer.querySelector('.' + this.cssClasses.LABEL);
		const control = sizer.querySelector('.' + this.cssClasses.CONTROL);

		const strings = this.getState('strings');
		label.textContent = strings.NONE_SELECTED;

		let width = control.offsetWidth;
		this._collection.forEach(item => {
			const text = item.getText();
			let offsetWidth;

			if (resizeCache[text]) {
				offsetWidth = resizeCache[text];
			} else {
				label.textContent = text;
				offsetWidth = control.offsetWidth;
			}

			if (offsetWidth > width) {
				width = offsetWidth;
			}
		});

		parent.removeChild(sizer);

		if (width !== this.getState('width')) {
			this.setState({width});
			if (Lib.isFunction(this._resetWidth)) this._resetWidth(width);
		}
	}
});

export default SelectlistCore;
