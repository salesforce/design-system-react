/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import oneOfRequiredProperty from '../../utilities/warning/one-of-required-property';
import hasChildrenWithoutDisplayNameOf from '../../utilities/warning/has-children-without-display-name-of';
import sunsetProperty from '../../utilities/warning/sunset-property';

import { MENU_DROPDOWN_TRIGGER } from '../../utilities/constants';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		// Deprecated and changed to another property
		deprecatedProperty(COMPONENT, props.modal, 'modal', 'isInline', 'In an effort to add clarity to the meaning of the modal prop and to make more props default to false, `isInline` has replaced `modal` and is the reverse of modal.');
		sunsetProperty(COMPONENT, props.forceOpen, 'forceOpen', 'Please use isOpen instead. It provides a consistent prop that aligns with other componenents.');

		oneOfRequiredProperty(COMPONENT, {
			options: props.options,
			children: props.children
		});

		if (!props.options) {
			hasChildrenWithoutDisplayNameOf(
				COMPONENT,
				props.children,
				MENU_DROPDOWN_TRIGGER
			);
		}
	};
}

export default checkProps;
