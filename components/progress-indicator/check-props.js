/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';
import incompatibleProps from '../../utilities/warning/incompatible-props';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
		const comment = 'Only `type="base"` supports this prop.';
		const baseOnlyProps = [
			['disabledSteps', null],
			['errorSteps', null],
			['orientation', ['vertical']],
			['tooltipIsOpenSteps', null],
			['tooltipPosition', null],
			['variant', ['modal', 'setup-assistant', 'shade']],
		];

		baseOnlyProps.forEach(([propName, values]) => {
			incompatibleProps(
				COMPONENT,
				props,
				'type',
				['path'],
				propName,
				values,
				comment
			);
		});

		deprecatedProperty(
			COMPONENT,
			props.hasDeprecatedSetupAssistantAction || undefined,
			'steps[].onRenderSetupAssistantAction',
			'steps[].setupAssistantAction',
			createDocUrl('steps')
		);
	};
}

export default checkProps;
