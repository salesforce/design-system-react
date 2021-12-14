"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _oneOfRequiredProperty = _interopRequireDefault(require("../../utilities/warning/one-of-required-property"));

var _oneOfComponent = _interopRequireDefault(require("../../utilities/warning/one-of-component"));

var _deprecatedProperty = _interopRequireDefault(require("../../utilities/warning/deprecated-property"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

var _incompatibleProps = _interopRequireDefault(require("../../utilities/warning/incompatible-props"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable max-len */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);
    (0, _oneOfRequiredProperty.default)(COMPONENT, {
      ariaLabelledby: props.ariaLabelledby,
      heading: props.heading
    }, createDocUrl());

    if (props.children !== undefined) {
      if (props.children.length && props.children.length > 1) {
        (0, _oneOfComponent.default)(COMPONENT, props, 'children[0]', ['SLDSButton', 'a', 'button', 'SLDSInnerInput', 'SLDSPopoverTooltip'], " Multiple children of any kind are allowed, but the first child must serve as the trigger component. ".concat(createDocUrl()), props.children[0]);
      } else {
        (0, _oneOfComponent.default)(COMPONENT, props, 'children', ['SLDSButton', 'a', 'button', 'SLDSInnerInput', 'SLDSPopoverTooltip'], createDocUrl());
      }
    }

    (0, _deprecatedProperty.default)(COMPONENT, props.offset, 'offset', undefined, "The manual setting of positional offset of dialog components has been deemed unreliable. Position logic has been re-written to deliver better and more reliable positioning. Please create an issue if you have an edge case not covered by the built-in logic. ".concat(createDocUrl()), props.silenceDeprecatedPropertyWarning || false);
    (0, _deprecatedProperty.default)(COMPONENT, props.isInline, 'isInline', 'position="relative"', createDocUrl('position'));
    (0, _deprecatedProperty.default)(COMPONENT, props.closeButtonAssistiveText, 'closeButtonAssistiveText', "assistiveText['closeButton']", createDocUrl('assistiveText'));
    (0, _incompatibleProps.default)(COMPONENT, props, 'position', ['relative'], 'target', null, "".concat(createDocUrl()));
  };
}

var _default = checkProps;
exports.default = _default;