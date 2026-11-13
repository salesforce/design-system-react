/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import sunsetProperty from '../../utilities/warning/sunset-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		if (typeof props.assistiveText === 'string') {
			const createDocUrl = getComponentDocFn(jsonDoc);

			sunsetProperty(
				COMPONENT,
				props.assistiveText,
				'assistiveText',
				`\`assistiveText\` as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use \`assistiveText.label\` instead. ${createDocUrl(
					'assistiveText'
				)}`
			);
		}

		deprecatedProperty(
			COMPONENT,
			props.productTheme,
			'productTheme',
			undefined,
			"It hard-codes legacy product brand colors that SLDS 2 themes don't define, and is removed before 11.0.0. Set the background color yourself with `style` or `className`: `<Icon style={{ backgroundColor: '#00857d' }} />`."
		);
	};
}

export default checkProps;
