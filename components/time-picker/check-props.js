/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import componentIsDeprecated from '../../utilities/warning/component-is-deprecated';
import deprecatedProperty from '../../utilities/warning/deprecated-property';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		componentIsDeprecated(
			COMPONENT,
			'Please use TimePicker instead. It is closer aligned to SLDS.'
		);
		deprecatedProperty(
			COMPONENT,
			props.isInline,
			'isInline',
			'menuPosition="relative"'
		);
	};
}

export default checkProps;
