"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
// ### isFunction
var handleClick = function handleClick(event, props) {
  if (!props.item.url) {
    event.preventDefault();
  }

  if ((0, _lodash.default)(props.onSelect)) {
    props.onSelect(event, {
      item: props.item
    });
  }
};

var Item = function Item(props) {
  return /*#__PURE__*/_react.default.createElement("li", {
    className: (0, _classnames.default)('slds-nav-vertical__item', {
      'slds-is-active': props.isSelected
    })
  }, /*#__PURE__*/_react.default.createElement("a", {
    "data-id": props.item.id,
    href: props.item.url || '#',
    className: "slds-nav-vertical__action",
    "aria-describedby": props.categoryId,
    "aria-current": props.isSelected ? true : undefined,
    onClick: function onClick(event) {
      handleClick(event, props);
    }
  }, props.item.icon ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.cloneElement(props.item.icon, {
    className: (0, _classnames.default)(props.item.icon.props.className, "slds-m-right_".concat(props.item.icon.props.size || 'medium'))
  }), props.item.label) : props.item.label, props.item.notificationBadge ? /*#__PURE__*/_react.default.cloneElement(props.item.notificationBadge, {
    className: (0, _classnames.default)(props.item.notificationBadge.props.className, 'slds-col_bump-left')
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null)));
}; // ### Display Name
// Always use the canonical component name as the React display name.


Item.displayName = _constants.VERTICAL_NAVIGATION_ITEM; // ### Prop Types

Item.propTypes = {
  /**
   * Item to be rendered.
   */
  item: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    label: _propTypes.default.string.isRequired,
    url: _propTypes.default.string
  }),

  /**
   * Whether item is selected or not.
   */
  isSelected: _propTypes.default.bool,

  /**
   * ID of the category this item belongs to.
   */
  categoryId: _propTypes.default.string.isRequired,

  /**
   * Function that will run whenever an item is selected.
   */
  onSelect: _propTypes.default.func
};
Item.defaultProps = {
  isSelected: false
};
var _default = Item;
exports.default = _default;