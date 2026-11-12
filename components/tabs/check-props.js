/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import requiredProperty from '../../utilities/warning/required-property';
import sunsetProperty from '../../utilities/warning/sunset-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		sunsetProperty(
			COMPONENT,
			props.defaultSelectedIndex !== undefined,
			'defaultSelectedIndex',
			`Tabs is controlled: pass \`value\` and update it in \`onSelect\`. ${createDocUrl('value')}`
		);

		deprecatedProperty(
			COMPONENT,
			props.selectedIndex,
			'selectedIndex',
			'value',
			`Set \`value\` on each \`TabsPanel\` (a panel without one is matched by its index as a string) and read \`value\` in \`onSelect\`. ${createDocUrl('value')}`
		);

		requiredProperty(
			COMPONENT,
			props.value !== undefined || props.selectedIndex !== undefined,
			'value',
			`Tabs is controlled: without \`value\` no tab is selected. Pass \`value\` and update it in \`onSelect\`. ${createDocUrl('value')}`
		);
	};
}

export default checkProps;
