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

var _label = _interopRequireDefault(require("../label"));

var _mediaObject = _interopRequireDefault(require("../../../media-object"));

var _title = _interopRequireDefault(require("../title"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var displayName = 'PageHeaderObjectHome';
var propTypes = {
  /**
   * The label property can be a string or a React element
   */
  label: _propTypes.default.node,

  /**
   * The page header icon
   */
  icon: _propTypes.default.element,

  /**
   * The info property can be a string or a React element
   */
  info: _propTypes.default.node,

  /**
   * Used with the `object-home` variant. Accepts a node, typically a Dropdown component
   */
  nameSwitcherDropdown: _propTypes.default.node,

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

var ObjectHome = function ObjectHome(props) {
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
    body: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.trail ? /*#__PURE__*/_react.default.createElement(_label.default, {
      style: {
        lineHeight: '1.3'
      },
      trail: props.trail
    }) : null, /*#__PURE__*/_react.default.createElement("div", {
      className: "slds-page-header__name"
    }, /*#__PURE__*/_react.default.createElement(_title.default, {
      content: props.title,
      label: !props.trail ? props.label : null
    }), props.nameSwitcherDropdown ? /*#__PURE__*/_react.default.createElement("div", {
      className: "slds-page-header__name-switcher"
    }, props.nameSwitcherDropdown) : null)),
    figure: icon
  })), /*#__PURE__*/_react.default.createElement(_controls.default, {
    className: (0, _classnames.default)({
      'slds-align-middle slds-p-bottom_none': !props.onRenderControls && !props.navRight
    }),
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
    className: (0, _classnames.default)({
      'slds-align-middle': !props.onRenderActions && !props.comntentRight
    }),
    navRight: props.navRight,
    onRenderControls: props.onRenderControls,
    type: "controls"
  })));
};

ObjectHome.displayName = displayName;
ObjectHome.propTypes = propTypes;
var _default = ObjectHome;
exports.default = _default;