// SELECTLIST CONTROL - JQUERY FACADE

// Core
import Landmark from '../landmark';
import SelectlistCore from '../core/selectlist';

// Framework specific
// TO-DO: This might not work with require, need to confirm that it does
var $ = window.$;

// Template imports
var fs = require('fs');

var old = $.fn.selectlist;

var Selectlist = function (element, options) {
	this.options = $.extend({}, $.fn.selectlist.defaults, options);
	this.elements = {
		wrapper: $(element)
	};
	
	if (options.collection) {
		this.rendered = false;
	} else {
		this.__initElements();
		
		// TO-DO: Build options.collection from the HTML
		
		this.rendered = true;
	}
	
	this.__constructor(options);
};

Object.assign(Selectlist.prototype, SelectlistCore, {
	__initElements () {
		// TO-DO: These should all be in the cssClasses of course
		this.elements.button = this.elements.wrapper.find('.btn.dropdown-toggle');
		this.elements.hiddenField = this.elements.wrapper.find('.hidden-field');
		this.elements.label = this.elements.wrapper.find('.selected-label');
		this.elements.dropdownMenu = this.elements.wrapper.find('.dropdown-menu');
	},
	
	onInitialized (options) {
		if (!this.rendered) {
			this.render();
		}
	
		this.elements.wrapper.on('click.fu.selectlist', '.dropdown-menu a', $.proxy(this.itemClicked, this));
	},
	
	render () {
		// Prep for append
		this.elements.wrapper.empty();
		this.elements.wrapper.toggleClass(this.cssClasses.CONTROL, true);
		this.elements.wrapper.toggleClass(this.cssClasses.BTN_GROUP, true);
		
		var selection = this.getSelection();
		
		var width = this.__getState('width');
		var disabled = !!this.__getState('disabled');
		var selectionName = selection ? selection.name : 'None selected'; // TO-DO: don't hardcode this here
		var selectionString = selection ? JSON.stringify(selection) : '';
		
		var $html = $(fs.readFileSync(__dirname + '/selectlist.html', 'utf8'));
		var $button = $html.find('.btn.dropdown-toggle');
		var $dropdownMenu = $html.find('.dropdown-menu');
		
		// Yay for hacked-together templates!
		// TO-DO: Let's put something better in the Landmark core?
		$button.prop('disabled', disabled);
		$html.find('.selected-label').text(selectionName);
		$html.find('.hidden-field').val(selectionString);
		$dropdownMenu.width(width);
		$button.width(width);
		
		// Building the menu items
		this._collection.forEach(function(item) {
			var $a = $('<a href="#" />');
			$a.text(item.name);
			
			var $li = $('<li />');
			$li.data(item);
			$li.append($a);
			
			$dropdownMenu.append($li);
		});

		// TO-DO: Wrapping the "template" in a div right now and then appending the children. Is there a better way?
		this.elements.wrapper.append($html.children());
		
		this.__initElements();
		
		this.rendered = true;
	},
	
	destroy () {
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	},

	itemClicked (e) {
		e.preventDefault();
		
		var $li = $(e.currentTarget).parent('li');
		
		// Ignore if a disabled item is clicked
		// Note that this feature isn't implemented in any other library yet
		if ($li.is('.disabled, :disabled')) { return; }

		this.setSelection($li.data());

		// Return focus to control after selecting an option
		this.elements.wrapper.find('.dropdown-toggle').focus();
	},

	onSelected (data) {
		if (!this.elements.hiddenField
			|| !this.elements.label) {
			return;
		}
		
		// TO-DO: clearly this isn't the best way to reset the text to "None selected"
		this.elements.hiddenField.val(JSON.stringify(data) || '');
		this.elements.label.text((data && data.name) || 'None selected');
		
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
	}
});

// SELECT PLUGIN DEFINITION

$.fn.selectlist = function (option) {
	var args = Array.prototype.slice.call(arguments, 1);
	var methodReturn;

	var $set = this.each(function () {
		var $this = $(this);
		var data = $this.data('fu.selectlist');

		// If object, this is an initialization, only overwrite options and init if no data exists
		var options = typeof option === 'object' && option;
		if (!data) {
			$this.data('fu.selectlist', (data = new Selectlist(this, options)));
		}

		// If string, this is a method call, and apply with args
		if (typeof option === 'string') {
			methodReturn = data[option].apply(data, args);
		}
	});

	return (methodReturn === undefined) ? $set : methodReturn;
};

// TO-DO: Should this really be here?
$.fn.selectlist.defaults = {
};

$.fn.selectlist.Constructor = Selectlist;

$.fn.selectlist.noConflict = function () {
	$.fn.selectlist = old;
	return this;
};

// DATA-API

$(document).on('mousedown.fu.selectlist.data-api', '[data-initialize=selectlist]', function (e) {
	var $control = $(e.target).closest('.selectlist');
	if (!$control.data('fu.selectlist')) {
		$control.selectlist($control.data());
	}
});

// Must be domReady for AMD compatibility
$(function () {
	$('[data-initialize=selectlist]').each(function () {
		var $this = $(this);
		if (!$this.data('fu.selectlist')) {
			$this.selectlist($this.data());
		}
	});
});

export default Selectlist;