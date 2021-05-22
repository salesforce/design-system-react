"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _controls = _interopRequireDefault(require("../controls"));

var _info = _interopRequireDefault(require("../info"));

var _label = _interopRequireDefault(require("../label"));

var _mediaObject = _interopRequireDefault(require("../../../media-object"));

var _title = _interopRequireDefault(require("../title"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var displayName = 'PageHeaderRelatedList';
var propTypes = {
  /**
   * The label property can be a string or a React element
   */
  label: _propTypes.default.node,

  /**
   * The info property can be a string or a React element
   */
  info: _propTypes.default.node,

  /**
   * Content to appear on the right hand side of the page header
   * prop 'contentRight' will be deprecated soon, use 'onRenderActions' instead
   */
  onRenderActions: _propTypes.default.func,

  /**
   * Nav content which appears in the upper right hand corner.
   * prop 'navRight' will be deprecated soon, use 'onRenderControls' instead
   */
  onRenderControls: _propTypes.default.func,

  /**
   * The title property can be a string or a React element
   */
  title: _propTypes.default.node,

  /**
   * An array of react elements presumably anchor <a> elements.
   */
  trail: _propTypes.default.array,

  /**
   * The type of component
   * Note: Extra options are added to make the version backward compatible
   */
  variant: _propTypes.default.string
};
var defaultProps = {};

var RelatedList = function RelatedList(props) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-page-header__row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-page-header__col-title"
  }, /*#__PURE__*/_react.default.createElement(_label.default, {
    content: props.label,
    trail: props.trail
  }), /*#__PURE__*/_react.default.createElement(_mediaObject.default, {
    body: /*#__PURE__*/_react.default.createElement("div", {
      className: "slds-page-header__name"
    }, /*#__PURE__*/_react.default.createElement(_title.default, {
      content: props.title,
      label: props.label
    }))
  })), /*#__PURE__*/_react.default.createElement(_controls.default, {
    contentRight: props.contentRight,
    onRenderActions: props.onRenderActions,
    type: "actions"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-page-header__row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-page-header__col-meta"
  }, /*#__PURE__*/_react.default.createElement(_info.default, {
    content: props.info,
    variant: props.variant
  })), /*#__PURE__*/_react.default.createElement(_controls.default, {
    navRight: props.navRight,
    onRenderControls: props.onRenderControls,
    type: "controls"
  })));
};

RelatedList.displayName = displayName;
RelatedList.propTypes = propTypes;
RelatedList.defaultProps = defaultProps;
var _default = RelatedList;
exports.default = _default;