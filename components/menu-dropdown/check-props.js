/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import React from 'react';

import oneOfRequiredProperty from '../../utilities/warning/one-of-required-property';
import sunsetProperty from '../../utilities/warning/sunset-property';
import deprecatedProperty from '../../utilities/warning/deprecated-property';
import childrenAsTrigger from '../../utilities/warning/children-as-trigger';
import getComponentDocFn from '../../utilities/get-component-doc';
import { MENU_DROPDOWN_TRIGGER } from '../../utilities/constants';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		sunsetProperty(
			COMPONENT,
			props.forceOpen,
			'forceOpen',
			`Please use \`isOpen\` instead. It provides a consistent prop that aligns with other componenents. ${createDocUrl(
				'isOpen'
			)}`
		);

		sunsetProperty(COMPONENT, props.tooltip, 'tooltip', createDocUrl());

		deprecatedProperty(
			COMPONENT,
			props.offset,
			'offset',
			undefined,
			`The manual setting of positional offset of dialog components has been deemed unreliable. Position logic has been re-written to deliver better and more reliable positioning. Please create an issue if you have an edge case not covered by the built-in logic. ${createDocUrl()}`
		);

		oneOfRequiredProperty(
			COMPONENT,
			{
				options: props.options,
				children: props.children,
			},
			createDocUrl()
		);

		deprecatedProperty(
			COMPONENT,
			props.listItemRenderer,
			'listItemRenderer',
			'renderMenuItem',
			`\`renderMenuItem\` is a function called with \`{ icon, isSelected, option, optionIndex }\`, not a component. ${createDocUrl('renderMenuItem')}`
		);
		childrenAsTrigger(
			COMPONENT,
			props.trigger === undefined &&
				React.Children.toArray(props.children).some(
					(child) => child?.type?.displayName === MENU_DROPDOWN_TRIGGER
				),
			createDocUrl('trigger')
		);

		deprecatedProperty(
			COMPONENT,
			props.isInline,
			'isInline',
			'menuPosition="relative"',
			createDocUrl('menuPosition')
		);
	};
}

export default checkProps;
