/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import componentIsDeprecated from '../../utilities/warning/component-is-deprecated';
import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';

// ## Constants
import { GLOBAL_HEADER_BUTTON, GLOBAL_HEADER_DROPDOWN } from '../../utilities/constants';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, props, jsonDoc) {
		if (COMPONENT === GLOBAL_HEADER_BUTTON || COMPONENT === GLOBAL_HEADER_DROPDOWN) {
			componentIsDeprecated(
				COMPONENT,
				`${COMPONENT} has been deprecated in favor of more-specific global header subcomponents. Please see docs for updated examples.`
			);
		} else {
			const createDocUrl = getComponentDocFn(jsonDoc);

			deprecatedProperty(
				COMPONENT,
				props.skipToContentAssistiveText,
				'skipToContentAssistiveText',
				"assistiveText['skipToContent']",
				createDocUrl('assistiveText')
			);
			deprecatedProperty(
				COMPONENT,
				props.skipToNavAssistiveText,
				'skipToNavAssistiveText',
				"assistiveText['skipToNav']",
				createDocUrl('assistiveText')
			);
		}
	};
}

export default checkProps;
