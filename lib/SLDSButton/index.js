/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utilsCreateChainedFunction = require("../utils/create-chained-function");

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _SLDSIconsJs = require("../SLDSIcons.js");

var _lodashOmit = require("lodash.omit");

var _lodashOmit2 = _interopRequireDefault(_lodashOmit);

var classNames = require("classnames");

var displayName = 'SLDSButton';
var propTypes = {
  buttonSize: _react2["default"].PropTypes.string,
  disabled: _react2["default"].PropTypes.bool,
  hint: _react2["default"].PropTypes.bool,
  iconName: _react2["default"].PropTypes.string,
  iconPosition: _react2["default"].PropTypes.oneOf(["left", "right"]),
  iconSize: _react2["default"].PropTypes.oneOf(["x-small", "small", "medium", "large"]),
  iconVariant: _react2["default"].PropTypes.oneOf(["bare", "container", "border", "border-filled", "small", "more"]),
  label: _react2["default"].PropTypes.string.isRequired,
  onClick: _react2["default"].PropTypes.func,
  responsive: _react2["default"].PropTypes.bool,
  stateful: _react2["default"].PropTypes.bool,
  tabindex: _react2["default"].PropTypes.string,
  variant: _react2["default"].PropTypes.oneOf(["base", "neutral", "brand", "destructive", "icon", "inverse", "icon-inverse"])
};
var defaultProps = {};

var SLDSButton = (function (_React$Component) {
  _inherits(SLDSButton, _React$Component);

  function SLDSButton(props) {
    _classCallCheck(this, SLDSButton);

    _get(Object.getPrototypeOf(SLDSButton.prototype), "constructor", this).call(this, props);
    this.state = { active: false };
  }

  _createClass(SLDSButton, [{
    key: "onClick",
    value: function onClick() {
      this.setState({ active: !this.state.active });
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var _classNames;

      var isSelected = this.props.stateful && this.state.active ? true : false;
      var notSelected = this.props.stateful && !this.state.active ? true : false;
      var iconOnly = this.props.variant === 'icon' ? true : false;
      return classNames(this.props.className, "slds-button", (_classNames = {}, _defineProperty(_classNames, "slds-button--" + this.props.variant, !iconOnly), _defineProperty(_classNames, "slds-button--icon-" + this.props.iconVariant, this.props.iconVariant), _defineProperty(_classNames, "slds-max-small-button--stretch", this.props.responsive), _defineProperty(_classNames, "slds-not-selected", notSelected), _defineProperty(_classNames, "slds-is-selected", isSelected), _defineProperty(_classNames, "slds-button--small", this.props.buttonSize), _classNames));
    }
  }, {
    key: "renderIcon",
    value: function renderIcon(name) {
      if (this.props.iconName || this.props.notSelectedIcon || this.props.selectedIcon || this.props.selectedFocusIcon) {
        return _react2["default"].createElement(_SLDSIconsJs.ButtonIcon, {
          disabled: this.props.disabled,
          hint: this.props.hint,
          name: name,
          position: this.props.iconPosition,
          size: this.props.iconSize,
          stateful: this.props.stateful,
          variant: this.props.variant
        });
      }
    }
  }, {
    key: "renderIconMore",
    value: function renderIconMore() {
      if (this.props.iconVariant === "more") {
        return _react2["default"].createElement(_SLDSIconsJs.ButtonIcon, {
          disabled: this.props.disabled,
          name: "down",
          size: "x-small",
          variant: this.props.variant
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = (0, _lodashOmit2["default"])(this.props, "className");
      var click = (0, _utilsCreateChainedFunction2["default"])(this.props.onClick, this.onClick.bind(this));
      var labelClasses = this.props.variant === "icon" || this.props.variant === "icon-inverse" ? "slds-assistive-text" : "";
      if (this.props.disabled) {
        props["disabled"] = "disabled";
      }

      if (this.props.stateful) {
        return _react2["default"].createElement(
          "button",
          _extends({ tabIndex: this.props.tabindex, className: this.getClassName() }, props, { onClick: click }),
          _react2["default"].createElement(
            "span",
            { className: "slds-text-not-selected" },
            this.renderIcon(this.props.notSelectedIcon),
            this.props.notSelectedLabel
          ),
          _react2["default"].createElement(
            "span",
            { className: "slds-text-selected" },
            this.renderIcon(this.props.selectedIcon),
            this.props.selectedLabel
          ),
          _react2["default"].createElement(
            "span",
            { className: "slds-text-selected-focus" },
            this.renderIcon(this.props.selectedFocusIcon),
            this.props.selectedFocusLabel
          )
        );
      } else {
        return _react2["default"].createElement(
          "button",
          _extends({ tabIndex: this.props.tabindex, className: this.getClassName() }, props, { onClick: click }),
          this.props.iconPosition === "right" ? _react2["default"].createElement(
            "span",
            { className: labelClasses },
            this.props.label
          ) : null,
          this.renderIcon(this.props.iconName),
          this.renderIconMore(),
          this.props.iconPosition === "left" || !this.props.iconPosition ? _react2["default"].createElement(
            "span",
            { className: labelClasses },
            this.props.label
          ) : null,
          this.props.children
        );
      }
    }
  }]);

  return SLDSButton;
})(_react2["default"].Component);

SLDSButton.displayName = displayName;
SLDSButton.propTypes = propTypes;
SLDSButton.defaultProps = defaultProps;

module.exports = SLDSButton;