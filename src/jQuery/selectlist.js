import {SelectlistCore} from '../SelectlistCore';
import $ from '../../node_modules/jquery/dist/jquery';

var old = $.fn.selectlist;
var collection = {};
var wrapper;

export class Selectlist extends SelectlistCore {
	onBeforeInitialize (collection, options) {
		this.elements.wrapper = wrapper;
		this.options = lu.extend({}, options);

		this.elements.button = this.elements.wrapper.find('.btn.dropdown-toggle');
		this.elements.dropdownMenu = this.elements.wrapper.find('.dropdown-menu');
		this.elements.hiddenField = this.elements.wrapper.find('.hidden-field');
		this.elements.label = this.elements.wrapper.find('.selected-label');
		this.selectedItemEl = null;

		this.elements.wrapper.on('click.fu.selectlist', '.dropdown-menu a', $.proxy(this.itemClicked, this));
	}
	
	itemClicked (e) {
		e.preventDefault();
		
		// Find the item id so that we can select the item
	}
	
	resize () {
		var width = 0;
		var newWidth = 0;
		var sizer = $('<div/>').addClass('selectlist-sizer');


		if (Boolean($(document).find('html').hasClass('fuelux'))) {
			// default behavior for fuel ux setup. means fuelux was a class on the html tag
			$(document.body).append(sizer);
		} else {
			// fuelux is not a class on the html tag. So we'll look for the first one we find so the correct styles get applied to the sizer
			$('.fuelux:first').append(sizer);
		}

		sizer.append(this.elements.wrapper.clone());

		this.elements.wrapper.find('a').each(function () {
			sizer.find('.selected-label').text($(this).text());
			newWidth = sizer.find('.selectlist').outerWidth();
			newWidth = newWidth + sizer.find('.sr-only').outerWidth();
			if (newWidth > width) {
				width = newWidth;
			}
		});

		if (width <= 1) {
			return;
		}

		this.elements.button.css('width', width);
		this.elements.dropdownMenu.css('width', width);

		sizer.remove();
	}
};

$.fn.selectlist = function (option) {
	var args = Array.prototype.slice.call(arguments, 1);
	var methodReturn;

	var $set = this.each(function () {
		var $this = $(this);
		var data = $this.data('landmark.selectlist');
		var options = typeof option === 'object' && option;
		
		wrapper = $this; // temp hack

		if (!data) {
			$this.data('landmark.selectlist', (data = new Selectlist(collection, options)));
		}

		if (typeof option === 'string') {
			methodReturn = data[option].apply(data, args);
		}
	});

	return (methodReturn === undefined) ? $set : methodReturn;
};

$.fn.selectlist.noConflict = function () {
	$.fn.selectlist = old;
	return this;
};

$(document).on('mousedown.landmark.selectlist.data-api', '[data-initialize=selectlist]', function (e) {
	var $control = $(e.target).closest('.selectlist');
	if (!$control.data('landmark.selectlist')) {
		$control.selectlist($control.data());
	}
});

// Must be domReady for AMD compatibility
$(function () {
	$('[data-initialize="selectlist"]').each(function () {
		var $this = $(this);
		if (!$this.data('landmark.selectlist')) {
			$this.selectlist($this.data());
		}
	});
});