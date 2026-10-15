/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import React from 'react';

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
	};
}

export default checkProps;
