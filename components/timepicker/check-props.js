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
			props.constrainToScrollParent,
			'constrainToScrollParent',
			'Deprecated property'
		);
		sunsetProperty(
			COMPONENT,
			props.inheritTargetWidth,
			'inheritTargetWidth',
			'Use inheritWidthOf instead.'
		);
		sunsetProperty(
			COMPONENT,
			props.listItemRenderer,
			'listItemRenderer',
			'Use MenuItem instead.'
		);
	};
}

export default checkProps;
