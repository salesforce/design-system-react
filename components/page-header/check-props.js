/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedPropertyValue from '../../utilities/warning/deprecated-property-value';
import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';
import renderFunctionReturnContentsLackDisplayName from '../../utilities/warning/render-function-return-contents-lack-display-name';

import { PAGE_HEADER_CONTROL } from '../../utilities/constants';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		deprecatedProperty(
			COMPONENT,
			props.iconCategory,
			'iconCategory',
			'icon',
			createDocUrl('icon')
		);

		deprecatedProperty(
			COMPONENT,
			props.iconName,
			'iconName',
			'icon',
			createDocUrl('icon')
		);

		deprecatedProperty(
			COMPONENT,
			props.iconPosition,
			'iconPosition',
			'icon',
			createDocUrl('icon')
		);

		deprecatedProperty(
			COMPONENT,
			props.iconSize,
			'iconSize',
			'icon',
			createDocUrl('icon')
		);

		deprecatedProperty(
			COMPONENT,
			props.iconVariant,
			'iconVariant',
			'icon',
			createDocUrl('icon')
		);

		if (props.variant === 'objectHome') {
			deprecatedPropertyValue(
				COMPONENT,
				{
					propAsString: 'variant',
					propValue: props.variant,
					deprecatedPropValue: 'objectHome',
					replacementPropAsValue: 'object-home',
				},
				`Using value of variants in camelCase is deprecated. Use kebab-case ('object-home') instead. ${createDocUrl(
					'variant'
				)}`
			);
		}

		if (props.variant === 'recordHome') {
			deprecatedPropertyValue(
				COMPONENT,
				{
					propAsString: 'variant',
					propValue: props.variant,
					deprecatedPropValue: 'recordHome',
					replacementPropAsValue: 'record-home',
				},
				`Using value of variants in camelCase is deprecated. Use kebab-case ('record-home') instead. ${createDocUrl(
					'variant'
				)}`
			);
		}

		if (props.variant === 'relatedList') {
			deprecatedPropertyValue(
				COMPONENT,
				{
					propAsString: 'variant',
					propValue: props.variant,
					deprecatedPropValue: 'relatedList',
					replacementPropAsValue: 'related-list',
				},
				`Using value of variants in camelCase is deprecated. Use kebab-case ('related-list') instead. ${createDocUrl(
					'variant'
				)}`
			);
		}

		deprecatedProperty(
			COMPONENT,
			props.contentRight,
			'contentRight',
			'onRenderActions',
			createDocUrl('onRenderActions')
		);

		deprecatedProperty(
			COMPONENT,
			props.navRight,
			'navRight',
			'onRenderControls',
			createDocUrl('onRenderControls')
		);

		if (props.onRenderActions) {
			renderFunctionReturnContentsLackDisplayName(
				COMPONENT,
				'onRenderActions',
				props.onRenderActions(),
				[PAGE_HEADER_CONTROL],
				true
			);
		} else if (props.contentRight) {
			renderFunctionReturnContentsLackDisplayName(
				COMPONENT,
				'contentRight',
				props.contentRight,
				[PAGE_HEADER_CONTROL],
				true
			);
		}

		if (props.onRenderControls) {
			renderFunctionReturnContentsLackDisplayName(
				COMPONENT,
				'onRenderControls',
				props.onRenderControls(),
				[PAGE_HEADER_CONTROL],
				true
			);
		} else if (props.navRight) {
			renderFunctionReturnContentsLackDisplayName(
				COMPONENT,
				'navRight',
				props.navRight,
				[PAGE_HEADER_CONTROL],
				true
			);
		}
	};
}

export default checkProps;
