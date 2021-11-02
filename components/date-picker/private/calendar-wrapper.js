"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _calendar = _interopRequireDefault(require("./calendar"));

var _navigation = _interopRequireDefault(require("./navigation"));

var _event = _interopRequireDefault(require("../../../utilities/event"));

var _keyCode = _interopRequireDefault(require("../../../utilities/key-code"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var DatepickerCalendarWrapper = /*#__PURE__*/function (_React$Component) {
  _inherits(DatepickerCalendarWrapper, _React$Component);

  var _super = _createSuper(DatepickerCalendarWrapper);

  function DatepickerCalendarWrapper() {
    var _this;

    _classCallCheck(this, DatepickerCalendarWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      initialDateForCalendarRender: _this.props.selectedDate
    });

    _defineProperty(_assertThisInitialized(_this), "handleCalendarBlur", function (event, _ref) {
      var direction = _ref.direction;

      if (direction === 'next' && _this.previousMonthRef) {
        if (_this.props.onCalendarFocus) {
          _this.props.onCalendarFocus(event, {
            direction: direction,
            ref: _this.previousMonthRef
          });
        }

        _this.previousMonthRef.focus();
      } else if (direction === 'previous' && _this.todayRef) {
        if (_this.props.onCalendarFocus) {
          _this.props.onCalendarFocus(event, {
            direction: direction,
            ref: _this.todayRef
          });
        }

        _this.todayRef.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFirstFocusableNodeKeyDown", function (event) {
      if (event.shiftKey && event.keyCode === _keyCode.default.TAB) {
        _event.default.trapEvent(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInitialDateForCalendarRenderChange", function (event, initialDateForCalendarRender) {
      _this.setState({
        initialDateForCalendarRender: initialDateForCalendarRender
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      if (event.keyCode === _keyCode.default.ESCAPE) {
        _event.default.trapEvent(event);

        _this.props.onRequestClose(event, {});
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleLastFocusableNodeKeyDown", function (event) {
      if (!event.shiftKey && event.keyCode === _keyCode.default.TAB) {
        _event.default.trapEvent(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRequestClose", function (event) {
      if (_this.props.onRequestClose) {
        _this.props.onRequestClose(event, {});
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRequestFocusDate", function (event, data) {
      // will be called three times, due to re-render
      if (data.ref && _this.props.canFocusCalendar) {
        data.ref.focus();
      } // only call on actual DOM event and not on re-render


      if (_this.props.onCalendarFocus && data.triggerCallback) {
        var triggerCallback = data.triggerCallback,
            modifiedData = _objectWithoutProperties(data, ["triggerCallback"]); // eslint-disable-line no-unused-vars


        _this.props.onCalendarFocus(event, modifiedData);
      }
    });

    return _this;
  }

  _createClass(DatepickerCalendarWrapper, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        // eslint-disable-line jsx-a11y/no-static-element-interactions
        className: (0, _classnames.default)({
          'slds-datepicker': this.props.isolated
        }, this.props.className),
        "aria-hidden": "false",
        "data-selection": "single",
        onKeyDown: this.handleKeyDown
      }, /*#__PURE__*/_react.default.createElement(_navigation.default, {
        assistiveTextNextMonth: this.props.assistiveTextNextMonth,
        assistiveTextPreviousMonth: this.props.assistiveTextPreviousMonth,
        assistiveTextYear: this.props.assistiveTextYear,
        id: this.props.id,
        initialDateForCalendarRender: this.state.initialDateForCalendarRender,
        monthLabels: this.props.monthLabels,
        onChangeMonth: this.handleInitialDateForCalendarRenderChange,
        previousMonthRef: function previousMonthRef(component) {
          _this2.previousMonthRef = component;
        },
        onPreviousMonthKeyDown: this.handleFirstFocusableNodeKeyDown,
        relativeYearFrom: this.props.relativeYearFrom,
        relativeYearTo: this.props.relativeYearTo
      }), /*#__PURE__*/_react.default.createElement(_calendar.default, {
        abbreviatedWeekDayLabels: this.props.abbreviatedWeekDayLabels,
        dateDisabled: this.props.dateDisabled,
        id: this.props.id,
        initialDateForCalendarRender: this.state.initialDateForCalendarRender,
        isIsoWeekday: this.props.isIsoWeekday,
        onCalendarBlur: this.handleCalendarBlur,
        onChangeMonth: this.handleInitialDateForCalendarRenderChange,
        onRequestClose: this.handleRequestClose,
        onRequestInternalFocusDate: this.handleRequestFocusDate,
        onSelectDate: this.props.onSelectDate,
        selectedDate: this.props.selectedDate,
        selectedDateRef: this.props.selectedDateRef,
        todayLabel: this.props.todayLabel,
        todayRef: function todayRef(component) {
          _this2.todayRef = component;
        },
        onLastFocusableNodeKeyDown: this.handleLastFocusableNodeKeyDown,
        weekDayLabels: this.props.weekDayLabels
      }));
    }
  }]);

  return DatepickerCalendarWrapper;
}(_react.default.Component);

_defineProperty(DatepickerCalendarWrapper, "displayName", 'DatepickerCalendarWrapper');

_defineProperty(DatepickerCalendarWrapper, "propTypes", {
  /**
   * Label for button to go to the next month
   */
  assistiveTextNextMonth: _propTypes.default.string.isRequired,

  /**
   * Label for button to go to the previous month
   */
  assistiveTextPreviousMonth: _propTypes.default.string.isRequired,

  /**
   * Label for year picklist/combobox
   */
  assistiveTextYear: _propTypes.default.string.isRequired,

  /**
   * One letter abbreviations of the days of the week, starting on Sunday.
   */
  abbreviatedWeekDayLabels: _propTypes.default.array.isRequired,

  /**
   * Whether or not the `CalendarWrapper` can steal focus from the main `Input`
   */
  canFocusCalendar: _propTypes.default.bool.isRequired,

  /**
   * CSS classes to be added to tag with `slds-datepicker`.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * dateDisabled() takes a date as input argument, returns true if given date should be disabled, otherwise returns false.
   */
  dateDisabled: _propTypes.default.func,

  /**
   * HTML id for component
   */
  id: _propTypes.default.string,

  /**
   * Makes Monday the first day of the week
   */
  isIsoWeekday: _propTypes.default.bool,

  /**
   * For use of datepicker outside of dropdown.
   */
  isolated: _propTypes.default.bool,

  /**
   * Names of the months
   */
  monthLabels: _propTypes.default.array.isRequired,

  /**
   * Triggered when the keyboard moves focus on the calendar. {date: [Date object], formattedDate: [string]}  _Tested with Mocha framework._
   */
  onCalendarFocus: _propTypes.default.func,

  /**
   * Triggered when the calendar is supposed to close.
   */
  onRequestClose: _propTypes.default.func.isRequired,

  /**
   * Triggered when a date on the calendar is clicked.
   */
  onSelectDate: _propTypes.default.func.isRequired,

  /**
   * The earliest year that can be selected in the year selection dropdown.
   */
  relativeYearFrom: _propTypes.default.number.isRequired,

  /**
   * The maximum year that can be selected in the year selection dropdown.
   */
  relativeYearTo: _propTypes.default.number.isRequired,

  /**
   * Currently selected date
   */
  selectedDate: _propTypes.default.instanceOf(Date),

  /**
   * Component reference / DOM node for selected day.
   */
  selectedDateRef: _propTypes.default.func,

  /**
   * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
   */
  todayLabel: _propTypes.default.string.isRequired,

  /**
   * Names of the seven days of the week, starting on Sunday.
   */
  weekDayLabels: _propTypes.default.array.isRequired
});

_defineProperty(DatepickerCalendarWrapper, "defaultProps", {
  selectedDate: new Date(),
  value: new Date()
});

var _default = DatepickerCalendarWrapper;
exports.default = _default;