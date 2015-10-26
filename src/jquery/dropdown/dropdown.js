// DROPDOWN CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import DropdownCore, {CONTROL} from '../../core/dropdown';

// Framework specific
import Events from '../events';
import State from '../state';
import { PicklistObject, _renderItem, _renderHeader, _renderDivider, legacyMethods } from '../picklist/picklist';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './dropdown-template';

let Dropdown = function Dropdown (element, options) {
	this.options = Lib.extend({}, options);

	this.elements = {
		wrapper: $(element)
	};

	const $html = $('<i />').append(template);
	this.template = $html.find('.slds-dropdown-trigger');

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

		els.button = base.find('.' + this.cssClasses.BUTTON);
		els.dropdown = base.find('.' + this.cssClasses.DROPDOWN);
		els.dropdownMenu = base.find('.' + this.cssClasses.MENU);

		return els;
	},

	_bindUIEvents () {
		this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
	},

	_render () {
		const selection = this._getSelection();

		// Get the template
		const $el = this.template.clone();
		const elements = this._initElements($el, this.elements);

		// Configure the button
		const disabled = !!this.getProperty('disabled');
		elements.button.prop('disabled', disabled);

		if (disabled) {
			this.elements.dropdown.addClass('slds-hide');
		} else {
			this.elements.dropdown.removeClass('slds-hide');
		}

		// render icon
		let icon = this.getProperty('icon');

		if (selection) {
			icon = selection.getIcon() || icon;
		}

		elements.button.prepend(this._renderIcon(icon));

		// down arrow
		if (this.getProperty('renderArrow')) {
			const arrow = this._renderIcon('utility.down', this.cssClasses.ICON_DOWN_SIZE);

			elements.button.append(arrow);
		}

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

		if (this.elements.wrapper.is('div')) {
			this.elements.wrapper.attr('class', $el.attr('class'));
			this.elements.wrapper.append($el.children());
		} else {
			this.elements.wrapper.append($el);
			this.elements.wrapper = $el;
		}

		if ( this._collection._data.length === 0 ) {
			this.disable();
			this.setProperties({ disabled: true });
		}

		this.rendered = true;
	},

	_onExpandOrCollapse () {
		if (this.rendered) {
			const isOpen = this.getState('isOpen');

			this.elements.button.attr('aria-expanded', isOpen);
		}
	},

	_onEnabledOrDisabled () {
		if (this.rendered) {
			const disabled = !!this.getProperty('disabled');
			
			this.elements.button.prop('disabled', disabled);

			if (disabled) {
				this.elements.dropdown.addClass('slds-hide');
			} else {
				this.elements.dropdown.removeClass('slds-hide');
			}
		}
	},

	_onSelected (item) {
		if (this.rendered) {
			this._addCheckmark(this.elements);
			this._swapIcon(item.getIcon());
		}
	},

	_swapIcon (iconString) {
		const icon = iconString || this.getProperty('icon') || '';

		if (Lib.isString(icon) && icon.length > 0 && this.getProperty('swapIcon')) {
			this.elements.button.find('svg').eq(0).replaceWith(this._renderIcon(icon));
		}
	}
});

Lib.merge(Dropdown.prototype, DropdownCore, Events, State, DropdownObject);

Dropdown = Lib.runHelpers('jquery', CONTROL, Dropdown, {
	legacyMethods
});

export default Dropdown;
