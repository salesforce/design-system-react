/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import oneOfRequiredProperty from '../../utilities/warning/one-of-required-property';
/* import deprecatedPropertyValue from '../../utilities/warning/deprecated-property-value'; */

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
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
			oneOfRequiredProperty(COMPONENT, {
				heading: props.heading,
			});
		}
	};
}

export default checkProps;
