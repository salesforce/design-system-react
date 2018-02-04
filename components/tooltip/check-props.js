/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import isTriggerTabbable from '../../utilities/warning/is-trigger-tabbable';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		isTriggerTabbable(COMPONENT, props.children, '');

		// Deprecated and changed to another property
		deprecatedProperty(
			COMPONENT,
			props.openByDefault,
			'openByDefault',
			'isOpen'
		);
		deprecatedProperty(
			COMPONENT,
			props.target,
			'target',
			undefined,
			'A new positioning library is being implmented under the hood. Please trigger tooltips to appear on their triggers with `isOpen` and not on other DOM elements.' // eslint-disable-line max-len
		);

		deprecatedProperty(
			COMPONENT,
			props.isInline,
			'isInline',
			'position="relative"'
		);
	};
}

export default checkProps;
