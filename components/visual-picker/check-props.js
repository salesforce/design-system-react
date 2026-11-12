/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import requiredProperty from '../../utilities/warning/required-property';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props) {
		requiredProperty(
			COMPONENT,
			props.href !== undefined,
			'href',
			'Without it the link renders an `<a>` that is not focusable and goes nowhere.'
		);
	};
}

export default checkProps;
