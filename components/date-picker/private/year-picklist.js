"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _combobox = _interopRequireDefault(require("../../combobox/combobox"));

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

var DatepickerYearSelector = /*#__PURE__*/function (_React$Component) {
  _inherits(DatepickerYearSelector, _React$Component);

  var _super = _createSuper(DatepickerYearSelector);

  function DatepickerYearSelector() {
    var _this;

    _classCallCheck(this, DatepickerYearSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "getOptions", function () {
      var now = new Date();

      var fromYear = now.getFullYear() + _this.props.relativeYearFrom;

      var toYear = now.getFullYear() + _this.props.relativeYearTo;

      var opts = []; // eslint-disable-next-line fp/no-loops

      for (var year = fromYear; year < toYear; year += 1) {
        // eslint-disable-next-line fp/no-mutating-methods
        opts.push({
          label: "".concat(year),
          value: year,
          id: String(opts.length)
        });
      }

      return opts;
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedValueOption", function () {
      var selectedYear = _this.props.initialDateForCalendarRender.getFullYear();

      return _this.getOptions().filter(function (option) {
        return option.value === selectedYear;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (event, _ref) {
      var selectedValues = _ref.selection;
      var selectedValue = selectedValues[0]; // safe since we are working with a single selection

      if (selectedValue) {
        _this.props.onChangeMonth(new Date(_this.props.initialDateForCalendarRender.setFullYear(parseInt(selectedValue.value, 10))));
      }
    });

    return _this;
  }

  _createClass(DatepickerYearSelector, [{
    key: "render",
    value: function render() {
      var selection = this.getSelectedValueOption();
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element slds-align-content-center"
      }, /*#__PURE__*/_react.default.createElement(_combobox.default, {
        assistiveText: {
          label: this.props.assistiveTextYear
        },
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
}(_react.default.Component);

_defineProperty(DatepickerYearSelector, "displayName", 'SLDSDatepickerYearSelector');

_defineProperty(DatepickerYearSelector, "propTypes", {
  /**
   * Label for year picklist/combobox
   */
  assistiveTextYear: _propTypes.default.string.isRequired,

  /**
   * HTML id for component
   */
  id: _propTypes.default.string,

  /**
   * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
   */
  initialDateForCalendarRender: _propTypes.default.instanceOf(Date).isRequired,

  /**
   * Displayed calendar has changed or re-rendered
   */
  onChangeMonth: _propTypes.default.func.isRequired,

  /**
   * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
   */
  relativeYearFrom: _propTypes.default.number,

  /**
   * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
   */
  relativeYearTo: _propTypes.default.number
});

var _default = DatepickerYearSelector;
exports.default = _default;