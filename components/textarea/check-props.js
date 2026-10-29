/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import onlyOneOfProperties from '../../utilities/warning/only-one-of-properties';
import sunsetProperty from '../../utilities/warning/sunset-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		onlyOneOfProperties(
			COMPONENT,
			{
				'labels.label': props.labels?.label ?? props.label,
				'assistiveText.label': props.assistiveText?.label,
			},
			createDocUrl()
		);

		if (typeof props.maxLength === 'string') {
			sunsetProperty(
				COMPONENT,
				props.maxLength,
				'maxLength',
				`\`maxLength\` as a string has been deprecated. Please pass a number instead. ${createDocUrl(
					'maxLength'
				)}`
			);
		}

		deprecatedProperty(
			COMPONENT,
			props.errorText,
			'errorText',
			'labels.error` and `hasError',
			createDocUrl('labels')
		);
		deprecatedProperty(
			COMPONENT,
			props.label,
			'label',
			'labels.label',
			createDocUrl('labels')
		);
	};
}

export default checkProps;
