"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deprecatedPropertyValue = _interopRequireDefault(require("../../utilities/warning/deprecated-property-value"));

var _deprecatedProperty = _interopRequireDefault(require("../../utilities/warning/deprecated-property"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);

    if (props.variant === 'objectHome') {
      (0, _deprecatedPropertyValue.default)(COMPONENT, {
        propAsString: 'variant',
        propValue: props.variant,
        deprecatedPropValue: 'objectHome',
        replacementPropAsValue: 'object-home'
      }, "Using value of variants in camelCase is deprecated. Use kebab-case ('object-home') instead. ".concat(createDocUrl('variant')));
    }

    if (props.variant === 'recordHome') {
      (0, _deprecatedPropertyValue.default)(COMPONENT, {
        propAsString: 'variant',
        propValue: props.variant,
        deprecatedPropValue: 'recordHome',
        replacementPropAsValue: 'record-home'
      }, "Using value of variants in camelCase is deprecated. Use kebab-case ('record-home') instead. ".concat(createDocUrl('variant')));
    }

    if (props.variant === 'relatedList') {
      (0, _deprecatedPropertyValue.default)(COMPONENT, {
        propAsString: 'variant',
        propValue: props.variant,
        deprecatedPropValue: 'relatedList',
        replacementPropAsValue: 'related-list'
      }, "Using value of variants in camelCase is deprecated. Use kebab-case ('related-list') instead. ".concat(createDocUrl('variant')));
    }

    (0, _deprecatedProperty.default)(COMPONENT, props.navRight, 'navRight', 'onRenderControls', createDocUrl('onRenderControls'));
  };
}

var _default = checkProps;
exports.default = _default;