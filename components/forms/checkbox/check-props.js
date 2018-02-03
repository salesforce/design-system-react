/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

import onlyOneOfProperties from '../../../utilities/warning/only-one-of-properties';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		if (props.variant === 'toggle' && props.indeterminate === true) {
			onlyOneOfProperties(
				COMPONENT,
				{
					variant: props.variant,
					indeterminate: props.indeterminate
				},
				'Currently SLDS does not support the `indeterminate` state in Checkbox Toggle. See SLDS documentation about [Checkbox Toggle](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle) for more information.'
			);
		}
	};
}

export default checkProps;
