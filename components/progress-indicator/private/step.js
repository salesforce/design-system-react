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

var _tooltip = require("../../tooltip");

var _tooltip2 = _interopRequireDefault(_tooltip);

var _constants = require("../../../utilities/constants");

var _buttonIcon = require("../../icon/button-icon");

var _buttonIcon2 = _interopRequireDefault(_buttonIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  assistiveText: _propTypes2.default.shape({
    completedStep: _propTypes2.default.string,
    disabledStep: _propTypes2.default.string,
    percentage: _propTypes2.default.string,
    step: _propTypes2.default.string
  }),

  /**
   * Id for Steps, ranging in [0, steps.length).
   */
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * Index of step. Used for id's if no step ID exists
   */
  index: _propTypes2.default.number,

  /**
   * Determines if the step has been completed
   */
  isCompleted: _propTypes2.default.bool,

  /**
   * Determines if the step has been disabled
   */
  isDisabled: _propTypes2.default.bool,

  /**
   * Determines if the step contains an error
   */
  isError: _propTypes2.default.bool,

  /**
   * Determines if the step is currently selected (active)
   */
  isSelected: _propTypes2.default.bool,

  /**
   * Label of tooltip attached to the step if applicable.
   */
  label: _propTypes2.default.node,

  /**
   * Triggered when click on individual steps. By default, it receives an event and returns all info passed to that step.
   * users are able to re-define it by passing a function as a prop
   */
  onClick: _propTypes2.default.func,

  /**
   * Triggered when focus on individual steps. By default, it receives an event and returns all info passed to that step.
   * users are able to re-define it by passing a function as a prop
   */
  onFocus: _propTypes2.default.func,

  /**
   * Step object. This is passed into event callbacks.
   */
  step: _propTypes2.default.object,

  /**
   * Determines if the tooltip attached to step is always open.
   * This is mainly for dev test purpose.
   * Usually the tooltip should only show when hover.
   */
  tooltipIsOpen: _propTypes2.default.bool,

  /**
   * Please select one of the following:
   * * `absolute` - (default if `variant` is `modal`) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - (default if `variant` is `base`) The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  tooltipPosition: _propTypes2.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative'])
};
/**
 * Step renders a button icon and its tooltip if applied.
 * The button is applied with different css classes under different conditions.
 * Button icons have 4 types of status: completed (success), active (in progress), error (warning) and uncompleted (not approached)
 */

var Step =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Step, _React$Component);

  function Step() {
    _classCallCheck(this, Step);

    return _possibleConstructorReturn(this, (Step.__proto__ || Object.getPrototypeOf(Step)).apply(this, arguments));
  }

  _createClass(Step, [{
    key: "buttonIcon",

    /**
     * buttonIcon represents the button icon used for each step.
     * the button is applied with different css classes under different conditions.
     */
    value: function buttonIcon(renderIcon, status, props) {
      var data = {
        isSelected: props.isSelected,
        isError: props.isError,
        isCompleted: props.isCompleted,
        isDisabled: props.isDisabled,
        step: props.step
      };
      var icon = renderIcon ? _react2.default.createElement(_buttonIcon2.default, {
        category: "utility",
        name: this.props.isError ? 'error' : 'success'
      }) : null;

      var handleClick = function handleClick(event) {
        return props.onClick(event, data);
      };

      var handleFocus = function handleFocus(event) {
        return props.onFocus(event, data);
      };

      var stepButton = props.isDisabled ? _react2.default.createElement("a", {
        className: (0, _classnames2.default)('slds-button', {
          'slds-button_icon': renderIcon
        }, 'slds-progress__marker', {
          'slds-progress__marker_icon': renderIcon
        }),
        "aria-describedby": "progress-indicator-tooltip-".concat(this.props.step.id || this.props.index),
        tabIndex: 0,
        role: "button"
      }, icon, _react2.default.createElement("span", {
        className: "slds-assistive-text"
      }, this.props.step.assistiveText || "".concat(props.assistiveText.step, " ").concat(props.index + 1, ": ").concat(props.step.label, " - ").concat(status))) : _react2.default.createElement("button", {
        className: (0, _classnames2.default)('slds-button', {
          'slds-button_icon': renderIcon
        }, 'slds-progress__marker', {
          'slds-progress__marker_icon': renderIcon
        }),
        onClick: handleClick,
        onFocus: handleFocus,
        "aria-describedby": "progress-indicator-tooltip-".concat(this.props.step.id || this.props.index),
        "aria-current": this.props.isSelected ? 'step' : null
      }, icon, _react2.default.createElement("span", {
        className: "slds-assistive-text"
      }, this.props.step.assistiveText || "".concat(props.assistiveText.step, " ").concat(props.index + 1, ": ").concat(props.step.label).concat(status ? " - ".concat(status) : '')));
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

      return _react2.default.createElement("li", {
        className: (0, _classnames2.default)('slds-progress__item', {
          'slds-is-completed': this.props.isCompleted,
          'slds-is-active': this.props.isSelected && !this.props.isError,
          'slds-has-error': this.props.isError
        })
      }, _react2.default.createElement(_tooltip2.default, tooltipProps, this.buttonIcon(renderIcon, status, this.props)));
    }
  }]);

  return Step;
}(_react2.default.Component);

Step.propTypes = propTypes;
Step.displayName = displayName;
exports.default = Step; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime