/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';
import warning from 'warning';
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
			props.hasDeprecatedCompletedSteps || undefined,
			'completedSteps',
			"steps[].status ('completed')",
			createDocUrl('steps')
		);
		deprecatedProperty(
			COMPONENT,
			props.disabledSteps || undefined,
			'disabledSteps',
			"steps[].status ('disabled')",
			createDocUrl('steps')
		);
		deprecatedProperty(
			COMPONENT,
			props.errorSteps || undefined,
			'errorSteps',
			"steps[].status ('error')",
			createDocUrl('steps')
		);
		warning(
			!props.hasInvalidSteps,
			`[Design System React] \`steps\` of ${COMPONENT} must be an array of steps that each have a \`label\`; using the default steps instead.`
		);
		warning(
			!props.hasSelectedStepWithoutId,
			`[Design System React] \`selectedStep\` of ${COMPONENT} is a step without an \`id\`, so it is matched by its whole content. This is deprecated: pass the step's \`id\` instead. ${createDocUrl('selectedStep')}`
		);
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
