/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedPropertyValue from '../../utilities/warning/deprecated-property-value';
import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
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
			props.navRight,
			'navRight',
			'onRenderControls',
			createDocUrl('onRenderControls')
		);
	};
}

export default checkProps;
