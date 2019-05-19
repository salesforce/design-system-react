/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import oneOfRequiredProperty from '../../utilities/warning/one-of-required-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
		/* eslint-disable max-len */
		deprecatedProperty(
			COMPONENT,
			props.isInline,
			'isInline',
			'menuPosition="relative"',
			createDocUrl('menuPosition')
		);
		deprecatedProperty(
			COMPONENT,
			props.menuItem,
			'menuItem',
			'onRenderMenuItem',
			createDocUrl('onRenderItem')
		);
		/* eslint-enable max-len */

		if (props.variant !== 'popover') {
			oneOfRequiredProperty(
				COMPONENT,
				{
					options: props.options,
				},
				createDocUrl('options')
			);
		} else {
			oneOfRequiredProperty(
				COMPONENT,
				{
					"assistiveText['popoverLabel']": props.assistiveText.popoverLabel,
				},
				createDocUrl('assistiveText')
			);
		}
	};
}

export default checkProps;
