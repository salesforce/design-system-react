/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import urlExists from '../../../utilities/warning/url-exists';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		if (!props.context[`${props.category}Sprite`]) {
			const modifiedPath = props.path || props.context.iconPath;
			urlExists(
				COMPONENT,
				`${modifiedPath}/${props.category}-sprite/svg/symbols.svg#${props.name}`
			);
		}
	};
}

export default checkProps;
