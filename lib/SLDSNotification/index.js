/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SLDSButton = require("../SLDSButton");

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

var _SLDSIcons = require("../SLDSIcons");

var classNames = require("classnames");

var displayName = 'SLDSNotification';
var propTypes = {
  className: _react2["default"].PropTypes.string,
  content: _react2["default"].PropTypes.node,
  dismissible: _react2["default"].PropTypes.bool,
  duration: _react2["default"].PropTypes.number,
  icon: _react2["default"].PropTypes.string,
  isOpen: _react2["default"].PropTypes.bool,
  onDismiss: _react2["default"].PropTypes.func,
  texture: _react2["default"].PropTypes.bool,
  theme: _react2["default"].PropTypes.oneOf(["success", "warning", "error", "offline"]),
  variant: _react2["default"].PropTypes.oneOf(["alert", "toast"])
};

var defaultProps = {
  dismissible: true,
  isOpen: false
};

var SLDSNotification = (function (_React$Component) {
  _inherits(SLDSNotification, _React$Component);

  function SLDSNotification(props) {
    _classCallCheck(this, SLDSNotification);

    _get(Object.getPrototypeOf(SLDSNotification.prototype), "constructor", this).call(this, props);
    this.state = {
      interval: null,
      revealForScreenreader: false
    };
  }

  _createClass(SLDSNotification, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.duration) {
        var that = this;
        setTimeout(function () {
          this.onDismiss();
        }, that.props.duration);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        interval: null
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this = this;

      if (this.props.isOpen !== nextProps.isOpen) {
        if (nextProps.isOpen && !this.state.interval) {
          this.setState({ interval: setTimeout(function () {
              _this.setState({ revealForScreenreader: true });
            }, 500) });
        }
        console.log('revealForScreen', this.state.revealForScreenreader);
      }
    }
  }, {
    key: "renderIcon",
    value: function renderIcon() {
      if (this.props.icon) {
        var classes = "";
        if (this.props.variant === "alert") {
          classes = "slds-m-right--x-small";
        } else if (this.props.variant === "toast") {
          classes = "slds-m-right--small slds-col slds-no-flex";
        }
        return _react2["default"].createElement(_SLDSIcons.Icon, { category: "utility", name: this.props.icon, size: "small", className: classes });
      }
    }
  }, {
    key: "renderClose",
    value: function renderClose() {
      var that = this;
      if (this.props.dismissible) {
        var size = "";
        if (this.props.variant === "alert") {
          size = "medium";
        } else if (this.props.variant === "toast") {
          size = "large";
        }
        return _react2["default"].createElement(_SLDSButton2["default"], {
          assistiveText: "Dismiss Notification",
          variant: "icon-inverse",
          iconName: "close",
          iconSize: size,
          className: "slds-button slds-notify__close",
          onClick: that.onDismiss.bind(that)
        });
      }
    }
  }, {
    key: "onDismiss",
    value: function onDismiss() {
      if (this.props.onDismiss) this.props.onDismiss();
      this.setState({
        revealForScreenreader: false,
        interval: null
      });
    }
  }, {
    key: "renderAlertContent",
    value: function renderAlertContent() {
      if (this.props.variant === "alert") {
        return _react2["default"].createElement(
          "h2",
          null,
          this.renderIcon(),
          this.props.content
        );
      }
    }
  }, {
    key: "renderToastContent",
    value: function renderToastContent() {
      if (this.props.variant === "toast") {
        return _react2["default"].createElement(
          "section",
          { className: "notify__content slds-grid" },
          this.renderIcon(),
          _react2["default"].createElement(
            "div",
            { className: "slds-col slds-align-middle" },
            _react2["default"].createElement(
              "h2",
              { className: "slds-text-heading--small " },
              this.props.content
            )
          )
        );
      }
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var _classNames;

      return classNames(this.props.className, "slds-notify", (_classNames = {}, _defineProperty(_classNames, "slds-transition-hide", !this.state.revealForScreenreader), _defineProperty(_classNames, "slds-notify--" + this.props.variant, this.props.variant), _defineProperty(_classNames, "slds-theme--" + this.props.theme, this.props.theme), _defineProperty(_classNames, "slds-theme--alert-texture-animated", this.props.texture), _classNames));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      if (this.state.revealForScreenreader) {
        return _react2["default"].createElement(
          "div",
          null,
          _react2["default"].createElement(
            "p",
            { ref: "test", className: "slds-assistive-text" },
            this.props.theme
          ),
          this.renderClose(),
          this.renderAlertContent(),
          this.renderToastContent()
        );
      } else {
        return _react2["default"].createElement(
          "div",
          { className: "slds-hidden" },
          "Notification loading"
        );
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.isOpen) {
        return _react2["default"].createElement(
          "div",
          { className: "slds-notify-container" },
          _react2["default"].createElement(
            "div",
            { ref: "alertContent", className: this.getClassName(), role: "alert" },
            this.renderContent()
          )
        );
      } else {
        return null;
      }
    }
  }]);

  return SLDSNotification;
})(_react2["default"].Component);

SLDSNotification.displayName = displayName;
SLDSNotification.propTypes = propTypes;
SLDSNotification.defaultProps = defaultProps;

module.exports = SLDSNotification;