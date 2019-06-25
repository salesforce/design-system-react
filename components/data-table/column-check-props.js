/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import ifOneThenBothRequiredProperty from '../../utilities/warning/if-one-then-both-required-property';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props) {
		/* eslint-disable max-len */
		// Deprecated and changed to another property
		ifOneThenBothRequiredProperty(COMPONENT, props, {
			isSorted: props.isSorted,
			sortDirection: props.sortDirection,
		});
		/* eslint-enable max-len */
	};
}

export default checkProps;
