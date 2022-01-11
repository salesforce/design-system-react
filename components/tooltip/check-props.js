"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _deprecatedProperty = _interopRequireDefault(require("../../utilities/warning/deprecated-property"));

var _deprecatedPropertyValue = _interopRequireDefault(require("../../utilities/warning/deprecated-property-value"));

var _isTriggerTabbable = _interopRequireDefault(require("../../utilities/warning/is-trigger-tabbable"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);

    if (props.variant === 'base' && _react.default.Children.count(props.children) !== 0) {
      (0, _isTriggerTabbable.default)(COMPONENT, props.children, createDocUrl(), props.silenceTriggerTabbableWarning);
    } // Deprecated and changed to another property


    (0, _deprecatedPropertyValue.default)(COMPONENT, {
      propAsString: 'variant',
      propValue: props.variant,
      deprecatedPropValue: 'info',
      replacementPropAsString: 'theme',
      replacementPropAsValue: 'info'
    }, createDocUrl('theme'));
    (0, _deprecatedPropertyValue.default)(COMPONENT, {
      propAsString: 'variant',
      propValue: props.variant,
      deprecatedPropValue: 'error',
      replacementPropAsString: 'theme',
      replacementPropAsValue: 'error'
    }, createDocUrl('theme'));
    (0, _deprecatedProperty.default)(COMPONENT, props.openByDefault, 'openByDefault', 'isOpen', createDocUrl('isOpen'));
    (0, _deprecatedProperty.default)(COMPONENT, props.target, 'target', undefined, "A new positioning library is being implmented under the hood. Please trigger tooltips to appear on their triggers with `isOpen` and not on other DOM elements. ".concat(createDocUrl('isOpen')) // eslint-disable-line max-len
    );
    (0, _deprecatedProperty.default)(COMPONENT, props.isInline, 'isInline', 'position="relative"', createDocUrl('position'));
  };
}

var _default = checkProps;
exports.default = _default;