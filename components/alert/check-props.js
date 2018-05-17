/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import sunsetProperty from '../../utilities/warning/sunset-property';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		/* eslint-disable max-len */
		sunsetProperty(
			COMPONENT,
			props.iconCategory,
			'iconCategory',
			'Use `Icon` instead.'
		);
		sunsetProperty(
			COMPONENT,
			props.iconName,
			'iconName',
			'Use `Icon` instead.'
		);

		sunsetProperty(
			COMPONENT,
			props.content,
			'content',
			'Use `labels.heading` and `labels.headingLink` instead.'
		);
		sunsetProperty(
			COMPONENT,
			props.duration,
			'duration',
			'Only Toasts can auto-hide.'
		);
		sunsetProperty(
			COMPONENT,
			props.isOpen,
			'isOpen',
			'Use a conditional outside of alert.'
		);
		sunsetProperty(
			COMPONENT,
			props.isOpen,
			'onDismiss',
			'Use `onRequestClose` instead'
		);
		sunsetProperty(COMPONENT, props.texture, 'texture');
		sunsetProperty(COMPONENT, props.theme, 'theme', 'Use `variant` instead.');
	};
}

export default checkProps;
