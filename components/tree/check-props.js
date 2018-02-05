/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import isPrototype from '../../utilities/warning/component-is-prototype';
import oneOfRequiredProperty from '../../utilities/warning/one-of-required-property';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		isPrototype(COMPONENT);

		/* eslint-disable max-len */
		oneOfRequiredProperty(COMPONENT, {
			assistiveText: props.assistiveText,
			heading: props.heading,
		});
		/* eslint-enable max-len */
	};
}

export default checkProps;
