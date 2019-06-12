"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _shortid = _interopRequireDefault(require("shortid"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var propTypes = {
  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * CSS classes to be added to tag with `.slds-progress-bar`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Label for the progress bar
   */
  labels: _propTypes.default.shape({
    label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
    complete: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node])
  }),

  /**
   *  Set radius of progress bar
   */
  radius: _propTypes.default.oneOf(['circular']),

  /**
   *  Set fill of progress bar
   */
  color: _propTypes.default.oneOf(['success']),

  /**
   *  Set progress bar thickness
   */
  thickness: _propTypes.default.oneOf(['x-small', 'small', 'medium', 'large']),

  /**
   * Percentage of progress completion, ranging [0, 100].
   */
  value: _propTypes.default.number.isRequired
};
var defaultProps = {
  labels: {
    complete: 'Complete'
  }
};
/**
 * A progress bar component communicates to the user the progress of a particular process
 */

var ProgressBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar() {
    _classCallCheck(this, ProgressBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProgressBar).apply(this, arguments));
  }

  _createClass(ProgressBar, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.generatedId = _shortid.default.generate();
    }
    /**
     * ID as a string
     * @returns {string} id
     */

  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
    /**
     * Enables Descriptive Progress Bar if label is provided
     * @returns {string} description
     */

  }, {
    key: "getDescription",
    value: function getDescription(_ref) {
      var labels = _ref.labels;

      if (this.props.labels.label) {
        return _react.default.createElement("div", {
          className: "slds-grid slds-grid_align-spread slds-p-bottom_x-small",
          id: "progress-bar-label-id-4"
        }, _react.default.createElement("span", null, labels.label), _react.default.createElement("span", {
          "aria-hidden": "true"
        }, _react.default.createElement("strong", null, this.props.value, "% ", labels.complete)));
      }

      return '';
    }
  }, {
    key: "render",
    value: function render() {
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);
      return _react.default.createElement("div", {
        id: this.getId()
      }, this.getDescription({
        labels: labels
      }), _react.default.createElement("div", {
        className: (0, _classnames.default)('slds-progress-bar', this.props.radius ? "slds-progress-bar_".concat(this.props.radius) : null, this.props.thickness ? "slds-progress-bar_".concat(this.props.thickness) : null, this.props.className)
      }, _react.default.createElement("span", {
        className: (0, _classnames.default)("slds-progress-bar__value", this.props.color ? "slds-progress-bar__value_".concat(this.props.color) : null),
        style: {
          width: "".concat(this.props.value, "%")
        }
      }, _react.default.createElement("span", {
        className: "slds-assistive-text"
      }, "Progress: ", "".concat(this.props.value, "%")))));
    }
  }]);

  return ProgressBar;
}(_react.default.Component);

ProgressBar.displayName = _constants.PROGRESS_BAR;
ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;
var _default = ProgressBar;
exports.default = _default;