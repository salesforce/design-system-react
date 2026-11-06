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
	};
}

// v11 removals. Exported separately so the component can run these checks
// without enabling the pre-existing `checkProps` warnings.
export let checkRemovedProps = function checkRemovedPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkRemovedProps = function checkRemovedPropsFunction(
		COMPONENT,
		props,
		jsonDoc
	) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		sunsetProperty(
			COMPONENT,
			props.tooltip,
			'tooltip',
			`Wrap the button in a \`Tooltip\` instead: \`<Tooltip content={…} trigger={<Button … />} />\`. ${createDocUrl()}`
		);
	};
}

export default checkProps;
