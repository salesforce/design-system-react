"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../../utilities/constants");

var _icon = _interopRequireDefault(require("../../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ### Display Name
var displayName = _constants.PROGRESS_INDICATOR_STEP_VERTICAL; // ### Prop Types

var propTypes = {
  /**
   * Index of step. Used for id's if no step ID exists
   */
  index: _propTypes.default.number,

  /**
   * Determines if the step has been completed
   */
  isCompleted: _propTypes.default.bool,

  /**
   * Determines if the step contains an error
   */
  isError: _propTypes.default.bool,

  /**
   * Determines if the step is currently selected (active)
   */
  isSelected: _propTypes.default.bool,

  /**
   * Step object. This is passed into event callbacks.
   */
  step: _propTypes.default.object,

  /**
   * The variant of the parent progress indicator
   */
  variant: _propTypes.default.string
};
/**
 * StepVertical renders a step icon and its step label if applied
 */

var StepVertical =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StepVertical, _React$Component);

  function StepVertical() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StepVertical);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StepVertical)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "stepIcon", function (renderIcon) {
      var icon = renderIcon ? _react.default.createElement(_icon.default, {
        category: "utility",
        size: "x-small",
        name: _this.props.isError ? 'error' : 'success'
      }) : null;
      return _react.default.createElement("span", {
        className: (0, _classnames.default)('slds-progress__marker', {
          'slds-progress__marker_icon': renderIcon,
          'slds-progress__marker_icon-success': _this.props.variant === 'setup-assistant' && renderIcon && !_this.props.isError
        })
      }, icon);
    });

    _defineProperty(_assertThisInitialized(_this), "renderStepContent", function () {
      if (_this.props.step.onRenderSetupAssistantAction || _this.props.step.setupAssistantEstimatedTime) {
        return _react.default.createElement("div", {
          id: "progress-indicator-vertical-label-".concat(_this.props.step.id || _this.props.index),
          className: "slds-progress__item_content slds-grid slds-grid_align-spread"
        }, _react.default.createElement("div", {
          className: "slds-size_3-of-4"
        }, _this.props.step.label), _react.default.createElement("div", {
          className: "slds-grid slds-grid_align-end slds-size_1-of-4"
        }, _react.default.createElement("div", {
          className: "slds-media__figure slds-media__figure_reverse"
        }, _this.props.step.onRenderSetupAssistantAction, _this.props.step.setupAssistantEstimatedTime && _react.default.createElement("p", {
          className: "slds-text-align_right slds-text-color_weak slds-p-top_medium"
        }, _this.props.step.setupAssistantEstimatedTime))));
      }

      return _react.default.createElement("div", {
        id: "progress-indicator-vertical-label-".concat(_this.props.step.id || _this.props.index),
        className: "slds-progress__item_content slds-grid slds-grid_align-spread"
      }, _this.props.step.label);
    });

    return _this;
  }

  _createClass(StepVertical, [{
    key: "render",
    value: function render() {
      var renderIcon = this.props.isCompleted || this.props.isError;
      return _react.default.createElement("li", {
        className: (0, _classnames.default)('slds-progress__item', {
          'slds-is-completed': this.props.isCompleted,
          'slds-is-active': this.props.isSelected && !this.props.isError,
          'slds-has-error': this.props.isError
        })
      }, this.stepIcon(renderIcon), this.renderStepContent());
    }
  }]);

  return StepVertical;
}(_react.default.Component);

StepVertical.propTypes = propTypes;
StepVertical.displayName = displayName;
var _default = StepVertical; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;