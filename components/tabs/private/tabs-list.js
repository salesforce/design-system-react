"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # Tabs Component
// Implements the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.
// ## Dependencies
// ### React
// ### classNames
var TabsList = function TabsList(_ref) {
  var id = _ref.id,
      className = _ref.className,
      children = _ref.children,
      variant = _ref.variant;
  return _react2.default.createElement("ul", {
    id: "".concat(id, "-slds-tabs__nav"),
    className: (0, _classnames2.default)(className, {
      'slds-tabs--default__nav': variant === 'default',
      'slds-tabs--scoped__nav': variant === 'scoped'
    }),
    role: "tablist"
  }, children);
};

TabsList.displayName = _constants.TABS_LIST;
TabsList.propTypes = {
  /**
   * Inherits the `id` from the parent `<Tabs />` component and appends `-tabs__nav`. Becomes the HTML `id` attribute of UL element that has the class `.slds-tabs--default__nav` on it.
   */
  id: _propTypes2.default.string,

  /**
   * Class names to be added to the tabs list element.
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * The `children` are the actual tabs to be rendered as `li` elements. They get created by [tabs/index.jsx](./index.jsx) in the `renderTabsList` function.
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),

  /**
   * If the Tabs should be scopped, defaults to false
   */
  variant: _propTypes2.default.oneOf(['default', 'scoped'])
};
exports.default = TabsList;