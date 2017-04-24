/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import isTriggerTabbable from '../../utilities/warning/is-trigger-tabbable';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		isTriggerTabbable(COMPONENT, { props: { tabIndex: props.tabIndex }, type: { displayName: COMPONENT } }, 'Setting a tabIndex to -1 creates a poor user experience for users of assistive technology. Please reconsider before doing do. Disabling this component or removing it from DOM may be a better option.');

		// Deprecated and changed to another property
		deprecatedProperty(COMPONENT, props.modal, 'modal', 'isInline', 'In an effort to add clarity to the meaning of the modal prop and to make more props default to false, `isInline` has replaced `modal` and is the reverse of modal.');
	};
}

export default checkProps;
