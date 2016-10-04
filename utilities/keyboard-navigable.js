'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.KeyboardNavigableMixin = undefined;
exports.KeyBuffer = KeyBuffer;
exports.itemIsSelectable = itemIsSelectable;
exports.getNavigableItems = getNavigableItems;
exports.keyboardNavigate = keyboardNavigate;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash.escaperegexp');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isarray');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.isfunction');

var _lodash6 = _interopRequireDefault(_lodash5);

var _KEYS = require('./KEYS');

var _KEYS2 = _interopRequireDefault(_KEYS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ### isFunction


// ### escapeRegExp
var noop = function noop() {};

// ### Event Helpers


// ### isArray
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Keyboard Navigable Trait

// ## Dependencies

// ### React
function KeyBuffer() {
	var _this = this;

	this.buffer = '';

	return function (key) {
		if (_this.timeout) {
			clearTimeout(_this.timeout);
			_this.timeout = undefined;
		}

		_this.timeout = setTimeout(function () {
			_this.buffer = '';
		}, 400);

		_this.buffer = _this.buffer + key;
		return _this.buffer;
	};
}

function itemIsSelectable(item) {
	return item.type !== 'header' && item.type !== 'divider' && !item.disabled;
}

function getNavigableItems(items) {
	var navigableItems = [];
	navigableItems.indexes = [];
	navigableItems.keyBuffer = new KeyBuffer();

	if ((0, _lodash4.default)(items)) {
		items.forEach(function (item, index) {
			if (itemIsSelectable(item)) {
				navigableItems.push({
					index: index,
					text: ('' + item.label).toLowerCase()
				});

				navigableItems.indexes.push(index);
			}
		});
	}

	return navigableItems;
}

function keyboardNavigate(_ref) {
	var currentFocusedIndex = _ref.currentFocusedIndex;
	var isOpen = _ref.isOpen;
	var key = _ref.key;
	var keyCode = _ref.keyCode;
	var navigableItems = _ref.navigableItems;
	var onFocus = _ref.onFocus;
	var onSelect = _ref.onSelect;
	var toggleOpen = _ref.toggleOpen;

	var indexes = navigableItems.indexes;
	var lastIndex = indexes.length - 1;
	var focusedIndex = undefined;
	var ch = key || String.fromCharCode(keyCode);

	if (/^[ -~]$/.test(ch)) {
		ch = ch.toLowerCase();
	} else {
		ch = null;
	}

	if (keyCode === _KEYS2.default.ESCAPE) {
		if (isOpen) toggleOpen();
	} else if (!isOpen) {
		focusedIndex = indexes[0];
		if (keyCode === _KEYS2.default.ENTER || keyCode === _KEYS2.default.SPACE || keyCode === _KEYS2.default.DOWN || keyCode === _KEYS2.default.TAB || ch) toggleOpen();
	} else if (keyCode === _KEYS2.default.ENTER || keyCode === _KEYS2.default.SPACE) {
		onSelect(currentFocusedIndex);
	} else {
		var navigableIndex = indexes.indexOf(currentFocusedIndex);

		if (keyCode === _KEYS2.default.DOWN) {
			if (navigableIndex < lastIndex) {
				focusedIndex = indexes[++navigableIndex];
			} else {
				focusedIndex = indexes[0];
			}
		} else if (keyCode === _KEYS2.default.UP) {
			if (navigableIndex > 0) {
				focusedIndex = indexes[--navigableIndex];
			} else {
				focusedIndex = indexes[lastIndex];
			}
		} else if (ch) {
			(function () {
				// Combine subsequent keypresses
				var pattern = navigableItems.keyBuffer(ch);
				var consecutive = 0;

				// Support for navigating to the next option of the same letter with repeated presses of the same key
				if (pattern.length > 1 && new RegExp('^[' + (0, _lodash2.default)(ch) + ']+$').test(pattern)) {
					consecutive = pattern.length;
				}

				navigableItems.forEach(function (item) {
					if (focusedIndex === undefined && item.text.substr(0, pattern.length) === pattern || consecutive > 0 && item.text.substr(0, 1) === ch) {
						consecutive--;
						focusedIndex = item.index;
					}
				});
			})();
		}
	}

	onFocus(focusedIndex);

	return focusedIndex;
}

function getMenu(componentRef) {
	return _reactDom2.default.findDOMNode(componentRef).querySelector('ul.dropdown__list');
}

function getMenuItem(menuItemId) {
	var context = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

	var menuItem = void 0;

	if (menuItemId) {
		menuItem = context.getElementById(menuItemId);
	}

	return menuItem;
}

var KeyboardNavigableMixin = exports.KeyboardNavigableMixin = {
	componentWillMount: function componentWillMount() {
		this.navigableItems = getNavigableItems(this.props.options);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.options) {
			this.navigableItems = getNavigableItems(nextProps.options);
		}
	},


	// Handling open / close toggling is optional, and a default implementation is provided for handling focus, but selection _must_ be handled
	handleKeyboardNavigate: function handleKeyboardNavigate(_ref2) {
		var _ref2$isOpen = _ref2.isOpen;
		var isOpen = _ref2$isOpen === undefined ? true : _ref2$isOpen;
		var keyCode = _ref2.keyCode;
		var _ref2$onFocus = _ref2.onFocus;
		var onFocus = _ref2$onFocus === undefined ? this.handleKeyboardFocus : _ref2$onFocus;
		var onSelect = _ref2.onSelect;
		var _ref2$toggleOpen = _ref2.toggleOpen;
		var toggleOpen = _ref2$toggleOpen === undefined ? noop : _ref2$toggleOpen;

		keyboardNavigate({
			currentFocusedIndex: this.state.focusedIndex,
			isOpen: isOpen,
			keyCode: keyCode,
			navigableItems: this.navigableItems,
			onFocus: onFocus,
			onSelect: onSelect,
			toggleOpen: toggleOpen
		});
	},


	// This is a bit of an anti-pattern, but it has the upside of being a nice default. Component authors can always override to only set state and do their own focusing in their subcomponents.
	handleKeyboardFocus: function handleKeyboardFocus(focusedIndex) {
		if (this.state.focusedIndex !== focusedIndex) this.setState({ focusedIndex: focusedIndex });

		var menu = (0, _lodash6.default)(this.getMenu) ? this.getMenu() : getMenu(this);

		var menuItem = (0, _lodash6.default)(this.getMenuItem) ? this.getMenuItem(focusedIndex, menu) : getMenuItem(this.getListItemId(focusedIndex));

		if (menuItem) {
			this.focusMenuItem(menuItem);
			this.scrollToMenuItem(menu, menuItem);
		}
	},
	getListItemId: function getListItemId(index) {
		var menuItemId = void 0;

		if (index !== undefined) {
			var menuId = (0, _lodash6.default)(this.getId) ? this.getId() : this.props.id;
			menuItemId = menuId + '-item-' + index;
		}

		return menuItemId;
	},
	focusMenuItem: function focusMenuItem(menuItem) {
		menuItem.getElementsByTagName('a')[0].focus();
	},
	scrollToMenuItem: function scrollToMenuItem(menu, menuItem) {
		if (menu && menuItem) {
			var menuHeight = menu.offsetHeight;

			var menuTop = menu.scrollTop;
			var menuItemTop = menuItem.offsetTop - menu.offsetTop;

			if (menuItemTop < menuTop) {
				menu.scrollTop = menuItemTop;
			} else {
				var menuBottom = menuTop + menuHeight + menu.offsetTop;
				var menuItemBottom = menuItemTop + menuItem.offsetHeight + menu.offsetTop;

				if (menuItemBottom > menuBottom) {
					menu.scrollTop = menuItemBottom - menuHeight - menu.offsetTop;
				}
			}
		}
	}
};

exports.default = KeyboardNavigableMixin;