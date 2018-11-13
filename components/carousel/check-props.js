/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import deprecatedEventParameter from '../../utilities/warning/deprecated-event-parameter';
import getComponentDocFn from '../../utilities/get-component-doc';
import onlyOneOfProperties from '../../utilities/warning/only-one-of-properties';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, props, jsonDoc) {
		// Stub
	};
}

export default checkProps;
