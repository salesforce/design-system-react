"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _dialog = _interopRequireDefault(require("../utilities/dialog"));

var _calendarWrapper = _interopRequireDefault(require("./private/calendar-wrapper"));

var _inputIcon = _interopRequireDefault(require("../icon/input-icon"));

var _input = _interopRequireDefault(require("../input"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _event = _interopRequireDefault(require("../../utilities/event"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _lowPriorityWarning = _interopRequireDefault(require("../../utilities/warning/low-priority-warning"));

var _constants = require("../../utilities/constants");

var _iconSettings = require("../icon-settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
   * This object is merged with the default props object on every render.
   * * `nextMonth`: Label for button to go to the next month _Tested with snapshot testing._
   * * `openCalendar`: Call to action label for calendar dialog trigger _Tested with snapshot testing._
   * * `previousMonth`: Label for button to go to the previous month _Tested with snapshot testing._
   */
  assistiveText: _propTypes.default.shape({
    nextMonth: _propTypes.default.string,
    openCalendar: _propTypes.default.string,
    previousMonth: _propTypes.default.string,
    year: _propTypes.default.string
  }),

  /**
   * Aligns the right or left side of the menu with the respective side of the trigger. _Tested with snapshot testing._
   */
  align: _propTypes.default.oneOf(['left', 'right']),

  /**
   * CSS classes to be added to tag with `slds-datepicker`. If you are looking for the outer DOM node (slds-dropdown-trigger), please review `triggerClassName`. _Tested with snapshot testing._
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Disable input and calendar. _Tested with Mocha framework._
   */
  disabled: _propTypes.default.bool,

  /**
   * This function callback receives a data object with a key of `date`. Write your own validation and return `true` if the date should be disabled, otherwise please return `false`. The value of `date` is the day rendered in the calendar with the current local time and timezone.
   */
  dateDisabled: _propTypes.default.func,

  /**
   * Date formatting function that formats the `value` prop (`value` is an ECMAScript `Date()` object) and returns a string to be rendered as the `input` value. Please use an external library such as [MomentJS](https://github.com/moment/moment/) for date formatting and internationalization. _Tested with snapshot testing._
   * The default `formatter` function is:
   * ```
   * formatter(date) {
   *   return date
   *    ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
   *    : '';
   * }
   * ```
   */
  formatter: _propTypes.default.func,

  /**
   * Value of input that gets passed to `parser` prop on initial render. This prop is only present for uncontrolled use of Datepicker which is _highly discouraged_. A better name for this prop would be `defaultFormatedValue`. Please use the `value` prop instead. _Not tested._
   */
  formattedValue: _propTypes.default.string,

  /**
   * Applies the error style to the component.
   */
  hasError: _propTypes.default.bool,

  /**
   * Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
   */
  hasStaticAlignment: _propTypes.default.bool,

  /**
   * HTML id for component _Tested with snapshot testing._
   */
  id: _propTypes.default.string,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `abbreviatedWeekDays`: Three letter abbreviations of the days of the week, starting on Sunday. _Tested with snapshot testing._
   * * `months`: Names of the months. _Tested with snapshot testing._
   * * `label`: This label appears above the input.
   * * `placeholder`: Placeholder text for input. _Tested with snapshot testing._
   * * `today`: Label of shortcut to jump to today within the calendar. This is also used for assistive text on today's date. _Tested with snapshot testing._
   * * `weekDays`: Full names of the seven days of the week, starting on Sunday. _Tested with snapshot testing._
   */
  labels: _propTypes.default.shape({
    abbreviatedWeekDays: _propTypes.default.array,
    label: _propTypes.default.string,
    months: _propTypes.default.array,
    placeholder: _propTypes.default.string,
    today: _propTypes.default.string,
    weekDays: _propTypes.default.array
  }),

  /**
   * An [Input](http://react.lightningdesignsystem.com/components/inputs/) component. The props from this `Input` component will be merged and override any default props. See [Component composition with prop spread](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#component-composition-with-prop-spread) for more information on this methodology.
   */
  input: _propTypes.default.node,

  /**
   * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
   */
  isOpen: _propTypes.default.bool,

  /**
   * Makes Monday the first day of the week. _Tested with snapshot testing._
   */
  isIsoWeekday: _propTypes.default.bool,

  /**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  menuPosition: _propTypes.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),

  /**
   * Triggered when the user wants to focus on a new day with the keyboard. If the target node is a day it will return the keyboard event a data object with the shape: `{date: [Date object]}`. Event will be `null` when new month is re-rendered.  _Tested with Mocha framework._
   */
  onCalendarFocus: _propTypes.default.func,

  /**
   * Triggered when the date changes. `onChange` can be used for form validation if needed. It receives an event and a data object in the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}`. `data.date` is Coordinated Universal Time (UTC), but the days of the calendar are in local time of the user. The `timezoneOffset` is the difference, in minutes, between UTC and the local time. Please note that this means that the offset is positive if the local timezone is behind UTC and negative if it is ahead. `timezoneOffset` is in minutes, for hours divide by `60`. _Tested with Mocha framework._
   */
  onChange: _propTypes.default.func,

  /**
   * Triggered when the calendar is closed. _Tested with Mocha framework._
   */
  onClose: _propTypes.default.func,

  /**
   * Triggered when the calendar has opened. _Tested with Mocha framework._
   */
  onOpen: _propTypes.default.func,

  /**
   * Function called when the calendar dialog would like hide. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`. _Tested with Mocha framework._
   */
  onRequestClose: _propTypes.default.func,

  /**
   * Function called when the calendar dialog would like show. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`. _Tested with Mocha framework._
   */
  onRequestOpen: _propTypes.default.func,

  /**
   * Custom function to parse date string from the `input` value, which must return an ECMAScript `Date()` object.  Please use an external library such as [MomentJS](https://github.com/moment/moment/) for date parsing and internationalization. The default `parser` passes the input value to ECMAScript `Date()` and _prays_ for a miracle. **Do not use the default parsing function in production.** _Tested with snapshot testing._
   * The default `parser function is:
   * ```
   * parser(str) {
   *   return new Date(str);
   * }
   * ```
   */
  parser: _propTypes.default.func,

  /**
   * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012). _Tested with snapshot testing._
   */
  relativeYearFrom: _propTypes.default.number,

  /**
   * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012). _Tested with snapshot testing._
   */
  relativeYearTo: _propTypes.default.number,

  /**
   * CSS classes to be added to tag with `slds-datepicker-trigger`. This is typically a wrapping `div` around the input. _Tested with snapshot testing._
   */
  triggerClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Sets date with a `Date` ECMAScript object. _Tested with snapshot testing._
   */
  value: _propTypes.default.instanceOf(Date)
};
var defaultProps = {
  align: 'left',
  assistiveText: {
    nextMonth: 'Next month',
    openCalendar: 'Open Calendar',
    previousMonth: 'Previous month',
    year: 'Year'
  },
  formatter: function formatter(date) {
    return date ? "".concat(date.getMonth() + 1, "/").concat(date.getDate(), "/").concat(date.getFullYear()) : '';
  },
  labels: {
    abbreviatedWeekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    placeholder: 'Pick a Date',
    today: 'Today',
    weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  menuPosition: 'absolute',
  parser: function parser(str) {
    (0, _lowPriorityWarning.default)(false, "Please use an external library for date parsing and internationalization like MomentJS (https://github.com/moment/moment/) instead of the default parser.");
    return new Date(str);
  },
  relativeYearFrom: -10,
  relativeYearTo: 10,
  dateDisabled: function dateDisabled() {
    return false;
  }
};
/**
 * A date picker is a non-text input form element. You can select a single date from a popup calendar. Please use an external library such as [MomentJS](https://github.com/moment/moment/) for date formatting and parsing and internationalization. You will want to use your date library within the `parser` and `formatter` callbacks.
 *
 * The calendar is rendered with time/dates based on local browser time of the client browser. All dates are in the local user's timezones and time. Another way to put it is if a user selects a date, they are actually selecting midnight in their current time on their current day and not mightnight in UTC. If `Datepicker` is paired with a time and timezone input, you may want to convert dates provided by this component to UTC and then combine the date with your time and timezone input.
 *
 * Pairing with any other component besides an `input` is untested.
 *
 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
 */

var Datepicker = /*#__PURE__*/function (_React$Component) {
  _inherits(Datepicker, _React$Component);

  var _super = _createSuper(Datepicker);

  function Datepicker(props) {
    var _this;

    _classCallCheck(this, Datepicker);

    _this = _super.call(this, props); // Please remove `strValue` on the next breaking change.

    _defineProperty(_assertThisInitialized(_this), "getDatePicker", function (_ref) {
      var labels = _ref.labels,
          assistiveText = _ref.assistiveText;
      var date; // Use props if present. Otherwise, use state.

      if (_this.props.value) {
        date = _this.props.formatter(_this.props.value) ? _this.parseDate(_this.props.formatter(_this.props.value)) : _this.props.value;
      } else {
        date = _this.state.formattedValue ? _this.parseDate(_this.state.formattedValue) : _this.state.value;
      }

      return /*#__PURE__*/_react.default.createElement(_calendarWrapper.default // Please remove `abbrWeekDayLabels` on the next breaking change.
      , {
        abbreviatedWeekDayLabels: _this.props.abbreviatedWeekDayLabels || // eslint-disable-line react/prop-types
        _this.props.abbrWeekDayLabels || // eslint-disable-line react/prop-types
        labels.abbreviatedWeekDays
        /* Remove || for assistiveText at next breaking change */
        ,
        assistiveTextNextMonth: _this.props.assistiveTextNextMonth || assistiveText.nextMonth // eslint-disable-line react/prop-types
        ,
        assistiveTextPreviousMonth: _this.props.assistiveTextPreviousMonth || assistiveText.previousMonth // eslint-disable-line react/prop-types
        ,
        assistiveTextYear: assistiveText.year,
        canFocusCalendar: _this.state.isOpenFromIcon,
        id: _this.getId(),
        isIsoWeekday: _this.props.isIsoWeekday,
        monthLabels: _this.props.monthLabels || labels.months // eslint-disable-line react/prop-types
        ,
        onCalendarFocus: _this.props.onCalendarFocus,
        dateDisabled: _this.props.dateDisabled,
        onRequestClose: _this.handleRequestClose,
        onSelectDate: _this.handleCalendarChange,
        relativeYearFrom: _this.props.relativeYearFrom,
        relativeYearTo: _this.props.relativeYearTo,
        selectedDate: date || new Date(),
        selectedDateRef: function selectedDateRef(component) {
          _this.selectedDateCell = component;
        },
        todayLabel: _this.props.todayLabel || labels.today // eslint-disable-line react/prop-types
        ,
        weekDayLabels: _this.props.weekDayLabels || labels.weekDays // eslint-disable-line react/prop-types

      });
    });

    _defineProperty(_assertThisInitialized(_this), "getDialog", function (_ref2) {
      var labels = _ref2.labels,
          assistiveText = _ref2.assistiveText;
      // FOR BACKWARDS COMPATIBILITY
      var menuPosition = _this.props.isInline ? 'relative' : _this.props.menuPosition; // eslint-disable-line react/prop-types
      // SLDS override

      var style = _this.props.menuPosition !== 'relative' ? {
        transform: 'none'
      } : {};
      return !_this.props.disabled && _this.getIsOpen() ? /*#__PURE__*/_react.default.createElement(_dialog.default, {
        align: "bottom ".concat(_this.props.align),
        contentsClassName: (0, _classnames.default)('slds-datepicker slds-dropdown', {
          'slds-dropdown_right': _this.props.menuPosition === 'relative' && _this.props.align === 'right',
          'slds-dropdown_left': _this.props.menuPosition === 'relative' && _this.props.align === 'left'
        }, _this.props.className),
        context: _this.context,
        hasStaticAlignment: _this.props.hasStaticAlignment,
        style: style,
        onClose: _this.handleClose,
        onOpen: _this.handleOpen,
        onRequestTargetElement: function onRequestTargetElement() {
          return _this.inputRef;
        },
        position: menuPosition,
        portalMount: _this.props.portalMount
      }, _this.getDatePicker({
        labels: labels,
        assistiveText: assistiveText
      })) : null;
    });

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
    });

    _defineProperty(_assertThisInitialized(_this), "getIsOpen", function () {
      return !!(typeof _this.props.isOpen === 'boolean' ? _this.props.isOpen : _this.state.isOpen);
    });

    _defineProperty(_assertThisInitialized(_this), "getInputProps", function (_ref3) {
      var assistiveText = _ref3.assistiveText,
          labels = _ref3.labels;

      /**
       * 1. DEFAULT: Use default props or state if present.
       * 2. DEPRECATED API: Use old "first-level" props that have been deprecated.
       * 3. DEPRECATED API: If `children` is present, use props from single child which should be an `<Input/>`
       * 4. CURRENT API: Use composition with props spread merge from `input` prop.
       * */
      var defaultInputProps = {
        iconRight: /*#__PURE__*/_react.default.createElement(_inputIcon.default // Remove || for assistiveText at next breaking change
        , {
          assistiveText: {
            icon: _this.props.assistiveTextOpenCalendar || assistiveText.openCalendar // eslint-disable-line react/prop-types

          },
          "aria-haspopup": true,
          "aria-expanded": _this.getIsOpen(),
          category: "utility",
          name: "event",
          onClick: function onClick() {
            _this.openDialogFromIcon();
          },
          type: "button"
        }),
        inputRef: function inputRef(component) {
          _this.setInputRef(component);
        },
        id: _this.getId(),
        onChange: _this.handleInputChange,
        onClick: function onClick() {
          _this.openDialog();
        },
        onKeyDown: _this.handleKeyDown,
        value: _this.props.value ? _this.props.formatter(_this.props.value) : _this.state.inputValue
      }; // eslint-disable react/prop-types

      var topLevelDeprecatedComponentProps = {
        disabled: _this.props.disabled,
        label: _this.props.label || labels.label,
        onBlur: _this.props.onBlur,
        onFocus: _this.props.onFocus,
        placeholder: _this.props.placeholder || labels.placeholder,
        required: _this.props.required
      }; // eslint-enable react/prop-types

      var childrenProps = _this.props.children && _this.props.children.props;

      var childrenPropInputProps = _objectSpread(_objectSpread({}, childrenProps), {}, {
        onClick: function onClick() {
          _this.openDialog();

          if (childrenProps && childrenProps.onClick) {
            childrenProps.onClick();
          }
        }
      });

      var inputRenderProps = _this.props.input && _this.props.input.props;
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultInputProps), topLevelDeprecatedComponentProps), childrenPropInputProps), inputRenderProps);
    });

    _defineProperty(_assertThisInitialized(_this), "setInputRef", function (component) {
      _this.inputRef = component; // yes, this is a re-render triggered by a render.
      // Dialog/Popper.js cannot place the popover until
      // the trigger/target DOM node is mounted. This
      // way `findDOMNode` is not called and parent
      // DOM nodes are not queried.

      if (!_this.state.inputRendered) {
        _this.setState({
          inputRendered: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleCalendarChange", function (event, _ref4) {
      var date = _ref4.date;

      if (!_this.props.value) {
        _this.setState({
          value: date,
          formattedValue: _this.props.formatter(date),
          inputValue: _this.props.formatter(date)
        });
      }

      _this.handleRequestClose();

      if (_this.props.onChange) {
        _this.props.onChange(event, {
          date: date,
          formattedDate: _this.props.formatter(date),
          timezoneOffset: date.getTimezoneOffset()
        });
      } // Please remove `onDateChange` on the next breaking change.

      /* eslint-disable react/prop-types */


      if (_this.props.onDateChange) {
        _this.props.onDateChange(date, _this.props.formatter(date));
      }
      /* eslint-enable react/prop-types */

    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function () {
      _this.handleRequestClose();
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      if (_this.props.onClose) {
        _this.props.onClose();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (event) {
      // Typing in the input closes the calendar when it's used as an uncontrolled component
      if (typeof _this.props.isOpen !== 'boolean' && _this.state.isOpen) {
        _this.setState({
          isOpen: false
        });
      }

      _this.setState({
        formattedValue: event.target.value,
        inputValue: event.target.value
      });

      var date = _this.props.parser(event.target.value);

      if (_this.props.onChange) {
        _this.props.onChange(event, {
          date: date,
          formattedDate: event.target.value,
          timezoneOffset: date.getTimezoneOffset()
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      // Don't open if user is selecting text
      if (event.keyCode && !event.shiftKey && (event.keyCode === _keyCode.default.DOWN || event.keyCode === _keyCode.default.UP)) {
        _event.default.trapEvent(event);

        _this.setState({
          isOpen: true
        });
      }

      if (event.keyCode === _keyCode.default.ESCAPE || event.keyCode === _keyCode.default.ENTER) {
        _event.default.trapEvent(event);

        _this.setState({
          isOpen: false
        });
      } // Please remove `onKeyDown` on the next breaking change.

      /* eslint-disable react/prop-types */


      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(event, {});
      }
      /* eslint-enable react/prop-types */

    });

    _defineProperty(_assertThisInitialized(_this), "handleOpen", function (event, _ref5) {
      var portal = _ref5.portal;

      if (_this.props.onOpen) {
        _this.props.onOpen(event, {
          portal: portal
        });
      }

      if (_this.selectedDateCell && _this.state.isOpenFromIcon) {
        _this.selectedDateCell.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRequestClose", function () {
      if (_this.props.onRequestClose) {
        _this.props.onRequestClose();
      }

      if (_this.getIsOpen()) {
        _this.setState({
          isOpen: false,
          isOpenFromIcon: false
        });

        if (_this.inputRef) {
          _this.inputRef.focus();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "openDialogFromIcon", function () {
      _this.setState({
        isOpenFromIcon: true
      });

      _this.openDialog(true);
    });

    _defineProperty(_assertThisInitialized(_this), "openDialog", function () {
      var isRequestFromIcon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!isRequestFromIcon) {
        _this.setState({
          isOpenFromIcon: false
        });
      }

      if (_this.props.onRequestOpen) {
        _this.props.onRequestOpen();
      } else {
        _this.setState({
          isOpen: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "parseDate", function (formattedValue) {
      var parsedDate = _this.props.parser(formattedValue);

      if (Object.prototype.toString.call(parsedDate) !== '[object Date]' || isNaN(parsedDate.getTime())) {
        parsedDate = new Date();
      }

      return parsedDate;
    });

    var _formattedValue = props.formattedValue || props.strValue; // eslint-disable-line react/prop-types


    var dateString = props.formatter(props.value);
    var initDate = props.value ? dateString : _formattedValue;
    _this.state = {
      isOpen: false,
      isOpenFromIcon: false,
      value: props.value,
      formattedValue: initDate || '',
      inputValue: initDate || ''
    };
    _this.generatedId = _shortid.default.generate(); // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    (0, _checkProps.default)(_constants.DATE_PICKER, props, _component.default);
    return _this;
  }

  _createClass(Datepicker, [{
    key: "render",
    value: function render() {
      // Merge objects of strings with their default object
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);
      var assistiveText = (0, _lodash.default)({}, defaultProps.assistiveText, this.props.assistiveText);
      var inputProps = this.getInputProps({
        assistiveText: assistiveText,
        labels: labels
      }); // `children` prop is a deprecated API. Future breaking change should limit Datepicker to only `Input` usage and not a random child node.

      var inputToRender = this.props.children ? /*#__PURE__*/_react.default.cloneElement(this.props.children, _objectSpread({}, inputProps)) : /*#__PURE__*/_react.default.createElement(_input.default, inputProps);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
          'slds-has-error': this.props.hasError,
          'slds-is-open': this.getIsOpen()
        }, this.props.triggerClassName)
      }, inputToRender, this.getDialog({
        labels: labels,
        assistiveText: assistiveText
      }));
    }
  }]);

  return Datepicker;
}(_react.default.Component);

Datepicker.contextType = _iconSettings.IconSettingsContext;
Datepicker.displayName = _constants.DATE_PICKER;
Datepicker.propTypes = propTypes;
Datepicker.defaultProps = defaultProps;
var _default = Datepicker;
exports.default = _default;