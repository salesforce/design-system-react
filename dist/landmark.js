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
	var landmark = (function () {
		function addClass(element, classNames) {
			classNames = classNames.split(' ');
			for (var i = 0, l = classNames.length; i < l; i++) {
				if (!hasClass(element, classNames[i])) {
					element.className = element.className.trim() + ' ' + classNames[i];
				}
			}
		}

		function allKeys(obj) {
			if (!isObject(obj)) {
				return [];
			}
			var keys = [];
			for (var key in obj) {
				keys.push(key);
			}
			return keys;
		}

		function extend(obj) {
			var length = arguments.length;
			if (length < 2 || obj == null) {
				return obj;
			}
			for (var index = 1; index < length; index++) {
				var source = arguments[index];
				var keys = allKeys(source);
				for (var i = 0, l = keys.length; i < l; i++) {
					var key = keys[i];
					obj[key] = source[key];
				}
			}
			return obj;
		}

		function data(element) {
			var attr = element.attributes;
			var data = {};
			var exp = /^data\-/;
			for (var i = 0, l = attr.length; i < l; i++) {
				if (attr[i].nodeName.match(exp) !== null) {
					data[attr[i].nodeName.replace(exp, '')] = attr[i].value;
				}
			}
			return data;
		}

		function hasClass(element, className) {
			return (element.className.match(new RegExp('\\b' + className + '\\b')) !== null);
		}

		function isObject(obj) {
			var type = typeof obj;
			return type === 'function' || type === 'object' && !! obj;
		}

		function proxy(fn, context) {
			var slice = Array.prototype.slice;
			var args = slice.call(arguments, 2);
			return function () {
				return fn.apply(context || this, slice.call(arguments).concat(args));
			};
		}

		function remove(elements) {
			if (!elements) {
				return;
			}
			elements = (elements.length === undefined) ? [elements] : elements;
			for (var i = 0, l = elements.length; i < l; i++) {
				var parent = elements[i].parentNode;
				parent.removeChild(elements[i]);
			}
		}

		function removeClass(element, classNames) {
			classNames = classNames.split(' ');
			for (var i = 0, l = classNames.length; i < l; i++) {
				element.className = element.className.replace(new RegExp('\\b' + classNames[i] + '\\b'), '');
			}
			if (element.className.trim() === '') {
				element.removeAttribute('class');
			}
		}

		function trigger(element, eventType, eventName, details) {
			var evt, type;

			//will need to expand on this to support more event types
			switch (eventType) {
			case 'click':
			case 'mousedown':
			case 'mouseup':
				type = 'MouseEvent';
				break;
			case 'custom':
			default:
				type = 'CustomEvent';
				break;
			}

			//using older ways of creating events since IE doesn't support event constructors
			evt = document.createEvent(type);
			if (type !== 'CustomEvent') {
				evt.initEvent(eventType, true, true);
			} else {
				evt.initCustomEvent(eventName, true, true, details);
			}

			element.dispatchEvent(evt);
			return evt;
		}

		return {
			controls: {},
			utilities: {
				addClass: addClass,
				allKeys: allKeys,
				data: data,
				extend: extend,
				hasClass: hasClass,
				isObject: isObject,
				proxy: proxy,
				remove: remove,
				removeClass: removeClass,
				trigger: trigger
			},
			version: '0.0.1'
		};
	}());


	(function (landmark) {

		landmark.controls = landmark.controls || {};

		// Module vars
		var lu = landmark.utilities;

		// Constructor and defaults
		landmark.controls.dropdown = {
			Constructor: function (element, options) {
				this.element = element;
				this.options = lu.extend({}, landmark.controls.dropdown.defaults, options);

				this.element.addEventListener('click', this.toggleMenu);
			},

			defaults: {}
		};

		// Public methods
		landmark.controls.dropdown.Constructor.prototype = {

			constructor: landmark.controls.dropdown.Constructor,

			clearMenus: function (e) {
				if (e && e.which === 3) {
					return;
				}

				var i, l, parent, relatedTarget, toggleElements;

				lu.remove(document.querySelectorAll('.dropdown-backdrop'));
				toggleElements = document.querySelectorAll('[data-toggle="dropdown"]');
				for (i = 0, l = toggleElements.length; i < l; i++) {
					parent = getParent(toggleElements[i]);
					relatedTarget = {
						relatedTarget: toggleElements[i]
					};

					if (!lu.hasClass(parent, 'open')) {
						continue;
					}

					if (e && e.type === 'click' && /input|textarea/i.test(e.target.tagName) && contains(parent, e.target)) {
						continue;
					}

					e = lu.trigger(parent, 'custom', 'hide.landmark.dropdown', relatedTarget);

					if (e.defaultPrevented) {
						continue;
					}

					toggleElements[i].setAttribute('aria-expanded', 'false');
					lu.removeClass(parent, 'open');

					lu.trigger(parent, 'custom', 'hidden.landmark.dropdown', relatedTarget);
				}
			},

			keydown: function (e) {
				if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) {
					return;
				}
				var element = e.currentTarget;

				e.preventDefault();
				e.stopPropagation();

				if (lu.hasClass(element, 'disabled') || element.getAttribute('disabled') !== null) {
					return;
				}

				var parent = getParent(element);
				var isActive = lu.hasClass(parent, 'open');

				if (!isActive && e.which != 27 || isActive && e.which == 27) {
					if (e.which == 27) {
						var toggle = parent.querySelector('[data-toggle="dropdown"]');
						if (toggle) {
							toggle.focus();
						}
					}
					return lu.trigger(element, 'click');
				}

				var items = Array.prototype.slice.call(parent.querySelectorAll('.dropdown-menu li:not(.disabled) a'), 0);

				var index = -1;
				for (var i = 0; i < items.length; i++) {
					if (items[i].style.display !== 'none' && items[i].style.visibility !== 'hidden') {
						if (items[i] === e.target) {
							index = i;
						}
					} else {
						items.splice(i, 1);
						i--;
					}
				}

				if (!items.length) {
					return;
				}

				if (e.which == 38 && index > 0) {
					index--;
				} // up
				if (e.which == 40 && index < items.length - 1) {
					index++;
				} // down
				if (index < 0) {
					index = 0;
				}

				items[index].focus();
			},

			toggleMenu: function (e) {
				var element = e.target;

				if (lu.hasClass(element, 'disabled') || element.getAttribute('disabled') !== null) {
					return;
				}

				var parent = getParent(element);
				var isActive = lu.hasClass(parent, 'open');

				landmark.controls.dropdown.Constructor.prototype.clearMenus();

				if (!isActive) {
					if ('ontouchstart' in document.documentElement && !parent.querySelector('.navbar-nav')) {
						var backdrop = document.createElement('div');
						backdrop.className += 'dropdown-backdrop';
						if (element.nextSibling) {
							parent.insertBefore(backdrop, element.nextSibling);
						} else {
							parent.appendChild(backdrop);
						}
						backdrop.addEventListener('click', landmark.controls.dropdown.clearMenus);
					}

					var relatedTaret = {
						relatedTarget: this
					};
					e = lu.trigger(parent, 'custom', 'show.landmark.dropdown', relatedTaret);

					if (e.defaultPrevented) {
						return;
					}

					element.focus();
					element.setAttribute('aria-expanded', 'true');

					if (lu.hasClass(parent, 'open')) {
						lu.removeClass(parent, 'open');
					} else {
						lu.addClass(parent, 'open');
					}
					lu.trigger(parent, 'custom', 'shown.landmark.dropdown', relatedTaret);
				}

				return false;
			}

		};

		// Private methods

		function contains(container, element) {
			var i, l;
			if (container.childNodes.length > 0) {
				for (i = 0, l = container.childNodes.length; i < l; i++) {
					if (container.childNodes[i] === element) {
						return true;
					} else if (contains(container.childNodes[i], element)) {
						return true
					}
				}
			}
			return false;
		}

		function getParent(element) {
			var selector = element.getAttribute('data-target');

			if (!selector) {
				selector = element.getAttribute('href');
				selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
			}

			var parent = selector && document.querySelector(selector);

			return (parent) ? parent : element.parentNode;
		}

		return landmark.controls.dropdown;

	}(landmark));


	(function (landmark) {

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
					if (e.target.nodeName === 'A' && lu.hasClass(e.target.parentNode.parentNode, 'dropdown-menu')) {
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
				lu.trigger(this.element, 'custom', 'clicked.fu.selectlist', {
					selectedItem: this.selectedItemEl
				});

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
					if (tmp) {
						tmp.appendChild(sizer);
					}
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

				if (item) {
					this.doSelect(item);
				}
			},

			selectByValue: function (value) {
				var selector = 'li[data-value="' + value + '"]';
				this.selectBySelector(selector);
			},

			selectByIndex: function (index) {
				var selector = 'li:eq(' + index + ')'; // zero-based index
				this.selectBySelector(selector);
			},

			selectBySelector: function (selector) { //TODO: override in jQuery plugin for better query selection?
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

	}(landmark));

	return landmark;
}));