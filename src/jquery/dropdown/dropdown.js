// DROPDOWN CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import DropdownCore, {CONTROL} from '../../core/dropdown';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
import Svg from '../svg';
import { PicklistObject, legacyMethods } from '../picklist/picklist';

// Children
import Button from '../button/button';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './dropdown-template';

let Dropdown = function Dropdown () {
	const options = this._getOptions(arguments);
	
	this.template = $('<i />').append(template);
	this._closeOnClick = $.proxy(this._closeOnClick, this);
	
	this._initialize(options);
};

export const DropdownObject = {
	_bindUIEvents () {
		this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
	},
	
	_initElements (base, elements) {
		const els = elements || {};

		els.trigger = base.find('.' + this.cssClasses.TRIGGER);
		els.dropdown = base.find('.' + this.cssClasses.DROPDOWN);
		els.dropdownMenu = base.find('.' + this.cssClasses.MENU);

		return els;
	},

	_render () {
		// Get the template
		const $el = this.template.clone();
		const elements = this._initElements($el, this.elements);
		this.element = this.$el = this.elements.control = this.elements.trigger;
		
		// Configure the button
		let icon;
		
		if (this.getProperty('swapIcon')) {
			const selection = this._getSelection();
			icon = !!selection && selection.getIcon();
		}
		
		icon = icon || this.getProperty('icon');
		
		this.button = new Button({
			icon,
			iconStyle: 'icon-more'
		});

		// Render the menu
		this._renderMenu(elements);
		
		// Put everything in it's place
		this.button.prependTo(this.element);
		this.element.append(elements.dropdown);

		if (this._collection._data.length === 0) {
			this.disable();
		}

		return this.element;
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
};

Lib.merge(Dropdown.prototype, DropdownCore, Events, DOM, State, Svg, PicklistObject, DropdownObject);

Dropdown = Lib.runHelpers('jquery', CONTROL, Dropdown, {
	legacyMethods
});

export default Dropdown;
