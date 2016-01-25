"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ButtonIcon = require("../SLDSIcon/ButtonIcon");

var _ButtonIcon2 = _interopRequireDefault(_ButtonIcon);

var _trigger = require("../SLDSPopoverTooltip/trigger");

var _trigger2 = _interopRequireDefault(_trigger);

var _lodash = require("lodash.omit");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var classNames = require("classnames");

var displayName = 'SLDSButton';
var propTypes = {
  /**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
   */
  assistiveText: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  /**
   * Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
   */
  hint: _react2.default.PropTypes.bool,
  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
  iconName: _react2.default.PropTypes.string,
  /**
   * If omitted, icon position is centered.
   */
  iconPosition: _react2.default.PropTypes.oneOf(["left", "right"]),
  iconSize: _react2.default.PropTypes.oneOf(["x-small", "small", "medium", "large"]),
  /**
   * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
   */
  iconVariant: _react2.default.PropTypes.oneOf(["bare", "container", "border", "border-filled", "small", "more"]),
  /**
   * Visible label on the button. If the button is an icon button with no label, you must use the <code>assistiveText</code> prop.
   */
  label: _react2.default.PropTypes.string,
  onClick: _react2.default.PropTypes.func,
  /**
   * If true, button scales to 100% width on small form factors.
   */
  responsive: _react2.default.PropTypes.bool,
  /**
   * Write <code>"-1"</code> if you don't want the user to tab to the button.
   */
  tabIndex: _react2.default.PropTypes.string,
  tooltip: _react2.default.PropTypes.node,
  /**
   * Use <code>icon-inverse</code> for white icons.
   */
  variant: _react2.default.PropTypes.oneOf(["base", "neutral", "brand", "destructive", "icon", "inverse", "icon-inverse"])
};
var defaultProps = {
  disabled: false,
  hint: false,
  iconSize: "medium",
  responsive: false,
  variant: "base"
};

/**
 * The SLDSButton component is the Lightning Design System Button component. The SLDSButton should be used for label buttons, icon buttons, or buttons that have both labels and icons.
 * Either a <code>label</code> or <code>assistiveText</code> is required; see the Prop Details table below.
 * For buttons that maintain selected/unselected states, use the <a href="#/home/button-stateful">SLDSButtonStateful</a> component.
 * For more details on the markup, please review the Button documentation on the <a href="http://www.lightningdesignsystem.com/components/buttons">Lightning Design System website</a>.
 */

var SLDSButton = function (_SLDSTooltipTrigger) {
  _inherits(SLDSButton, _SLDSTooltipTrigger);

  function SLDSButton(props) {
    _classCallCheck(this, SLDSButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SLDSButton).call(this, props));

    _this.state = { active: false };
    return _this;
  }

  _createClass(SLDSButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(Object.getPrototypeOf(SLDSButton.prototype), "componentDidMount", this).call(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(SLDSButton.prototype), "componentWillUnmount", this).call(this);
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      if (this.props.onClick) this.props.onClick();
      this.setState({ active: !this.state.active });
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var _classNames;

      var iconOnly = this.props.variant === 'icon' ? true : false;
      var base = this.props.variant === 'base' ? true : false;

      return classNames(this.props.className, "slds-button", (_classNames = {}, _defineProperty(_classNames, "slds-button--" + this.props.variant, !base && !iconOnly), _defineProperty(_classNames, "slds-button--icon-" + this.props.iconVariant, this.props.iconVariant), _defineProperty(_classNames, "slds-max-small-button--stretch", this.props.responsive), _classNames));
    }
  }, {
    key: "renderIcon",
    value: function renderIcon(name) {
      if (this.props.iconName) {
        var iconSize = this.props.iconSize === '' ? null : this.props.iconSize;
        return _react2.default.createElement(_ButtonIcon2.default, {
          hint: this.props.hint,
          name: name,
          position: this.props.iconPosition,
          size: iconSize
        });
      }
    }
  }, {
    key: "renderIconMore",
    value: function renderIconMore() {
      if (this.props.iconVariant === "more") {
        return _react2.default.createElement(_ButtonIcon2.default, {
          name: "down",
          size: "x-small"
        });
      }
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var iconOnly = this.props.variant === "icon" || this.props.variant === "icon-inverse";
      return iconOnly && this.props.assistiveText ? _react2.default.createElement(
        "span",
        { className: "slds-assistive-text" },
        this.props.assistiveText
      ) : _react2.default.createElement(
        "span",
        null,
        this.props.label
      );
    }
  }, {
    key: "render",
    value: function render() {
      var props = (0, _lodash2.default)(this.props, ["className", "label", "onClick"]);
      if (this.props.disabled) props["disabled"] = "disabled";

      return _react2.default.createElement(
        "button",
        _extends({ className: this.getClassName(), onClick: this.handleClick.bind(this) }, props),
        this.props.iconPosition === "right" ? this.renderLabel() : null,
        this.renderIcon(this.props.iconName),
        this.renderIconMore(),
        this.props.iconPosition !== "right" ? this.renderLabel() : null,
        this.props.children,
        this.getTooltip()
      );
    }
  }]);

  return SLDSButton;
}(_trigger2.default);

SLDSButton.displayName = displayName;
SLDSButton.propTypes = propTypes;
SLDSButton.defaultProps = defaultProps;

module.exports = SLDSButton;