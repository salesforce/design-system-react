"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardNavigableMixin = undefined;
exports.KeyBuffer = KeyBuffer;
exports.itemIsSelectable = itemIsSelectable;
exports.getNavigableItems = getNavigableItems;
exports.keyboardNavigate = keyboardNavigate;

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require("lodash.escaperegexp");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.isfunction");

var _lodash4 = _interopRequireDefault(_lodash3);

var _keyCode = require("./key-code");

var _keyCode2 = _interopRequireDefault(_keyCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # Keyboard Navigable Trait
// ## Dependencies
// ### React
// ### escapeRegExp
// ### isFunction
// ### Event Helpers

/* eslint-disable react/no-find-dom-node */
var noop = function noop() {};

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

  if (Array.isArray(items)) {
    items.forEach(function (item, index) {
      if (itemIsSelectable(item)) {
        navigableItems.push({
          index: index,
          text: "".concat(item.label).toLowerCase()
        });
        navigableItems.indexes.push(index);
      }
    });
  }

  return navigableItems;
}

function keyboardNavigate(_ref) {
  var componentContext = _ref.componentContext,
      currentFocusedIndex = _ref.currentFocusedIndex,
      isOpen = _ref.isOpen,
      event = _ref.event,
      key = _ref.key,
      keyCode = _ref.keyCode,
      navigableItems = _ref.navigableItems,
      onFocus = _ref.onFocus,
      onSelect = _ref.onSelect,
      target = _ref.target,
      toggleOpen = _ref.toggleOpen;
  var indexes = navigableItems.indexes;
  var lastIndex = indexes.length - 1;
  var focusedIndex;
  var ch = key || String.fromCharCode(keyCode);

  if (/^[ -~]$/.test(ch)) {
    ch = ch.toLowerCase();
  } else {
    ch = null;
  }

  var openMenuKeys = keyCode === _keyCode2.default.ENTER || keyCode === _keyCode2.default.SPACE || keyCode === _keyCode2.default.UP;

  if (keyCode === _keyCode2.default.ESCAPE) {
    if (isOpen) toggleOpen();
  } else if (!isOpen) {
    focusedIndex = indexes[0];

    if (openMenuKeys || ch) {
      toggleOpen();
    }

    if (openMenuKeys && componentContext.trigger && _reactDom2.default.findDOMNode(componentContext.trigger) === target) {
      // eslint-disable-line react/no-find-dom-node
      componentContext.handleClick(event);
    }
  } else if (keyCode === _keyCode2.default.ENTER || keyCode === _keyCode2.default.SPACE) {
    onSelect(currentFocusedIndex);
  } else {
    var navigableIndex = indexes.indexOf(currentFocusedIndex);

    if (keyCode === _keyCode2.default.DOWN) {
      if (navigableIndex < lastIndex) {
        var newNavigableIndex = navigableIndex + 1;
        focusedIndex = indexes[newNavigableIndex];
      } else {
        focusedIndex = indexes[0];
      }
    } else if (keyCode === _keyCode2.default.UP) {
      if (navigableIndex > 0) {
        var _newNavigableIndex = navigableIndex - 1;

        focusedIndex = indexes[_newNavigableIndex];
      } else {
        focusedIndex = indexes[lastIndex];
      }
    } else if (ch) {
      // Combine subsequent keypresses
      var pattern = navigableItems.keyBuffer(ch);
      var consecutive = 0; // Support for navigating to the next option of the same letter with repeated presses of the same key

      if (pattern.length > 1 && new RegExp("^[".concat((0, _lodash2.default)(ch), "]+$")).test(pattern)) {
        consecutive = pattern.length;
      }

      navigableItems.forEach(function (item) {
        if (focusedIndex === undefined && item.text.substr(0, pattern.length) === pattern || consecutive > 0 && item.text.substr(0, 1) === ch) {
          consecutive -= 1;
          focusedIndex = item.index;
        }
      });
    }
  }

  onFocus(focusedIndex);
  return focusedIndex;
}

function getMenu(componentRef) {
  return _reactDom2.default.findDOMNode(componentRef).querySelector('ul.dropdown__list'); // eslint-disable-line react/no-find-dom-node
}

function getMenuItem(menuItemId) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var menuItem;

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
    var event = _ref2.event,
        _ref2$isOpen = _ref2.isOpen,
        isOpen = _ref2$isOpen === void 0 ? true : _ref2$isOpen,
        keyCode = _ref2.keyCode,
        _ref2$onFocus = _ref2.onFocus,
        onFocus = _ref2$onFocus === void 0 ? this.handleKeyboardFocus : _ref2$onFocus,
        onSelect = _ref2.onSelect,
        target = _ref2.target,
        _ref2$toggleOpen = _ref2.toggleOpen,
        toggleOpen = _ref2$toggleOpen === void 0 ? noop : _ref2$toggleOpen;
    keyboardNavigate({
      componentContext: this,
      currentFocusedIndex: this.state.focusedIndex,
      event: event,
      isOpen: isOpen,
      keyCode: keyCode,
      navigableItems: this.navigableItems,
      onFocus: onFocus,
      onSelect: onSelect,
      target: target,
      toggleOpen: toggleOpen
    });
  },
  // This is a bit of an anti-pattern, but it has the upside of being a nice default. Component authors can always override to only set state and do their own focusing in their subcomponents.
  handleKeyboardFocus: function handleKeyboardFocus(focusedIndex) {
    if (this.state.focusedIndex !== focusedIndex) {
      this.setState({
        focusedIndex: focusedIndex
      });
    }

    var menu = (0, _lodash4.default)(this.getMenu) ? this.getMenu() : getMenu(this);
    var menuItem = (0, _lodash4.default)(this.getMenuItem) ? this.getMenuItem(focusedIndex, menu) : getMenuItem(this.getListItemId(focusedIndex));

    if (menuItem) {
      this.focusMenuItem(menuItem);
      this.scrollToMenuItem(menu, menuItem);
    }
  },
  getListItemId: function getListItemId(index) {
    var menuItemId;

    if (index !== undefined) {
      var menuId = (0, _lodash4.default)(this.getId) ? this.getId() : this.props.id;
      menuItemId = "".concat(menuId, "-item-").concat(index);
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