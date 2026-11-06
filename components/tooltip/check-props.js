/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import React from 'react';

import isTriggerTabbable from '../../utilities/warning/is-trigger-tabbable';
import childrenAsTrigger from '../../utilities/warning/children-as-trigger';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		const usesChildrenAsTrigger =
			props.trigger === undefined && React.Children.count(props.children) !== 0;
		childrenAsTrigger(COMPONENT, usesChildrenAsTrigger, createDocUrl());

		// A function trigger decides its own element, so only elements are checked
		const triggerElement = usesChildrenAsTrigger
			? React.Children.toArray(props.children).find(React.isValidElement)
			: props.trigger;
		if (props.variant === 'base' && React.isValidElement(triggerElement)) {
			isTriggerTabbable(
				COMPONENT,
				triggerElement,
				createDocUrl(),
				props.silenceTriggerTabbableWarning
			);
		}
	};
}

export default checkProps;
