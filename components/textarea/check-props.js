/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import onlyOneOfProperties from '../../utilities/warning/only-one-of-properties';
import sunsetProperty from '../../utilities/warning/sunset-property';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		onlyOneOfProperties(COMPONENT, {
			assistiveText: props.assistiveText,
			label: props.label,
		});

		if (typeof props.assistiveText === 'string') {
			sunsetProperty(
				COMPONENT,
				props.assistiveText,
				'assistiveText',
				'`assistiveText` as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use `assistiveText.label` instead.'
			);
		}
	};
}

export default checkProps;
