import Landmark from '../landmark';
import SelectlistCore from '../core/selectlist';
import $ from 'jquery';

var old = $.fn.selectlist;

// SELECT CONSTRUCTOR AND PROTOTYPE

var Selectlist = function (element, options) {
	this.options = $.extend({}, $.fn.selectlist.defaults, options);
	this.elements = {
		wrapper: $(element)
	};
	
	if (options.collection) {
		this.rendered = false;
	} else {
		this.rendered = true;
		// TO-DO: Build options.collection from the HTML
	}
	
	this.__constructor(options);
};

Object.assign(Selectlist.prototype, SelectlistCore, {
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
		if (!this.rendered) return;
		
		this.elements.hiddenField.val(JSON.stringify(data));
		this.elements.label.text(data.name);
		
		this.elements.wrapper.trigger('changed.fu.selectlist', data);
	},

	onInitialized (options) {
		if (!this.rendered) {
			this.render();
		}
		
		// TO-DO: These should all be in the cssClasses of course
		this.elements.button = this.elements.wrapper.find('.btn.dropdown-toggle');
		this.elements.hiddenField = this.elements.wrapper.find('.hidden-field');
		this.elements.label = this.elements.wrapper.find('.selected-label');
		this.elements.dropdownMenu = this.elements.wrapper.find('.dropdown-menu');
	
		this.elements.wrapper.on('click.fu.selectlist', '.dropdown-menu a', $.proxy(this.itemClicked, this));
	},
	
	render () {
		// Prep for append
		this.elements.wrapper.empty();
		this.elements.wrapper.toggleClass(this.cssClasses.CONTROL, true);
		this.elements.wrapper.toggleClass(this.cssClasses.BTN_GROUP, true);
		
		// TO-DO: Actually render this HTML from a template
		var html = '<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">' +
					'			<span class="selected-label">&nbsp;</span>' +
					'			<span class="caret"></span>' +
					'			<span class="sr-only">Toggle Dropdown</span>' +
					'		</button>' +
					'		<ul class="dropdown-menu" role="menu">' +
					'			<li data-value="1"><a href="#">One</a>' +
					'			</li>' +
					'			<li data-value="2"><a href="#">Two</a>' +
					'			</li>' +
					'			<li data-selected="true" data-value="3"><a href="#">Three</a>' +
					'			</li>' +
					'			<li data-value="4"><a href="#">Buzz</a>' +
					'			</li>' +
					'			<li data-value="Item Five" data-foo="bar" data-fizz="buzz"><a href="#">Item Five</a>' +
					'			</li>' +
					'			<li class="disabled" disabled="disabled" data-value="disabled"><a href="#">Disabled item</a>' +
					'			</li>' +
					'		</ul>' +
					'		<input class="hidden hidden-field" name="mySelectlist" readonly="readonly" aria-hidden="true" type="text" />';

		this.elements.wrapper.append(html);
		this.rendered = true;
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
	emptyLabelHTML: '<li data-value=""><a href="#">No items</a></li>'
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
