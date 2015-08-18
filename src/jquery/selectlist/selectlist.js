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
		this._initElements(this.elements.wrapper, this.elements);

		this._buildCollection(this.options);

		this.rendered = true;
	}
	
	this._initializeState();
	this._initialize(this.options);
};

function _renderItem (item) {
	let $a;
	let disabled;
	let $li;

	$a = $('<a href="#" />');
	$a.text(item.get('text'));

	disabled = !!item.get('disabled');
	$li = $('<li />');
	$li.data(item.get());
	$li.toggleClass('disabled', disabled);
	$li.prop('disabled', disabled);
	$li.append($a);

	return $li;
}

function _renderHeader (item) {
	const $li = $('<li class="dropdown-header"></li>');
	$li.text(item.get('text'));

	return $li;
}

function _renderDivider () {
	const $li = $('<li role="separator" class="divider"></li>');

	return $li;
}

function _render () {
	// Prep for append
	this.elements.wrapper.empty();
	this.elements.wrapper.toggleClass(this.cssClasses.CONTROL, true);
	this.elements.wrapper.toggleClass(this.cssClasses.BTN_GROUP, true);

	const selection = Lib.getItemAdapter(this.getSelection());
	const width = this.getState('width');
	const disabled = !!this.getStore('disabled');
	const selectionName = selection.get('text') || 'None selected'; // TO-DO: don't hardcode this here
	const selectionString = selection ? JSON.stringify(selection) : '';
	const $html = $('<i />').append(fs.readFileSync(__dirname + '/selectlist.html', 'utf8'));
	const elements = this._initElements($html, this.elements);

	// Yay for hacked-together "templates"!
	elements.button.prop('disabled', disabled);
	elements.button.toggleClass(this.cssClasses.DISABLED, disabled);
	elements.button.width(width);
	elements.label.text(selectionName);
	elements.hiddenField.val(selectionString);
	elements.dropdownMenu.width(width);

	const self = this;
	// Building the menu items
	this._collection.forEach(function buildMenuItems (item) {
		let $li;
		let func;
		const funcMap = {
			header: _renderHeader,
			divider: _renderDivider,
			item: _renderItem
		};

		func = funcMap[item.get('_itemType')] || _renderItem;

		$li = func.call(self, item);

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

		return els;
	},

	_buildCollection (options) {
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

			if ($item.hasClass('dropdown-header')) {
				item._itemType = 'header';
			} else if ($item.hasClass('divider')) {
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

		this.elements.wrapper.on('click.fu.selectlist', '.dropdown-menu a', $.proxy(this._handleClicked, this));
		this.elements.wrapper.on('keypress.fu.selectlist', $.proxy(this._handleKeyPress, this));
	},

	destroy () {
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	},

	_onSelected (data) {
		const _data = Lib.getItemAdapter(data);

		if (!this.elements.hiddenField
			|| !this.elements.label) {
			return;
		}

		// TO-DO: clearly this isn't the best way to reset the text to "None selected"
		this.elements.hiddenField.val(JSON.stringify(data) || '');
		this.elements.label.text(_data.get('text') || 'None selected');
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
		e.preventDefault();

		const $a = $(e.currentTarget);
		const $li = $a.parent('li');

		if (!$li.hasClass(this.cssClasses.DISABLED)) {
			this.setSelection($li.data());
		}
	},

	_handleKeyPress (e) {
		const key = e.which;

		if (key) this._jumpToLetter(key);
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
		return this.setSelection(function (item) {
			const itemText = item && item.get('text');

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
