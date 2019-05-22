/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import hasChildrenWithoutDisplayNameof from '../../utilities/warning/has-children-without-display-name-of';
import getComponentDocFn from '../../utilities/get-component-doc';

import { SETUP_ASSISTANT_STEP } from '../../utilities/constants';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		hasChildrenWithoutDisplayNameof(
			COMPONENT,
			props.children,
			SETUP_ASSISTANT_STEP,
			createDocUrl()
		);
	};
}

export default checkProps;
