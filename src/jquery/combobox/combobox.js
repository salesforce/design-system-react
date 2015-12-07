// COMBOBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ComboboxCore, {CONTROL} from '../../core/combobox';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
import Svg from '../svg';
import { PicklistObject } from '../picklist/picklist';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './combobox-template';

let Combobox = function Combobox () {
	const options = this._getOptions(arguments);
	
	this.template = $(template);
	
	this._initialize(options);
};

export const ComboboxObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this._initElements();
	},
	
	_initElements () {
		this.elements.button = this.element.find('.' + this.cssClasses.TOGGLE);
		this.elements.input = this.element.find('.' + this.cssClasses.INPUT);
		this.elements.dropdown = this.element.find('.' + this.cssClasses.MENU);
		this.elements.dropdownMenu = this.element.find('.' + this.cssClasses.LIST);

		/* TODO: icon is not perfectly centered */
		const $icon = this._renderIcon('utility.down');
		$icon.replaceAll(this.elements.button.find('x-button-svg')[0]);
	},
	
	_bindUIEvents () {
		this.elements.button.on('click', $.proxy(this._handleClicked, this));
		this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
		this.elements.input.on('change', $.proxy(this._handleChanged, this)).on('click', function (e) {e.stopPropagation();});
		// TODO: Find the right element for these keypress triggers
		this.elements.dropdown.on('keydown', $.proxy(this._handleKeyDown, this));
		this.elements.dropdown.on('keypress', $.proxy(this._handleKeyPressed, this));
	},

	_render () {
		const selection = this._getSelection();

		// Configure the button
		const disabled = !!this.getProperty('disabled');
		this.elements.button.prop('disabled', disabled);

		// Show the current selection if there is one
		this.elements.input.val(selection.getText());

		this._renderMenu(this.elements);
		
		return this.element;
	},

	_onSelected (item) {
		if (this.rendered) {
			this.elements.input.val(item.getText());
			
			this._addCheckmark(this.elements);
		}
	},

	_onEnabledOrDisabled () {
		if (this.rendered) {
			const disabled = !!this.getProperty('disabled');
			
			this.elements.input.prop('disabled', disabled);
			this.elements.button.prop('disabled', disabled);
		}
	},

	_resetWidth (width) {
		if (this.rendered) {
			this.elements.dropdownMenu.width(width);
		}
	},

	_handleChanged () {
		const value = {};

		// TODO: Not SLDS related, I've realized this model won't work perfectly with all data accessor types - might want to consider this
		value[this.accessors.textProp()] = this.elements.input.val();

		this.setSelection(value);
	}
};

Lib.merge(Combobox.prototype, ComboboxCore, Events, DOM, State, Svg, PicklistObject, ComboboxObject);


Combobox = Lib.runHelpers('jquery', CONTROL, Combobox);

export default Combobox;
