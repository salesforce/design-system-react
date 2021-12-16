"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
   * Triggered when click on individual steps. By default, it receives an event and returns all info passed to that step.
   * users are able to re-define it by passing a function as a prop
   */
  onClick: _propTypes.default.func,

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

var StepVertical = /*#__PURE__*/function (_React$Component) {
  _inherits(StepVertical, _React$Component);

  var _super = _createSuper(StepVertical);

  function StepVertical() {
    var _this;

    _classCallCheck(this, StepVertical);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "stepIcon", function (renderIcon, status, props) {
      var data = {
        isSelected: _this.props.isSelected,
        isError: _this.props.isError,
        isCompleted: _this.props.isCompleted,
        step: _this.props.step
      };
      var icon = renderIcon ? /*#__PURE__*/_react.default.createElement(_icon.default, {
        category: "utility",
        size: "x-small",
        name: _this.props.isError ? 'error' : 'success'
      }) : null;

      var handleClick = function handleClick(event) {
        return _this.props.onClick(event, data);
      };

      return _this.props.onClick ? /*#__PURE__*/_react.default.createElement("button", {
        className: (0, _classnames.default)('slds-button slds-progress__marker', {
          'slds-progress__marker_icon': renderIcon,
          'slds-progress__marker_icon-success': _this.props.variant === 'setup-assistant' && renderIcon && !_this.props.isError
        }),
        type: "button",
        onClick: handleClick
      }, icon, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, _this.props.step.assistiveText || /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "".concat(_this.props.assistiveText.step, " ").concat(_this.props.index + 1, ": "), _this.props.step.label, status ? " - ".concat(status) : ''))) : /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _classnames.default)('slds-progress__marker', {
          'slds-progress__marker_icon': renderIcon,
          'slds-progress__marker_icon-success': _this.props.variant === 'setup-assistant' && renderIcon && !_this.props.isError
        })
      }, icon, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, _this.props.step.assistiveText || /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "".concat(props.assistiveText.step, " ").concat(props.index + 1, ": "), props.step.label, status ? " - ".concat(status) : '')));
    });

    _defineProperty(_assertThisInitialized(_this), "renderStepContent", function () {
      if (_this.props.step.onRenderSetupAssistantAction || _this.props.step.setupAssistantEstimatedTime) {
        return /*#__PURE__*/_react.default.createElement("div", {
          id: "progress-indicator-vertical-label-".concat(_this.props.step.id || _this.props.index),
          className: "slds-progress__item_content slds-grid slds-grid_align-spread"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-size_3-of-4"
        }, _this.props.step.label), /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-grid slds-grid_align-end slds-size_1-of-4"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-media__figure slds-media__figure_reverse"
        }, _this.props.step.onRenderSetupAssistantAction, _this.props.step.setupAssistantEstimatedTime && /*#__PURE__*/_react.default.createElement("p", {
          className: "slds-text-align_right slds-text-color_weak slds-p-top_medium"
        }, _this.props.step.setupAssistantEstimatedTime))));
      }

      return /*#__PURE__*/_react.default.createElement("div", {
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
      var status = '';

      if (this.props.isError) {
        status = this.props.assistiveText.errorStep;
      } else if (this.props.isCompleted) {
        status = this.props.assistiveText.completedStep;
      } else if (this.props.isDisabled) {
        status = this.props.assistiveText.disabledStep;
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        className: (0, _classnames.default)('slds-progress__item', {
          'slds-is-completed': this.props.isCompleted,
          'slds-is-active': this.props.isSelected && !this.props.isError,
          'slds-has-error': this.props.isError
        })
      }, this.stepIcon(renderIcon, status, this.props), this.renderStepContent());
    }
  }]);

  return StepVertical;
}(_react.default.Component);

StepVertical.propTypes = propTypes;
StepVertical.displayName = displayName;
var _default = StepVertical; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;