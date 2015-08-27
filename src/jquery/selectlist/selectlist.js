// SELECTLIST CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../core/lib';
import SelectlistCore, {CONTROL} from '../../core/selectlist';

// Framework specific
import createPlugin from '../createPlugin';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

// Template imports
const fs = require('fs');

const Selectlist = function Selectlist (element, options) {
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

function _renderItem (item) {
	const disabled = item.getDisabled();
	let $a;
	let $li;

	$a = $('<a href="#" />');
	$a.text(item.getText());

	$li = $('<li />');
	$li.data(item.get());
	$li.toggleClass(this.cssClasses.DISABLED, disabled);
	$li.prop('disabled', disabled);
	$li.append($a);

	return $li;
}

function _renderHeader (item) {
	const $li = $('<li class="' + this.cssClasses.HEADER + '"></li>');
	$li.text(item.getText());

	return $li;
}

function _renderDivider () {
	const $li = $('<li role="separator" class="' + this.cssClasses.DIVIDER + '"></li>');

	return $li;
}

function _render () {
	const strings = this.getState('strings');
	
	// Prep for append
	this.elements.wrapper.empty();
	this.elements.wrapper.toggleClass(this.cssClasses.CONTROL, true);
	this.elements.wrapper.toggleClass(this.cssClasses.BTN_GROUP, true);

	const selection = this._getSelection();
	const width = this.getState('width');
	const disabled = !!this.getProperty('disabled');
	const selectionName = selection.getText() || strings.NONE_SELECTED;
	const selectionString = selection ? JSON.stringify(selection) : '';
	const $html = $('<i />').append(fs.readFileSync(__dirname + '/selectlist.html', 'utf8'));
	const elements = this._initElements($html, this.elements);

	elements.button.prop('disabled', disabled);
	elements.button.toggleClass(this.cssClasses.DISABLED, disabled);
	elements.button.width(width);
	elements.label.text(selectionName);
	elements.hiddenField.val(selectionString);
	elements.dropdownMenu.width(width);
	elements.srOnly.text(strings.TOGGLE_DROPDOWN);
	
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

	this.elements.wrapper.append($html.children());

	this.rendered = true;
}

Lib.merge(Selectlist.prototype, SelectlistCore, Events, State, {
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
		if (!this.isBootstrap3) this.elements.wrapper.on('keydown.fu.selectlist', $.proxy(this._handleKeyDown, this));
		this.elements.wrapper.on('keypress.fu.selectlist', $.proxy(this._handleKeyPressed, this));
		
		this._closeMenu = $.proxy(this._closeMenu, this);
		if (!this.isBootstrap3) document.addEventListener('click', this._closeMenu, false);
	},

	destroy () {
		if (!this.isBootstrap3) document.removeEventListener('click', this._closeMenu, false);
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	},
	
	_onExpandOrCollapse () {
		const isOpen = this.getState('isOpen');
		
		this.elements.button.prop('aria-expanded', isOpen);
		this.elements.wrapper.toggleClass(this.cssClasses.OPEN, isOpen);
	},

	_onSelected (item) {
		const strings = this.getState('strings');
		
		if (!this.elements.hiddenField
			|| !this.elements.label) {
			return;
		}

		this.elements.hiddenField.val(JSON.stringify(item._item) || '');
		this.elements.label.text(item.getText() || strings.NONE_SELECTED);
	},
	
	_closeMenu (e) {
		if (e.originator !== this) {
			this.setState({
				isOpen: false
			});
			
			this._onExpandOrCollapse();
		}
	},

	_onEnabled () {
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, false);
		
		if (this.elements.button) {
			this.elements.button.prop('disabled', false);
			this.elements.button.toggleClass(this.cssClasses.DISABLED, false);
		}
	},

	_onDisabled () {
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, true);
		
		if (this.elements.button) {
			this.elements.button.prop('disabled', true);
			this.elements.button.toggleClass(this.cssClasses.DISABLED, true);
		}
	},

	resetWidth (width) {
		if (!this.elements.button
			|| !this.elements.dropdownMenu) {
			return;
		}

		// TO-DO: Test this. And will this work to remove the style as well?
		this.elements.button.width(width);
		this.elements.dropdownMenu.width(width);
	},

	_handleClicked (e) {
		const disabled = !!this.getProperty('disabled');
		e.originalEvent.originator = this;
		
		if (!disabled) {
			this.setState({
				isOpen: !this.getState('isOpen')
			});
			
			this._onExpandOrCollapse();
		}
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
			this._onExpandOrCollapse();
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
			this._onExpandOrCollapse();
		}
	}
});

// LEGACY METHODS

const legacyMethods = {
	selectedItem () {
		let selection = this.getSelection();

		if (selection) {
			if (Lib.isFunction(selection.toJSON)) {
				selection = selection.toJSON();
			} else {
				selection = Lib.extend({}, selection);
			}

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

createPlugin(CONTROL, Selectlist, legacyMethods);

export default Selectlist;
