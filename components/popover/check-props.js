/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import oneOfRequiredProperty from '../../utilities/warning/one-of-required-property';
import oneOfComponent from '../../utilities/warning/one-of-component';
import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		oneOfRequiredProperty(
			COMPONENT,
			{
				ariaLabelledby: props.ariaLabelledby,
				heading: props.heading,
			},
			createDocUrl()
		);

		if (props.children !== undefined) {
			if (props.children.length && props.children.length > 1) {
				oneOfComponent(
					COMPONENT,
					props,
					'children[0]',
					['SLDSButton', 'a', 'button'],
					` Multiple children of any kind are allowed, but the first child must serve as the trigger component. ${createDocUrl()}`,
					props.children[0]
				);
			} else {
				oneOfComponent(
					COMPONENT,
					props,
					'children',
					['SLDSButton', 'a', 'button'],
					createDocUrl()
				);
			}
		}

		deprecatedProperty(
			COMPONENT,
			props.offset,
			'offset',
			undefined,
			`The manual setting of positional offset of dialog components has been deemed unreliable. Position logic has been re-written to deliver better and more reliable positioning. Please create an issue if you have an edge case not covered by the built-in logic. ${createDocUrl()}`
		);

		deprecatedProperty(
			COMPONENT,
			props.isInline,
			'isInline',
			'position="relative"',
			createDocUrl('position')
		);

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
