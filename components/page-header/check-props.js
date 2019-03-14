/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import sunsetProperty from '../../utilities/warning/sunset-property';
import deprecatedPropertyValue from '../../utilities/warning/deprecated-property-value';
import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
		if (typeof props.assistiveText === 'string') {
			sunsetProperty(
				COMPONENT,
				props.assistiveText,
				'assistiveText',
				`\`assistiveText\` as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use \`assistiveText.label\` instead. ${createDocUrl(
					'assistiveText'
				)}`
			);
		}
		if (props.variant === 'objectHome') {
			deprecatedPropertyValue(
				COMPONENT,
				{
					propAsString: 'variant',
					propValue: props.variant,
					deprecatedPropValue: 'objectHome',
					replacementPropAsValue: 'object-home',
				},
				"Using value of variants in camelCase is deprecated. Use kebab-case ('object-home') instead."
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
				"Using value of variants in camelCase is deprecated. Use kebab-case ('record-home') instead."
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
				"Using value of variants in camelCase is deprecated. Use kebab-case ('related-list') instead."
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
