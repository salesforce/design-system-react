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
			'Please use an read-only Combobox instead. It is more accessible and closer aligned to SLDS.'
		);
	};
}

export default checkProps;
