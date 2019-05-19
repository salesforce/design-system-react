/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import isPrototype from '../../utilities/warning/component-is-prototype';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
		isPrototype(COMPONENT, createDocUrl());
	};
}

export default checkProps;
