"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _progressBar = require("./progress-bar");

var _progressBar2 = _interopRequireDefault(_progressBar);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ### Prop Types
var propTypes = {
  /**
   * Assistive text for percentage
   */
  assistiveText: _propTypes2.default.shape({
    percentage: _propTypes2.default.string
  }),

  /**
   * Steps in the component
   */
  children: _propTypes2.default.node,

  /**
   * CSS class names to be added to the container element.
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * HTML id for component.
   */
  id: _propTypes2.default.string.isRequired,

  /**
   * Percentage of progress completion, ranging [0, 100]
   */
  value: _propTypes2.default.string.isRequired,

  /**
   * Determines component style
   */
  variant: _propTypes2.default.oneOf(['base', 'modal'])
};
/**
 * Progress renders all step buttons and a container wrapping these buttongs and a progress bar
 */

var Progress =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Progress, _React$Component);

  function Progress() {
    _classCallCheck(this, Progress);

    return _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
  }

  _createClass(Progress, [{
    key: "getId",

    /**
     * Get the progress's HTML id. Generate a new one if no ID present.
     */
    value: function getId() {
      return this.props.id;
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        id: this.getId(),
        className: (0, _classnames2.default)('slds-progress', {
          'slds-progress_shade': this.props.variant === 'modal'
        }, this.props.className)
      }, _react2.default.createElement("ol", {
        className: "slds-progress__list"
      }, this.props.children), _react2.default.createElement(_progressBar2.default, {
        value: this.props.value,
        assistiveText: this.props.assistiveText
      }));
    }
  }]);

  return Progress;
}(_react2.default.Component);

Progress.propTypes = propTypes;
Progress.displayName = _constants.PROGRESS_INDICATOR_PROGRESS;
exports.default = Progress;