/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import urlExists from '../../../utilities/warning/url-exists';

import settings from '../../../components/settings';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		const modifiedPath = props.path || settings.getIconsPath();

		// only check if user passes in external path for SLDS sprite
		if (modifiedPath && props.name) {
			urlExists(COMPONENT, `${modifiedPath}/${props.category}-sprite/svg/symbols.svg#${props.name}`);
		}
	};
}

export default checkProps;
