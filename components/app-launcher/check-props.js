"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deprecatedProperty = require("../../utilities/warning/deprecated-property");

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _oneOfComponent = require("../../utilities/warning/one-of-component");

var _oneOfComponent2 = _interopRequireDefault(_oneOfComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props) {
    if (props.modalHeaderButton !== undefined) {
      (0, _oneOfComponent2.default)(COMPONENT, props, 'modalHeaderButton', ['SLDSButton']);
    }

    (0, _deprecatedProperty2.default)(COMPONENT, props.triggerAssistiveText, 'triggerAssistiveText', "assistiveText['trigger']");
  };
}

exports.default = checkProps;