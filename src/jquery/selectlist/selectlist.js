// SELECTLIST CONTROL - JQUERY FACADE

// Core
import Lib from '../../core/lib';
import SelectlistCore, {CONTROL} from '../../core/selectlist';

// Framework specific
import createPlugin from '../createPlugin';
// TO-DO: This might not work with require, need to confirm that it does
var $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

// Template imports
var fs = require('fs');

var Selectlist = function Selectlist (element, options) {
	this.options = $.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	if (this.options.collection) {
		this.rendered = false;
	} else {
		this.__initElements(this.elements.wrapper, this.elements);

		this.__buildCollection(this.options);

		this.rendered = true;
	}

	this.__constructor(this.options);
};

Lib.extend(Selectlist.prototype, SelectlistCore, {
	__initElements (base, elements) {
		elements = elements || {};

		elements.button = base.find('.' + this.cssClasses.TOGGLE);
		elements.hiddenField = base.find('.' + this.cssClasses.HIDDEN);
		elements.label = base.find('.' + this.cssClasses.LABEL);
		elements.dropdownMenu = base.find('.' + this.cssClasses.MENU);

		return elements;
	},

	__buildCollection (options) {
		options.collection = [];

		this.elements.dropdownMenu.find('li').each(function () {
			var $item = $(this);
			var item = $item.data();

			if (!item.text) {
				item.text = $item.text().trim();
			}

			if (item.selected) {
				delete item.selected;
				options.selection = item;
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
			options.collection.push(item);
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

		var selection = this.getSelection();

		var width = this.__getState('width');
		var disabled = !!this.__getState('disabled');
		var selectionName = Lib.getProp(selection, 'text') || 'None selected'; // TO-DO: don't hardcode this here
		var selectionString = selection ? JSON.stringify(selection) : '';

		var $html = $('<i />').append(fs.readFileSync(__dirname + '/selectlist.html', 'utf8'));
		var elements = this.__initElements($html, this.elements);

		// Yay for hacked-together "templates"!
		elements.button.prop('disabled', disabled);
		elements.button.toggleClass(this.cssClasses.DISABLED, disabled);
		elements.button.width(width);
		elements.label.text(selectionName);
		elements.hiddenField.val(selectionString);
		elements.dropdownMenu.width(width);

		var self = this;
		// Building the menu items
		this._collection.forEach(function (item) {
			var $li;
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
		var $a;
		var disabled;
		var $li;
		
		$a = $('<a href="#" />');
		$a.text(Lib.getProp(data, 'text'));

		disabled = !!Lib.getProp(data, 'disabled');
		$li = $('<li />');
		$li.data(data);
		$li.toggleClass('disabled', disabled);
		$li.prop('disabled', disabled);
		$li.append($a);

		return $li;
	},

	renderHeader (data) {
		var $li = $('<li class="dropdown-header"></li>');
		$li.data(data);
		$li.text(Lib.getProp(data, 'text'));

		return $li;
	},

	renderDivider (data) {
		var $li = $('<li role="separator" class="divider"></li>');
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
		this.elements.label.text(Lib.getProp(data, 'text') || 'None selected');

		this.elements.wrapper.trigger('changed.fu.selectlist', data);
	},

	onEnabled () {
		if (!this.elements.button) {
			return;
		}

		this.elements.button.prop('disabled', false);
		this.elements.button.toggleClass(this.cssClasses.DISABLED, false);
	},

	onDisabled () {
		if (!this.elements.button) {
			return;
		}

		this.elements.button.prop('disabled', true);
		this.elements.button.toggleClass(this.cssClasses.DISABLED, true);
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
		var $a;
		var $li;
		
		e.preventDefault();

		$a = $(e.currentTarget);
		$li = $a.parent('li');

		if (!$li.hasClass(this.cssClasses.DISABLED)) {
			this.setSelection($li.data());
		}
	},

	handleKeyPress (e) {
		var key = e.which;
		
		if (key) this.__jumpToLetter(key);
	}
});

// LEGACY METHODS

var legacyMethods = {
	selectedItem () {
		var selection = this.getSelection();
		
		if (selection) {
			if (Lib.isFunction(selection.toJSON)) {
				selection = selection.toJSON();
			} else {
				selection = jQuery.extend({}, selection);
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
		// TO-DO: Did this for the test. Was the original really case-insensitive??
		return this.setSelection({ text: new RegExp(text, 'i') });
	},

	selectBySelector (selector) {
		var $item = $(selector);
		return this.setSelection($item.data());
	},

	selectByIndex (index) {
		if (!Lib.isNumber(index)) {
			index = parseInt(index, 10);
		}
		return this.setSelectionByIndex(index);
	}
};

createPlugin(CONTROL, Selectlist, legacyMethods);

export default Selectlist;
