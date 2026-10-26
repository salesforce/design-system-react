/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';

/**
 * Options for useRovingTabIndex hook
 */
export interface UseRovingTabIndexOptions {
	/** Number of items in the group */
	count: number;
	/** Index of the selected item. It holds the tab stop at first, and gets it back whenever this value changes. */
	selectedIndex: number;
}

/**
 * Handlers that the caller also needs on an item. The hook calls them before its own handlers.
 */
export interface RovingTabIndexItemHandlers<T extends HTMLElement> {
	onFocus?: (event: FocusEvent<T>) => void;
	onKeyDown?: (event: KeyboardEvent<T>) => void;
}

/**
 * Props to spread onto each item in the group
 */
export interface RovingTabIndexItemProps<T extends HTMLElement> {
	ref: (node: T | null) => void;
	tabIndex: 0 | -1;
	onFocus: (event: FocusEvent<T>) => void;
	onKeyDown: (event: KeyboardEvent<T>) => void;
}

export interface UseRovingTabIndexResult<T extends HTMLElement> {
	/** Index of the item that holds the tab stop */
	activeIndex: number;
	/** Returns the props for the item at `index`, composed with the caller's handlers */
	getItemProps: (
		index: number,
		handlers?: RovingTabIndexItemHandlers<T>
	) => RovingTabIndexItemProps<T>;
}

const PREVIOUS_KEYS = ['ArrowLeft', 'ArrowUp'];
const NEXT_KEYS = ['ArrowRight', 'ArrowDown'];

/**
 * Keeps a single tab stop in a group of items and moves focus between them with the arrow keys
 * ([roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)).
 * Left/Up moves to the previous item and Right/Down to the next. Focus stops at the first and last items rather than wrapping.
 *
 * Private to progress indicator until a second component needs it.
 */
export function useRovingTabIndex<T extends HTMLElement>({
	count,
	selectedIndex,
}: UseRovingTabIndexOptions): UseRovingTabIndexResult<T> {
	const itemsRef = useRef<(T | null)[]>([]);
	// One ref callback per index, so React doesn't detach and re-attach every item on each render
	const refCallbacksRef = useRef<((node: T | null) => void)[]>([]);
	const [activeIndex, setActiveIndex] = useState(selectedIndex);
	const [prevSelectedIndex, setPrevSelectedIndex] = useState(selectedIndex);

	// Move the tab stop back to the selected item when it changes (adjusting state during render instead of in an effect)
	if (selectedIndex !== prevSelectedIndex) {
		setPrevSelectedIndex(selectedIndex);
		setActiveIndex(selectedIndex);
	}

	// Keep the tab stop on an existing item if the group shrinks
	const tabStopIndex = Math.max(0, Math.min(activeIndex, count - 1));

	const getRef = (index: number) => {
		if (!refCallbacksRef.current[index]) {
			refCallbacksRef.current[index] = (node) => {
				itemsRef.current[index] = node;
			};
		}
		return refCallbacksRef.current[index];
	};

	const focusItem = (index: number) => {
		setActiveIndex(index);
		itemsRef.current[index]?.focus();
	};

	const getItemProps = (
		index: number,
		handlers: RovingTabIndexItemHandlers<T> = {}
	): RovingTabIndexItemProps<T> => ({
		ref: getRef(index),
		tabIndex: index === tabStopIndex ? 0 : -1,
		onFocus: (event) => {
			handlers.onFocus?.(event);
			setActiveIndex(index);
		},
		onKeyDown: (event) => {
			handlers.onKeyDown?.(event);
			if (event.defaultPrevented) return;

			if (PREVIOUS_KEYS.includes(event.key)) {
				event.preventDefault();
				if (index > 0) focusItem(index - 1);
			} else if (NEXT_KEYS.includes(event.key)) {
				event.preventDefault();
				if (index < count - 1) focusItem(index + 1);
			}
		},
	});

	return { activeIndex: tabStopIndex, getItemProps };
}
