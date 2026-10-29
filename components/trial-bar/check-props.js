/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
		const labels = props.labels || {};

		deprecatedProperty(
			COMPONENT,
			labels.timeLeftUnit,
			'labels.timeLeftUnit',
			'labels.timeLeftAfter',
			`Pass the complete text after the amount, including the unit (e.g. \`days left in trial\`). ${createDocUrl('labels')}`
		);
		deprecatedProperty(
			COMPONENT,
			labels.timeLeftUnitAfter,
			'labels.timeLeftUnitAfter',
			'labels.timeLeftAfter',
			createDocUrl('labels')
		);
		deprecatedProperty(
			COMPONENT,
			props.onRenderActions,
			'onRenderActions',
			'actions',
			createDocUrl('actions')
		);
	};
}

export default checkProps;
