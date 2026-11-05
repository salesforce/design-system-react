/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';
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
			'Radio is controlled: pass `checked` and update it in `onChange`, or pass `value` to the RadioGroup/RadioButtonGroup.'
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
