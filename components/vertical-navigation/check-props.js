/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import requiredProperty from '../../utilities/warning/required-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props) {
		deprecatedProperty(
			COMPONENT,
			props.variant,
			'variant',
			undefined,
			'Shade variant is deprecated as there is no background supported currently. Vertical Navigation now uses a default shade.'
		);
	};
}

// Controlled-selection checks. Exported separately so the component can run
// them without enabling the pre-existing `checkProps` warnings.
export let checkRequiredProps = function checkRequiredPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkRequiredProps = function checkRequiredPropsFunction(
		COMPONENT,
		props,
		jsonDoc
	) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		requiredProperty(
			COMPONENT,
			props.selectedId !== undefined,
			'selectedId',
			`VerticalNavigation is controlled and no longer selects the first item by default: pass \`selectedId\` (or \`null\` for no selection) and update it in \`onSelect\`. ${createDocUrl('selectedId')}`
		);
	};
}

export default checkProps;
