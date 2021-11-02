"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.find"));

var _shortid = _interopRequireDefault(require("shortid"));

var _constants = require("../../utilities/constants");

var _step = _interopRequireDefault(require("./private/step"));

var _progress = _interopRequireDefault(require("./private/progress"));

var _stepVertical = _interopRequireDefault(require("./private/step-vertical"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var displayName = _constants.PROGRESS_INDICATOR;
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
   * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Stores all completed steps. It is an array of step objects.
   */
  completedSteps: _propTypes.default.array,

  /**
   * Stores all disabled steps. It is an array of step objects. Steps are still clickable/focusable,
   * this only disables cursor change and removes onClick and onFocus event callbacks.
   */
  disabledSteps: _propTypes.default.array,

  /**
   * Stores all error steps. It is an array of step objects and usually there is only one error step, the current step. If an error occurs a second error icon should be placed to the left of related confirmation buttons (e.g. Cancel, Save) and an Error Popover should appear indicating there are errors. These additional items are NOT part of this component. This note was included for visibility purposes. Please refer to [SLDS website](https://www.lightningdesignsystem.com/components/progress-indicator/) for full details **
   */
  errorSteps: _propTypes.default.array,

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * Determines the orientation of the progress indicator
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * Triggered when an individual step is clicked. By default, it receives an event and returns step state and the step object clicked: `{ isCompleted, isDisabled, isError, isSelected, step }`. Users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the callback result.
   * ```
   * const handleStepClick = function(event, data) { console.log(data); };
   *   <ProgressIndicator onStepClick={handleStepClick} />
   * ```
   */
  onStepClick: _propTypes.default.func,

  /**
   * Triggered when an individual step is focused. By default, it receives an event and returns step state and the step object clicked: `{ isCompleted, isDisabled, isError, isSelected, step }`. Users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the callback result.
   * ```
   * const handleStepFocus = function(event, data) { console.log(data); };
   *   <ProgressIndicator onStepFocus={handleStepFocus} />
   * ```
   */
  onStepFocus: _propTypes.default.func,

  /**
   * Represents the currently selected or active step. It is a step object.
   */
  selectedStep: _propTypes.default.object.isRequired,

  /**
   * It is an array of step objects in the following form:
   * ```
   *  [{
   *    id: <PropTypes.number> or <PropTypes.string>, has to be unique
   *    label: <PropTypes.string>, representing the tooltip content
   *    assistiveText: <PropTypes.string>, The default is `[Step props.index + 1]: [status]`. Status is if the step has been completed or in an error state.
   *  }],
   *  ```
   */
  steps: _propTypes.default.array.isRequired,

  /**
   * Stores all steps with opened tooltips. This property is mainly for development purposes. The tooltip should only show on hover for the user.
   */
  tooltipIsOpenSteps: _propTypes.default.array,

  /**
   * Determines component style.
   */
  variant: _propTypes.default.oneOf(['base', 'modal', 'setup-assistant']),

  /**
   * Please select one of the following:
   * * `absolute` - (default if `variant` is `modal`) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - (default if `variant` is `base`) The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  tooltipPosition: _propTypes.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative'])
};
var defaultSteps = [{
  id: 0,
  label: 'tooltip label #1'
}, {
  id: 1,
  label: 'tooltip label #2'
}, {
  id: 2,
  label: 'tooltip label #3'
}, {
  id: 3,
  label: 'tooltip label #4'
}, {
  id: 4,
  label: 'tooltip label #5'
}];
var defaultProps = {
  assistiveText: {
    completedStep: 'Completed',
    disabledStep: 'Disabled',
    errorStep: 'Error',
    step: 'Step'
  },
  errorSteps: [],
  completedSteps: [],
  disabledSteps: [],
  orientation: 'horizontal',
  selectedStep: defaultSteps[0],
  variant: 'base',
  // click/focus callbacks by default do nothing
  onStepClick: function onStepClick() {},
  onStepFocus: function onStepFocus() {}
};
/**
 * Check if `steps` prop is valid
 */

function checkSteps(steps) {
  var isStepsDefined = steps !== undefined;

  var isLabelDefined = function isLabelDefined(step) {
    return step.label !== undefined;
  };

  var stepLabelsDefined = Array.isArray(steps) && steps.every(isLabelDefined);
  return isStepsDefined && stepLabelsDefined;
}
/**
 * Check if an item is from an array of items.
 * If items argument is not an array, it will be treated as an object comparison between item & items.
 */


function findStep(item, items) {
  if (!item || !items) return false;
  var itemsArray = !Array.isArray(items) ? [items] : items;
  return !!(0, _lodash.default)(itemsArray, function (arrayItem) {
    if (arrayItem === item) {
      return true;
    }

    if (arrayItem.id !== undefined && item.id !== undefined) {
      return arrayItem.id === item.id;
    }

    return JSON.stringify(arrayItem) === JSON.stringify(item);
  });
}
/**
 * Progress Indicator is a component that communicates to the user the progress of a particular process.
 */


var ProgressIndicator = /*#__PURE__*/function (_React$Component) {
  _inherits(ProgressIndicator, _React$Component);

  var _super = _createSuper(ProgressIndicator);

  function ProgressIndicator(props) {
    var _this;

    _classCallCheck(this, ProgressIndicator);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(ProgressIndicator, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
    }
    /**
     * Get the progress indicator's HTML id. Generate a new one if no ID present.
     */

  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "getSteps",
    value: function getSteps() {
      // check if passed steps are valid
      return checkSteps(this.props.steps) ? this.props.steps : defaultSteps;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // Merge objects of strings with their default object
      var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), this.props.assistiveText);

      var _this$props = this.props,
          selectedStep = _this$props.selectedStep,
          disabledSteps = _this$props.disabledSteps,
          errorSteps = _this$props.errorSteps,
          completedSteps = _this$props.completedSteps;
      /** 1. preparing data */

      var allSteps = this.getSteps();
      var currentStep = 0; // find index for the current step
      // eslint-disable-next-line fp/no-loops

      for (var i = 0; i < allSteps.length; i += 1) {
        // assign step an id if it does not have one
        if (allSteps[i].id === undefined) {
          allSteps[i].id = i;
        }

        if (findStep(allSteps[i], this.props.selectedStep)) {
          currentStep = i;
        }
      }

      var orientation = this.props.variant === 'setup-assistant' ? 'vertical' : this.props.orientation; // Set default tooltipPosition

      var tooltipPosition = this.props.tooltipPosition || (this.props.variant === 'modal' ? 'absolute' : 'overflowBoundaryElement');
      var StepComponent = orientation === 'vertical' ? _stepVertical.default : _step.default;
      /** 2. return DOM */

      return /*#__PURE__*/_react.default.createElement(_progress.default, {
        assistiveText: assistiveText,
        id: this.getId(),
        orientation: orientation,
        value: currentStep === 0 ? '0' : "".concat(100 * (currentStep / (allSteps.length - 1))),
        variant: this.props.variant,
        className: this.props.className
      }, allSteps.map(function (step, i) {
        return /*#__PURE__*/_react.default.createElement(StepComponent, {
          assistiveText: assistiveText,
          key: "".concat(_this2.getId(), "-").concat(step.id),
          id: _this2.getId(),
          index: i,
          isSelected: findStep(step, selectedStep),
          isDisabled: findStep(step, disabledSteps),
          isError: findStep(step, errorSteps),
          isCompleted: findStep(step, completedSteps),
          onClick: _this2.props.onStepClick,
          onFocus: _this2.props.onStepFocus,
          step: step,
          tooltipIsOpen: findStep(step, _this2.props.tooltipIsOpenSteps),
          tooltipPosition: tooltipPosition,
          variant: _this2.props.variant
        });
      }));
    }
  }]);

  return ProgressIndicator;
}(_react.default.Component);

ProgressIndicator.displayName = displayName;
ProgressIndicator.propTypes = propTypes;
ProgressIndicator.defaultProps = defaultProps;
var _default = ProgressIndicator;
exports.default = _default;