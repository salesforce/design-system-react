/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';
import oneOfComponent from '../../utilities/warning/one-of-component';
import { APP_LAUNCHER, APP_LAUNCHER_SECTION } from '../../utilities/constants';

let checkProps = function() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		if (COMPONENT === APP_LAUNCHER) {
			if (props.modalHeaderButton !== undefined) {
				oneOfComponent(
					COMPONENT,
					props,
					'modalHeaderButton',
					['SLDSButton'],
					createDocUrl('modalHeaderButton')
				);
			}

			deprecatedProperty(
				COMPONENT,
				props.triggerAssistiveText,
				'triggerAssistiveText',
				"assistiveText['trigger']",
				createDocUrl('assistiveText')
			);
		} else if (COMPONENT === APP_LAUNCHER_SECTION) {
			deprecatedProperty(
				COMPONENT,
				props.collapseSectionAssistiveText,
				'collapseSectionAssistiveText',
				"assistiveText['collapseSection']",
				createDocUrl('assistiveText')
			);
		}
	};
}

export default checkProps;
