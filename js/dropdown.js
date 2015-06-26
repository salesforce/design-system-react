// UMD wrapper
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['landmark/core'], factory);
	} else if ( typeof exports === 'object' ) {
		// Node/CommonJS
		module.exports = factory(require('landmark/core'));
	} else {
		// Browser globals
		factory(this.landmark);
	}
}(this, function (landmark) {

	if (typeof landmark !== 'object') {
		throw new Error('landmark core must be included prior to landmark dropdown control');
	}

// -- BEGIN MODULE CODE HERE -- //

	landmark.controls = landmark.controls || {};

	// Module vars
	var lu = landmark.utilities;

	// Constructor and defaults

	landmark.controls.dropdown = {
		Constructor: function (element, options) {
			this.element = element;
			this.options = lu.extend({}, landmark.controls.dropdown.defaults, options);

			this.button = element.querySelector('button.dropdown-toggle');

			this.button.addEventListener('click', lu.proxy(this.toggleMenu, this));
			//var self = this;
			//this.button.addEventListener('click', function(){
			//	self.toggleMenu();
			//	return false;
			//});

			console.log('CONSTRUCTOR');
		},

		defaults: {},

		clearMenus: function (e) {
			if (e && e.which === 3) {
				return;
			}

			var i, l, parent, relatedTarget, toggleElements;

			lu.remove(document.querySelectorAll('.dropdown-backdrop'));
			toggleElements = document.querySelectorAll('[data-toggle="dropdown"]');
			for (i = 0, l = toggleElements.length; i < l; i++) {
				parent = toggleElements[i].parentNode;
				relatedTarget = { relatedTarget: toggleElements[i] };

				if (!lu.hasClass(parent, 'open')) { continue; }

				if (e && e.type === 'click' && /input|textarea/i.test(e.target.tagName) && contains(parent, e.target)) { continue; }

				e = lu.trigger(parent, 'custom', 'hide.landmark.dropdown', relatedTarget);

				if (e.defaultPrevented) { continue; }

				toggleElements[i].setAttribute('aria-expanded', 'false');
				lu.removeClass(parent, 'open');

				lu.trigger(parent, 'custom', 'hidden.landmark.dropdown', relatedTarget);
			}

			console.log('CLEAR MENUS');
		}
	};

	// Public methods

	landmark.controls.dropdown.Constructor.prototype = {

		constructor: landmark.controls.dropdown.Constructor,

		toggleMenu: function (e) {
			if (lu.hasClass(this.element, 'disabled') || this.element.getAttribute('disabled') !== null) { return; }

			var isActive = lu.hasClass(this.element, 'open');

			landmark.controls.dropdown.clearMenus();

			if (!isActive) {
				if ('ontouchstart' in document.documentElement && !this.element.querySelector('.navbar-nav')) {
					var backdrop = document.createElement('div');
					backdrop.className += 'dropdown-backdrop';
					if (backdrop.nextSibling) {
						this.element.parentNode.insertBefore(backdrop, this.element.nextSibling);
					} else {
						this.element.parentNode.appendChild(backdrop);
					}
					backdrop.addEventListener('click', landmark.controls.dropdown.clearMenus);
				}

				var relatedTaret = { relatedTarget: this };
				e = lu.trigger(this.element, 'custom', 'show.landmark.dropdown', relatedTaret);

				if (e.defaultPrevented) { return; }

				lu.trigger(this.button, 'focus');
				this.button.setAttribute('aria-expanded', 'true');

				if(lu.hasClass(this.element, 'open')) {
					lu.removeClass(this.element, 'open');
				} else {
					lu.addClass(this.element, 'open');
				}
				lu.trigger(this.element, 'custom', 'shown.landmark.dropdown', relatedTaret);

				console.log('TOGGLE', this.element, lu.hasClass(this.element, 'open'));
			}

			return false;
		}

	};

	// Private methods

	function contains (container, element) {
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

	//function getParent (element) {
	//	var selector = element.getAttribute('data-target');
	//
	//	if (!selector) {
	//		selector = element.getAttribute('href');
	//		selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
	//	}
	//
	//	var parent = selector && document.querySelector(selector);
	//
	//	return (parent) ? parent : element.parentNode;
	//}

	return landmark.controls.dropdown;

// -- END MODULE CODE HERE -- //
}));
