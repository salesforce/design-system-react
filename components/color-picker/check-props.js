/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import warning from 'warning';

import onlyOneOfProperties from '../../utilities/warning/only-one-of-properties';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	let hasWarnedMissingValue = false;

	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		onlyOneOfProperties(
			COMPONENT,
			{
				'assistiveText.label': props.assistiveText && props.assistiveText.label,
				label: props.labels && props.labels.label,
			},
			createDocUrl('assistiveText')
		);

		if (!hasWarnedMissingValue) {
			warning(
				props.value !== undefined,
				`[Design System React] \`value\` is required by ${COMPONENT}. ColorPicker is controlled: pass \`value\` (\`''\` for no color) and update it in \`events.onChange\`.`
			);
			hasWarnedMissingValue = props.value === undefined;
		}
	};
}

export default checkProps;
