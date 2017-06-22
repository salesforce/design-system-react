/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import deprecatedProperty from '../../../utilities/warning/deprecated-property';
// import oneOfRequiredProperty from '../../../utilities/warning/one-of-required-property';
import onlyOneOfProperties from '../../../utilities/warning/only-one-of-properties';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		// Deprecated and changed to another property
		deprecatedProperty(COMPONENT, props.iconCategory, 'iconCategory', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component.');
		deprecatedProperty(COMPONENT, props.iconName, 'iconName', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
		deprecatedProperty(COMPONENT, props.iconPosition, 'iconPosition', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
		deprecatedProperty(COMPONENT, props.iconAssistiveText, 'iconAssistiveText', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
		deprecatedProperty(COMPONENT, props.onIconClick, 'onIconClick', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');

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

		onlyOneOfProperties(COMPONENT, {
			assistiveText: props.assistiveText,
			label: props.label
		});
	};
}

export default checkProps;
