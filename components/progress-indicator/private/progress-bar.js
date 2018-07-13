"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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
   * Assistive text for percentage
   */
  assistiveText: _propTypes2.default.shape({
    percentage: _propTypes2.default.string
  }),

  /**
   * Percentage of progress completion, with range of [0, 100]
   */
  value: _propTypes2.default.string.isRequired
};
/**
 * ProgressBar renders the blue/gray progress bar and dynamically updates its completion percentage
 */

var ProgressBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar() {
    _classCallCheck(this, ProgressBar);

    return _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).apply(this, arguments));
  }

  _createClass(ProgressBar, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        className: "slds-progress-bar slds-progress-bar_x-small",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": this.props.value,
        role: "progressbar",
        tabIndex: 0
      }, _react2.default.createElement("span", {
        className: "slds-progress-bar__value",
        style: {
          width: "".concat(this.props.value, "%")
        }
      }, _react2.default.createElement("span", {
        className: "slds-assistive-text"
      }, this.props.assistiveText.percentage || "Progress: ".concat(this.props.value, "%"))));
    }
  }]);

  return ProgressBar;
}(_react2.default.Component);

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = propTypes;
exports.default = ProgressBar;