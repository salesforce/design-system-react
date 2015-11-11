// DROPDOWN CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import DropdownCore, {CONTROL} from '../../core/dropdown';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
import Svg from '../svg';
import { PicklistObject } from '../picklist/picklist';

// Children
import Button from '../button/button';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './dropdown-template';

let Dropdown = function Dropdown () {
	const options = this._getOptions(arguments);
	
	this.template = $(template);
	this._closeOnClick = $.proxy(this._closeOnClick, this);
	
	this._initialize(options);
};

export const DropdownObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this._initElements();
	},
	
	_bindUIEvents () {
		this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
	},

	_render () {
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
		
		this.button.prependTo(this.element);

		// Render the menu
		this._renderMenu(this.elements);

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
			this.button.renderView({
				icon: icon
			});
		}
	}
};

Lib.merge(Dropdown.prototype, DropdownCore, Events, DOM, State, Svg, PicklistObject, DropdownObject);

Dropdown = Lib.runHelpers('jquery', CONTROL, Dropdown);

export default Dropdown;
