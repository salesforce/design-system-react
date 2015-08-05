// SELECTLIST CONTROL - JQUERY FACADE

// Core
import Lib from '../../core/lib';
import SelectlistCore, {CONTROL} from '../../core/selectlist';

// Framework specific
import createPlugin from '../createPlugin';
// TO-DO: This might not work with require, need to confirm that it does
var $ = window.$;

// Template imports
var fs = require('fs');

var Selectlist = function (element, options) {
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

Object.assign(Selectlist.prototype, SelectlistCore, {
	__initElements (base, elements) {
		elements = elements || {};
		
		elements.button = base.find('.' + this._cssClasses.TOGGLE);
		elements.hiddenField = base.find('.' + this._cssClasses.HIDDEN);
		elements.label = base.find('.' + this._cssClasses.LABEL);
		elements.dropdownMenu = base.find('.' + this._cssClasses.MENU);
		
		return elements;
	},
	
	__buildCollection (options) {
		options = options || {};
		options.collection = [];
		
		this.elements.dropdownMenu.find('li').each(function () {
			var $item = $(this);
			var item = $item.data();
			
			if (!item.name) {
				item.name = $item.text().trim();
			}
			
			if (item.selected) {
				delete item.selected;
				options.selection = item;
			}
			
			if ($item.is('.disabled, :disabled')) {
				item.disabled = true;
			}
			
			$item.data(item);
			options.collection.push(item);
		});
	},
	
	onInitialized (options) {
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
		var selectionName = Lib.getProp(selection, 'name') || 'None selected'; // TO-DO: don't hardcode this here
		var selectionString = selection ? JSON.stringify(selection) : '';
		
		var $html = $('<i />').append(fs.readFileSync(__dirname + '/selectlist.html', 'utf8'));
		var elements = this.__initElements($html, this.elements);
		
		// Yay for hacked-together "templates"!
		elements.button.prop('disabled', disabled);
		elements.button.width(width);
		elements.label.text(selectionName);
		elements.hiddenField.val(selectionString);
		elements.dropdownMenu.width(width);
		
		// Building the menu items
		this._collection.forEach(function(item) {
			var $a = $('<a href="#" />');
			$a.text(Lib.getProp(item, 'name'));
			
			var disabled = !!Lib.getProp(item, 'disabled');
			var $li = $('<li />');
			$li.data(item);
			$li.toggleClass('disabled', disabled);
			$li.prop('disabled', disabled);
			$li.append($a);
			
			elements.dropdownMenu.append($li);
		});

		this.elements.wrapper.append($html.children());
		
		this.rendered = true;
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
		
		var $li = $(e.currentTarget).parent('li');

		this.setSelection($li.data());
	},
	
	handleKeyPress (e) {
		var key = e.which;
		if (key) this.__jumpToLetter(key);
	}
});

// LEGACY METHODS

var legacyMethods = {
	selectedItem: function () {
		return this.getSelection();
	},
	
	selectByValue: function (value) {
		return this.setSelection({ value: value });
	},
	
	selectByText: function (name) {
		return this.setSelection({ name: name });
	},
	
	selectBySelector: function (selector) {
		var $item = $(selector);
		return this.setSelection($item.data());
	},
	
	selectByIndex: function (index) {
		if (!Lib.isNumber(index)) {
			index = parseInt(index, 10);
		}
		return this.setSelectionByIndex(index);
	}
};

createPlugin(CONTROL, Selectlist, legacyMethods);

export default Selectlist;