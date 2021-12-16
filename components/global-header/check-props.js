/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import componentIsDeprecated from '../../utilities/warning/component-is-deprecated';
import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';
import sunsetProperty from '../../utilities/warning/sunset-property';

// ## Constants
import {
	GLOBAL_HEADER_BUTTON,
	GLOBAL_HEADER_DROPDOWN,
	GLOBAL_HEADER_PROFILE,
} from '../../utilities/constants';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		if (
			COMPONENT === GLOBAL_HEADER_BUTTON ||
			COMPONENT === GLOBAL_HEADER_DROPDOWN
		) {
			componentIsDeprecated(
				COMPONENT,
				props,
				`${COMPONENT} has been deprecated in favor of more-specific global header subcomponents. Please see docs for updated examples.`
			);
		}

		if (COMPONENT === GLOBAL_HEADER_PROFILE) {
			const popoverExtraMessage =
				'Use the `popover` attribute to provide a `Popover` component with content inside the `body` prop instead.';

			sunsetProperty(COMPONENT, props.align, 'align');

			sunsetProperty(
				COMPONENT,
				props.children,
				'children',
				popoverExtraMessage
			);

			sunsetProperty(COMPONENT, props.nubbinPosition, 'nubbinPosition');

			sunsetProperty(COMPONENT, props.offset, 'offset');

			sunsetProperty(COMPONENT, props.onSelect, 'onSelect');

			sunsetProperty(COMPONENT, props.options, 'options', popoverExtraMessage);
		}

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
	};
}

export default checkProps;
