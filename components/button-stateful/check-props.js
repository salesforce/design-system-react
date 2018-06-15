/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedPropertyType from '../../utilities/warning/deprecated-property-type';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		deprecatedPropertyType(
			COMPONENT,
			'assistiveText',
			props.assistiveText,
			'string',
			'object'
		);
	};
}

export default checkProps;
