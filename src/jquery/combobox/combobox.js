// COMBOBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ComboboxCore, {CONTROL} from '../../core/combobox';

// Framework specific
import Events from '../events';
import State from '../state';
import { SelectlistObject, _renderItem, _renderHeader, _renderDivider, legacyMethods } from '../selectlist/selectlist';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './combobox-template';

let Combobox = function Combobox (element, options) {
	this.options = Lib.extend({}, options);

	this.elements = {
		wrapper: $(element)
	};

	const $html = $('<i />').append(template);
	this.template = $html.find('.' + this.cssClasses.CONTROL);

	if (this.options.collection) {
		this.rendered = false;
	} else {
		this.isBootstrap3 = Lib.isFunction($().emulateTransitionEnd);

		this._initElements(this.elements.wrapper, this.elements);

		this._buildCollection(this.options);

		this.rendered = true;
	}

	this._initializeState();
	this._initialize(this.options);
};

export const ComboboxObject = Lib.merge(SelectlistObject, {
	_initElements (base, elements) {
		const els = elements || {};

		els.button = base.find('.' + this.cssClasses.TOGGLE);
		els.input = base.find('.' + this.cssClasses.INPUT);
		els.inputGroup = base.find('.' + this.cssClasses.INPUT_GROUP_BUTTON);
		els.dropdownMenu = base.find('.' + this.cssClasses.MENU);

		return els;
	},

	_buildCollection (options) {
		const self = this;
		const _options = options;
		const collection = [];

		this.elements.dropdownMenu.find('li').each(function buildCollectionElements () {
			const $item = $(this);
			const item = $item.data();

			if (!item.text) {
				item.text = $item.text().trim();
			}

			if (item.selected) {
				delete item.selected;
				_options.selection = item;
			}

			if ($item.is('.disabled, :disabled')) {
				item.disabled = true;
			}

			if ($item.hasClass(self.cssClasses.HEADER)) {
				item._itemType = 'header';
			} else if ($item.hasClass(self.cssClasses.DIVIDER)) {
				item._itemType = 'divider';
			}

			$item.data(item);
			collection.push(item);
		});

		_options.collection = collection;
	},

	_bindUIEvents () {
		if (!this.isBootstrap3) this.elements.button.on('click.fu.selectlist', $.proxy(this._handleClicked, this));
		this.elements.dropdownMenu.on('click.fu.selectlist', 'a', $.proxy(this._handleMenuItemSelected, this));
		this.elements.input.on('change.fu.selectlist', $.proxy(this._handleChanged, this));
		if (!this.isBootstrap3) this.elements.inputGroup.on('keydown.fu.selectlist', $.proxy(this._handleKeyDown, this));
		this.elements.inputGroup.on('keypress.fu.selectlist', $.proxy(this._handleKeyPressed, this));
	},

	_render () {
		const selection = this._getSelection();

		// Get the template
		const $el = this.template.clone();
		const elements = this._initElements($el, this.elements);

		// Configure the button
		const disabled = !!this.getProperty('disabled');
		elements.button.prop('disabled', disabled);
		elements.button.toggleClass(this.cssClasses.DISABLED, disabled);

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
		$el.toggleClass(this.cssClasses.DISABLED, disabled);

		if (this.elements.wrapper.is('div')) {
			this.elements.wrapper.attr('class', $el.attr('class'));
			this.elements.wrapper.append($el.children());
		} else {
			this.elements.wrapper.append($el);
			this.elements.wrapper = $el;
		}

		this.rendered = true;
	},

	_onExpandOrCollapse () {
		if (this.rendered) {
			const isOpen = this.getState('isOpen');
	
			this.elements.button.attr('aria-expanded', isOpen);
			this.elements.inputGroup.toggleClass(this.cssClasses.OPEN, isOpen);
		}
	},

	_onSelected (item) {
		if (this.rendered) {
			this.elements.input.val(item.getText());
		}
	},

	_onEnabledOrDisabled () {
		if (this.rendered) {
			const disabled = !!this.getProperty('disabled');
			
			this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, disabled);
			this.elements.input.prop('disabled', disabled);
			this.elements.button.prop('disabled', disabled);
			this.elements.button.toggleClass(this.cssClasses.DISABLED, disabled);
		}
	},

	_resetWidth (width) {
		if (this.rendered) {
			this.elements.dropdownMenu.width(width);
		}
	},

	_handleChanged () {
		const value = {};

		value[this.accessors.textProp()] = this.elements.input.val();

		this.setSelection(value);
	}
});

Lib.merge(Combobox.prototype, ComboboxCore, Events, State, ComboboxObject);


Combobox = Lib.runHelpers('jquery', CONTROL, Combobox, {
	legacyMethods
});

export default Combobox;
