/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';
import oneOfComponent from '../../utilities/warning/one-of-component';
import sunsetProperty from '../../utilities/warning/sunset-property';
import {
	APP_LAUNCHER,
	APP_LAUNCHER_EXPANDABLE_SECTION,
	APP_LAUNCHER_TILE,
} from '../../utilities/constants';

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
		} else if (COMPONENT === APP_LAUNCHER_EXPANDABLE_SECTION) {
			deprecatedProperty(
				COMPONENT,
				props.collapseSectionAssistiveText,
				'collapseSectionAssistiveText',
				"assistiveText['collapseSection']",
				createDocUrl('assistiveText')
			);
		} else if (COMPONENT === APP_LAUNCHER_TILE) {
			deprecatedProperty(
				COMPONENT,
				props.descriptionHeading,
				'descriptionHeading',
				null,
				'Description headings are no longer a part of the SLDS App Launcher Tile spec. Please reach out to DSR admin if there is a special need for this feature'
			);

			sunsetProperty(
				COMPONENT,
				props.size,
				'size',
				'App Launcher Tiles are now all a consistent size according to SLDS specifications'
			);
		}
	};
}

export default checkProps;
