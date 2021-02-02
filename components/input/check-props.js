/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import sunsetProperty from '../../utilities/warning/sunset-property';
// import oneOfRequiredProperty from '../../../utilities/warning/one-of-required-property';
import onlyOneOfProperties from '../../utilities/warning/only-one-of-properties';
import getComponentDocFn from '../../utilities/get-component-doc';

import { INPUT, SEARCH } from '../../utilities/constants';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props = {}, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		if (COMPONENT === INPUT) {
			const iconDeprecatedMessage = `Please use \`iconLeft\` and \`iconRight\` to pass in a customized <Icon> component. ${createDocUrl()}`;

			// Deprecated and changed to another property
			deprecatedProperty(
				COMPONENT,
				props.assistiveText && props.assistiveText.fieldLevelHelpButton,
				'assistiveText.fieldLevelHelpButton',
				undefined,
				`Please pass a \`Tooltip\` component into \`fieldLevelHelpTooltip\` with \`assistiveText.triggerLearnMoreIcon\`.`
			);
			deprecatedProperty(
				COMPONENT,
				props.iconCategory,
				'iconCategory',
				undefined,
				iconDeprecatedMessage
			);
			deprecatedProperty(
				COMPONENT,
				props.iconName,
				'iconName',
				undefined,
				iconDeprecatedMessage
			);
			deprecatedProperty(
				COMPONENT,
				props.iconPosition,
				'iconPosition',
				undefined,
				iconDeprecatedMessage
			);
			deprecatedProperty(
				COMPONENT,
				props.iconAssistiveText,
				'iconAssistiveText',
				undefined,
				iconDeprecatedMessage
			);
			deprecatedProperty(
				COMPONENT,
				props.onIconClick,
				'onIconClick',
				undefined,
				iconDeprecatedMessage
			);

			if (typeof props.assistiveText === 'string') {
				sunsetProperty(
					COMPONENT,
					props.assistiveText,
					'assistiveText',
					`AssistiveText as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use either assistiveText.label or assistiveText.spinner. ${createDocUrl(
						'assistiveText'
					)}`
				);
			}

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
		} else if (COMPONENT === SEARCH) {
			if (typeof props.assistiveText === 'string') {
				sunsetProperty(
					COMPONENT,
					props.assistiveText,
					'assistiveText',
					`\`assistiveText\` as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use \`assistiveText.label\` instead. ${createDocUrl(
						'assistiveText'
					)}`
				);
			}
		}
	};
}

export default checkProps;
