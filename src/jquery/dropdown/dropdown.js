// DROPDOWN CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import DropdownCore, {CONTROL} from '../../core/dropdown';

// Framework specific
import Events from '../events';
import State from '../state';
import { PicklistObject, _renderItem, _renderHeader, _renderDivider, legacyMethods } from '../picklist/picklist';

// Children
import Button from '../button/button';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './dropdown-template';

let Dropdown = function Dropdown (element, options) {
	this.options = Lib.extend({}, options);

	this.elements = {
		wrapper: $(element)
	};

	this.template = $('<i />').append(template);

	if (this.options.collection) {
		this.rendered = false;
	} else {
		this._initElements(this.elements.wrapper, this.elements);

		this._buildCollection(this.options);

		this.rendered = true;
	}

	this._initializeState();
	this._initialize(this.options);
};

export const DropdownObject = Lib.merge(PicklistObject, {
	_initElements (base, elements) {
		const els = elements || {};

		els.trigger = base.find('.' + this.cssClasses.TRIGGER);
		els.dropdown = base.find('.' + this.cssClasses.DROPDOWN);
		els.dropdownMenu = base.find('.' + this.cssClasses.MENU);

		return els;
	},

	_bindUIEvents () {
		this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
	},

	_render () {
		// Get the template
		const $el = this.template.clone();
		const elements = this._initElements($el, this.elements);
		
		// Configure the button
		let icon;
		
		if (this.getProperty('swapIcon')) {
			const selection = this._getSelection();
			icon = !!selection && selection.getIcon();
		}
		
		icon = icon || this.getProperty('icon');
		
		this.button = new Button(elements.trigger, {
			icon,
			iconStyle: 'icon-more'
		});
		
		// Put the menu in the trigger div when ready
		elements.trigger.on('initialized', function () {
			elements.trigger.append(elements.dropdown);
		});

		// Empty the menu from the template
		elements.dropdownMenu.empty();

		// Building the menu items
		this._collection.forEach(item => {
			let $li;
			let func;
			const funcMap = {
				header: _renderHeader,
				divider: _renderDivider,
				item: _renderItem
			};
			
			func = funcMap[item.getType()] || _renderItem;

			$li = func.call(this, item);

			elements.dropdownMenu.append($li);
		});
		
		this._addCheckmark(elements);

		// Prep for append
		elements.wrapper.empty();
		this.elements.wrapper.append($el.children());

		if ( this._collection._data.length === 0 ) {
			this.disable();
			this.setProperties({ disabled: true });
		}

		this.rendered = true;
	},

	_onSelected (item) {
		if (this.rendered) {
			this._addCheckmark(this.elements);
			this._swapIcon(item.getIcon());
		}
	},
	
	_onExpandOrCollapse () {
		if (this.rendered) {
			const isOpen = this.getState('isOpen');
			
			this.elements.trigger.attr('aria-expanded', isOpen);
		}
	},

	_swapIcon (iconString) {
		const icon = iconString || this.getProperty('icon');

		if (Lib.isString(icon) && icon.length > 0 && this.getProperty('swapIcon')) {
			// TODO: Implement this, which will require an update to Button
		}
	}
});

Lib.merge(Dropdown.prototype, DropdownCore, Events, State, DropdownObject);

Dropdown = Lib.runHelpers('jquery', CONTROL, Dropdown, {
	legacyMethods
});

export default Dropdown;
