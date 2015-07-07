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
			this.options = lu.extend({}, landmark.controls.selectlist.defaults, options);

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

			if (!(e.target.parentNode === this.selectedItemEl)) {
				this.itemChanged(e);
			}

			this.button.focus();
		},

		itemChanged: function (e) {
			this.doSelect(e.target.parentNode);

			var data = this.selectedItem();

			lu.trigger(this.element, 'custom', 'changed.landmark.selectlist', data);
		},

		resize: function () {
			var newWidth = 0;
			var sizer = document.createElement('div');
			var width = 0;
			var tmp;

			sizer.className = 'selectlist-sizer';

			if (lu.hasClass(document.querySelector('html'))) {
				document.querySelector('body').appendChild(sizer);
			} else {
				tmp = document.querySelector('.fuelux');
				if (tmp) { tmp.appendChild(sizer); }
			}

			sizer.innerHTML = this.element.outerHTML;

			var links = this.dropdownMenu.querySelectorAll('a');
			for (var i = 0, l = links.length; i < l; i++) {
				sizer.querySelector('.selected-label').textContent = links[i].textContent;
				newWidth = sizer.querySelector('.selectlist').offsetWidth;
				tmp = sizer.querySelector('.sr-only');
				newWidth += ((tmp) ? tmp.offsetWidth : 0);
				if (newWidth > width) {
					width = newWidth;
				}
			}

			if (width <= 1) {
				return;
			} else {
				width += 'px';
			}

			this.button.style.width = width;
			this.dropdownMenu.style.width = width;

			lu.remove(sizer);
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
