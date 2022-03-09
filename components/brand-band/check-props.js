/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import sunsetProperty from '../../utilities/warning/sunset-property';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props) {
		sunsetProperty(COMPONENT, props.styleContainer, 'styleContainer');

		sunsetProperty(COMPONENT, props.theme, 'theme');
	};
}

export default checkProps;
