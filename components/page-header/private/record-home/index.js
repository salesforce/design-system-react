"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _controls = _interopRequireDefault(require("../controls"));

var _detailRow = _interopRequireDefault(require("../detail-row"));

var _icon = _interopRequireDefault(require("../../../icon"));

var _mediaObject = _interopRequireDefault(require("../../../media-object"));

var _title = _interopRequireDefault(require("../title"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var displayName = 'PageHeaderRecordHome';
var propTypes = {
  /**
   * An array of detail blocks (used in "recordHome" variant)
   */
  details: _propTypes.default.array,

  /**
   * The label property can be a string or a React element
   */
  label: _propTypes.default.node,

  /**
   * The page header icon
   */
  icon: _propTypes.default.element,

  /**
   * Content to appear on the right hand side of the page header
   * prop 'contentRight' will be deprecated soon, use 'onRenderActions' instead
   */
  onRenderActions: _propTypes.default.func,

  /**
   * The title property can be a string or a React element
   */
  title: _propTypes.default.node
};

var RecordHome = function RecordHome(props) {
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

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-page-header__row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-page-header__col-title"
  }, /*#__PURE__*/_react.default.createElement(_mediaObject.default, {
    body: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "slds-page-header__name"
    }, /*#__PURE__*/_react.default.createElement(_title.default, {
      content: props.title,
      label: props.label
    }))),
    figure: icon
  })), /*#__PURE__*/_react.default.createElement(_controls.default, {
    contentRight: props.contentRight,
    onRenderActions: props.onRenderActions,
    type: "actions"
  })), props.details ? /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-page-header__row slds-page-header__row_gutters"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-page-header__col-details"
  }, /*#__PURE__*/_react.default.createElement(_detailRow.default, {
    details: props.details
  }))) : null);
};

RecordHome.displayName = displayName;
RecordHome.propTypes = propTypes;
var _default = RecordHome;
exports.default = _default;