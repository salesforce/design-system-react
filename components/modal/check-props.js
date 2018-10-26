/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
		deprecatedProperty(
			COMPONENT,
			props.closeButtonAssistiveText,
			'closeButtonAssistiveText',
			"assistiveText['closeButton']",
			createDocUrl('assistiveText')
		);
	};
}

export default checkProps;
