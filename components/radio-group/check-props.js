/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';
import requiredProperty from '../../utilities/warning/required-property';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		// Without a group `value`, selection falls back to `checked` on each
		// child Radio. That still works in v11 but is deprecated.
		deprecatedProperty(
			COMPONENT,
			props.value === undefined ? true : undefined,
			'checked',
			undefined,
			`Pass \`value\` to RadioGroup or RadioButtonGroup instead of \`checked\` on each Radio, and read \`data.value\` in \`onChange\`. ${createDocUrl(
				'value'
			)}`
		);

		// React's own "`checked` without `onChange`" warning never fires,
		// because the group always attaches its own change handler.
		requiredProperty(
			COMPONENT,
			props.onChange !== undefined || !!props.disabled,
			'onChange',
			`RadioGroup and RadioButtonGroup are controlled: without \`onChange\`, selecting a radio does nothing. Update \`value\` from \`data.value\` in \`onChange\`, or set \`disabled\`. ${createDocUrl(
				'onChange'
			)}`
		);
	};
}

export default checkProps;
