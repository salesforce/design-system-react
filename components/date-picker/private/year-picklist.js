"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _combobox = require("../../combobox/combobox");

var _combobox2 = _interopRequireDefault(_combobox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var DatepickerYearSelector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DatepickerYearSelector, _React$Component);

  function DatepickerYearSelector() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DatepickerYearSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DatepickerYearSelector.__proto__ || Object.getPrototypeOf(DatepickerYearSelector)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "getOptions", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var now = new Date();

        var fromYear = now.getFullYear() + _this.props.relativeYearFrom;

        var toYear = now.getFullYear() + _this.props.relativeYearTo;

        var opts = [];

        for (var year = fromYear; year < toYear; year += 1) {
          opts.push({
            label: "".concat(year),
            value: year,
            id: String(opts.length)
          });
        }

        return opts;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getSelectedValueOption", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var selectedYear = _this.props.initialDateForCalendarRender.getFullYear();

        return _this.getOptions().filter(function (option) {
          return option.value === selectedYear;
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleSelect", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, _ref2) {
        var selectedValues = _ref2.selection;
        var selectedValue = selectedValues[0]; // safe since we are working with a single selection

        if (selectedValue) {
          _this.props.onChangeMonth(new Date(_this.props.initialDateForCalendarRender.setFullYear(parseInt(selectedValue.value, 10))));
        }
      }
    }), _temp));
  }

  _createClass(DatepickerYearSelector, [{
    key: "render",
    value: function render() {
      var selection = this.getSelectedValueOption();
      return _react2.default.createElement("div", {
        className: "slds-form-element slds-align-content-center"
      }, _react2.default.createElement(_combobox2.default, {
        className: "slds-shrink-none",
        classNameMenu: "slds-datepicker",
        events: {
          onSelect: this.handleSelect
        },
        id: "".concat(this.props.id, "-year-picklist"),
        inheritWidthOf: "target",
        menuPosition: "relative",
        multiple: false,
        options: this.getOptions(),
        labels: {
          placeholder: 'Year'
        },
        selection: selection,
        value: selection.value,
        variant: "readonly"
      }));
    }
  }]);

  return DatepickerYearSelector;
}(_react2.default.Component);

Object.defineProperty(DatepickerYearSelector, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'SLDSDatepickerYearSelector'
});
Object.defineProperty(DatepickerYearSelector, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * HTML id for component
     */
    id: _propTypes2.default.string,

    /**
     * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
     */
    initialDateForCalendarRender: _propTypes2.default.instanceOf(Date).isRequired,

    /**
     * Displayed calendar has changed or re-rendered
     */
    onChangeMonth: _propTypes2.default.func.isRequired,

    /**
     * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
     */
    relativeYearFrom: _propTypes2.default.number,

    /**
     * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
     */
    relativeYearTo: _propTypes2.default.number,

    /**
     * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
     */
    yearPicklistButtonRef: _propTypes2.default.func
  }
});
exports.default = DatepickerYearSelector;