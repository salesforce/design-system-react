"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = require("../../utilities/class-names");

var _classNames2 = _interopRequireDefault(_classNames);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  /**
   * CSS classes to be added to tag with `.slds-notify-container`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * Toast components
   */
  children: _propTypes2.default.node
};
/**
 * A fixed container for toast banners.
 */

var ToastContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ToastContainer, _React$Component);

  function ToastContainer() {
    _classCallCheck(this, ToastContainer);

    return _possibleConstructorReturn(this, (ToastContainer.__proto__ || Object.getPrototypeOf(ToastContainer)).apply(this, arguments));
  }

  _createClass(ToastContainer, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        className: (0, _classNames2.default)('slds-notify-container', this.props.className)
      }, this.props.children);
    }
  }]);

  return ToastContainer;
}(_react2.default.Component);

ToastContainer.displayName = _constants.TOAST_CONTAINER;
ToastContainer.propTypes = propTypes;
exports.default = ToastContainer;