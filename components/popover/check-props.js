"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oneOfRequiredProperty = require("../../utilities/warning/one-of-required-property");

var _oneOfRequiredProperty2 = _interopRequireDefault(_oneOfRequiredProperty);

var _oneOfComponent = require("../../utilities/warning/one-of-component");

var _oneOfComponent2 = _interopRequireDefault(_oneOfComponent);

var _deprecatedProperty = require("../../utilities/warning/deprecated-property");

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _getComponentDoc = require("../../utilities/get-component-doc");

var _getComponentDoc2 = _interopRequireDefault(_getComponentDoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable max-len */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc2.default)(jsonDoc);
    (0, _oneOfRequiredProperty2.default)(COMPONENT, {
      ariaLabelledby: props.ariaLabelledby,
      heading: props.heading
    }, createDocUrl());

    if (props.children !== undefined) {
      (0, _oneOfComponent2.default)(COMPONENT, props, 'children', ['SLDSButton', 'a', 'button'], createDocUrl());
    }

    (0, _deprecatedProperty2.default)(COMPONENT, props.offset, 'offset', undefined, "The manual setting of positional offset of dialog components has been deemed unreliable. Position logic has been re-written to deliver better and more reliable positioning. Please create an issue if you have an edge case not covered by the built-in logic. ".concat(createDocUrl()));
    (0, _deprecatedProperty2.default)(COMPONENT, props.isInline, 'isInline', 'position="relative"', createDocUrl('position'));
    (0, _deprecatedProperty2.default)(COMPONENT, props.closeButtonAssistiveText, 'closeButtonAssistiveText', "assistiveText['closeButton']", createDocUrl('assistiveText'));
  };
}

exports.default = checkProps;