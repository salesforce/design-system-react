/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useRef, useState, type KeyboardEvent } from 'react';

/**
 * Options for useRovingTabIndex hook
 */
export interface UseRovingTabIndexOptions {
	/** Number of items in the group */
	count: number;
	/** Index of the item that holds the tab stop at first, and again whenever this value changes */
	defaultIndex?: number;
}

/**
 * Props to spread onto each item in the group
 */
export interface RovingTabIndexItemProps<T extends HTMLElement> {
	ref: (node: T | null) => void;
	tabIndex: 0 | -1;
	onFocus: () => void;
	onKeyDown: (event: KeyboardEvent<T>) => void;
}

export interface UseRovingTabIndexResult<T extends HTMLElement> {
	/** Index of the item that holds the tab stop */
	activeIndex: number;
	/** Returns the props for the item at `index` */
	getItemProps: (index: number) => RovingTabIndexItemProps<T>;
}

const PREVIOUS_KEYS = ['ArrowLeft', 'ArrowUp'];
const NEXT_KEYS = ['ArrowRight', 'ArrowDown'];

/**
 * Keeps a single tab stop in a group of items and moves focus between them with the arrow keys
 * ([roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)).
 * Left/Up moves to the previous item and Right/Down to the next. Focus stops at the first and last items rather than wrapping.
 *
 * @example
 * ```tsx
 * const { getItemProps } = useRovingTabIndex<HTMLAnchorElement>({
 *   count: options.length,
 *   defaultIndex: selectedIndex,
 * });
 *
 * options.map((option, index) => <a {...getItemProps(index)}>{option.label}</a>);
 * ```
 */
export function useRovingTabIndex<T extends HTMLElement>({
	count,
	defaultIndex = 0,
}: UseRovingTabIndexOptions): UseRovingTabIndexResult<T> {
	const itemsRef = useRef<(T | null)[]>([]);
	const [activeIndex, setActiveIndex] = useState(defaultIndex);
	const [prevDefaultIndex, setPrevDefaultIndex] = useState(defaultIndex);

	// Move the tab stop when `defaultIndex` changes (adjusting state during render instead of in an effect)
	if (defaultIndex !== prevDefaultIndex) {
		setPrevDefaultIndex(defaultIndex);
		setActiveIndex(defaultIndex);
	}

	// Keep the tab stop on an existing item if the group shrinks
	const tabStopIndex = Math.max(0, Math.min(activeIndex, count - 1));

	const focusItem = (index: number) => {
		setActiveIndex(index);
		itemsRef.current[index]?.focus();
	};

	const getItemProps = (index: number): RovingTabIndexItemProps<T> => ({
		ref: (node) => {
			itemsRef.current[index] = node;
		},
		tabIndex: index === tabStopIndex ? 0 : -1,
		onFocus: () => setActiveIndex(index),
		onKeyDown: (event) => {
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
