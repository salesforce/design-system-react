"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _componentIsPrototype = _interopRequireDefault(require("../../utilities/warning/component-is-prototype"));

var _oneOfRequiredProperty = _interopRequireDefault(require("../../utilities/warning/one-of-required-property"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* import deprecatedPropertyValue from '../../utilities/warning/deprecated-property-value'; */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);
    (0, _componentIsPrototype.default)(COMPONENT);
    /**
     * If illustration SVGs are added to SLDS in the future, we will deprecate the value
     * of internalIllustration being true and give a warning.
     *
    if (props.internalIllustration) {
    		deprecatedPropertyValue(COMPONENT, {
    			propAsString: 'internalIllustration',
    			propValue: props.internalIllustration,
    			deprecatedPropValue: true,
    			replacementPropAsValue: false,
    		},
    		'Using illustration SVGs from inside this repo is deprecated. Please update your assets/images path to use the SVGs found in the @salesforce/design-system npm module.');
    	}
     */

    if (props.illustration || props.path) {
      // An illustration image must be accompanied with a heading text
      (0, _oneOfRequiredProperty.default)(COMPONENT, {
        heading: props.heading
      }, createDocUrl('heading'));
    }
  };
}

var _default = checkProps;
exports.default = _default;