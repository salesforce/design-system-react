/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import oneOfRequiredProperty from '../../utilities/warning/one-of-required-property';
import sunsetProperty from '../../utilities/warning/sunset-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		/* eslint-disable max-len */
		oneOfRequiredProperty(
			COMPONENT,
			{
				assistiveText: props.assistiveText,
				heading: props.heading,
			},
			createDocUrl()
		);

		// Deprecated and changed to another property
		deprecatedProperty(
			COMPONENT,
			props.onClick,
			'onClick',
			'onSelect',
			'`onSelect` receives `(event, { node, isSelected })`, where `isSelected` is the requested selection state.'
		);
		deprecatedProperty(
			COMPONENT,
			props.onExpandClick,
			'onExpandClick',
			'onRequestToggle',
			'`onRequestToggle` receives `(event, { node, isExpanded })`, where `isExpanded` is the requested expansion state. Left arrow on a collapsed branch or item selects the parent through `onSelect` instead.'
		);
		/* eslint-enable max-len */

		if (typeof props.assistiveText === 'string') {
			sunsetProperty(
				COMPONENT,
				props.assistiveText,
				'assistiveText',
				`\`assistiveText\` as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use \`assistiveText.label\` instead. ${createDocUrl(
					'assistiveText'
				)}`
			);
		}
	};
}

export default checkProps;
