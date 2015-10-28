// COMBOBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ComboboxCore, {CONTROL} from '../../core/combobox';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
import Svg from '../svg';
import { PicklistObject, legacyMethods } from '../picklist/picklist';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './combobox-template';

let Combobox = function Combobox () {
	const options = this._getOptions(arguments);
	
	const $html = $('<i />').append(template);
	this.template = $html.find('.slds-form-element');
	this._closeOnClick = $.proxy(this._closeOnClick, this);
	
	this._initialize(options);
};

export const ComboboxObject = {
	_bindUIEvents () {
		this.elements.button.on('click', $.proxy(this._handleClicked, this));
		this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
		this.elements.input.on('change', $.proxy(this._handleChanged, this)).on('click', function (e) {e.stopPropagation();});
		this.elements.inputGroup.on('keydown', $.proxy(this._handleKeyDown, this));
		this.elements.inputGroup.on('keypress', $.proxy(this._handleKeyPressed, this));
	},
	
	_initElements (base, elements) {
		const els = elements || {};

		els.button = base.find('.' + this.cssClasses.TOGGLE);
		els.input = base.find('.' + this.cssClasses.INPUT);
		els.inputGroup = base.find('.slds-form-element');
		els.dropdown = base.find('.' + this.cssClasses.DROPDOWN);
		els.dropdownMenu = base.find('.' + this.cssClasses.MENU);

		return els;
	},

	_render () {
		const selection = this._getSelection();

		// Get the template
		const $el = this.element = this.$el = this.elements.control = this.template.clone();
		const elements = this._initElements($el, this.elements);

		// Configure the button
		const disabled = !!this.getProperty('disabled');
		elements.button.prop('disabled', disabled);

		// Show the current selection if there is one
		elements.input.val(selection.getText());

		this._renderMenu(elements);
		
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


Combobox = Lib.runHelpers('jquery', CONTROL, Combobox, {
	legacyMethods
});

export default Combobox;
