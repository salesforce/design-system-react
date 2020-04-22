/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import React from 'react';

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import deprecatedPropertyValue from '../../utilities/warning/deprecated-property-value';
import isTriggerTabbable from '../../utilities/warning/is-trigger-tabbable';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		if (
			props.variant === 'base' &&
			React.Children.count(props.children) !== 0
		) {
			isTriggerTabbable(
				COMPONENT,
				props.children,
				createDocUrl(),
				props.silenceTriggerTabbableWarning
			);
		}

		// Deprecated and changed to another property
		deprecatedPropertyValue(
			COMPONENT,
			{
				propAsString: 'variant',
				propValue: props.variant,
				deprecatedPropValue: 'info',
				replacementPropAsString: 'theme',
				replacementPropAsValue: 'info',
			},
			createDocUrl('theme')
		);
		deprecatedPropertyValue(
			COMPONENT,
			{
				propAsString: 'variant',
				propValue: props.variant,
				deprecatedPropValue: 'error',
				replacementPropAsString: 'theme',
				replacementPropAsValue: 'error',
			},
			createDocUrl('theme')
		);
		deprecatedProperty(
			COMPONENT,
			props.openByDefault,
			'openByDefault',
			'isOpen',
			createDocUrl('isOpen')
		);
		deprecatedProperty(
			COMPONENT,
			props.target,
			'target',
			undefined,
			`A new positioning library is being implmented under the hood. Please trigger tooltips to appear on their triggers with \`isOpen\` and not on other DOM elements. ${createDocUrl(
				'isOpen'
			)}` // eslint-disable-line max-len
		);

		deprecatedProperty(
			COMPONENT,
			props.isInline,
			'isInline',
			'position="relative"',
			createDocUrl('position')
		);
	};
}

export default checkProps;
