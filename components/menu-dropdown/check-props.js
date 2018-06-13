"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oneOfRequiredProperty = require("../../utilities/warning/one-of-required-property");

var _oneOfRequiredProperty2 = _interopRequireDefault(_oneOfRequiredProperty);

var _hasChildrenWithoutDisplayNameOf = require("../../utilities/warning/has-children-without-display-name-of");

var _hasChildrenWithoutDisplayNameOf2 = _interopRequireDefault(_hasChildrenWithoutDisplayNameOf);

var _sunsetProperty = require("../../utilities/warning/sunset-property");

var _sunsetProperty2 = _interopRequireDefault(_sunsetProperty);

var _deprecatedProperty = require("../../utilities/warning/deprecated-property");

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props) {
    (0, _sunsetProperty2.default)(COMPONENT, props.forceOpen, 'forceOpen', 'Please use isOpen instead. It provides a consistent prop that aligns with other componenents.');
    (0, _oneOfRequiredProperty2.default)(COMPONENT, {
      options: props.options,
      children: props.children
    });

    if (!props.options) {
      (0, _hasChildrenWithoutDisplayNameOf2.default)(COMPONENT, props.children, _constants.MENU_DROPDOWN_TRIGGER);
    }

    (0, _deprecatedProperty2.default)(COMPONENT, props.isInline, 'isInline', 'menuPosition="relative"');
  };
}

exports.default = checkProps;