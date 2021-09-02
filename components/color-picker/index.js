"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _shortid = _interopRequireDefault(require("shortid"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _customColor = _interopRequireDefault(require("./private/custom-color"));

var _swatch = _interopRequireDefault(require("./private/swatch"));

var _swatchPicker = _interopRequireDefault(require("./private/swatch-picker"));

var _button = _interopRequireDefault(require("../button"));

var _input = _interopRequireDefault(require("../input"));

var _tabs = _interopRequireDefault(require("../tabs"));

var _panel = _interopRequireDefault(require("../tabs/panel"));

var _popover = _interopRequireDefault(require("../popover"));

var _color = _interopRequireDefault(require("../../utilities/color"));

var _constants = require("../../utilities/constants");

var _component = _interopRequireDefault(require("./component.json"));

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

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * * `label`: Visually hidden label but read out loud by screen readers.
   * * `hueSlider`: Instructions for hue selection input
   * * `saturationValueGrid`: Instructions for using the grid for saturation
   * and value selection
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string,
    hueSlider: _propTypes.default.string,
    saturationValueGrid: _propTypes.default.string
  }),

  /**
   * CSS classes to be added to tag with `.slds-color-picker`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * CSS classes to be added to tag with `.slds-popover`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
   */
  classNameMenu: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Unique ID for component.
   */
  id: _propTypes.default.string,

  /**
   * Disables the input and button.
   */
  disabled: _propTypes.default.bool,

  /**
   * Message to display when the outer input is in an error state. When this is present, also visually highlights the component as in error.
   */
  errorText: _propTypes.default.string,

  /**
   * Message to display when the custom tab input is in an error state. When this is present, also visually highlights the component as in error.
   */
  errorTextWorkingColor: _propTypes.default.string,

  /**
   * Event Callbacks
   * * `onChange`: This function is triggered when done is clicked. This function returns `{event, { color: [string] }}`, which is a hex representation of the color.
   * * `onClose`: This function is triggered when the menu is closed. This function returns `{event, { trigger, componentWillUnmount }}`. Trigger can have the values `cancel`, `clickOutside`, or `newPopover`.
   * * `onOpen`: This function is triggered when the color-picker menu is mounted and added to the DOM. The parameters are `event, { portal: }`. `portal` can be used as a React tree root node.
   * * `onRequestClose`:  This function is triggered when the user clicks outside the menu or clicks the close button. You will want to define this if color-picker is to be a controlled component. Most of the time you will want to set `isOpen` to `false` when this is triggered unless you need to validate something.
   * 						This function returns `{event, {trigger: [string]}}` where `trigger` is either `cancel` or `clickOutside`.
   * * `onRequestOpen`: Function called when the color-picker menu would like show.
   * * `onValidateColor`: Function that overwrites default color validator and called when validating HEX color on outer input change. If callback returns false, errorText is shown if set.
   * * `onValidateWorkingColor`: Function that overwrites default color validator and called when validating HEX color on custom tab inner input change. If callback returns false, errorTextWorkingColor is shown if set.
   * * `onWorkingColorChange`: This function is triggered when working color changes (color inside the custom tab). This function returns `{event, { color: [string] }}`, which is a hex representation of the color.
   * _Tested with Mocha framework._
   */
  events: _propTypes.default.shape({
    onChange: _propTypes.default.func,
    onClose: _propTypes.default.func,
    onOpen: _propTypes.default.func,
    onRequestClose: _propTypes.default.func,
    onRequestOpen: _propTypes.default.func,
    onValidateColor: _propTypes.default.func,
    onValidateWorkingColor: _propTypes.default.func,
    onWorkingColorChange: _propTypes.default.func
  }),

  /**
   * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
   */
  hasStaticAlignment: _propTypes.default.bool,

  /**
   * Hides the text input
   */
  hideInput: _propTypes.default.bool,

  /**
   * Popover open state
   */
  isOpen: _propTypes.default.bool,

  /**
   * **Text labels for internationalization**
   * * `blueAbbreviated`: One letter abbreviation of blue color component
   * * `cancelButton`: Text for cancel button on popover
   * * `customTab`: Text for custom tab of popover
   * * `customTabActiveWorkingColorSwatch`: Label for custom tab active working color swatch
   * * `customTabTransparentSwatch`: Label for custom tab active transparent swatch
   * * `greenAbbreviated`: One letter abbreviation of green color component
   * * `hexLabel`: Label for input of hexadecimal color
   * * `invalidColor`: Error message when hex color input is invalid
   * * `invalidComponent`: Error message when a component input is invalid
   * * `label`: An `input` label as for a `form`
   * * `redAbbreviated`: One letter abbreviation of red color component
   * * `swatchTab`: Label for swatch tab of popover
   * * `submitButton`: Text for submit/done button of popover
   */
  labels: _propTypes.default.shape({
    blueAbbreviated: _propTypes.default.string,
    cancelButton: _propTypes.default.string,
    customTab: _propTypes.default.string,
    customTabActiveWorkingColorSwatch: _propTypes.default.string,
    customTabTransparentSwatch: _propTypes.default.string,
    greenAbbreviated: _propTypes.default.string,
    hexLabel: _propTypes.default.string,
    invalidColor: _propTypes.default.string,
    invalidComponent: _propTypes.default.string,
    label: _propTypes.default.string,
    redAbbreviated: _propTypes.default.string,
    swatchTab: _propTypes.default.string,
    swatchTabTransparentSwatch: _propTypes.default.string,
    submitButton: _propTypes.default.string
  }),

  /**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  menuPosition: _propTypes.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),

  /**
   * An array of hex color values which is used to set the options of the
   * swatch tab of the colorpicker popover.
   * To specify transparent, use empty string as a value.
   */
  swatchColors: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * Determines which tab is visible when dialog opens. Use this prop with `base` variant only.
   * Defaults to `swatch` tab.
   */
  defaultSelectedTab: _propTypes.default.oneOf(['swatches', 'custom']),

  /**
   * Selects which tabs are present for the colorpicker.
   * * `base`: both swatches and custom tabs are present
   * * `swatches`: only swatch tab is present
   * * `custom`: only custom tab is present
   * _Tested with snapshot testing._
   */
  variant: _propTypes.default.oneOf(['base', 'swatches', 'custom']),

  /**
   * Current color in hexadecimal string, including # sign (eg: "#000000")
   */
  value: _propTypes.default.string,

  /**
   * Current working color in hexadecimal string, including # sign (eg: "#000000")
   */
  valueWorking: _propTypes.default.string
};
var defaultProps = {
  assistiveText: {
    saturationValueGrid: 'Use arrow keys to select a saturation and brightness, on an x and y axis.',
    hueSlider: 'Select Hue'
  },
  events: {},
  labels: {
    blueAbbreviated: 'B',
    cancelButton: 'Cancel',
    customTab: 'Custom',
    customTabActiveWorkingColorSwatch: 'Working Color',
    customTabTransparentSwatch: 'Transparent Swatch',
    greenAbbreviated: 'G',
    hexLabel: 'Hex',
    invalidColor: 'The color entered is invalid',
    invalidComponent: 'The value needs to be an integer from 0-255',
    redAbbreviated: 'R',
    submitButton: 'Done',
    swatchTab: 'Default',
    swatchTabTransparentSwatch: 'Transparent Swatch'
  },
  menuPosition: 'absolute',
  swatchColors: ['#e3abec', '#c2dbf7', '#9fd6ff', '#9de7da', '#9df0c0', '#fff099', '#fed49a', '#d073e0', '#86baf3', '#5ebbff', '#44d8be', '#3be282', '#ffe654', '#ffb758', '#bd35bd', '#5779c1', '#5679c0', '#00aea9', '#3cba4c', '#f5bc25', '#f99221', '#580d8c', '#001970', '#0a2399', '#0b7477', '#0b6b50', '#b67e11', '#b85d0d', ''],
  defaultSelectedTab: 'swatches',
  variant: 'base'
};
/**
 * The Unified Color Picker component allows for a fully accessible and configurable color picker, allowing the user to pick from a set of predefined colors (swatches), or to pick a custom color using a HSB selection interface. It can be configured to show one or both of those color selection interfaces. View [component blueprint guidelines](https://lightningdesignsystem.com/components/color-picker/).
 */

var ColorPicker = /*#__PURE__*/function (_React$Component) {
  _inherits(ColorPicker, _React$Component);

  var _super = _createSuper(ColorPicker);

  function ColorPicker(props) {
    var _this;

    _classCallCheck(this, ColorPicker);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleSwatchChange", function (event) {
      _this.setWorkingColor(event, {
        hex: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnRequestClose", function (event, _ref) {
      var trigger = _ref.trigger;

      if (trigger === 'clickOutside' || trigger === 'cancel') {
        _this.handleCancelState();
      }

      if (_this.props.onRequestClose) {
        _this.props.onRequestClose(event, {
          trigger: trigger
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (event) {
      _this.handleCancelButtonClick(event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function (event) {
      _this.handleCancelState();

      if (_this.props.onRequestClose) {
        _this.props.onRequestClose(event, {
          trigger: 'cancel'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancelState", function () {
      var workingColor = _color.default.getNewColor({
        // eslint-disable-next-line react/no-access-state-in-setstate
        hex: _this.state.currentColor
      }, _this.props.events.onValidateWorkingColor);

      _this.setState({
        isOpen: false,
        workingColor: workingColor,
        previousWorkingColor: workingColor
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleHexInputChange", function (event, _ref2) {
      var labels = _ref2.labels;
      var currentColor = event.target.value;

      var namedColorHex = _color.default.getHexFromNamedColor(currentColor);

      var isValid = false;

      if (_this.props.events.onValidateColor) {
        isValid = _this.props.events.onValidateColor(currentColor);
      } else {
        isValid = namedColorHex ? true : _color.default.isValidHex(currentColor);
      }

      _this.setState({
        currentColor: currentColor,
        workingColor: _color.default.getNewColor({
          hex: namedColorHex || currentColor,
          name: namedColorHex ? currentColor.toLowerCase() : null
        }, _this.props.events.onValidateWorkingColor),
        colorErrorMessage: isValid ? '' : labels.invalidColor
      });

      if (_this.props.events.onChange) {
        _this.props.events.onChange(event, {
          color: currentColor,
          isValid: isValid
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSaturationValueChange", function (event, _ref3) {
      var saturation = _ref3.saturation,
          value = _ref3.value;

      _this.setWorkingColor(event, {
        saturation: saturation,
        value: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmitButtonClick", function (event) {
      _this.setState({
        isOpen: false,
        // eslint-disable-next-line react/no-access-state-in-setstate
        currentColor: _this.state.workingColor.hex,
        colorErrorMessage: ''
      });

      if (_this.props.events.onChange) {
        _this.props.events.onChange(event, {
          color: _this.state.workingColor.hex,
          isValid: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSwatchButtonClick", function () {
      var workingColor = _color.default.getNewColor({
        // eslint-disable-next-line react/no-access-state-in-setstate
        hex: _this.state.workingColor.hex
      }, _this.props.events.onValidateWorkingColor);

      _this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        isOpen: !_this.state.isOpen,
        workingColor: workingColor,
        // eslint-disable-next-line react/no-access-state-in-setstate
        previousWorkingColor: _this.state.previousWorkingColor
      });

      if (_this.props.onRequestOpen) {
        _this.props.onRequestOpen();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSwatchSelect", function (event, _ref4) {
      var hex = _ref4.hex;

      _this.setWorkingColor(event, {
        hex: hex
      });
    });

    _this.generatedId = props.id || _shortid.default.generate();

    var _workingColor = _color.default.getNewColor({
      hex: props.valueWorking || props.value
    }, props.events.onValidateWorkingColor);

    _this.state = {
      currentColor: props.value != null ? props.value : '',
      disabled: props.disabled,
      isOpen: props.isOpen,
      workingColor: _workingColor,
      previousWorkingColor: _workingColor,
      colorErrorMessage: props.errorText
    };
    (0, _checkProps.default)(_constants.COLOR_PICKER, props, _component.default);
    return _this;
  }

  _createClass(ColorPicker, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // The following are only present to allow props to update the state if they get out of sync (for instance, the external store is updated).
      var nextState = {};

      if (this.props.value !== prevProps.value) {
        nextState.currentColor = this.props.value;
      }

      if (this.props.valueWorking !== prevProps.valueWorking) {
        nextState.workingColor = _color.default.getNewColor({
          hex: this.props.valueWorking
        }, this.props.events.onValidateWorkingColor);
      }

      if (this.props.disabled !== prevProps.disabled) {
        nextState.disabled = this.props.disabled;
      }

      if (Object.entries(nextState).length !== 0) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState(nextState);
      }
    }
  }, {
    key: "getInput",
    value: function getInput(_ref5) {
      var _this2 = this;

      var labels = _ref5.labels;
      return this.props.hideInput ? null : /*#__PURE__*/_react.default.createElement(_input.default, {
        "aria-describedby": !this.state.isOpen && this.state.colorErrorMessage ? "color-picker-summary-error-".concat(this.generatedId) : undefined,
        className: (0, _classnames.default)('slds-color-picker__summary-input', 'slds-align-top', {
          'slds-has-error': !!this.state.colorErrorMessage
        }),
        disabled: this.props.disabled,
        id: "color-picker-summary-input-".concat(this.generatedId),
        onChange: function onChange(event) {
          _this2.handleHexInputChange(event, {
            labels: labels
          });
        },
        value: this.state.currentColor
      });
    }
  }, {
    key: "getDefaultTab",
    value: function getDefaultTab(_ref6) {
      var labels = _ref6.labels;
      return (this.props.variant === 'base' || this.props.variant === 'swatches') && /*#__PURE__*/_react.default.createElement(_panel.default, {
        label: labels.swatchTab
      }, /*#__PURE__*/_react.default.createElement(_swatchPicker.default, {
        color: this.state.workingColor,
        labels: labels,
        onSelect: this.handleSwatchSelect,
        swatchColors: this.props.swatchColors
      }));
    }
  }, {
    key: "getCustomTab",
    value: function getCustomTab(_ref7) {
      var labels = _ref7.labels;
      return (this.props.variant === 'base' || this.props.variant === 'custom') && /*#__PURE__*/_react.default.createElement(_panel.default, {
        label: labels.customTab
      }, /*#__PURE__*/_react.default.createElement(_customColor.default, {
        assistiveText: this.props.assistiveText,
        id: this.generatedId,
        color: this.state.workingColor,
        errorTextWorkingColor: this.props.errorTextWorkingColor,
        previousColor: this.state.previousWorkingColor,
        labels: labels,
        onBlueChange: this.handleColorChange('blue'),
        onGreenChange: this.handleColorChange('green'),
        onHexChange: this.handleColorChange('hex'),
        onHueChange: this.handleColorChange('hue'),
        onRedChange: this.handleColorChange('red'),
        onSwatchChange: this.handleSwatchChange,
        onSaturationValueChange: this.handleSaturationValueChange,
        onSaturationNavigate: this.handleNavigate('saturation'),
        onValueNavigate: this.handleNavigate('value')
      }));
    }
  }, {
    key: "getPopover",
    value: function getPopover(_ref8) {
      var labels = _ref8.labels;

      var popoverBody = /*#__PURE__*/_react.default.createElement(_tabs.default, {
        id: "color-picker-tabs-".concat(this.generatedId),
        defaultSelectedIndex: this.props.defaultSelectedTab === 'custom' ? 1 : 0
      }, this.getDefaultTab({
        labels: labels
      }), this.getCustomTab({
        labels: labels
      }));

      var popoverFooter = /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-color-picker__selector-footer"
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        className: "slds-color-picker__selector-cancel",
        id: "color-picker-footer-cancel-".concat(this.generatedId),
        label: labels.cancelButton,
        onClick: this.handleCancel,
        variant: "neutral"
      }), /*#__PURE__*/_react.default.createElement(_button.default, {
        className: "slds-color-picker__selector-submit",
        disabled: Object.keys(this.state.workingColor.errors || {}).length > 0,
        id: "color-picker-footer-submit-".concat(this.generatedId),
        label: labels.submitButton,
        onClick: this.handleSubmitButtonClick,
        variant: "brand"
      }));

      return /*#__PURE__*/_react.default.createElement(_popover.default, {
        ariaLabelledby: "color-picker-label-".concat(this.generatedId),
        align: "bottom left",
        body: popoverBody,
        className: (0, _classnames.default)('slds-color-picker__selector', this.props.classNameMenu),
        footer: popoverFooter,
        hasNoCloseButton: true,
        hasNoNubbin: true,
        hasStaticAlignment: this.props.hasStaticAlignment,
        id: "slds-color-picker__selector-".concat(this.generatedId),
        isOpen: this.state.isOpen,
        onClose: this.props.onClose,
        onOpen: this.props.onOpen,
        onRequestClose: this.handleOnRequestClose,
        position: this.props.menuPosition
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        className: "slds-color-picker__summary-button",
        disabled: this.props.disabled,
        iconClassName: "slds-m-left_xx-small",
        iconPosition: "right",
        iconVariant: "more",
        id: "slds-color-picker__summary-button-".concat(this.generatedId),
        label: /*#__PURE__*/_react.default.createElement(_swatch.default, {
          color: this.state.currentColor,
          labels: labels
        }),
        onClick: this.handleSwatchButtonClick,
        variant: "icon"
      }));
    }
  }, {
    key: "setWorkingColor",
    value: function setWorkingColor(event, color) {
      var newColor = _color.default.getNewColor(color, this.props.events.onValidateWorkingColor, // eslint-disable-next-line react/no-access-state-in-setstate
      this.state.workingColor);

      this.setState({
        workingColor: newColor,
        // eslint-disable-next-line react/no-access-state-in-setstate
        previousWorkingColor: this.state.workingColor
      });

      if (this.props.events.onWorkingColorChange) {
        this.props.events.onWorkingColorChange(event, {
          color: newColor
        });
      }
    }
  }, {
    key: "handleColorChange",
    value: function handleColorChange(property) {
      var _this3 = this;

      return function (event) {
        var colorProperties = {};
        colorProperties[property] = event.target.value;

        _this3.setWorkingColor(event, colorProperties);
      };
    }
  }, {
    key: "handleNavigate",
    value: function handleNavigate(property) {
      var _this4 = this;

      return function (event, _ref9) {
        var delta = _ref9.delta;
        var colorProperties = {};
        colorProperties[property] = delta;

        var newColor = _color.default.getDeltaColor(colorProperties, _this4.props.events.onValidateWorkingColor, // eslint-disable-next-line react/no-access-state-in-setstate
        _this4.state.workingColor);

        _this4.setState({
          workingColor: newColor,
          // eslint-disable-next-line react/no-access-state-in-setstate
          previousWorkingColor: _this4.state.workingColor
        });

        if (_this4.props.events.onWorkingColorChange) {
          _this4.props.events.onWorkingColorChange(event, {
            color: newColor
          });
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-color-picker', this.props.className),
        ref: function ref(node) {
          _this5.wrapper = node;
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-color-picker__summary"
      }, /*#__PURE__*/_react.default.createElement("label", {
        className: (0, _classnames.default)('slds-color-picker__summary-label', this.props.assistiveText.label ? 'slds-assistive-text' : ''),
        htmlFor: !this.props.hideInput ? "color-picker-summary-input-".concat(this.generatedId) : undefined,
        id: "color-picker-label-".concat(this.generatedId)
      }, this.props.assistiveText.label ? this.props.assistiveText.label : labels.label), this.getPopover({
        labels: labels
      }), this.getInput({
        labels: labels
      }), !this.state.isOpen && this.state.colorErrorMessage ? /*#__PURE__*/_react.default.createElement("p", {
        className: "slds-form-error",
        id: "color-picker-summary-error-".concat(this.generatedId)
      }, this.state.colorErrorMessage) : ''));
    }
  }]);

  return ColorPicker;
}(_react.default.Component);

_defineProperty(ColorPicker, "displayName", _constants.COLOR_PICKER);

_defineProperty(ColorPicker, "propTypes", propTypes);

_defineProperty(ColorPicker, "defaultProps", defaultProps);

var _default = ColorPicker;
exports.default = _default;