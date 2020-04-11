/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver an error message to the browser console when all of the props passed in are undefined (falsey).
import warning from 'warning';

let incompatibleProps = function incompatiblePropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	incompatibleProps = function incompatiblePropsFunction(
		control,
		props,
		propOneName,
		propOneValues,
		propTwoName,
		propTwoValues,
		comment
	) {
		let checkPassed = true;
		let propOneConditionMet = false;
		let propTwoConditionMet = false;

		if (props[propOneName] && props[propTwoName]) {
			if (propOneValues) {
				propOneValues.forEach((value) => {
					propOneConditionMet = props[propOneName] === value;
				});
			} else {
				propOneConditionMet = true;
			}

			if (propTwoValues) {
				propTwoValues.forEach((value) => {
					propTwoConditionMet = props[propTwoName] === value;
				});
			} else {
				propTwoConditionMet = true;
			}

			checkPassed = !(propOneConditionMet && propTwoConditionMet);
		}

		if (!checkPassed) {
			const additionalComment = comment ? ` ${comment}` : '';
			const incompatibleValueOne = propOneValues
				? ` of value \`${props[propOneName]}\``
				: '';
			const incompatibleValueTwo = propTwoValues
				? ` of value \`${props[propTwoName]}\``
				: '';

			/* eslint-disable max-len */
			warning(
				false,
				`[Design System React] ${control} should not be passed prop \`${propOneName}\`${incompatibleValueOne} along with prop \`${propTwoName}\`${incompatibleValueTwo} as they are incompatible.${additionalComment}`
			);
			/* eslint-enable max-len */
		}
	};
}

export default incompatibleProps;
