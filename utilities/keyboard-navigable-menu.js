"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardNavigableMixin = undefined;
exports.itemIsSelectable = itemIsSelectable;
exports.getNavigableItems = getNavigableItems;

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

var _keyBuffer = require("./key-buffer");

var _keyBuffer2 = _interopRequireDefault(_keyBuffer);

var _keyboardNavigate = require("./keyboard-navigate");

var _keyboardNavigate2 = _interopRequireDefault(_keyboardNavigate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # Keyboard Navigable mixin (deprecated. DO NOT USE)
// ### isFunction
// ### Event Helpers

/* eslint-disable react/no-find-dom-node */
var noop = function noop() {};

function itemIsSelectable(item) {
  return item.type !== 'header' && item.type !== 'divider' && !item.disabled;
}

function getNavigableItems(items) {
  var navigableItems = [];
  navigableItems.indexes = [];
  navigableItems.keyBuffer = new _keyBuffer2.default();

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
  handleKeyboardNavigate: function handleKeyboardNavigate(_ref) {
    var event = _ref.event,
        _ref$isOpen = _ref.isOpen,
        isOpen = _ref$isOpen === void 0 ? true : _ref$isOpen,
        keyCode = _ref.keyCode,
        _ref$onFocus = _ref.onFocus,
        onFocus = _ref$onFocus === void 0 ? this.handleKeyboardFocus : _ref$onFocus,
        onSelect = _ref.onSelect,
        target = _ref.target,
        _ref$toggleOpen = _ref.toggleOpen,
        toggleOpen = _ref$toggleOpen === void 0 ? noop : _ref$toggleOpen;
    (0, _keyboardNavigate2.default)({
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

    var menu = (0, _lodash2.default)(this.getMenu) ? this.getMenu() : getMenu(this);
    var menuItem = (0, _lodash2.default)(this.getMenuItem) ? this.getMenuItem(focusedIndex, menu) : getMenuItem(this.getListItemId(focusedIndex));

    if (menuItem) {
      this.focusMenuItem(menuItem);
      this.scrollToMenuItem(menu, menuItem);
    }
  },
  getListItemId: function getListItemId(index) {
    var menuItemId;

    if (index !== undefined) {
      var menuId = (0, _lodash2.default)(this.getId) ? this.getId() : this.props.id;
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