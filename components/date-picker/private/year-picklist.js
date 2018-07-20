"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _combobox = require("../../combobox/combobox");

var _combobox2 = _interopRequireDefault(_combobox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var DatepickerYearSelector = (0, _createReactClass2.default)({
  displayName: 'SLDSDatepickerYearSelector',
  propTypes: {
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
  },
  getOptions: function getOptions() {
    var now = new Date();
    var fromYear = now.getFullYear() + this.props.relativeYearFrom;
    var toYear = now.getFullYear() + this.props.relativeYearTo;
    var opts = [];

    for (var year = fromYear; year < toYear; year += 1) {
      opts.push({
        label: "".concat(year),
        value: year,
        id: opts.length
      });
    }

    return opts;
  },
  getSelectedValueOption: function getSelectedValueOption() {
    var selectedYear = this.props.initialDateForCalendarRender.getFullYear();
    return this.getOptions().filter(function (option) {
      return option.value === selectedYear;
    });
  },
  handleSelect: function handleSelect(event, _ref) {
    var selectedValues = _ref.selection;
    var selectedValue = selectedValues[0]; // safe since we are working with a single selection

    if (selectedValue) {
      this.props.onChangeMonth(new Date(this.props.initialDateForCalendarRender.setFullYear(parseInt(selectedValue.value, 10))));
    }
  },
  render: function render() {
    var selection = this.getSelectedValueOption();
    return _react2.default.createElement("div", {
      className: "slds-form-element slds-align-content-center"
    }, _react2.default.createElement(_combobox2.default, {
      className: "slds-shrink-none",
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
});
exports.default = DatepickerYearSelector;