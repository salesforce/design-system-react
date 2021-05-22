"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _button = _interopRequireDefault(require("../../button"));

var _icon = _interopRequireDefault(require("../../icon"));

var _event = _interopRequireDefault(require("../../../utilities/event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var Manager = /*#__PURE__*/function (_React$Component) {
  _inherits(Manager, _React$Component);

  var _super = _createSuper(Manager);

  function Manager() {
    var _this;

    _classCallCheck(this, Manager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: _this.props.isOpen,
      revealed: false
    });

    _defineProperty(_assertThisInitialized(_this), "getModal", function () {
      return (
        /*#__PURE__*/

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        _react.default.createElement("div", {
          className: "slds-modal".concat(_this.state.revealed ? ' slds-fade-in-open' : ''),
          onClick: _this.closeModal
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-modal__container",
          onClick: function onClick(e) {
            _event.default.trap(e);
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-modal__header"
        }, /*#__PURE__*/_react.default.createElement("h2", {
          className: "slds-text-heading_medium"
        }, _this.props.title), /*#__PURE__*/_react.default.createElement(_button.default, {
          className: "slds-button slds-modal__close",
          onClick: _this.closeModal
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          name: "close",
          category: "utility",
          size: "small"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-assistive-text"
        }, "Close"))), /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-modal__content"
        }, _this.props.children), /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-modal__footer"
        }, _this.props.footer)))
      );
    });

    _defineProperty(_assertThisInitialized(_this), "openModal", function () {
      _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeModal", function () {
      _this.setState({
        isOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmitModal", function () {
      _this.closeModal();
    });

    _defineProperty(_assertThisInitialized(_this), "updateBodyScroll", function () {
      if (window && document && document.body) {
        if (_this.state.isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'inherit';
        }
      }
    });

    return _this;
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
            var el = _reactDom.default.findDOMNode(this).parentNode;

            if (el && el.getAttribute('data-slds-modal')) {
              _reactDom.default.unmountComponentAtNode(el);

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
      return /*#__PURE__*/_react.default.createElement(_reactModal.default, {
        isOpen: this.state.isOpen,
        onRequestClose: this.closeModal,
        style: customStyles,
        overlayClassName: "slds-modal-backdrop".concat(this.state.revealed ? ' slds-modal-backdrop_open' : '')
      }, this.getModal());
    }
  }]);

  return Manager;
}(_react.default.Component);

_defineProperty(Manager, "defaultProps", {
  title: '',
  isOpen: false
});

var _default = Manager;
exports.default = _default;