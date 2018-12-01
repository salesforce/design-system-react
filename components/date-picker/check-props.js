"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deprecatedProperty = require("../../utilities/warning/deprecated-property");

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _getComponentDoc = require("../../utilities/get-component-doc");

var _getComponentDoc2 = _interopRequireDefault(_getComponentDoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable  max-len */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc2.default)(jsonDoc);
    (0, _deprecatedProperty2.default)(COMPONENT, props.children, 'children', 'input', "Please see `input` prop description and add your own `Input`. Props will be shallow merged. ".concat(createDocUrl('input')));
    (0, _deprecatedProperty2.default)(COMPONENT, props.onFocus, 'onFocus', undefined, "Please see `input` prop description and add your own `Input`. Props will be shallow merged. ".concat(createDocUrl('input')));
    (0, _deprecatedProperty2.default)(COMPONENT, props.onBlur, 'onBlur', undefined, "Please see `input` prop description and add your own `Input`. Props will be shallow merged. ".concat(createDocUrl('input')));
    (0, _deprecatedProperty2.default)(COMPONENT, props.abbrWeekDayLabels, 'abbrWeekDayLabels', 'abbreviatedWeekDayLabels', "Prop name has changed. ".concat(createDocUrl('labels')));
    (0, _deprecatedProperty2.default)(COMPONENT, props.onDateChange, 'onDateChange', 'onChange', "Please see prop description for `onChange`. Parameters have changed. The callback receives an event and a data object of the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}` ".concat(createDocUrl('onChange')));
    (0, _deprecatedProperty2.default)(COMPONENT, props.onKeyDown, 'onKeyDown', undefined, "Please see `input` prop description and add your own `Input`. Props will be shallow merged. ".concat(createDocUrl('input')));
    (0, _deprecatedProperty2.default)(COMPONENT, props.onFocus, 'required', undefined, "Please see children prop description and add your own `Input` as a child of Datepicker. ".concat(createDocUrl('children')));
    (0, _deprecatedProperty2.default)(COMPONENT, props.strValue, 'strValue', 'formattedValue', createDocUrl('formattedValue'));
    (0, _deprecatedProperty2.default)(COMPONENT, props.isInline, 'isInline', 'menuPosition="relative"', createDocUrl('menuPosition'));
  };
}

exports.default = checkProps;