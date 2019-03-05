/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import oneOfRequiredProperty from '../../utilities/warning/one-of-required-property';
import hasChildrenWithoutDisplayNameOf from '../../utilities/warning/has-children-without-display-name-of';
import sunsetProperty from '../../utilities/warning/sunset-property';
import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';

import checkPropType from '../../utilities/warning/check-prop-type';
import Button from '../button';
import { MENU_DROPDOWN_TRIGGER } from '../../utilities/constants';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		sunsetProperty(
			COMPONENT,
			props.forceOpen,
			'forceOpen',
			`Please use \`isOpen\` instead. It provides a consistent prop that aligns with other componenents. ${createDocUrl(
				'isOpen'
			)}`
		);

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

		if (!props.options) {
			hasChildrenWithoutDisplayNameOf(
				COMPONENT,
				props.children,
				MENU_DROPDOWN_TRIGGER,
				createDocUrl('children')
			);
		}

		deprecatedProperty(
			COMPONENT,
			props.isInline,
			'isInline',
			'menuPosition="relative"',
			createDocUrl('menuPosition')
		);

		checkPropType(
			COMPONENT,
			props.children,
			'children',
			Button,
			'Button',
			createDocUrl()
		);
	};
}

export default checkProps;
