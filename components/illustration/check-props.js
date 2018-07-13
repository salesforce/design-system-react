"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oneOfRequiredProperty = require("../../utilities/warning/one-of-required-property");

var _oneOfRequiredProperty2 = _interopRequireDefault(_oneOfRequiredProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* import deprecatedPropertyValue from '../../utilities/warning/deprecated-property-value'; */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props) {
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
      (0, _oneOfRequiredProperty2.default)(COMPONENT, {
        heading: props.heading
      });
    }
  };
}

exports.default = checkProps;