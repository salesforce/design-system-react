/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import oneOfRequiredProperty from '../../utilities/warning/one-of-required-property';
import onlyOneOfProperties from '../../utilities/warning/only-one-of-properties';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
		const assistiveText = props.assistiveText || {};

		const headingProps = {
			'labels.heading': props.labels?.heading ?? props.heading,
			'assistiveText.heading': assistiveText.heading ?? assistiveText.label,
		};
		oneOfRequiredProperty(COMPONENT, headingProps, createDocUrl());
		onlyOneOfProperties(COMPONENT, headingProps, createDocUrl());

		deprecatedProperty(
			COMPONENT,
			props.heading,
			'heading',
			'labels.heading',
			createDocUrl('labels')
		);
		deprecatedProperty(
			COMPONENT,
			assistiveText.label,
			'assistiveText.label',
			'assistiveText.heading',
			createDocUrl('assistiveText')
		);

		/* eslint-disable max-len */
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
		deprecatedProperty(
			COMPONENT,
			props.listClassName,
			'listClassName',
			'classNameList'
		);
		deprecatedProperty(COMPONENT, props.listStyle, 'listStyle', 'styleList');
		/* eslint-enable max-len */
	};
}

export default checkProps;
