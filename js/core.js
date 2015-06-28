// ---- LANDMARK CORE FILE ---- //

// -- BEGIN MODULE CODE HERE -- //
// UMD wrapper
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if ( typeof exports === 'object' ) {
		// Node/CommonJS
		module.exports = factory();
	} else {
		// Browser globals
		root.landmark = factory();
	}
}(this, function () {

	// Create landmark core object
	var landmark = (function () {
		function addClass (element, classNames) {
			classNames = classNames.split(' ');
			for(var i = 0, l = classNames.length; i < l; i++) {
				if (!hasClass(element, classNames[i])) {
					element.className = element.className.trim() + ' ' + classNames[i];
				}
			}
		}

		function allKeys (obj) {
			if (!isObject(obj)) {
				return [];
			}
			var keys = [];
			for (var key in obj) {
				keys.push(key);
			}
			return keys;
		}

		function extend (obj) {
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

		function data (element) {
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

		function hasClass (element, className) {
			return (element.className.match(new RegExp('\\b' + className + '\\b')) !== null);
		}

		function isObject (obj) {
			var type = typeof obj;
			return type === 'function' || type === 'object' && !!obj;
		}

		function proxy (fn, context) {
			var slice = Array.prototype.slice;
			var args = slice.call(arguments, 2);
			return function() {
				return fn.apply(context || this, slice.call(arguments).concat(args));
			};
		}

		function remove (elements) {
			if (!elements) { return; }
			elements = (elements.length === undefined) ? [elements] : elements;
			for (var i = 0, l = elements.length; i < l; i++) {
				var parent = elements[i].parentNode;
				parent.removeChild(elements[i]);
			}
		}

		function removeClass (element, classNames) {
			classNames = classNames.split(' ');
			for(var i = 0, l = classNames.length; i < l; i++) {
				element.className = element.className.replace(new RegExp('\\b' + classNames[i] + '\\b'), '');
			}
			if (element.className.trim() === '') {
				element.removeAttribute('class');
			}
		}

		function trigger (element, eventType, eventName, details) {
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
			if(type !== 'CustomEvent') {
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

// -- END MODULE CODE HERE -- //
	return landmark;
}));
