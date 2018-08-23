"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deprecatedProperty = require("../../utilities/warning/deprecated-property");

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable  max-len */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props) {
    (0, _deprecatedProperty2.default)(COMPONENT, props.onFocus, 'onFocus', undefined, 'Please see children prop description and add your own `Input` with this prop as a child of Datepicker.');
    (0, _deprecatedProperty2.default)(COMPONENT, props.onBlur, 'onBlur', undefined, 'Please see children prop description and add your own `Input` with this prop as a child of Datepicker.');
    (0, _deprecatedProperty2.default)(COMPONENT, props.onFocus, 'abbrWeekDayLabels', 'abbreviatedWeekDayLabels', 'Prop name has changed.');
    (0, _deprecatedProperty2.default)(COMPONENT, props.onFocus, 'onDateChange', 'onChange', 'Please see prop description for `onChange`. Parameters have changed. The callback recieves an event and a data object of the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}`');
    (0, _deprecatedProperty2.default)(COMPONENT, props.onFocus, 'onKeyDown', undefined, 'Please see children prop description and add your own `Input` as a child of Datepicker.');
    (0, _deprecatedProperty2.default)(COMPONENT, props.onFocus, 'required', undefined, 'Please see children prop description and add your own `Input` as a child of Datepicker.');
    (0, _deprecatedProperty2.default)(COMPONENT, props.strValue, 'strValue', 'formattedValue');
    (0, _deprecatedProperty2.default)(COMPONENT, props.isInline, 'isInline', 'menuPosition="relative"');
  };
}

exports.default = checkProps;