"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SLDSButton = require("../SLDSButton");

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactModal = require("react-modal");

var _reactModal2 = _interopRequireDefault(_reactModal);

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

var customStyles = {
  content: {
    position: "default",
    top: "default",
    left: "default",
    right: "default",
    bottom: "default",
    border: "default",
    background: "default",
    overflow: "default",
    WebkitOverflowScrolling: "default",
    borderRadius: "default",
    outline: "default",
    padding: "default"
  },
  overlay: {
    backgroundColor: "default"
  }
};

var displayName = "SLDSModal";
var propTypes = {
  /**
   * Vertical alignment of Modal.
   */
  align: _react2.default.PropTypes.oneOf(["top", "center"]),
  /**
   * Modal content.
   */
  children: _react2.default.PropTypes.node.isRequired,
  /**
   * If true, modal footer buttons render left and right. An example use case would be for "back" and "next" buttons.
   */
  directional: _react2.default.PropTypes.bool,
  /**
   * If true, prompt Modals can be dismissed by clicking outside of modal or pressing esc key.
   */
  dismissible: _react2.default.PropTypes.bool,
  /**
   * Array of buttons to be placed in the footer. They render on the right side by default but are floated left and right if <code>directional</code> is true.
   */
  footer: _react2.default.PropTypes.array,
  isOpen: _react2.default.PropTypes.bool.isRequired,
  prompt: _react2.default.PropTypes.oneOf(["success", "warning", "error", "wrench", "offline", "info"]),
  size: _react2.default.PropTypes.oneOf(["medium", "large"]),
  /**
   * Content underneath the title.
   */
  tagline: _react2.default.PropTypes.node,
  title: _react2.default.PropTypes.node
};
var defaultProps = {
  align: "center",
  directional: false,
  dismissible: true,
  isOpen: false
};

/**
 * The SLDSModal component is used for the Lightning Design System Modal and Notification > Prompt components. The Modal opens from a state change outside of the component itself (pass this state to the <code>isOpen</code> prop).
 * For more details on the Prompt markup, please review the <a href="http://www.lightningdesignsystem.com/components/notifications#prompt">Notifications > Prompt</a>.
 */

var SLDSModal = function (_React$Component) {
  _inherits(SLDSModal, _React$Component);

  function SLDSModal(props) {
    _classCallCheck(this, SLDSModal);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SLDSModal).call(this, props));

    _this.state = {
      isClosing: false,
      revealed: false
    };
    return _this;
  }

  _createClass(SLDSModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setState({
        returnFocusTo: document.activeElement
      });
      if (!this.state.revealed) {
        setTimeout(function () {
          _this2.setState({ revealed: true });
        });
      }
      this.updateBodyScroll();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.isOpen !== prevProps.isOpen) {
        this.updateBodyScroll();
      }
      if (this.state.isClosing !== prevState.isClosing) {
        if (this.state.isClosing) {
          //console.log("CLOSING: ");
          if (!this.isUnmounting) {
            var el = _reactDom2.default.findDOMNode(this).parentNode;
            if (el && el.getAttribute("data-slds-modal")) {
              _reactDom2.default.unmountComponentAtNode(el);
              document.body.removeChild(el);
            }
          }
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
      this.clearBodyScroll();
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      if (this.props.dismissible) {
        this.setState({ isClosing: true });
        if (this.state.returnFocusTo && this.state.returnFocusTo.focus) {
          this.state.returnFocusTo.focus();
        }
        if (this.props.onRequestClose) {
          this.props.onRequestClose();
        }
      }
    }
  }, {
    key: "handleSubmitModal",
    value: function handleSubmitModal() {
      this.closeModal();
    }
  }, {
    key: "updateBodyScroll",
    value: function updateBodyScroll() {
      if (window && document && document.body) {
        if (this.props.isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "inherit";
        }
      }
    }
  }, {
    key: "clearBodyScroll",
    value: function clearBodyScroll() {
      return function updateBodyScroll() {
        if (window && document && document.body) {
          document.body.style.overflow = "inherit";
        }
      };
    }
  }, {
    key: "handleModalClick",
    value: function handleModalClick(event) {
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
    }
  }, {
    key: "isPrompt",
    value: function isPrompt() {
      return this.props.prompt !== undefined;
    }
  }, {
    key: "footerComponent",
    value: function footerComponent() {
      var footer = null;
      var hasFooter = this.props.footer && this.props.footer.length > 0;
      var footerClass = {
        "slds-modal__footer": true,
        "slds-modal__footer--directional": this.props.directional,
        "slds-theme--default": this.isPrompt()
      };

      if (hasFooter) {
        footer = _react2.default.createElement(
          "div",
          { className: (0, _classnames2.default)(footerClass), onClick: this.handleModalClick.bind(this) },
          this.props.footer
        );
      }
      return footer;
    }
  }, {
    key: "headerComponent",
    value: function headerComponent() {
      var _headerClass;

      var headerContent = null;
      var hasHeader = this.props.title || this.props.tagline;
      var headerClass = (_headerClass = {}, _defineProperty(_headerClass, "slds-modal__header", hasHeader), _defineProperty(_headerClass, "slds-theme--" + this.props.prompt, this.isPrompt()), _defineProperty(_headerClass, "slds-theme--alert-texture", this.isPrompt()), _headerClass);
      var titleClass = {
        "slds-text-heading--small": this.isPrompt(),
        "slds-text-heading--medium": !this.isPrompt()
      };

      if (hasHeader) {
        headerContent = _react2.default.createElement(
          "div",
          null,
          this.props.toast,
          _react2.default.createElement(
            "h2",
            { className: (0, _classnames2.default)(titleClass) },
            this.props.title
          ),
          this.props.tagline ? _react2.default.createElement(
            "p",
            { className: "slds-m-top--x-small" },
            this.props.tagline
          ) : null
        );
      }

      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)(headerClass), style: { position: "relative" }, onClick: this.handleModalClick.bind(this) },
        _react2.default.createElement(_SLDSButton2.default, { assistiveText: "Close", variant: "icon-inverse", iconName: "close", iconSize: "large", className: "slds-modal__close", onClick: this.closeModal.bind(this) }),
        headerContent
      );
    }
  }, {
    key: "getModal",
    value: function getModal() {
      var modalClass = {
        "slds-modal": true,
        "slds-fade-in-open": this.state.revealed,
        "slds-modal--large": this.props.size === "large",
        "slds-modal--prompt": this.isPrompt()
      };
      var modalStyle = this.props.align === "top" ? { "justifyContent": "flex-start" } : null;
      var contentStyle = this.props.title ? null : { "borderRadius": ".25rem" };
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { "aria-hidden": "false", role: "dialog", className: (0, _classnames2.default)(modalClass), onClick: this.closeModal.bind(this) },
          _react2.default.createElement(
            "div",
            { className: "slds-modal__container", style: modalStyle },
            this.headerComponent(),
            _react2.default.createElement(
              "div",
              { className: "slds-modal__content", style: contentStyle, onClick: this.handleModalClick.bind(this) },
              this.props.children
            ),
            this.footerComponent()
          )
        ),
        _react2.default.createElement("div", { className: "slds-backdrop slds-backdrop--open" })
      );
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _reactModal2.default,
        {
          isOpen: this.props.isOpen,
          onRequestClose: this.closeModal.bind(this),
          style: customStyles },
        this.getModal()
      );
    }
  }]);

  return SLDSModal;
}(_react2.default.Component);

SLDSModal.displayName = displayName;
SLDSModal.propTypes = propTypes;
SLDSModal.defaultProps = defaultProps;

module.exports = SLDSModal;