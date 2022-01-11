"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../../icon"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # FIlter List Heading
// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1
// ## Dependencies
// ### React
// ### classNames
// ## Constants

/**
 * A filtering panel contextual filtering options.
 */
var PanelFilterListHeading = function PanelFilterListHeading(_ref) {
  var heading = _ref.heading,
      isLocked = _ref.isLocked,
      lockedHeading = _ref.lockedHeading;
  return /*#__PURE__*/_react.default.createElement("h3", {
    className: (0, _classnames.default)('slds-text-body_small', 'slds-m-vertical_x-small', {
      'slds-grid': isLocked
    })
  }, isLocked ? lockedHeading : heading, isLocked ? /*#__PURE__*/_react.default.createElement(_icon.default, {
    className: "slds-m-left_x-small",
    assistiveText: {
      label: 'locked'
    },
    category: "utility",
    name: "lock",
    size: "x-small"
  }) : null);
};

PanelFilterListHeading.displayName = _constants.PANEL_FILTER_LIST_HEADING;
PanelFilterListHeading.propTypes = {
  /**
   * Heading for following PanelFilterList
   */
  heading: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),

  /**
   * Displayed a heading for a locked list of filters
   */
  isLocked: _propTypes.default.bool,

  /**
   * Heading for a group of filters that are locked
   */
  lockedHeading: _propTypes.default.string
};
PanelFilterListHeading.defaultProps = {
  heading: 'Matching all these filters',
  lockedHeading: 'Locked filters'
};
var _default = PanelFilterListHeading;
exports.default = _default;