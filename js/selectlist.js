// UMD wrapper
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['landmark/core', 'landmark/dropdown'], factory);
	} else if ( typeof exports === 'object' ) {
		// Node/CommonJS
		module.exports = factory(require('landmark/core'), require('landmark/dropdown'));
	} else {
		// Browser globals
		factory(this.landmark);
	}
}(this, function (landmark) {

	if (typeof landmark !== 'object' || !landmark.controls || !landmark.controls.dropdown) {
		throw new Error('landmark core and landmark dropdown control must be included prior to landmark selectlist control');
	}

// -- BEGIN MODULE CODE HERE -- //

	landmark.controls = landmark.controls || {};

	// Module vars
	var lu = landmark.utilities;

	// Constructor and defaults

	landmark.controls.selectlist = {
		Constructor: function (element, options) {
			this.element = element;
			this.options = lu.extend({}, landmark.controls.dropdown.defaults, options);

			this.button = element.querySelector('.btn.dropdown-toggle');
			this.dropdownMenu = element.querySelector('.dropdown-menu');
			this.hiddenField = element.querySelector('.hidden-field');
			this.label = element.querySelector('.selected-label');
			this.selectedItemEl = null;

			var self = this;
			element.addEventListener('click', function (e) {
				if(e.target.nodeName === 'A' && lu.hasClass(e.target.parentNode.parentNode, 'dropdown-menu')) {
					self.itemClicked(e);
				}
			});
			this.setDefaultSelection();

			if (options.resize === 'auto' || element.getAttribute('data-resize') === 'auto') {
				this.resize();
			}
		},

		defaults: {}
	};

	// Public methods

	landmark.controls.selectlist.Constructor.prototype = {

		constructor: landmark.controls.selectlist.Constructor,

		destroy: function () {
			lu.remove(this.element);

			return this.element.outerHTML;
		},

		doSelect: function (item) {
			var selectedItemEl;
			this.selectedItemEl = selectedItemEl = item;

			this.hiddenField.value = this.selectedItemEl.getAttribute('data-value');
			this.label.innerHTML = (this.selectedItemEl.childNodes.length) ? this.selectedItemEl.childNodes[0].innerHTML : '';

			var items = this.dropdownMenu.querySelectorAll('li');
			for (var i = 0, l = items.length; i < l; i++) {
				if (selectedItemEl === items[i]) {
					items[i].setAttribute('data-selected', 'true');
				} else {
					items[i].removeAttribute('data-selected');
				}
			}
		},

		itemClicked: function (e) {
			lu.trigger(this.element, 'custom', 'clicked.fu.selectlist', { selectedItem: this.selectedItemEl });

			e.preventDefault();

			// is clicked element different from currently selected element?
			if (!(e.target.parentNode === this.selectedItemEl)) {
				this.itemChanged(e);
			}

			// return focus to control after selecting an option
			this.button.focus();
		},

		itemChanged: function (e) {
			//selectedItem needs to be <li> since the data is stored there, not in <a>
			this.doSelect(e.target.parentNode);

			// pass object including text and any data-attributes to onchange event
			var data = this.selectedItem();

			// trigger changed event
			lu.trigger(this.element, 'custom', 'changed.landmark.selectlist', data);
		},

		resize: function () {
			//var width = 0;
			//var newWidth = 0;
			//var sizer = $('<div/>').addClass('selectlist-sizer');
			//
			//
			//if (Boolean($(document).find('html').hasClass('fuelux'))) {
			//	// default behavior for fuel ux setup. means fuelux was a class on the html tag
			//	$(document.body).append(sizer);
			//} else {
			//	// fuelux is not a class on the html tag. So we'll look for the first one we find so the correct styles get applied to the sizer
			//	$('.fuelux:first').append(sizer);
			//}
			//
			//sizer.append(this.$element.clone());
			//
			//this.$element.find('a').each(function () {
			//	sizer.find('.selected-label').text($(this).text());
			//	newWidth = sizer.find('.selectlist').outerWidth();
			//	newWidth = newWidth + sizer.find('.sr-only').outerWidth();
			//	if (newWidth > width) {
			//		width = newWidth;
			//	}
			//});
			//
			//if (width <= 1) {
			//	return;
			//}
			//
			//this.$button.css('width', width);
			//this.$dropdownMenu.css('width', width);
			//
			//sizer.remove();
		},

		selectedItem: function () {
			var txt = this.selectedItemEl.textContent;

			return lu.extend({
				test: txt
			}, lu.data(this.selectedItemEl));
		},

		selectByText: function (text) {
			var item = null;
			var items = this.dropdownMenu.querySelectorAll('li');

			for (var i = 0, l = items.length; i < l; i++) {
				if ((items[i].textContent || '').toLowerCase() === (text || '').toLowerCase()) {
					item = items[i];
					break;
				}
			}

			if (item) { this.doSelect(item); }
		},

		selectByValue: function (value) {
			var selector = 'li[data-value="' + value + '"]';
			this.selectBySelector(selector);
		},

		selectByIndex: function (index) {
			var selector = 'li:eq(' + index + ')';	// zero-based index
			this.selectBySelector(selector);
		},

		selectBySelector: function (selector) {	//TODO: override in jQuery plugin for better query selection?
			var item = this.dropdownMenu.querySelector(selector);
			this.doSelect(item);
		},

		setDefaultSelection: function () {
			var item = this.dropdownMenu.querySelector('li[data-selected=true]');

			if (!item) {
				item = this.dropdownMenu.querySelector('li a').parentNode;
			}

			this.doSelect(item);
		},

		enable: function () {
			lu.removeClass(this.element, 'disabled');
			lu.removeClass(this.button, 'disabled');
		},

		disable: function () {
			lu.addClass(this.element, 'disabled');
			lu.addClass(this.element, 'disabled');
		}

	};

	// Private methods

	return landmark.controls.selectlist;

// -- END MODULE CODE HERE -- //
}));
