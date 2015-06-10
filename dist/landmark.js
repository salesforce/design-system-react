/*!
 * Landmark JS POC v0.0.1 
 */

// UMD wrapper
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory();
	} else {
		// Browser globals
		root.landmark = factory();
	}
}(this, function () {

	// Create landmark core object
	var landmark = {
		controls: {},
		utilities: {},
		version: '0.0.1'
	};

	(function (landmark) {

		landmark.controls = landmark.controls || {};

		landmark.controls.selectlist = function (element, options) {
			//this.$element = $(element);
			//this.options = $.extend({}, $.fn.selectlist.defaults, options);
			//
			//this.$button = this.$element.find('.btn.dropdown-toggle');
			//this.$hiddenField = this.$element.find('.hidden-field');
			//this.$label = this.$element.find('.selected-label');
			//this.$dropdownMenu = this.$element.find('.dropdown-menu');
			//
			//this.$element.on('click.fu.selectlist', '.dropdown-menu a', $.proxy(this.itemClicked, this));
			//this.setDefaultSelection();
			//
			//if (options.resize === 'auto' || this.$element.attr('data-resize') === 'auto') {
			//	this.resize();
			//}
		};

		landmark.controls.selectlist.prototype = {

			constructor: landmark.controls.selectlist,

			//destroy: function () {
			//	this.$element.remove();
			//	// any external bindings
			//	// [none]
			//	// empty elements to return to original markup
			//	// [none]
			//	// returns string of markup
			//	return this.$element[0].outerHTML;
			//},
			//
			//doSelect: function ($item) {
			//	var $selectedItem;
			//	this.$selectedItem = $selectedItem = $item;
			//
			//	this.$hiddenField.val(this.$selectedItem.attr('data-value'));
			//	this.$label.html($(this.$selectedItem.children()[0]).html());
			//
			//	// clear and set selected item to allow declarative init state
			//	// unlike other controls, selectlist's value is stored internal, not in an input
			//	this.$element.find('li').each(function () {
			//		if ($selectedItem.is($(this))) {
			//			$(this).attr('data-selected', true);
			//		} else {
			//			$(this).removeData('selected').removeAttr('data-selected');
			//		}
			//	});
			//},
			//
			//itemClicked: function (e) {
			//	this.$element.trigger('clicked.fu.selectlist', this.$selectedItem);
			//
			//	e.preventDefault();
			//
			//	// is clicked element different from currently selected element?
			//	if (!($(e.target).parent().is(this.$selectedItem))) {
			//		this.itemChanged(e);
			//	}
			//
			//	// return focus to control after selecting an option
			//	this.$element.find('.dropdown-toggle').focus();
			//},
			//
			//itemChanged: function (e) {
			//	//selectedItem needs to be <li> since the data is stored there, not in <a>
			//	this.doSelect($(e.target).closest('li'));
			//
			//	// pass object including text and any data-attributes
			//	// to onchange event
			//	var data = this.selectedItem();
			//	// trigger changed event
			//	this.$element.trigger('changed.fu.selectlist', data);
			//},
			//
			//resize: function () {
			//	var width = 0;
			//	var newWidth = 0;
			//	var sizer = $('<div/>').addClass('selectlist-sizer');
			//
			//
			//	if (Boolean($(document).find('html').hasClass('fuelux'))) {
			//		// default behavior for fuel ux setup. means fuelux was a class on the html tag
			//		$(document.body).append(sizer);
			//	} else {
			//		// fuelux is not a class on the html tag. So we'll look for the first one we find so the correct styles get applied to the sizer
			//		$('.fuelux:first').append(sizer);
			//	}
			//
			//	sizer.append(this.$element.clone());
			//
			//	this.$element.find('a').each(function () {
			//		sizer.find('.selected-label').text($(this).text());
			//		newWidth = sizer.find('.selectlist').outerWidth();
			//		newWidth = newWidth + sizer.find('.sr-only').outerWidth();
			//		if (newWidth > width) {
			//			width = newWidth;
			//		}
			//	});
			//
			//	if (width <= 1) {
			//		return;
			//	}
			//
			//	this.$button.css('width', width);
			//	this.$dropdownMenu.css('width', width);
			//
			//	sizer.remove();
			//},
			//
			//selectedItem: function () {
			//	var txt = this.$selectedItem.text();
			//	return $.extend({
			//		text: txt
			//	}, this.$selectedItem.data());
			//},
			//
			//selectByText: function (text) {
			//	var $item = $([]);
			//	this.$element.find('li').each(function () {
			//		if ((this.textContent || this.innerText || $(this).text() || '').toLowerCase() === (text || '').toLowerCase()) {
			//			$item = $(this);
			//			return false;
			//		}
			//	});
			//	this.doSelect($item);
			//},
			//
			//selectByValue: function (value) {
			//	var selector = 'li[data-value="' + value + '"]';
			//	this.selectBySelector(selector);
			//},
			//
			//selectByIndex: function (index) {
			//	// zero-based index
			//	var selector = 'li:eq(' + index + ')';
			//	this.selectBySelector(selector);
			//},
			//
			//selectBySelector: function (selector) {
			//	var $item = this.$element.find(selector);
			//	this.doSelect($item);
			//},
			//
			//setDefaultSelection: function () {
			//	var $item = this.$element.find('li[data-selected=true]').eq(0);
			//
			//	if ($item.length === 0) {
			//		$item = this.$element.find('li').has('a').eq(0);
			//	}
			//
			//	this.doSelect($item);
			//},
			//
			//enable: function () {
			//	this.$element.removeClass('disabled');
			//	this.$button.removeClass('disabled');
			//},
			//
			//disable: function () {
			//	this.$element.addClass('disabled');
			//	this.$button.addClass('disabled');
			//}
		};

		return landmark.controls.selectlist;

	}(landmark));

	return landmark;
}));