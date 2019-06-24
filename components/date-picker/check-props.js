"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deprecatedProperty = _interopRequireDefault(require("../../utilities/warning/deprecated-property"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable  max-len */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);
    (0, _deprecatedProperty.default)(COMPONENT, props.children, 'children', 'input', "Please see `input` prop description and add your own `Input`. Props will be shallow merged. ".concat(createDocUrl('input')));
    (0, _deprecatedProperty.default)(COMPONENT, props.onFocus, 'onFocus', undefined, "Please see `input` prop description and add your own `Input`. Props will be shallow merged. ".concat(createDocUrl('input')));
    (0, _deprecatedProperty.default)(COMPONENT, props.onBlur, 'onBlur', undefined, "Please see `input` prop description and add your own `Input`. Props will be shallow merged. ".concat(createDocUrl('input')));
    (0, _deprecatedProperty.default)(COMPONENT, props.abbrWeekDayLabels, 'abbrWeekDayLabels', 'abbreviatedWeekDayLabels', "Prop name has changed. ".concat(createDocUrl('labels')));
    (0, _deprecatedProperty.default)(COMPONENT, props.onDateChange, 'onDateChange', 'onChange', "Please see prop description for `onChange`. Parameters have changed. The callback receives an event and a data object of the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}` ".concat(createDocUrl('onChange')));
    (0, _deprecatedProperty.default)(COMPONENT, props.onKeyDown, 'onKeyDown', undefined, "Please see `input` prop description and add your own `Input`. Props will be shallow merged. ".concat(createDocUrl('input')));
    (0, _deprecatedProperty.default)(COMPONENT, props.onFocus, 'required', undefined, "Please see children prop description and add your own `Input` as a child of Datepicker. ".concat(createDocUrl('children')));
    (0, _deprecatedProperty.default)(COMPONENT, props.strValue, 'strValue', 'formattedValue', createDocUrl('formattedValue'));
    (0, _deprecatedProperty.default)(COMPONENT, props.isInline, 'isInline', 'menuPosition="relative"', createDocUrl('menuPosition'));
  };
}

var _default = checkProps;
exports.default = _default;