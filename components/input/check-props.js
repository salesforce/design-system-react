/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

// import oneOfRequiredProperty from '../../../utilities/warning/one-of-required-property';
import onlyOneOfProperties from '../../utilities/warning/only-one-of-properties';
import sunsetProperty from '../../utilities/warning/sunset-property';
import getComponentDocFn from '../../utilities/get-component-doc';

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import { INPUT } from '../../utilities/constants';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props = {}, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		if (COMPONENT === INPUT) {
			sunsetProperty(
				COMPONENT,
				props.defaultValue !== undefined,
				'defaultValue',
				'Input is controlled: pass `value` and update it in `onChange`.'
			);

			sunsetProperty(
				COMPONENT,
				props.assistiveText && props.assistiveText.fieldLevelHelpButton,
				'assistiveText.fieldLevelHelpButton',
				`Pass a \`Tooltip\` to \`fieldLevelHelpTooltip\` and set its \`assistiveText.triggerLearnMoreIcon\`. ${createDocUrl(
					'fieldLevelHelpTooltip'
				)}`
			);
			deprecatedProperty(
				COMPONENT,
				props['aria-required'],
				'aria-required',
				'required',
				createDocUrl('required')
			);

			onlyOneOfProperties(
				COMPONENT,
				{
					'assistiveText.label':
						props.assistiveText && props.assistiveText.label,
					label: props.label,
				},
				createDocUrl('assistiveText')
			);

			onlyOneOfProperties(
				COMPONENT,
				{
					fixedTextLeft: props.fixedTextLeft,
					fixedTextRight: props.fixedTextRight,
				},
				createDocUrl('assistiveText')
			);

			/*
			* Once we support horizontal labels, then I think we can enable this check
			*
			if (!props.inlineEditTrigger) {
				oneOfRequiredProperty(COMPONENT, {
					assistiveText: props.assistiveText,
					label: props.label
				});
			}
			*/
		}
	};
}

export default checkProps;
