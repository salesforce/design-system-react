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
// ### React
// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally joining classNames together."
var CardBody = function CardBody(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('slds-card__body', props.className),
    id: props.id
  }, props.children);
};

CardBody.displayName = _constants.CARD_BODY;
CardBody.propTypes = {
  /**
   * Elements to place in the body.
   */
  children: _propTypes.default.node,

  /**
   * CSS classes to be added to the card.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Set the HTML `id` of the body.
   */
  id: _propTypes.default.string
};
var _default = CardBody;
exports.default = _default;