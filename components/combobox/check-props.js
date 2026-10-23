/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import oneOfRequiredProperty from '../../utilities/warning/one-of-required-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
		/* eslint-disable max-len */
		deprecatedProperty(
			COMPONENT,
			props.isInline,
			'isInline',
			'menuPosition="relative"',
			createDocUrl('menuPosition')
		);
		deprecatedProperty(
			COMPONENT,
			props.menuItem,
			'menuItem',
			'onRenderMenuItem',
			createDocUrl('onRenderItem')
		);
		deprecatedProperty(
			COMPONENT,
			props.readOnlyMenuItemVisibleLength,
			'readOnlyMenuItemVisibleLength',
			'menuItemVisibleLength',
			createDocUrl('menuItemVisibleLength')
		);
		['optionsSearchEntity', 'optionsAddItem'].forEach((propName) => {
			const itemWithOnClick = (props[propName] || []).find(
				(item) => item && item.onClick
			);
			deprecatedProperty(
				COMPONENT,
				itemWithOnClick && itemWithOnClick.onClick,
				`${propName}[].onClick`,
				'events.onSelectActionItem',
				`Until then, if both are set, both are called. ${createDocUrl('events')}`
			);
		});
		/* eslint-enable max-len */

		// `type` is reserved for structural rows. Item options used it to
		// group under `comboboxAddSubheadings`, which now reads `category`.
		const structuralTypes = ['separator', 'header', 'footer', 'deselect'];
		const itemWithType = (props.options || []).find(
			(option) => option?.type && !structuralTypes.includes(option.type)
		);
		deprecatedProperty(
			COMPONENT,
			itemWithType?.type,
			'options[].type',
			'options[].category',
			`\`type\` only accepts ${structuralTypes.map((type) => `'${type}'`).join(', ')}. ${createDocUrl('options')}`
		);

		if (props.variant !== 'popover') {
			oneOfRequiredProperty(
				COMPONENT,
				{
					options: props.options,
				},
				createDocUrl('options')
			);
		} else {
			oneOfRequiredProperty(
				COMPONENT,
				{
					"assistiveText['popoverLabel']": props.assistiveText.popoverLabel,
				},
				createDocUrl('assistiveText')
			);
		}
	};
}

export default checkProps;
