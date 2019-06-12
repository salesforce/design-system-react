/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import sunsetProperty from '../../utilities/warning/sunset-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		/* eslint-disable max-len */
		sunsetProperty(
			COMPONENT,
			props.iconCategory,
			'iconCategory',
			`Use \`Icon\` instead. ${createDocUrl('icon')}`
		);
		sunsetProperty(
			COMPONENT,
			props.iconName,
			'iconName',
			`Use \`Icon\` instead. ${createDocUrl('icon')}`
		);

		sunsetProperty(
			COMPONENT,
			props.content,
			'content',
			`Use \`labels.heading\` and \`labels.headingLink\` instead. ${createDocUrl(
				'labels'
			)}`
		);
		sunsetProperty(
			COMPONENT,
			props.isOpen,
			'isOpen',
			`Use a conditional outside of alert. ${createDocUrl()}`
		);
		sunsetProperty(
			COMPONENT,
			props.isOpen,
			'onDismiss',
			`Use \`onRequestClose\` instead. ${createDocUrl('onRequestClose')}`
		);
		sunsetProperty(COMPONENT, props.texture, 'texture', createDocUrl());
		sunsetProperty(
			COMPONENT,
			props.theme,
			'theme',
			`Use \`variant\` instead. ${createDocUrl('variant')}`
		);
	};
}

export default checkProps;
