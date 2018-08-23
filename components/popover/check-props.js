/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import oneOfRequiredProperty from '../../utilities/warning/one-of-required-property';
import oneOfComponent from '../../utilities/warning/one-of-component';
import deprecatedProperty from '../../utilities/warning/deprecated-property';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		oneOfRequiredProperty(COMPONENT, {
			ariaLabelledby: props.ariaLabelledby,
			heading: props.heading,
		});

		if (props.children !== undefined) {
			oneOfComponent(COMPONENT, props, 'children', [
				'SLDSButton',
				'a',
				'button',
			]);
		}

		deprecatedProperty(
			COMPONENT,
			props.offset,
			'offset',
			undefined,
			'The manual setting of positional offset of dialog components has been deemed unreliable. Position logic has been re-written to deliver better and more reliable positioning. Please create an issue if you have an edge case not covered by the built-in logic.'
		);

		deprecatedProperty(
			COMPONENT,
			props.isInline,
			'isInline',
			'position="relative"'
		);

		deprecatedProperty(
			COMPONENT,
			props.closeButtonAssistiveText,
			'closeButtonAssistiveText',
			"assistiveText['closeButton']"
		);
	};
}

export default checkProps;
