/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';
import onlyOneOfProperties from '../../utilities/warning/only-one-of-properties';
import sunsetProperty from '../../utilities/warning/sunset-property';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		sunsetProperty(
			COMPONENT,
			props.label,
			'label',
			`Use \`labels.label\` instead.${createDocUrl('labels')}`
		);
		deprecatedProperty(COMPONENT, props.coverable, 'coverable', 'isCoverable');
		deprecatedProperty(COMPONENT, props.vertical, 'vertical', 'isVertical');

		if (props.variant === 'toggle' && props.indeterminate === true) {
			onlyOneOfProperties(
				COMPONENT,
				{
					variant: props.variant,
					indeterminate: props.indeterminate,
				},
				`Currently SLDS does not support the \`indeterminate\` state in Checkbox Toggle. See SLDS documentation about [Checkbox Toggle](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle) for more information. ${createDocUrl(
					'variant'
				)}`
			);
		}
	};
}

export default checkProps;
