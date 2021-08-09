"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _controls = _interopRequireDefault(require("../controls"));

var _icon = _interopRequireDefault(require("../../../icon"));

var _info = _interopRequireDefault(require("../info"));

var _mediaObject = _interopRequireDefault(require("../../../media-object"));

var _title = _interopRequireDefault(require("../title"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var displayName = 'PageHeaderBase';
var propTypes = {
  /**
   * The page header icon
   */
  icon: _propTypes.default.node,

  /**
   * The info property can be a string or a React element
   */
  info: _propTypes.default.node,

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
   * The type of component
   */
  variant: _propTypes.default.string
};

var Base = function Base(props) {
  var icon; // Backwards compatibility

  if (props.iconName) {
    icon = /*#__PURE__*/_react.default.createElement(_icon.default, {
      category: props.iconCategory,
      className: "slds-page-header__icon",
      name: props.iconName,
      position: props.iconPosition,
      size: props.iconSize,
      variant: props.iconVariant
    });
  } else if (props.icon) {
    var iconClasses = 'slds-page-header__icon';

    if (props.icon.props) {
      iconClasses = (0, _classnames.default)(props.icon.props.className, iconClasses);
    }

    icon = /*#__PURE__*/_react.default.cloneElement(props.icon, {
      className: iconClasses
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-page-header__row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-page-header__col-title"
  }, /*#__PURE__*/_react.default.createElement(_mediaObject.default, {
    body: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "slds-page-header__name"
    }, /*#__PURE__*/_react.default.createElement(_title.default, {
      content: props.title
    })), /*#__PURE__*/_react.default.createElement(_info.default, {
      content: props.info,
      variant: props.variant
    })),
    figure: icon
  })), /*#__PURE__*/_react.default.createElement(_controls.default, {
    className: "slds-align-middle",
    navRight: props.navRight,
    onRenderControls: props.onRenderControls,
    type: "controls"
  }));
};

Base.displayName = displayName;
Base.propTypes = propTypes;
var _default = Base;
exports.default = _default;