"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.assign");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _dialog = require("../utilities/dialog");

var _dialog2 = _interopRequireDefault(_dialog);

var _calendarWrapper = require("./private/calendar-wrapper");

var _calendarWrapper2 = _interopRequireDefault(_calendarWrapper);

var _inputIcon = require("../icon/input-icon");

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _input = require("../input");

var _input2 = _interopRequireDefault(_input);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _docs = require("./docs.json");

var _docs2 = _interopRequireDefault(_docs);

var _event = require("../../utilities/event");

var _event2 = _interopRequireDefault(_event);

var _keyCode = require("../../utilities/key-code");

var _keyCode2 = _interopRequireDefault(_keyCode);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `nextMonth`: Label for button to go to the next month _Tested with snapshot testing._
   * * `openCalendar`: Call to action label for calendar dialog trigger _Tested with snapshot testing._
   * * `previousMonth`: Label for button to go to the previous month _Tested with snapshot testing._
   */
  assistiveText: _propTypes2.default.shape({
    nextMonth: _propTypes2.default.string,
    openCalendar: _propTypes2.default.string,
    previousMonth: _propTypes2.default.string
  }),

  /**
   * Aligns the right or left side of the menu with the respective side of the trigger. _Tested with snapshot testing._
   */
  align: _propTypes2.default.oneOf(['left', 'right']),

  /**
   * CSS classes to be added to tag with `slds-datepicker`. If you are looking for the outer DOM node (slds-dropdown-trigger), please review `triggerClassName`. _Tested with snapshot testing._
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * Disable input and calendar. _Tested with Mocha framework._
   */
  disabled: _propTypes2.default.bool,

  /**
   * This function callback receives a data object with a key of `date`. Write your own validation and return `true` if the date should be disabled, otherwise please return `false`. The value of `date` is the day rendered in the calendar with the current local time and timezone.
   */
  dateDisabled: _propTypes2.default.func,

  /**
   * Date formatting function that formats the `value` prop (`value` is an ECMAScript `Date()` object) before rendering the `input` value. Please use an external library such as [MomentJS](https://github.com/moment/moment/) for date formatting and internationalization. _Tested with snapshot testing._
   * The default `formatter` function is:
   * ```
   * formatter(date) {
   *   return date
   *    ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
   *    : '';
   * }
   * ```
   */
  formatter: _propTypes2.default.func,

  /**
   * Value of input that gets passed to `parser` prop on initial render. This prop is only present for uncontrolled use of Datepicker which is _highly discouraged_. A better name for this prop would be `defaultFormatedValue`. Please use the `value` prop instead. _Not tested._
   */
  formattedValue: _propTypes2.default.string,

  /**
   * Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
   */
  hasStaticAlignment: _propTypes2.default.bool,

  /**
   * HTML id for component _Tested with snapshot testing._
   */
  id: _propTypes2.default.string,

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
  labels: _propTypes2.default.shape({
    abbreviatedWeekDays: _propTypes2.default.array,
    label: _propTypes2.default.string,
    months: _propTypes2.default.array,
    placeholder: _propTypes2.default.string,
    today: _propTypes2.default.string,
    weekDays: _propTypes2.default.array
  }),

  /**
   * A [Dropdown](http://react.lightningdesignsystem.com/components/inputs/) component. The props from this `Input` component will be merged and override any default props. See [Component composition with prop spread](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#component-composition-with-prop-spread) for more information on this methodology.
   */
  input: _propTypes2.default.node,

  /**
   * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
   */
  isOpen: _propTypes2.default.bool,

  /**
   * Makes Monday the first day of the week. _Tested with snapshot testing._
   */
  isIsoWeekday: _propTypes2.default.bool,

  /**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  menuPosition: _propTypes2.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),

  /**
   * Triggered when the user wants to focus on a new day with the keyboard. If the target node is a day it will return the keyboard event a data object with the shape: `{date: [Date object]}`. Event will be `null` when new month is re-rendered.  _Tested with Mocha framework._
   */
  onCalendarFocus: _propTypes2.default.func,

  /**
   * Triggered when the date changes. `onChange` can be used for form validation if needed. It receives an event and a data object in the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}`. `data.date` is Coordinated Universal Time (UTC), but the days of the calendar are in local time of the user. The `timezoneOffset` is the difference, in minutes, between UTC and the local time. Please note that this means that the offset is positive if the local timezone is behind UTC and negative if it is ahead. `timezoneOffset` is in minutes, for hours divide by `60`. _Tested with Mocha framework._
   */
  onChange: _propTypes2.default.func,

  /**
   * Triggered when the calendar is closed. _Tested with Mocha framework._
   */
  onClose: _propTypes2.default.func,

  /**
   * Triggered when the calendar has opened. _Tested with Mocha framework._
   */
  onOpen: _propTypes2.default.func,

  /**
   * Function called when the calendar dialog would like hide. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`. _Tested with Mocha framework._
   */
  onRequestClose: _propTypes2.default.func,

  /**
   * Function called when the calendar dialog would like show. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`. _Tested with Mocha framework._
   */
  onRequestOpen: _propTypes2.default.func,

  /**
   * Custom function to parse date string from the `input` value and returns a `Date` object.  Please use an external library such as [MomentJS](https://github.com/moment/moment/) for date parsing and internationalization. The default `parser` passes the input value to ECMAScript `Date()` and _prays_ for a miracle. **Do not use the default parsing function in production.** _Tested with snapshot testing._
   * The default `parser function is:
   * ```
   * parser(str) {
   *   return new Date(str);
   * }
   * ```
   */
  parser: _propTypes2.default.func,

  /**
   * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012). _Tested with snapshot testing._
   */
  relativeYearFrom: _propTypes2.default.number,

  /**
   * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012). _Tested with snapshot testing._
   */
  relativeYearTo: _propTypes2.default.number,

  /**
   * CSS classes to be added to tag with `slds-datepicker-trigger`. This is typically a wrapping `div` around the input. _Tested with snapshot testing._
   */
  triggerClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * Sets date with a `Date` ECMAScript object. _Tested with snapshot testing._
   */
  value: _propTypes2.default.instanceOf(Date)
};
var defaultProps = {
  align: 'left',
  assistiveText: {
    nextMonth: 'Next month',
    openCalendar: 'Open Calendar',
    previousMonth: 'Previous month'
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

var Datepicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Datepicker, _React$Component);

  function Datepicker(props) {
    var _this;

    _classCallCheck(this, Datepicker);

    _this = _possibleConstructorReturn(this, (Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call(this, props)); // Please remove `strValue` on the next breaking change.

    Object.defineProperty(_assertThisInitialized(_this), "getInputProps", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(_ref) {
        var assistiveText = _ref.assistiveText,
            labels = _ref.labels;

        /**
         * 1. DEFAULT: Use default props or state if present.
         * 2. DEPRECATED API: Use old "first-level" props that have been deprecated.
         * 3. DEPRECATED API: If `children` is present, use props from single child which should be an `<Input/>`
         * 4. CURRENT API: Use composition with props spread merge from `input` prop.
         * */
        var defaultInputProps = {
          iconRight: _react2.default.createElement(_inputIcon2.default // Remove || for assistiveText at next breaking change
          , {
            assistiveText: {
              icon: _this.props.assistiveTextOpenCalendar || assistiveText.openCalendar // eslint-disable-line react/prop-types

            },
            "aria-haspopup": true,
            "aria-expanded": _this.getIsOpen(),
            category: "utility",
            name: "event",
            onClick: _this.openDialog,
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
          value: _this.state.inputValue
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

        var childrenPropInputProps = _objectSpread({}, childrenProps, {
          onClick: function onClick() {
            _this.openDialog();

            if (childrenProps && childrenProps.onClick) {
              childrenProps.onClick();
            }
          }
        });

        var inputRenderProps = _this.props.input && _this.props.input.props;
        return _objectSpread({}, defaultInputProps, topLevelDeprecatedComponentProps, childrenPropInputProps, inputRenderProps);
      }
    });
    var formattedValue = props.formattedValue || props.strValue; // eslint-disable-line react/prop-types

    var dateString = props.formatter(props.value);
    var initDate = props.value ? dateString : formattedValue;
    _this.getId = _this.getId.bind(_assertThisInitialized(_this));
    _this.getIsOpen = _this.getIsOpen.bind(_assertThisInitialized(_this));
    _this.handleCalendarChange = _this.handleCalendarChange.bind(_assertThisInitialized(_this));
    _this.handleClickOutside = _this.handleClickOutside.bind(_assertThisInitialized(_this));
    _this.handleRequestClose = _this.handleRequestClose.bind(_assertThisInitialized(_this));
    _this.openDialog = _this.openDialog.bind(_assertThisInitialized(_this));
    _this.parseDate = _this.parseDate.bind(_assertThisInitialized(_this));
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_this));
    _this.handleOpen = _this.handleOpen.bind(_assertThisInitialized(_this));
    _this.getDialog = _this.getDialog.bind(_assertThisInitialized(_this));
    _this.getDatePicker = _this.getDatePicker.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    _this.state = {
      isOpen: false,
      value: props.value,
      formattedValue: initDate || '',
      inputValue: initDate || ''
    };
    return _this;
  }

  _createClass(Datepicker, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.generatedId = _shortid2.default.generate(); // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

      (0, _checkProps2.default)(_constants.DATE_PICKER, this.props, _docs2.default);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && this.props.value) {
        var currentDate = this.props.value.getTime();
        var nextDate = nextProps.value.getTime();

        if (currentDate !== nextDate) {
          this.setState({
            value: nextProps.value,
            formattedValue: this.props.formatter(nextProps.value),
            inputValue: this.props.formatter(nextProps.value)
          });
        }
      }
    }
  }, {
    key: "getDatePicker",
    value: function getDatePicker(_ref2) {
      var _this2 = this;

      var labels = _ref2.labels,
          assistiveText = _ref2.assistiveText;
      var date = this.state.formattedValue ? this.parseDate(this.state.formattedValue) : this.state.value;
      return _react2.default.createElement(_calendarWrapper2.default // Please remove `abbrWeekDayLabels` on the next breaking change.
      , {
        abbreviatedWeekDayLabels: this.props.abbreviatedWeekDayLabels || // eslint-disable-line react/prop-types
        this.props.abbrWeekDayLabels || // eslint-disable-line react/prop-types
        labels.abbreviatedWeekDays
        /* Remove || for assistiveText at next breaking change */
        ,
        assistiveTextNextMonth: this.props.assistiveTextNextMonth || assistiveText.nextMonth // eslint-disable-line react/prop-types
        ,
        assistiveTextPreviousMonth: this.props.assistiveTextPreviousMonth || assistiveText.previousMonth // eslint-disable-line react/prop-types
        ,
        id: this.getId(),
        isIsoWeekday: this.props.isIsoWeekday,
        monthLabels: this.props.monthLabels || labels.months // eslint-disable-line react/prop-types
        ,
        onCalendarFocus: this.props.onCalendarFocus,
        dateDisabled: this.props.dateDisabled,
        onRequestClose: this.handleRequestClose,
        onSelectDate: this.handleCalendarChange,
        relativeYearFrom: this.props.relativeYearFrom,
        relativeYearTo: this.props.relativeYearTo,
        selectedDate: date || new Date(),
        selectedDateRef: function selectedDateRef(component) {
          _this2.selectedDateCell = component;
        },
        todayLabel: this.props.todayLabel || labels.today // eslint-disable-line react/prop-types
        ,
        weekDayLabels: this.props.weekDayLabels || labels.weekDays // eslint-disable-line react/prop-types

      });
    }
  }, {
    key: "getDialog",
    value: function getDialog(_ref3) {
      var _this3 = this;

      var labels = _ref3.labels,
          assistiveText = _ref3.assistiveText;
      // FOR BACKWARDS COMPATIBILITY
      var menuPosition = this.props.isInline ? 'relative' : this.props.menuPosition; // eslint-disable-line react/prop-types
      // SLDS override

      var style = this.props.menuPosition !== 'relative' ? {
        transform: 'none'
      } : {};
      return !this.props.disabled && this.getIsOpen() ? _react2.default.createElement(_dialog2.default, {
        align: "bottom ".concat(this.props.align),
        contentsClassName: (0, _classnames2.default)('slds-datepicker slds-dropdown', {
          'slds-dropdown_right': this.props.menuPosition === 'relative' && this.props.align === 'right',
          'slds-dropdown_left': this.props.menuPosition === 'relative' && this.props.align === 'left'
        }, this.props.className),
        context: this.context,
        hasStaticAlignment: this.props.hasStaticAlignment,
        style: style,
        onClose: this.handleClose,
        onOpen: this.handleOpen,
        onRequestTargetElement: function onRequestTargetElement() {
          return _this3.inputRef;
        },
        position: menuPosition,
        portalMount: this.props.portalMount
      }, this.getDatePicker({
        labels: labels,
        assistiveText: assistiveText
      })) : null;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "getIsOpen",
    value: function getIsOpen() {
      return !!(typeof this.props.isOpen === 'boolean' ? this.props.isOpen : this.state.isOpen);
    }
  }, {
    key: "setInputRef",
    value: function setInputRef(component) {
      this.inputRef = component; // yes, this is a re-render triggered by a render.
      // Dialog/Popper.js cannot place the popover until
      // the trigger/target DOM node is mounted. This
      // way `findDOMNode` is not called and parent
      // DOM nodes are not queried.

      if (!this.state.inputRendered) {
        this.setState({
          inputRendered: true
        });
      }
    }
  }, {
    key: "handleCalendarChange",
    value: function handleCalendarChange(event, _ref4) {
      var date = _ref4.date;
      this.setState({
        value: date,
        formattedValue: this.props.formatter(date),
        inputValue: this.props.formatter(date)
      });
      this.handleRequestClose();

      if (this.props.onChange) {
        this.props.onChange(event, {
          date: date,
          formattedDate: this.props.formatter(date),
          timezoneOffset: date.getTimezoneOffset()
        });
      } // Please remove `onDateChange` on the next breaking change.

      /* eslint-disable react/prop-types */


      if (this.props.onDateChange) {
        this.props.onDateChange(date, this.props.formatter(date));
      }
      /* eslint-enable react/prop-types */

    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside() {
      this.handleRequestClose();
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      this.setState({
        formattedValue: event.target.value,
        inputValue: event.target.value
      });
      var date = this.props.parser(event.target.value);

      if (this.props.onChange) {
        this.props.onChange(event, {
          date: date,
          formattedDate: event.target.value,
          timezoneOffset: date.getTimezoneOffset()
        });
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      // Don't open if user is selecting text
      if (event.keyCode && !event.shiftKey && (event.keyCode === _keyCode2.default.DOWN || event.keyCode === _keyCode2.default.UP)) {
        _event2.default.trapEvent(event);

        this.setState({
          isOpen: true
        });
      } // Please remove `onKeyDown` on the next breaking change.

      /* eslint-disable react/prop-types */


      if (this.props.onKeyDown) {
        this.props.onKeyDown(event, {});
      }
      /* eslint-enable react/prop-types */

    }
  }, {
    key: "handleOpen",
    value: function handleOpen(event, _ref5) {
      var portal = _ref5.portal;

      if (this.props.onOpen) {
        this.props.onOpen(event, {
          portal: portal
        });
      }

      if (this.selectedDateCell) {
        this.selectedDateCell.focus();
      }
    }
  }, {
    key: "handleRequestClose",
    value: function handleRequestClose() {
      if (this.props.onRequestClose) {
        this.props.onRequestClose();
      }

      if (this.getIsOpen()) {
        this.setState({
          isOpen: false
        });

        if (this.inputRef) {
          this.inputRef.focus();
        }
      }
    }
  }, {
    key: "openDialog",
    value: function openDialog() {
      if (this.props.onRequestOpen) {
        this.props.onRequestOpen();
      } else {
        this.setState({
          isOpen: true
        });
      }
    }
  }, {
    key: "parseDate",
    value: function parseDate(formattedValue) {
      var parsedDate = this.props.parser(formattedValue);

      if (Object.prototype.toString.call(parsedDate) !== '[object Date]' || isNaN(parsedDate.getTime())) {
        parsedDate = new Date();
      }

      return parsedDate;
    }
  }, {
    key: "render",
    value: function render() {
      // Merge objects of strings with their default object
      var labels = (0, _lodash2.default)({}, defaultProps.labels, this.props.labels);
      var assistiveText = (0, _lodash2.default)({}, defaultProps.assistiveText, this.props.assistiveText);
      var inputProps = this.getInputProps({
        assistiveText: assistiveText,
        labels: labels
      }); // `children` prop is a deprecated API. Future breaking change should limit Datepicker to only `Input` usage and not a random child node.

      var inputToRender = this.props.children ? _react2.default.cloneElement(this.props.children, _objectSpread({}, inputProps)) : _react2.default.createElement(_input2.default, inputProps);
      return _react2.default.createElement("div", {
        className: (0, _classnames2.default)('slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
          'slds-is-open': this.getIsOpen()
        }, this.props.triggerClassName)
      }, inputToRender, this.getDialog({
        labels: labels,
        assistiveText: assistiveText
      }));
    }
  }]);

  return Datepicker;
}(_react2.default.Component);

Datepicker.contextTypes = {
  iconPath: _propTypes2.default.string
};
Datepicker.displayName = _constants.DATE_PICKER;
Datepicker.propTypes = propTypes;
Datepicker.defaultProps = defaultProps;
exports.default = Datepicker;