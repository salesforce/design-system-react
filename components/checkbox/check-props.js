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

// v11 control-model removals and deprecated visual-picker render props.
// Exported separately so the component can run these checks without enabling
// the pre-existing `checkProps` warnings.
export let checkDeprecatedProps = function checkDeprecatedPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkDeprecatedProps = function checkDeprecatedPropsFunction(
		COMPONENT,
		props,
		jsonDoc
	) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		sunsetProperty(
			COMPONENT,
			props.defaultChecked,
			'defaultChecked',
			'Checkbox is controlled: pass `checked` and update it in `onChange`.'
		);

		deprecatedProperty(
			COMPONENT,
			props.onRenderVisualPicker,
			'onRenderVisualPicker',
			'visualPickerFigure',
			createDocUrl('visualPickerFigure')
		);
		deprecatedProperty(
			COMPONENT,
			props.onRenderVisualPickerSelected,
			'onRenderVisualPickerSelected',
			'visualPickerFigureSelected',
			createDocUrl('visualPickerFigureSelected')
		);
		deprecatedProperty(
			COMPONENT,
			props.onRenderVisualPickerNotSelected,
			'onRenderVisualPickerNotSelected',
			'visualPickerFigureNotSelected',
			createDocUrl('visualPickerFigureNotSelected')
		);
	};
}

export default checkProps;
