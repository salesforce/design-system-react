/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props = {}, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
		const events = props.events || {};
		const assistiveText = props.assistiveText || {};

		deprecatedProperty(
			COMPONENT,
			events.onOpen,
			'events.onOpen',
			'events.onToggle',
			createDocUrl('events')
		);
		deprecatedProperty(
			COMPONENT,
			events.onClose,
			'events.onClose',
			'events.onToggle',
			createDocUrl('events')
		);
		deprecatedProperty(
			COMPONENT,
			assistiveText.toggleButtonOpen,
			'assistiveText.toggleButtonOpen',
			'assistiveText.closeToggle',
			`The old key was the text shown while open. ${createDocUrl('assistiveText')}`
		);
		deprecatedProperty(
			COMPONENT,
			assistiveText.toggleButtonClose,
			'assistiveText.toggleButtonClose',
			'assistiveText.openToggle',
			`The old key was the text shown while closed. ${createDocUrl('assistiveText')}`
		);
	};
}

export default checkProps;
