/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Assistive Technology / Keyboard Navigable Trait for Dialogs with Tabbable content

/*
 * Guidelines for Popover
 *
 * - Focus is trapped. Tabbing to an index outside of the dialog is not allowed. Popover must be closed first via ESC.
 * - There should always be a focusable element inside, to place user focus on such as a close button
 * - Must be dismissible via ESC and a close button
 * - Uses tabIndex in wrapper and has tabbable items within it despite being outside document flow.
 * - Entire popover receives focus when opened and has a aria-labelledby that points to the header id, so it will read the heading,
 * - Must return focus to trigger after closing.
 * - F6 will allow the user to keep popover open and go back to tabbing in “app-context” instead of “dialog-context.” (not implemented, yet)
 */

// ## Dependencies

// ### React
import ReactDOM from 'react-dom';

// ### Event Helpers
import KEYS from './key-code';
import EventUtil from './event';

/* eslint-disable react/no-find-dom-node */

const internalHandleClick = ({ trigger, eventTarget, handleClick }) => {
	if (trigger && ReactDOM.findDOMNode(trigger) === eventTarget) {
		// eslint-disable-line react/no-find-dom-node
		handleClick(event);
	}
};

const KeyboardNavigableDialog = ({
	event,
	isOpen,
	handleClick,
	keyCode,
	eventTarget,
	trigger,
	toggleOpen,
}) => {
	switch (keyCode) {
		case KEYS.ESCAPE:
			if (isOpen) {
				toggleOpen();
				EventUtil.trapEvent(event);
			}
			break;
		case KEYS.ENTER:
			if (!isOpen) {
				internalHandleClick({
					trigger,
					eventTarget,
					handleClick,
				});
			}
			break;
		default:
			break;
	}
};

export default KeyboardNavigableDialog;
