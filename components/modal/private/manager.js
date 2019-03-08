"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactModal = require("react-modal");

var _reactModal2 = _interopRequireDefault(_reactModal);

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _icon = require("../../icon");

var _icon2 = _interopRequireDefault(_icon);

var _event = require("../../../utilities/event");

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var customStyles = {
  content: {
    position: 'default',
    top: 'default',
    left: 'default',
    right: 'default',
    bottom: 'default',
    border: 'default',
    background: 'default',
    overflow: 'default',
    WebkitOverflowScrolling: 'default',
    borderRadius: 'default',
    outline: 'default',
    padding: 'default'
  },
  overlay: {
    backgroundColor: 'default'
  }
}; // This component should be deprecated and appears to have
// been created in order to do modals in portals.

var Manager =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Manager, _React$Component);

  function Manager() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Manager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Manager.__proto__ || Object.getPrototypeOf(Manager)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        isOpen: _this.props.isOpen,
        revealed: false
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getModal", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return (
          /* eslint-disable jsx-a11y/no-static-element-interactions */
          _react2.default.createElement("div", {
            className: "slds-modal".concat(_this.state.revealed ? ' slds-fade-in-open' : ''),
            onClick: _this.closeModal
          }, _react2.default.createElement("div", {
            className: "slds-modal__container",
            onClick: function onClick(e) {
              _event2.default.trap(e);
            }
          }, _react2.default.createElement("div", {
            className: "slds-modal__header"
          }, _react2.default.createElement("h2", {
            className: "slds-text-heading_medium"
          }, _this.props.title), _react2.default.createElement(_button2.default, {
            className: "slds-button slds-modal__close",
            onClick: _this.closeModal
          }, _react2.default.createElement(_icon2.default, {
            name: "close",
            category: "utility",
            size: "small"
          }), _react2.default.createElement("span", {
            className: "slds-assistive-text"
          }, "Close"))), _react2.default.createElement("div", {
            className: "slds-modal__content"
          }, _this.props.children), _react2.default.createElement("div", {
            className: "slds-modal__footer"
          }, _this.props.footer)))
        );
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "openModal", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          isOpen: true
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "closeModal", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          isOpen: false
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleSubmitModal", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.closeModal();
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "updateBodyScroll", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (window && document && document.body) {
          if (_this.state.isOpen) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = 'inherit';
          }
        }
      }
    }), _temp));
  }

  _createClass(Manager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.state.revealed) {
        setTimeout(function () {
          _this2.setState({
            revealed: true
          });
        });
      }

      this.updateBodyScroll();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.isOpen !== prevState.isOpen) {
        this.updateBodyScroll();

        if (!this.state.isOpen) {
          if (!this.isUnmounting) {
            // eslint-disable-next-line react/no-find-dom-node
            var el = _reactDom2.default.findDOMNode(this).parentNode;

            if (el && el.getAttribute('data-slds-modal')) {
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
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(_reactModal2.default, {
        isOpen: this.state.isOpen,
        onRequestClose: this.closeModal,
        style: customStyles,
        overlayClassName: "slds-modal-backdrop".concat(this.state.revealed ? ' slds-modal-backdrop_open' : '')
      }, this.getModal());
    }
  }]);

  return Manager;
}(_react2.default.Component);

Object.defineProperty(Manager, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    title: '',
    isOpen: false
  }
});
exports.default = Manager;