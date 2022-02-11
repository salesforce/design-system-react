"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.isdate"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _inputIcon = _interopRequireDefault(require("../icon/input-icon"));

var _menuDropdown = _interopRequireDefault(require("../menu-dropdown"));

var _dropdownTrigger = _interopRequireDefault(require("./private/dropdown-trigger"));

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

var getOptions = function getOptions(_ref) {
  var props = _ref.props;
  var baseDate = new Date();
  var options = [];
  baseDate.setHours(0);
  baseDate.setMinutes(0);
  baseDate.setSeconds(0);
  baseDate.setMilliseconds(0);
  var curDate = new Date(baseDate); // eslint-disable-next-line fp/no-loops

  while (baseDate.getDate() === curDate.getDate()) {
    var formatted = props.formatter(curDate); // eslint-disable-next-line fp/no-mutating-methods

    options.push({
      label: formatted,
      value: new Date(curDate)
    });
    curDate.setMinutes(curDate.getMinutes() + props.stepInMinutes);
  }

  return options;
};
/**
 * ** Timepicker is deprecated. Please use an auto-complete Combobox instead.**
 * A timepicker is an autocomplete text input to capture a time.
 */


var Timepicker = /*#__PURE__*/function (_React$Component) {
  _inherits(Timepicker, _React$Component);

  var _super = _createSuper(Timepicker);

  // ### Display Name
  // Always use the canonical component name as the React display name.
  // ### Prop Types
  function Timepicker(props) {
    var _this;

    _classCallCheck(this, Timepicker);

    _this = _super.call(this, props); // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: _this.props.value,
      strValue: _this.props.strValue,
      options: getOptions({
        props: _this.props
      })
    });

    _defineProperty(_assertThisInitialized(_this), "parseDate", function (strValue) {
      var newDate = _this.props.parser(strValue);

      if ((0, _lodash.default)(newDate)) {
        if (!isNaN(newDate.getTime())) {
          return newDate;
        }
      }

      return new Date();
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (date, strValue) {
      _this.setState({
        value: date,
        strValue: strValue
      });

      if (_this.props.onDateChange) {
        _this.props.onDateChange(date, strValue);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (val) {
      if (val && val.value) {
        _this.handleChange(val.value, val.label);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (event) {
      var strValue = event.target.value;

      _this.setState({
        strValue: strValue
      });

      if (_this.props.onDateChange) {
        var parsedDate = _this.props.parser(strValue);

        _this.props.onDateChange(parsedDate, strValue);
      }
    });

    (0, _checkProps.default)(_constants.TIME_PICKER, props, _component.default);
    return _this;
  } // eslint-disable-next-line camelcase, react/sort-comp


  _createClass(Timepicker, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.value && this.props.value) {
        var currentTime = this.props.value.getTime();
        var nextTime = nextProps.value.getTime();

        if (currentTime !== nextTime) {
          this.setState({
            value: nextProps.value,
            strValue: this.props.formatter(nextProps.value)
          });
        }
      }

      if (nextProps.strValue !== this.props.value) {
        this.setState({
          strValue: nextProps.strValue
        });
      }
    }
  }, {
    key: "render",
    value: // ### Render
    function render() {
      return /*#__PURE__*/_react.default.createElement(_menuDropdown.default, {
        checkmark: false,
        constrainToScrollParent: this.props.constrainToScrollParent,
        disabled: this.props.disabled,
        inheritTargetWidth: this.props.inheritTargetWidth,
        label: this.props.label,
        listItemRenderer: this.props.listItemRenderer // inline style override
        ,
        menuStyle: {
          maxHeight: '20em',
          overflowX: 'hidden',
          minWidth: '100%'
        },
        menuPosition: this.props.menuPosition,
        onSelect: this.handleSelect,
        options: this.state.options
      }, /*#__PURE__*/_react.default.createElement(_dropdownTrigger.default, {
        iconRight: /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
          category: "utility",
          name: "clock"
        }),
        onChange: this.handleInputChange,
        placeholder: this.props.placeholder,
        required: this.props.required,
        type: "text",
        value: this.state.strValue
      }));
    }
  }]);

  return Timepicker;
}(_react.default.Component);

_defineProperty(Timepicker, "displayName", _constants.TIME_PICKER);

_defineProperty(Timepicker, "propTypes", {
  /**
   * If true, constrains the menu to the scroll parent. See `Dropdown`.
   */
  constrainToScrollParent: _propTypes.default.bool,

  /**
   * Disables the input and prevents editing the contents.
   */
  disabled: _propTypes.default.bool,

  /**
   * Time formatting function
   */
  formatter: _propTypes.default.func,

  /**
   * Sets the dialog width to the width of the target. Menus attached to `input` typically follow this UX pattern.
   */
  inheritTargetWidth: _propTypes.default.bool,

  /**
   * This label appears above the input.
   */
  label: _propTypes.default.string,

  /**
   * Custom element that overrides the default Menu Item component.
   */
  listItemRenderer: _propTypes.default.func,

  /**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  menuPosition: _propTypes.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),

  /**
   * Receives the props `(dateValue, stringValue)`
   */
  onDateChange: _propTypes.default.func,

  /**
   * Parsing date string into Date
   */
  parser: _propTypes.default.func,

  /**
   * Text that will appear in an empty input.
   */
  placeholder: _propTypes.default.string,

  /**
   * If true, adds asterisk next to input label to indicate it is a required field.
   */
  required: _propTypes.default.bool,

  /**
   * Frequency of options
   */
  stepInMinutes: _propTypes.default.number,

  /**
   * Value for input that is parsed to create an internal state in the `date` format.
   */
  strValue: _propTypes.default.string,

  /**
   * Instance an internal state in the `date` format.
   */
  value: _propTypes.default.instanceOf(Date)
});

_defineProperty(Timepicker, "defaultProps", {
  formatter: function formatter(date) {
    if (date) {
      return date.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    return null;
  },
  parser: function parser(timeStr) {
    var date = new Date();
    var dateStr = date.toLocaleString(navigator.language, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    return new Date("".concat(dateStr, " ").concat(timeStr));
  },
  menuPosition: 'absolute',
  value: null,
  stepInMinutes: 30
});

var _default = Timepicker;
exports.default = _default;