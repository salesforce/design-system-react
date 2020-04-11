/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import getComponentDocFn from '../../utilities/get-component-doc';
import ifOneThenBothRequiredProperty from '../../utilities/warning/if-one-then-both-required-property';
import sunsetProperty from '../../utilities/warning/sunset-property';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		/* eslint-disable max-len */
		// If iconName is set, iconCategory must also be set.
		ifOneThenBothRequiredProperty(
			COMPONENT,
			props,
			{
				iconName: props.iconName,
				iconCategory: props.iconCategory,
			},
			createDocUrl('iconCategory')
		);

		if (typeof props.assistiveText === 'string') {
			sunsetProperty(
				COMPONENT,
				props.assistiveText,
				'assistiveText',
				`\`assistiveText\` as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use \`assistiveText.icon\` instead. ${createDocUrl(
					'assistiveText'
				)}`
			);
		}
	};
}

export default checkProps;
