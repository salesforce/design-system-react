/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props) {
		const options = Array.isArray(props.options) ? props.options : [];
		const findDeprecated = (field) =>
			options.find((option) => option && option[field] !== undefined)?.[field];
		deprecatedProperty(
			COMPONENT,
			findDeprecated('bare'),
			'options[].bare',
			'options[].isBare'
		);
		deprecatedProperty(
			COMPONENT,
			findDeprecated('error'),
			'options[].error',
			'options[].hasError'
		);
	};
}

export default checkProps;
