// SELECTLIST CONTROL - JQUERY FACADE

// Core
import Lib from '../../core/lib';
import SelectlistCore, {CONTROL} from '../../core/selectlist';

// Framework specific
import createPlugin from '../createPlugin';
// TO-DO: This might not work with require, need to confirm that it does
const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

// Template imports
const fs = require('fs');

const Selectlist = function Selectlist (element, options) {
	this.options = $.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	if (options.collection) {
		this.rendered = false;
	} else {
		this.__initElements(this.elements.wrapper, this.elements);

		this.__buildCollection(options);

		this.rendered = true;
	}

	this.__constructor(options);
};

Lib.extend(Selectlist.prototype, SelectlistCore, {
	__initElements (base, elements) {
		const els = elements || {};

		els.button = base.find('.' + this.cssClasses.TOGGLE);
		els.hiddenField = base.find('.' + this.cssClasses.HIDDEN);
		els.label = base.find('.' + this.cssClasses.LABEL);
		els.dropdownMenu = base.find('.' + this.cssClasses.MENU);

		return els;
	},

	__buildCollection (options) {
		const opts = options || {};
		opts.collection = [];

		this.elements.dropdownMenu.find('li').each(function buildCollectionElements () {
			const $item = $(this);
			const item = $item.data();

			if (!item.name) {
				item.name = $item.text().trim();
			}

			if (item.selected) {
				delete item.selected;
				opts.selection = item;
			}

			if ($item.is('.disabled, :disabled')) {
				item.disabled = true;
			}

			if ($item.hasClass('dropdown-header')) {
				item._itemType = 'header';
			} else if ($item.hasClass('divider')) {
				item._itemType = 'divider';
			} else {
				item._itemType = 'item';
			}

			$item.data(item);
			opts.collection.push(item);
		});
	},

	onInitialized () {
		if (!this.rendered) {
			this.render();
		}

		this.elements.wrapper.on('click.fu.selectlist', '.dropdown-menu a', $.proxy(this.handleClicked, this));
		this.elements.wrapper.on('keypress.fu.selectlist', $.proxy(this.handleKeyPress, this));
	},

	render () {
		// Prep for append
		this.elements.wrapper.empty();
		this.elements.wrapper.toggleClass(this.cssClasses.CONTROL, true);
		this.elements.wrapper.toggleClass(this.cssClasses.BTN_GROUP, true);

		const selection = this.getSelection();

		const width = this.__getState('width');
		const disabled = !!this.__getState('disabled');
		const selectionName = Lib.getProp(selection, 'name') || 'None selected'; // TO-DO: don't hardcode this here
		const selectionString = selection ? JSON.stringify(selection) : '';

		const $html = $('<i />').append(fs.readFileSync(__dirname + '/selectlist.html', 'utf8'));
		const elements = this.__initElements($html, this.elements);

		// Yay for hacked-together "templates"!
		elements.button.prop('disabled', disabled);
		elements.button.width(width);
		elements.label.text(selectionName);
		elements.hiddenField.val(selectionString);
		elements.dropdownMenu.width(width);

		const self = this;
		// Building the menu items
		this._collection.forEach(function buildMenuItems (item) {
			let $li;
			switch (item._itemType) {
			case 'header':
				$li = self.renderHeader(item);
				break;
			case 'divider':
				$li = self.renderDivider(item);
				break;
			case 'item':
			default:
				$li = self.renderItem(item);
			}
			elements.dropdownMenu.append($li);
		});

		this.elements.wrapper.append($html.children());

		this.rendered = true;
	},

	renderItem (data) {
		let $a;
		let disabled;
		let $li;

		$a = $('<a href="#" />');
		$a.text(Lib.getProp(data, 'name'));

		disabled = !!Lib.getProp(data, 'disabled');
		$li = $('<li />');
		$li.data(data);
		$li.toggleClass('disabled', disabled);
		$li.prop('disabled', disabled);
		$li.append($a);

		return $li;
	},

	renderHeader (data) {
		const $li = $('<li class="dropdown-header"></li>');
		$li.data(data);
		$li.text(Lib.getProp(data, 'name'));

		return $li;
	},

	renderDivider (data) {
		const $li = $('<li role="separator" class="divider"></li>');
		$li.data(data);

		return $li;
	},

	destroy () {
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	},

	onSelected (data) {
		if (!this.elements.hiddenField
			|| !this.elements.label) {
			return;
		}

		// TO-DO: clearly this isn't the best way to reset the text to "None selected"
		this.elements.hiddenField.val(JSON.stringify(data) || '');
		this.elements.label.text(Lib.getProp(data, 'name') || 'None selected');

		this.elements.wrapper.trigger('changed.fu.selectlist', data);
	},

	onEnabled () {
		if (!this.elements.button) {
			return;
		}

		this.elements.button.prop('disabled', false);
	},

	onDisabled () {
		if (!this.elements.button) {
			return;
		}

		this.elements.button.prop('disabled', true);
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

	handleClicked (e) {
		e.preventDefault();

		const $li = $(e.currentTarget).parent('li');

		this.setSelection($li.data());
	},

	handleKeyPress (e) {
		const key = e.which;

		if (key) this.__jumpToLetter(key);
	}
});

// LEGACY METHODS

const legacyMethods = {
	selectedItem () {
		return this.getSelection();
	},

	selectByValue (value) {
		return this.setSelection({ value: value });
	},

	selectByText (name) {
		return this.setSelection({ name: name });
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
