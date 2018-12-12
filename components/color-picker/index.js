"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _lodash = require("lodash.assign");

var _lodash2 = _interopRequireDefault(_lodash);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _customColor = require("./private/custom-color");

var _customColor2 = _interopRequireDefault(_customColor);

var _swatch = require("./private/swatch");

var _swatch2 = _interopRequireDefault(_swatch);

var _swatchPicker = require("./private/swatch-picker");

var _swatchPicker2 = _interopRequireDefault(_swatchPicker);

var _button = require("../button");

var _button2 = _interopRequireDefault(_button);

var _input = require("../input");

var _input2 = _interopRequireDefault(_input);

var _tabs = require("../tabs");

var _tabs2 = _interopRequireDefault(_tabs);

var _panel = require("../tabs/panel");

var _panel2 = _interopRequireDefault(_panel);

var _popover = require("../popover");

var _popover2 = _interopRequireDefault(_popover);

var _color = require("../../utilities/color");

var _color2 = _interopRequireDefault(_color);

var _constants = require("../../utilities/constants");

var _docs = require("./docs.json");

var _docs2 = _interopRequireDefault(_docs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * * `label`: Visually hidden label but read out loud by screen readers.
   * * `hueSlider`: Instructions for hue selection input
   * * `saturationValueGrid`: Instructions for using the grid for saturation
   * and value selection
   */
  assistiveText: _propTypes2.default.shape({
    label: _propTypes2.default.string,
    hueSlider: _propTypes2.default.string,
    saturationValueGrid: _propTypes2.default.string
  }),

  /**
   * CSS classes to be added to tag with `.slds-color-picker`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * CSS classes to be added to tag with `.slds-popover`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
   */
  classNameMenu: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * Unique ID for component.
   */
  id: _propTypes2.default.string,

  /**
   * Disables the input and button.
   */
  disabled: _propTypes2.default.bool,

  /**
   * Message to display when the outer input is in an error state. When this is present, also visually highlights the component as in error.
   */
  errorText: _propTypes2.default.string,

  /**
   * Message to display when the custom tab input is in an error state. When this is present, also visually highlights the component as in error.
   */
  errorTextWorkingColor: _propTypes2.default.string,

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
  events: _propTypes2.default.shape({
    onChange: _propTypes2.default.func,
    onClose: _propTypes2.default.func,
    onOpen: _propTypes2.default.func,
    onRequestClose: _propTypes2.default.func,
    onRequestOpen: _propTypes2.default.func,
    onValidateColor: _propTypes2.default.func,
    onValidateWorkingColor: _propTypes2.default.func,
    onWorkingColorChange: _propTypes2.default.func
  }),

  /**
   * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
   */
  hasStaticAlignment: _propTypes2.default.bool,

  /**
   * Hides the text input
   */
  hideInput: _propTypes2.default.bool,

  /**
   * Popover open state
   */
  isOpen: _propTypes2.default.bool,

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
  labels: _propTypes2.default.shape({
    blueAbbreviated: _propTypes2.default.string,
    cancelButton: _propTypes2.default.string,
    customTab: _propTypes2.default.string,
    customTabActiveWorkingColorSwatch: _propTypes2.default.string,
    customTabTransparentSwatch: _propTypes2.default.string,
    greenAbbreviated: _propTypes2.default.string,
    hexLabel: _propTypes2.default.string,
    invalidColor: _propTypes2.default.string,
    invalidComponent: _propTypes2.default.string,
    label: _propTypes2.default.string,
    redAbbreviated: _propTypes2.default.string,
    swatchTab: _propTypes2.default.string,
    swatchTabTransparentSwatch: _propTypes2.default.string,
    submitButton: _propTypes2.default.string
  }),

  /**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  menuPosition: _propTypes2.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),

  /**
   * An array of hex color values which is used to set the options of the
   * swatch tab of the colorpicker popover.
   * To specify transparent, use empty string as a value.
   */
  swatchColors: _propTypes2.default.arrayOf(_propTypes2.default.string),

  /**
   * Determines which tab is visible when dialog opens. Use this prop with `base` variant only.
   * Defaults to `swatch` tab.
   */
  defaultSelectedTab: _propTypes2.default.oneOf(['swatches', 'custom']),

  /**
   * Selects which tabs are present for the colorpicker.
   * * `base`: both swatches and custom tabs are present
   * * `swatches`: only swatch tab is present
   * * `custom`: only custom tab is present
   * _Tested with snapshot testing._
   */
  variant: _propTypes2.default.oneOf(['base', 'swatches', 'custom']),

  /**
   * Current color in hexadecimal string, including # sign (eg: "#000000")
   */
  value: _propTypes2.default.string,

  /**
   * Current working color in hexadecimal string, including # sign (eg: "#000000")
   */
  valueWorking: _propTypes2.default.string
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

var ColorPicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ColorPicker, _React$Component);

  function ColorPicker(props) {
    var _this;

    _classCallCheck(this, ColorPicker);

    _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

    _initialiseProps.call(_assertThisInitialized(_this));

    _this.generatedId = _this.props.id || _shortid2.default.generate();

    var workingColor = _color2.default.getNewColor({
      hex: _this.props.valueWorking || _this.props.value
    }, _this.props.events.onValidateWorkingColor);

    _this.state = {
      currentColor: _this.props.value != null ? _this.props.value : '',
      disabled: _this.props.disabled,
      isOpen: _this.props.isOpen,
      workingColor: workingColor,
      previousWorkingColor: workingColor,
      colorErrorMessage: _this.props.errorText
    };
    return _this;
  }

  _createClass(ColorPicker, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      (0, _checkProps2.default)(_constants.COLOR_PICKER, this.props, _docs2.default);
    } // use getDerivedStateFromProps when available

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var nextState = {};

      if (nextProps.value) {
        nextState.currentColor = nextProps.value;
      }

      if (nextProps.valueWorking) {
        nextState.workingColor = _color2.default.getNewColor({
          hex: nextProps.valueWorking
        }, this.props.events.onValidateWorkingColor);
      }

      if (nextProps.disabled !== undefined) {
        nextState.disabled = nextProps.disabled;
      }

      this.setState(nextState);
    }
  }, {
    key: "getInput",
    value: function getInput(_ref) {
      var _this2 = this;

      var labels = _ref.labels;
      return this.props.hideInput ? null : _react2.default.createElement(_input2.default, {
        "aria-describedby": "color-picker-summary-error-".concat(this.generatedId),
        className: (0, _classnames2.default)('slds-color-picker__summary-input', 'slds-align-top', {
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
    value: function getDefaultTab(_ref2) {
      var labels = _ref2.labels;
      return (this.props.variant === 'base' || this.props.variant === 'swatches') && _react2.default.createElement(_panel2.default, {
        label: labels.swatchTab
      }, _react2.default.createElement(_swatchPicker2.default, {
        color: this.state.workingColor,
        labels: labels,
        onSelect: this.handleSwatchSelect,
        swatchColors: this.props.swatchColors
      }));
    }
  }, {
    key: "getCustomTab",
    value: function getCustomTab(_ref3) {
      var labels = _ref3.labels;
      return (this.props.variant === 'base' || this.props.variant === 'custom') && _react2.default.createElement(_panel2.default, {
        label: labels.customTab
      }, _react2.default.createElement(_customColor2.default, {
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
    value: function getPopover(_ref4) {
      var labels = _ref4.labels;

      var popoverBody = _react2.default.createElement(_tabs2.default, {
        id: "color-picker-tabs-".concat(this.generatedId),
        defaultSelectedIndex: this.props.defaultSelectedTab === 'custom' ? 1 : 0
      }, this.getDefaultTab({
        labels: labels
      }), this.getCustomTab({
        labels: labels
      }));

      var popoverFooter = _react2.default.createElement("div", {
        className: "slds-color-picker__selector-footer"
      }, _react2.default.createElement(_button2.default, {
        className: "slds-color-picker__selector-cancel",
        id: "color-picker-footer-cancel-".concat(this.generatedId),
        label: labels.cancelButton,
        onClick: this.handleCancel,
        variant: "neutral"
      }), _react2.default.createElement(_button2.default, {
        className: "slds-color-picker__selector-submit",
        disabled: Object.keys(this.state.workingColor.errors || {}).length > 0,
        id: "color-picker-footer-submit-".concat(this.generatedId),
        label: labels.submitButton,
        onClick: this.handleSubmitButtonClick,
        variant: "brand"
      }));

      return _react2.default.createElement(_popover2.default, {
        ariaLabelledby: "color-picker-label-".concat(this.generatedId),
        align: "bottom left",
        body: popoverBody,
        className: (0, _classnames2.default)('slds-color-picker__selector', this.props.classNameMenu),
        footer: popoverFooter,
        hasStaticAlignment: this.props.hasStaticAlignment,
        id: "slds-color-picker__selector-".concat(this.generatedId),
        isOpen: this.state.isOpen,
        onClose: this.props.onClose,
        onOpen: this.props.onOpen,
        onRequestClose: this.handleOnRequestClose,
        position: this.props.menuPosition
      }, _react2.default.createElement(_button2.default, {
        className: "slds-color-picker__summary-button",
        disabled: this.props.disabled,
        iconClassName: "slds-m-left_xx-small",
        iconPosition: "right",
        iconVariant: "more",
        id: "slds-color-picker__summary-button-".concat(this.generatedId),
        label: _react2.default.createElement(_swatch2.default, {
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
      var newColor = _color2.default.getNewColor(color, this.props.events.onValidateWorkingColor, this.state.workingColor);

      this.setState({
        workingColor: newColor,
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

      return function (event, _ref5) {
        var delta = _ref5.delta;
        var colorProperties = {};
        colorProperties[property] = delta;

        var newColor = _color2.default.getDeltaColor(colorProperties, _this4.props.events.onValidateWorkingColor, _this4.state.workingColor);

        _this4.setState({
          workingColor: newColor,
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

      var labels = (0, _lodash2.default)({}, defaultProps.labels, this.props.labels);
      return _react2.default.createElement("div", {
        className: (0, _classnames2.default)('slds-color-picker', this.props.className),
        ref: function ref(node) {
          _this5.wrapper = node;
        }
      }, _react2.default.createElement("div", {
        className: "slds-color-picker__summary"
      }, _react2.default.createElement("label", {
        className: (0, _classnames2.default)('slds-color-picker__summary-label', this.props.assistiveText.label ? 'slds-assistive-text' : ''),
        htmlFor: "color-picker-summary-input-".concat(this.generatedId),
        id: "color-picker-label-".concat(this.generatedId)
      }, this.props.assistiveText.label ? this.props.assistiveText.label : labels.label), this.getPopover({
        labels: labels
      }), this.getInput({
        labels: labels
      }), !this.state.isOpen && this.state.colorErrorMessage ? _react2.default.createElement("p", {
        className: "slds-form-error",
        id: "color-picker-summary-error-".concat(this.generatedId)
      }, this.state.colorErrorMessage) : ''));
    }
  }]);

  return ColorPicker;
}(_react2.default.Component);

Object.defineProperty(ColorPicker, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.COLOR_PICKER
});
Object.defineProperty(ColorPicker, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: propTypes
});
Object.defineProperty(ColorPicker, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: defaultProps
});

var _initialiseProps = function _initialiseProps() {
  var _this6 = this;

  Object.defineProperty(this, "handleSwatchChange", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event) {
      _this6.setWorkingColor(event, {
        hex: event.target.value
      });
    }
  });
  Object.defineProperty(this, "handleOnRequestClose", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event, _ref6) {
      var trigger = _ref6.trigger;

      if (trigger === 'clickOutside' || trigger === 'cancel') {
        _this6.handleCancelState();
      }

      if (_this6.props.onRequestClose) {
        _this6.props.onRequestClose(event, {
          trigger: trigger
        });
      }
    }
  });
  Object.defineProperty(this, "handleClickOutside", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event) {
      _this6.handleCancelButtonClick(event);
    }
  });
  Object.defineProperty(this, "handleCancel", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event) {
      _this6.handleCancelState();

      if (_this6.props.onRequestClose) {
        _this6.props.onRequestClose(event, {
          trigger: 'cancel'
        });
      }
    }
  });
  Object.defineProperty(this, "handleCancelState", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var workingColor = _color2.default.getNewColor({
        hex: _this6.state.currentColor
      }, _this6.props.events.onValidateWorkingColor);

      _this6.setState({
        isOpen: false,
        workingColor: workingColor,
        previousWorkingColor: workingColor
      });
    }
  });
  Object.defineProperty(this, "handleHexInputChange", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event, _ref7) {
      var labels = _ref7.labels;
      var currentColor = event.target.value;
      var isValid = _this6.props.events.onValidateColor ? _this6.props.events.onValidateColor(event.target.value) : _color2.default.isValidHex(event.target.value);

      _this6.setState({
        currentColor: currentColor,
        workingColor: _color2.default.getNewColor({
          hex: currentColor
        }, _this6.props.events.onValidateWorkingColor),
        colorErrorMessage: isValid ? '' : labels.invalidColor
      });

      if (_this6.props.events.onChange) {
        _this6.props.events.onChange(event, {
          color: currentColor,
          isValid: isValid
        });
      }
    }
  });
  Object.defineProperty(this, "handleSaturationValueChange", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event, _ref8) {
      var saturation = _ref8.saturation,
          _value = _ref8.value;

      _this6.setWorkingColor(event, {
        saturation: saturation,
        value: _value
      });
    }
  });
  Object.defineProperty(this, "handleSubmitButtonClick", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event) {
      _this6.setState({
        isOpen: false,
        currentColor: _this6.state.workingColor.hex,
        colorErrorMessage: ''
      });

      if (_this6.props.events.onChange) {
        _this6.props.events.onChange(event, {
          color: _this6.state.workingColor.hex,
          isValid: true
        });
      }
    }
  });
  Object.defineProperty(this, "handleSwatchButtonClick", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      var workingColor = _color2.default.getNewColor({
        hex: _this6.state.workingColor.hex
      }, _this6.props.events.onValidateWorkingColor);

      _this6.setState({
        isOpen: !_this6.state.isOpen,
        workingColor: workingColor,
        previousWorkingColor: _this6.state.previousWorkingColor
      });

      if (_this6.props.onRequestOpen) {
        _this6.props.onRequestOpen();
      }
    }
  });
  Object.defineProperty(this, "handleSwatchSelect", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value(event, _ref9) {
      var hex = _ref9.hex;

      _this6.setWorkingColor(event, {
        hex: hex
      });
    }
  });
};

exports.default = ColorPicker;