// SELECTLIST CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import SelectlistCore, {CONTROL} from '../../core/selectlist';

// Framework specific
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

// Template imports
import template from './selectlist-template';

let Selectlist = function Selectlist (element, options) {
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

export function _renderItem (item) {
	const disabled = item.getDisabled();
	const $li = this.template.find('li').clone();

	$li.data(item.get());
	$li.toggleClass(this.cssClasses.DISABLED, disabled);
	$li.prop('disabled', disabled);

	const $a = $li.find('a');
	$a.text(item.getText());

	return $li;
}

export function _renderHeader (item) {
	const $li = this.template.find('li').clone().empty();

	$li.toggleClass(this.cssClasses.HEADER, true);
	$li.text(item.getText());

	return $li;
}

export function _renderDivider () {
	const $li = this.template.find('li').clone().empty();

	$li.toggleClass(this.cssClasses.DIVIDER, true);
	$li.prop('role', 'separator');

	return $li;
}

export const SelectlistObject = {
	_initElements (base, elements) {
		const els = elements || {};

		els.button = base.find('.' + this.cssClasses.TOGGLE);
		els.hiddenField = base.find('.' + this.cssClasses.HIDDEN);
		els.label = base.find('.' + this.cssClasses.LABEL);
		els.dropdownMenu = base.find('.' + this.cssClasses.MENU);
		els.srOnly = base.find('.' + this.cssClasses.SR_ONLY);

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
			this._render();
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

		this._bindUIEvents();

		this._closeOnClick = $.proxy(this._closeOnClick, this);
		if (!this.isBootstrap3) document.addEventListener('click', this._closeOnClick, false);
		
		// For tests, will consider publishing later
		this.trigger('rendered', this.elements.wrapper);
	},

	_bindUIEvents () {
		if (!this.isBootstrap3) this.elements.button.on('click.fu.selectlist', $.proxy(this._handleClicked, this));
		this.elements.dropdownMenu.on('click.fu.selectlist', 'a', $.proxy(this._handleMenuItemSelected, this));
		if (!this.isBootstrap3) this.elements.wrapper.on('keydown.fu.selectlist', $.proxy(this._handleKeyDown, this));
		this.elements.wrapper.on('keypress.fu.selectlist', $.proxy(this._handleKeyPressed, this));
	},

	_render () {
		const strings = this.getState('strings');
		const selection = this._getSelection();

		// Get the template
		const $el = this.template.clone();
		const elements = this._initElements($el, this.elements);

		// Configure the button
		const disabled = !!this.getProperty('disabled');
		elements.button.prop('disabled', disabled);
		elements.button.toggleClass(this.cssClasses.DISABLED, disabled);

		// Add the localized string for screen readers
		elements.srOnly.text(strings.TOGGLE_DROPDOWN);

		// Show the current selection if there is one
		const selectionName = selection.getText() || strings.NONE_SELECTED;
		elements.label.text(selectionName);
		elements.hiddenField.val(selection.getText());

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

	destroy () {
		if (!this.isBootstrap3) document.removeEventListener('click', this._closeOnClick, false);
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	},

	_onExpandOrCollapse () {
		if (this.rendered) {
			const isOpen = this.getState('isOpen');

			this.elements.wrapper.toggleClass(this.cssClasses.OPEN, isOpen);
			this.elements.button.attr('aria-expanded', isOpen);
		}
	},

	_onSelected (item) {
		if (this.rendered) {
			const strings = this.getState('strings');

			this.elements.hiddenField.val(item.getText());
			this.elements.label.text(item.getText() || strings.NONE_SELECTED);
		}
	},

	_onEnabledOrDisabled () {
		if (this.rendered) {
			const disabled = !!this.getProperty('disabled');
			
			this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, disabled);
			this.elements.button.prop('disabled', disabled);
			this.elements.button.toggleClass(this.cssClasses.DISABLED, disabled);
		}
	},

	resetWidth (width) {
		if (this.rendered) {
			this.elements.button.width(width);
			this.elements.dropdownMenu.width(width);
		}
	},

	_handleClicked (e) {
		this._openToggleEvent(e.originalEvent);
	},

	_handleMenuItemSelected (e) {
		e.preventDefault();

		const $a = $(e.currentTarget);
		const $li = $a.parent('li');

		if (!$li.hasClass(this.cssClasses.DISABLED)) {
			this.setSelection($li.data());
		}
	},

	_handleKeyDown (e) {
		let key;

		if (/(38)/.test(e.which)) {
			key = 'ArrowUp';
		} else if (/(40)/.test(e.which)) {
			key = 'ArrowDown';
		}

		if (key) {
			e.preventDefault();
			this._keyboardNav(key, this.elements.menuItems);
		}
	},

	_handleKeyPressed (e) {
		const key = String.fromCharCode(e.which);

		if (this.isBootstrap3) {
			this.setState({
				isOpen: this.elements.wrapper.hasClass(this.cssClasses.OPEN)
			});
		}

		if (key && key.length === 1) {
			e.preventDefault();
			this._keyboardNav(key, this.elements.menuItems);
		}
	}
};

Lib.merge(Selectlist.prototype, SelectlistCore, Events, State, SelectlistObject);

// LEGACY METHODS

export const legacyMethods = {
	selectedItem () {
		let selection = this._getSelection();

		if (selection) {
			selection = Lib.extend({}, selection.get());

			selection.selected = true;
			delete selection._itemType;
		}

		return selection;
	},

	selectByValue (value) {
		return this.setSelection({ value: value });
	},

	selectByText (text) {
		return this.setSelection(item => {
			const itemText = item && item.getText();

			return item && Lib.isString(itemText) && Lib.isString(text) && itemText.toLowerCase() === text.toLowerCase();
		});
	},

	selectBySelector (selector) {
		const $item = $(selector);
		return this.setSelection($item.data());
	},

	selectByIndex (index) {
		let i = index;

		if (!Lib.isNumber(i)) {
			i = parseInt(index, 10);
		}
		return this.setSelectionByIndex(i);
	}
};

Selectlist = Lib.runHelpers('jquery', CONTROL, Selectlist, {
	legacyMethods
});

export default Selectlist;
