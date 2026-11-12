/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import requiredProperty from '../../utilities/warning/required-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		deprecatedProperty(
			COMPONENT,
			props.active,
			'active',
			'isActive',
			createDocUrl('isActive')
		);

		requiredProperty(
			COMPONENT,
			props.onClick !== undefined || !!props.disabled,
			'onClick',
			`ButtonStateful is controlled: without \`onClick\`, clicking it does nothing. Update \`isActive\` from \`data.isActive\` in \`onClick\`, or set \`disabled\`. ${createDocUrl(
				'onClick'
			)}`
		);
	};
}

export default checkProps;
