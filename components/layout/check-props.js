/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import warning from 'warning';

let checkProps = function checkPropsFunction(_COMPONENT, _props) {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props) {
		const flexibility =
			props.flexibility == null
				? []
				: Array.isArray(props.flexibility)
					? props.flexibility
					: [props.flexibility];

		warning(
			!(flexibility.includes('auto') && flexibility.includes('no-flex')),
			`[Design System React] ${COMPONENT}: \`flexibility\` cannot combine "auto" and "no-flex" — they are contradictory.`
		);

		const hasDeviceSize =
			props.smallDeviceSize != null ||
			props.mediumDeviceSize != null ||
			props.largeDeviceSize != null;

		warning(
			!(hasDeviceSize && props.size == null),
			`[Design System React] ${COMPONENT}: a device size (\`smallDeviceSize\`/\`mediumDeviceSize\`/\`largeDeviceSize\`) requires \`size\` to also be set.`
		);
	};
}

export default checkProps;
