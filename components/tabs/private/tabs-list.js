"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

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
  return /*#__PURE__*/_react.default.createElement("ul", {
    id: "".concat(id, "-slds-tabs__nav"),
    className: (0, _classnames.default)(className, {
      'slds-tabs_default__nav': variant === 'default',
      'slds-tabs_scoped__nav': variant === 'scoped',
      'slds-vertical-tabs__nav': variant === 'vertical'
    }),
    role: "tablist",
    "aria-orientation": variant === 'vertical' ? 'vertical' : undefined
  }, children);
};

TabsList.displayName = _constants.TABS_LIST;
TabsList.propTypes = {
  /**
   * Inherits the `id` from the parent `<Tabs />` component and appends `-tabs__nav`. Becomes the HTML `id` attribute of UL element that has the class `.slds-tabs_default__nav` on it.
   */
  id: _propTypes.default.string,

  /**
   * Class names to be added to the tabs list element.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The `children` are the actual tabs to be rendered as `li` elements. They get created by [tabs/index.jsx](./index.jsx) in the `renderTabsList` function.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),

  /**
   * If the Tabs should be scoped, vertical, or default (default value)
   */
  variant: _propTypes.default.oneOf(['default', 'scoped', 'vertical'])
};
var _default = TabsList;
exports.default = _default;