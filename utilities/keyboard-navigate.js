"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require("lodash.escaperegexp");

var _lodash2 = _interopRequireDefault(_lodash);

var _keyCode = require("./key-code");

var _keyCode2 = _interopRequireDefault(_keyCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var keyboardNavigate = function keyboardNavigate(_ref) {
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

    if (openMenuKeys && componentContext.trigger && // eslint-disable-next-line react/no-find-dom-node
    _reactDom2.default.findDOMNode(componentContext.trigger) === target) {
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
};

exports.default = keyboardNavigate;