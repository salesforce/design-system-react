"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SLDSButton = require("../SLDSButton");

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

var _SLDSIcon = require("../SLDSIcon");

var _SLDSIcon2 = _interopRequireDefault(_SLDSIcon);

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

var displayName = "SLDSNotification";
var propTypes = {
  /**
   * Custom classes applied to Notification element.
   */
  className: _react2.default.PropTypes.string,
  /**
   * Message for Notification.
   */
  content: _react2.default.PropTypes.node.isRequired,
  /**
   * If true, close button appears for users to dismiss Notification.
   */
  dismissible: _react2.default.PropTypes.bool,
  /**
   * If duration exists, the Notification will disappear after that amount of time.
   */
  duration: _react2.default.PropTypes.number,
  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lighning Design System Icons</a> to reference icon names.
   */
  iconName: _react2.default.PropTypes.string,
  isOpen: _react2.default.PropTypes.bool.isRequired,
  onDismiss: _react2.default.PropTypes.func,
  /**
   * Styling for Notification background.
   */
  texture: _react2.default.PropTypes.bool,
  /**
   * Styling for Notification background color. Please reference <a href="http://www.lightningdesignsystem.com/components/utilities/themes/#color">Lighning Design System Themes > Color</a>.
   */
  theme: _react2.default.PropTypes.oneOf(["success", "warning", "error", "offline"]),
  variant: _react2.default.PropTypes.oneOf(["alert", "toast"]).isRequired
};

var defaultProps = {
  dismissible: true,
  isOpen: false,
  texture: false
};

/**
 * The SLDSNotification component is the Alert and Toast variants of the Lightning Design System Notification component. For prompt notifications, use the <a href="#/modal">SLDSModal</a> component with <code>prompt={true}</code>.
 * The Notification opens from a state change outside of the component itself (pass this state to the <code>isOpen</code> prop).
 */

var SLDSNotification = function (_React$Component) {
  _inherits(SLDSNotification, _React$Component);

  function SLDSNotification(props) {
    _classCallCheck(this, SLDSNotification);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SLDSNotification).call(this, props));

    _this.state = {};
    _this.timeout = null;
    return _this;
  }

  _createClass(SLDSNotification, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.duration) {
        this.timeout = setTimeout(function () {
          _this2.onDismiss();
        }, this.props.duration);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (nextProps.duration) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        if (nextProps.isOpen) {
          this.timeout = setTimeout(function () {
            _this3.onDismiss();
          }, this.props.duration);
        }
      }
      if (nextProps.isOpen !== this.props.isOpen) {
        this.setState({ returnFocusTo: document.activeElement });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.isOpen !== this.props.isOpen) {
        var btn = _reactDom2.default.findDOMNode(this.refs.dismissNotificationBtn);
        if (btn) btn.focus();
      }
    }
  }, {
    key: "renderIcon",
    value: function renderIcon() {
      if (this.props.iconName) {
        var classes = "";
        if (this.props.variant === "alert") {
          classes = "slds-m-right--x-small";
        } else if (this.props.variant === "toast") {
          classes = "slds-m-right--small slds-col slds-no-flex";
        }
        return _react2.default.createElement(_SLDSIcon2.default, { category: "utility", name: this.props.iconName, size: "small", className: classes });
      }
    }
  }, {
    key: "renderClose",
    value: function renderClose() {
      if (this.props.dismissible) {
        var size = null;
        if (this.props.variant === "toast") size = "large";

        return _react2.default.createElement(_SLDSButton2.default, {
          assistiveText: "Dismiss Notification",
          variant: "icon-inverse",
          iconName: "close",
          iconSize: size,
          className: "slds-button slds-notify__close",
          onClick: this.onDismiss.bind(this),
          ref: "dismissNotificationBtn"
        });
      }
    }
  }, {
    key: "onDismiss",
    value: function onDismiss() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      if (this.props.onDismiss) this.props.onDismiss();
      if (this.state.returnFocusTo && this.state.returnFocusTo.focus) {
        this.state.returnFocusTo.focus();
      }
    }
  }, {
    key: "renderAlertContent",
    value: function renderAlertContent() {
      return _react2.default.createElement(
        "h2",
        { id: "dialogTitle" },
        this.renderIcon(),
        this.props.content
      );
    }
  }, {
    key: "renderToastContent",
    value: function renderToastContent() {
      return _react2.default.createElement(
        "section",
        { className: "notify__content slds-grid" },
        this.renderIcon(),
        _react2.default.createElement(
          "div",
          { className: "slds-col slds-align-middle" },
          _react2.default.createElement(
            "h2",
            { id: "dialogTitle", className: "slds-text-heading--small " },
            this.props.content
          )
        )
      );
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var _classNames;

      return classNames(this.props.className, "slds-notify", (_classNames = {}, _defineProperty(_classNames, "slds-hide", !this.props.isOpen), _defineProperty(_classNames, "slds-notify--" + this.props.variant, this.props.variant), _defineProperty(_classNames, "slds-theme--" + this.props.theme, this.props.theme), _defineProperty(_classNames, "slds-theme--alert-texture-animated", this.props.texture), _classNames));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "span",
          { className: "slds-assistive-text" },
          this.props.theme
        ),
        this.renderClose(),
        this.props.variant === "toast" ? this.renderToastContent() : null,
        this.props.variant === "alert" ? this.renderAlertContent() : null
      );
    }

    /*
     * The parent container with role="alert" only announces its content if there is a change inside of it.
     * Because React renders the entire element to the DOM, we must switch out a blank div for the real content.
     * Bummer, I know.
     */

  }, {
    key: "blankContent",
    value: function blankContent() {
      return _react2.default.createElement("div", null);
    }
  }, {
    key: "render",
    value: function render() {
      //TODO: If there are multiple notifications on a page, we must 'hide' the ones that aren't open.
      //Need to find a better way to do this than using width:0 to override slds-notify-container.
      var styles = !this.props.isOpen ? { "width": "0" } : { "width": "100%" };
      return _react2.default.createElement(
        "div",
        { className: "slds-notify-container", style: styles },
        _react2.default.createElement(
          "div",
          { className: this.getClassName(), role: "alertdialog", "aria-labelledby": "dialogTitle" },
          this.props.isOpen ? this.renderContent() : this.blankContent()
        )
      );
    }
  }]);

  return SLDSNotification;
}(_react2.default.Component);

SLDSNotification.displayName = displayName;
SLDSNotification.propTypes = propTypes;
SLDSNotification.defaultProps = defaultProps;

module.exports = SLDSNotification;