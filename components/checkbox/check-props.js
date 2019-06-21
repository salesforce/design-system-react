/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import deprecatedEventParameter from '../../utilities/warning/deprecated-event-parameter';
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

		deprecatedEventParameter(
			COMPONENT,
			{
				oldEventParameterOrder: props.oldEventParameterOrder,
				propAsString: 'onChange',
				propAsValue: props.onChange,
			},
			`\`components/forms/checkbox\` is deprecated. \`components/checkbox\` should be used. When this path update is made \`onChange\` event parameters will change from \`onChange(value, event, { value }) to \`onChange(event, { value }). Please update your event parameters when you change paths.\` If you are using the CommonJS named import, \`Checkbox\` events will break at v1.0 and this warning will be present until then. Please review https://github.com/salesforce/design-system-react/releases when you upgrade. ${createDocUrl(
				'onChange'
			)}`
		);

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
