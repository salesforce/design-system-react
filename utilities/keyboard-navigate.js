/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
import escapeRegExp from 'lodash.escaperegexp';

import KEYS from './key-code';

/**
 * Resolve a component context's trigger to a DOM node. `componentContext.trigger`
 * is already stored as a DOM element (via a callback ref) throughout the codebase,
 * so we return it directly. This replaces `ReactDOM.findDOMNode`, which was removed
 * in React 19.
 */
const resolveTriggerNode = (trigger) => {
	if (!trigger) {
		return null;
	}
	// A DOM node (has nodeType); return as-is.
	if (typeof trigger === 'object' && trigger.nodeType) {
		return trigger;
	}
	return trigger;
};

const keyboardNavigate = ({
	componentContext,
	currentFocusedIndex,
	isOpen,
	event,
	key,
	keyCode,
	navigableItems,
	onFocus,
	onSelect,
	target,
	toggleOpen,
}) => {
	const { indexes } = navigableItems;
	const lastIndex = indexes.length - 1;
	let focusedIndex;
	let ch = key || String.fromCharCode(keyCode);

	if (/^[ -~]$/.test(ch)) {
		ch = ch.toLowerCase();
	} else {
		ch = null;
	}

	// Keys that open a closed menu. Per the WAI-ARIA menu-button pattern, Down
	// and Up arrows open the menu (Down moving focus to the first item, Up to
	// the last), in addition to Enter and Space.
	const openMenuKeys =
		keyCode === KEYS.ENTER ||
		keyCode === KEYS.SPACE ||
		keyCode === KEYS.UP ||
		keyCode === KEYS.DOWN;

	if (keyCode === KEYS.ESCAPE) {
		if (isOpen) toggleOpen();
	} else if (!isOpen) {
		[focusedIndex] = indexes;
		if (openMenuKeys || ch) {
			toggleOpen();
		}
		if (
			openMenuKeys &&
			componentContext.trigger &&
			resolveTriggerNode(componentContext.trigger) === target
		) {
			componentContext.handleClick(event);
		}
	} else if (keyCode === KEYS.ENTER || keyCode === KEYS.SPACE) {
		onSelect(currentFocusedIndex);
	} else {
		const navigableIndex = indexes.indexOf(currentFocusedIndex);

		if (keyCode === KEYS.DOWN) {
			if (navigableIndex < lastIndex) {
				const newNavigableIndex = navigableIndex + 1;
				focusedIndex = indexes[newNavigableIndex];
			} else {
				[focusedIndex] = indexes;
			}
		} else if (keyCode === KEYS.UP) {
			if (navigableIndex > 0) {
				const newNavigableIndex = navigableIndex - 1;
				focusedIndex = indexes[newNavigableIndex];
			} else {
				focusedIndex = indexes[lastIndex];
			}
		} else if (ch) {
			// Combine subsequent keypresses
			const pattern = navigableItems.keyBuffer(ch);
			let consecutive = 0;

			// Support for navigating to the next option of the same letter with repeated presses of the same key
			if (
				pattern.length > 1 &&
				new RegExp(`^[${escapeRegExp(ch)}]+$`).test(pattern)
			) {
				consecutive = pattern.length;
			}

			navigableItems.forEach((item) => {
				if (
					(focusedIndex === undefined &&
						item.text.substr(0, pattern.length) === pattern) ||
					(consecutive > 0 && item.text.substr(0, 1) === ch)
				) {
					consecutive -= 1;
					focusedIndex = item.index;
				}
			});
		}
	}

	onFocus(focusedIndex);

	return focusedIndex;
};

export default keyboardNavigate;
