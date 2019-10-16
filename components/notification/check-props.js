/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import componentIsDeprecated from '../../utilities/warning/component-is-deprecated';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props) {
		componentIsDeprecated(
			COMPONENT,
			props,
			'Please use Alert or Toast in the future. Notications is not the same component in SLDS any longer.'
		);
	};
}

export default checkProps;
