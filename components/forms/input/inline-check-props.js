/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import componentIsDeprecated from '../../../utilities/warning/component-is-deprecated';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props) {
		componentIsDeprecated(
			COMPONENT,
			props,
			'For a multiple input form, please use the pattern located at https://www.lightningdesignsystem.com/components/form-element/#Record-Detail that swaps out a read-only `Input` with a base `Input`. For a single input, please use a `Popover` paired with `<Button	category="utility" iconName="edit" variant="icon" />` as the trigger.'
		);
	};
}

export default checkProps;
