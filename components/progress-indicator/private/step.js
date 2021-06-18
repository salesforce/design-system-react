"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _tooltip = _interopRequireDefault(require("../../tooltip"));

var _constants = require("../../../utilities/constants");

var _buttonIcon = _interopRequireDefault(require("../../icon/button-icon"));

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

// ### Display Name
var displayName = _constants.PROGRESS_INDICATOR_STEP; // ### Prop Types

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `completedStep`: Label for a completed step. The default is `Completed Step`
   * * `disabledStep`: Label for disabled step. The default is `Disabled Step`
   * * `errorStep`: Label for a step with an error. The default is `Error Step`
   * * `percentage`: Label for Progress Bar. The default is `Progress: [this.props.value]%`. You will need to calculate the percentage yourself if changing this string.
   * * `step`: Label for a step. It will be typically followed by the number of the step such as "Step 1".
   */
  assistiveText: _propTypes.default.shape({
    completedStep: _propTypes.default.string,
    disabledStep: _propTypes.default.string,
    percentage: _propTypes.default.string,
    step: _propTypes.default.string
  }),

  /**
   * Id for Steps, ranging in [0, steps.length).
   */
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Index of step. Used for id's if no step ID exists
   */
  index: _propTypes.default.number,

  /**
   * Determines if the step has been completed
   */
  isCompleted: _propTypes.default.bool,

  /**
   * Determines if the step has been disabled
   */
  isDisabled: _propTypes.default.bool,

  /**
   * Determines if the step contains an error
   */
  isError: _propTypes.default.bool,

  /**
   * Determines if the step is currently selected (active)
   */
  isSelected: _propTypes.default.bool,

  /**
   * Label of tooltip attached to the step if applicable.
   */
  label: _propTypes.default.node,

  /**
   * Triggered when click on individual steps. By default, it receives an event and returns all info passed to that step.
   * users are able to re-define it by passing a function as a prop
   */
  onClick: _propTypes.default.func,

  /**
   * Triggered when focus on individual steps. By default, it receives an event and returns all info passed to that step.
   * users are able to re-define it by passing a function as a prop
   */
  onFocus: _propTypes.default.func,

  /**
   * Step object. This is passed into event callbacks.
   */
  step: _propTypes.default.object,

  /**
   * Determines if the tooltip attached to step is always open.
   * This is mainly for dev test purpose.
   * Usually the tooltip should only show when hover.
   */
  tooltipIsOpen: _propTypes.default.bool,

  /**
   * Please select one of the following:
   * * `absolute` - (default if `variant` is `modal`) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - (default if `variant` is `base`) The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  tooltipPosition: _propTypes.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative'])
};
/**
 * Step renders a button icon and its tooltip if applied.
 * The button is applied with different css classes under different conditions.
 * Button icons have 4 types of status: completed (success), active (in progress), error (warning) and uncompleted (not approached)
 */

var Step = /*#__PURE__*/function (_React$Component) {
  _inherits(Step, _React$Component);

  var _super = _createSuper(Step);

  function Step() {
    _classCallCheck(this, Step);

    return _super.apply(this, arguments);
  }

  _createClass(Step, [{
    key: "buttonIcon",
    value:
    /**
     * buttonIcon represents the button icon used for each step.
     * the button is applied with different css classes under different conditions.
     */
    function buttonIcon(renderIcon, status, props) {
      var data = {
        isSelected: props.isSelected,
        isError: props.isError,
        isCompleted: props.isCompleted,
        isDisabled: props.isDisabled,
        step: props.step
      };
      var icon = renderIcon ? /*#__PURE__*/_react.default.createElement(_buttonIcon.default, {
        category: "utility",
        name: this.props.isError ? 'error' : 'success'
      }) : null;

      var handleClick = function handleClick(event) {
        return props.onClick(event, data);
      };

      var handleFocus = function handleFocus(event) {
        return props.onFocus(event, data);
      };

      var stepButton = props.isDisabled ? /*#__PURE__*/_react.default.createElement("a", {
        className: (0, _classnames.default)('slds-button', {
          'slds-button_icon': renderIcon
        }, 'slds-progress__marker', {
          'slds-progress__marker_icon': renderIcon
        }, 'slds-is-disabled'),
        "aria-disabled": true,
        "aria-describedby": "progress-indicator-tooltip-".concat(this.props.step.id || this.props.index),
        style: {
          cursor: 'not-allowed'
        },
        tabIndex: 0,
        role: "button"
      }, icon, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, this.props.step.assistiveText || /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "".concat(props.assistiveText.step, " ").concat(props.index + 1, ": "), props.step.label, "- ".concat(status)))) : /*#__PURE__*/_react.default.createElement("button", {
        className: (0, _classnames.default)('slds-button', {
          'slds-button_icon': renderIcon
        }, 'slds-progress__marker', {
          'slds-progress__marker_icon': renderIcon
        }),
        onClick: handleClick,
        onFocus: handleFocus,
        "aria-describedby": "progress-indicator-tooltip-".concat(this.props.step.id || this.props.index),
        "aria-current": this.props.isSelected ? 'step' : null,
        type: "button"
      }, icon, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, this.props.step.assistiveText || /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "".concat(props.assistiveText.step, " ").concat(props.index + 1, ": "), props.step.label, status ? " - ".concat(status) : '')));
      return stepButton;
    }
  }, {
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

      var tooltipProps = {
        align: 'top',
        id: "progress-indicator-tooltip-".concat(this.props.step.id || this.props.index),
        content: this.props.step.label,
        theme: 'info',
        position: this.props.tooltipPosition,
        triggerStyle: {
          display: !renderIcon ? 'flex' : ''
        }
      }; // This is mainly for dev test purpose.
      // `isOpen` is only set to true if tooltip is specified to be open
      // Do not set isOpen to false or undefined otherwise, because that will
      // disable any interaction with tooltips

      if (this.props.tooltipIsOpen) {
        tooltipProps.isOpen = true;
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        className: (0, _classnames.default)('slds-progress__item', {
          'slds-is-completed': this.props.isCompleted,
          'slds-is-active': this.props.isSelected && !this.props.isError,
          'slds-has-error': this.props.isError
        })
      }, /*#__PURE__*/_react.default.createElement(_tooltip.default, tooltipProps, this.buttonIcon(renderIcon, status, this.props)));
    }
  }]);

  return Step;
}(_react.default.Component);

Step.propTypes = propTypes;
Step.displayName = displayName;
var _default = Step; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;