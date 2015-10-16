// COMBOBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ComboboxCore, {CONTROL} from '../../core/combobox';

// Framework specific
import Events from '../events';
import State from '../state';
import { PicklistObject, _renderItem, _renderHeader, _renderDivider, legacyMethods } from '../picklist/picklist';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './combobox-template';

let Combobox = function Combobox (element, options) {
	this.options = Lib.extend({}, options);

	this.elements = {
		wrapper: $(element)
	};

	const $html = $('<i />').append(template);
	this.template = $html.find('.slds-form-element');

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

export const ComboboxObject = Lib.merge(PicklistObject, {
	_initElements (base, elements) {
		const els = elements || {};

		els.button = base.find('.' + this.cssClasses.TOGGLE);
		els.input = base.find('.' + this.cssClasses.INPUT);
		els.inputGroup = base.find('.slds-form-element');
		els.dropdown = base.find('.' + this.cssClasses.DROPDOWN);
		els.dropdownMenu = base.find('.' + this.cssClasses.MENU);

		return els;
	},

	_bindUIEvents () {
		this.elements.button.on('click', $.proxy(this._handleClicked, this));
		this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
		this.elements.input.on('change', $.proxy(this._handleChanged, this)).on('click', function (e) {e.stopPropagation();});
		this.elements.inputGroup.on('keydown', $.proxy(this._handleKeyDown, this));
		this.elements.inputGroup.on('keypress', $.proxy(this._handleKeyPressed, this));
	},

	_render () {
		const selection = this._getSelection();

		// Get the template
		const $el = this.template.clone();
		const elements = this._initElements($el, this.elements);

		// Configure the button
		const disabled = !!this.getProperty('disabled');
		elements.button.prop('disabled', disabled);

		// Show the current selection if there is one
		elements.input.val(selection.getText());

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

		// Prep for append
		elements.wrapper.empty();

		if (this.elements.wrapper.is('div')) {
			this.elements.wrapper.attr('class', $el.attr('class'));
			this.elements.wrapper.append($el.children());
		} else {
			this.elements.wrapper.append($el);
			this.elements.wrapper = $el;
		}

		this.rendered = true;
	},

	_onSelected (item) {
		if (this.rendered) {
			this.elements.input.val(item.getText());
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
});

Lib.merge(Combobox.prototype, ComboboxCore, Events, State, ComboboxObject);


Combobox = Lib.runHelpers('jquery', CONTROL, Combobox, {
	legacyMethods
});

export default Combobox;
