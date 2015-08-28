// COMBOBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../core/lib';
import ComboboxCore, {CONTROL} from '../../core/combobox';

// Framework specific
import createPlugin from '../createPlugin';
import Events from '../events';
import State from '../state';
import { SelectlistObject, _renderItem, _renderHeader, _renderDivider, legacyMethods } from '../selectlist/selectlist';

const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

// Template imports
const fs = require('fs');

const Combobox = function Combobox (element, options) {
	this.options = Lib.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

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

function _render () {
	const selection = this._getSelection();
	const width = this.getState('width');
	const disabled = !!this.getProperty('disabled');

	// Get the template
	const $html = $('<i />').append(fs.readFileSync(__dirname + '/combobox.html', 'utf8'));
	const elements = this._initElements($html, this.elements);
	
	// Prep for append
	elements.wrapper.empty();
	elements.wrapper.toggleClass(this.cssClasses.CONTROL, true);
	elements.wrapper.toggleClass(this.cssClasses.INPUT_APPEND, true);
	elements.wrapper.toggleClass(this.cssClasses.INPUT_GROUP, true);
	elements.wrapper.toggleClass(this.cssClasses.DISABLED, disabled);

	elements.button.prop('disabled', disabled);
	elements.button.toggleClass(this.cssClasses.DISABLED, disabled);
	elements.button.prop('disabled', disabled);
	elements.input.val(selection.getText());
	elements.dropdownMenu.width(width);
	
	this._onExpandOrCollapse();

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

	elements.wrapper.append($html.children());

	this.rendered = true;
}

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

	_onInitialized () {
		if (!this.rendered) {
			_render.call(this);
		}
		
		// Get the menu items for keyboard nav
		this.elements.menuItems = [];
		const menuItems = this.elements.dropdownMenu[0].getElementsByTagName('li');
		
		for (let i = 0; i < menuItems.length; i++) {
			const menuItem = menuItems[i].getElementsByTagName('a');
			
			if (!menuItems[i].disabled && menuItem.length === 1) {
				this.elements.menuItems.push(menuItem[0]);
			}
		}

		if (!this.isBootstrap3) this.elements.wrapper.on('click.fu.selectlist', '.' + this.cssClasses.TOGGLE, $.proxy(this._handleClicked, this));
		this.elements.wrapper.on('click.fu.selectlist', '.' + this.cssClasses.MENU + ' a', $.proxy(this._handleMenuItemSelected, this));
		if (!this.isBootstrap3) this.elements.inputGroup.on('keydown.fu.selectlist', $.proxy(this._handleKeyDown, this));
		this.elements.inputGroup.on('keypress.fu.selectlist', $.proxy(this._handleKeyPressed, this));
		
		this._closeMenu = $.proxy(this._closeMenu, this);
		if (!this.isBootstrap3) document.addEventListener('click', this._closeMenu, false);
	},
	
	_onExpandOrCollapse () {
		const isOpen = this.getState('isOpen');
		
		this.elements.button.prop('aria-expanded', isOpen);
		this.elements.inputGroup.toggleClass(this.cssClasses.OPEN, isOpen);
	},

	_onSelected (item) {
		this.elements.input.val(item.getText());
	},

	_onEnabled () {
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, false);
		this.elements.input.prop('disabled', false);
		this.elements.button.prop('disabled', false);
		this.elements.button.toggleClass(this.cssClasses.DISABLED, false);
	},

	_onDisabled () {
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, true);
		this.elements.input.prop('disabled', true);
		this.elements.button.prop('disabled', true);
		this.elements.button.toggleClass(this.cssClasses.DISABLED, true);
	},

	resetWidth (width) {
		if (this.elements.dropdownMenu) this.elements.dropdownMenu.width(width);
	}
});

Lib.merge(Combobox.prototype, ComboboxCore, Events, State, ComboboxObject);

createPlugin(CONTROL, Combobox, legacyMethods);

export default Combobox;
