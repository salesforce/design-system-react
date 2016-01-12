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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SLDSIcon = require('../SLDSIcon');

var _lodashOmit = require("lodash.omit");

var _lodashOmit2 = _interopRequireDefault(_lodashOmit);

var classNames = require("classnames");

var displayName = "SLDSButtonStateful";
var propTypes = {
  /**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * If the button has an icon and a visible label, you can omit the assistiveText prop and use the label prop.
   */
  assistiveText: _react2["default"].PropTypes.string,
  disabled: _react2["default"].PropTypes.bool,
  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">SLDS Icons</a> to reference icon names.
   */
  iconName: _react2["default"].PropTypes.string,
  /**
   * If omitted, icon size is medium.
   */
  iconSize: _react2["default"].PropTypes.oneOf(["x-small", "small", "large"]),
  onClick: _react2["default"].PropTypes.func,
  /**
   * If true, button scales 100% width on small form factors
   */
  responsive: _react2["default"].PropTypes.bool,
  /**
   * Write <code>"-1"</code> if you don't want the user to tab to it.
   */
  tabIndex: _react2["default"].PropTypes.string,
  /**
   * <code>join</code> - states are join, member, leave <br />
   * <code>follow</code> - states are follow, following, unfollow <br />
   * <code>icon</code> - states are "selected", "unselect", "not selected"
   */
  type: _react2["default"].PropTypes.oneOf(["join", "follow", "icon"]),
  /**
   * Use <code>icon-inverse</code> for white icons.
   */
  variant: _react2["default"].PropTypes.oneOf(["base", "neutral", "brand", "destructive", "icon", "inverse", "icon-inverse"])
};
var defaultProps = {};

/**
 * The Button Stateful component is used for buttons that have a state of unselected or selected. The initial state is unselected.<br />
 * The three types of stateful buttons are <code>join</code>, <code>follow</code>, and <code>icon</code>.<br />
 * For more details, please reference <a href="http://www.lightningdesignsystem.com/components/buttons#stateful">SLDS Buttons > Stateful</a>.
 */

var SLDSButtonStateful = (function (_React$Component) {
  _inherits(SLDSButtonStateful, _React$Component);

  function SLDSButtonStateful(props) {
    _classCallCheck(this, SLDSButtonStateful);

    _get(Object.getPrototypeOf(SLDSButtonStateful.prototype), "constructor", this).call(this, props);
    this.state = { active: false };
  }

  _createClass(SLDSButtonStateful, [{
    key: "handleClick",
    value: function handleClick() {
      if (this.props.onClick) this.props.onClick();
      this.setState({ active: !this.state.active });
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var _classNames;

      return classNames(this.props.className, "slds-button", (_classNames = {}, _defineProperty(_classNames, "slds-button--neutral", this.props.type !== "icon"), _defineProperty(_classNames, "slds-button--inverse", this.props.variant === "inverse"), _defineProperty(_classNames, "slds-not-selected", !this.state.active), _defineProperty(_classNames, "slds-is-selected", this.state.active), _defineProperty(_classNames, "slds-max-small-button--stretch", this.props.responsive), _defineProperty(_classNames, "slds-button--icon-border", this.props.type === "icon"), _classNames));
    }
  }, {
    key: "render",
    value: function render() {
      var props = (0, _lodashOmit2["default"])(this.props, ["className", "label", "onClick", "type"]);
      if (this.props.disabled) props["disabled"] = "disabled";

      if (this.props.type === "follow") {
        return _react2["default"].createElement(
          "button",
          _extends({ className: this.getClassName(), "aria-live": "assertive", onClick: this.handleClick.bind(this) }, props),
          _react2["default"].createElement(
            "span",
            { className: "slds-text-not-selected" },
            _react2["default"].createElement(_SLDSIcon.ButtonIcon, { disabled: this.props.disabled, name: "add", size: "small", position: "left", className: "slds-button__icon--stateful" }),
            "Follow"
          ),
          _react2["default"].createElement(
            "span",
            { className: "slds-text-selected" },
            _react2["default"].createElement(_SLDSIcon.ButtonIcon, { disabled: this.props.disabled, name: "check", size: "small", position: "left", className: "slds-button__icon--stateful" }),
            "Following"
          ),
          _react2["default"].createElement(
            "span",
            { className: "slds-text-selected-focus" },
            _react2["default"].createElement(_SLDSIcon.ButtonIcon, { disabled: this.props.disabled, name: "close", size: "small", position: "left", className: "slds-button__icon--stateful" }),
            "Unfollow"
          )
        );
      } else if (this.props.type === "join") {
        return _react2["default"].createElement(
          "button",
          _extends({ className: this.getClassName(), "aria-live": "assertive", onClick: this.handleClick.bind(this) }, props),
          _react2["default"].createElement(
            "span",
            { className: "slds-text-not-selected" },
            _react2["default"].createElement(_SLDSIcon.ButtonIcon, { disabled: this.props.disabled, name: "add", size: "small", position: "left", className: "slds-button__icon--stateful" }),
            "Join"
          ),
          _react2["default"].createElement(
            "span",
            { className: "slds-text-selected" },
            _react2["default"].createElement(_SLDSIcon.ButtonIcon, { disabled: this.props.disabled, name: "check", size: "small", position: "left", className: "slds-button__icon--stateful" }),
            "Member"
          ),
          _react2["default"].createElement(
            "span",
            { className: "slds-text-selected-focus" },
            _react2["default"].createElement(_SLDSIcon.ButtonIcon, { disabled: this.props.disabled, name: "close", size: "small", position: "left", className: "slds-button__icon--stateful" }),
            "Leave"
          )
        );
      } else if (this.props.type === "icon") {
        return _react2["default"].createElement(
          "button",
          _extends({ className: this.getClassName(), onClick: this.handleClick.bind(this) }, props, { "aria-live": "polite" }),
          _react2["default"].createElement(_SLDSIcon.ButtonIcon, { assistiveText: this.state.active ? this.props.assistiveText + " selected" : this.props.assistiveText, disabled: this.props.disabled, name: this.props.iconName, size: this.props.iconSize, className: "slds-button__icon--stateful" })
        );
      } else {
        return _react2["default"].createElement(
          "div",
          null,
          "SLDS Stateful Button needs proper type prop: follow, join, or icon."
        );
      }
    }
  }]);

  return SLDSButtonStateful;
})(_react2["default"].Component);

SLDSButtonStateful.displayName = displayName;
SLDSButtonStateful.propTypes = propTypes;
SLDSButtonStateful.defaultProps = defaultProps;

module.exports = SLDSButtonStateful;