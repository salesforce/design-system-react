/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props) {
		deprecatedProperty(
			COMPONENT,
			props.variant,
			'variant',
			undefined,
			'Shade variant is deprecated as there is no background supported currently. Vertical Navigation now uses a default shade.'
		);
	};
}

export default checkProps;
