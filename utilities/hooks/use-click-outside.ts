/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useEffect, useCallback, type RefObject } from 'react';

/**
 * Options for useClickOutside hook
 */
export interface UseClickOutsideOptions {
	/** Whether the click outside handler is active */
	enabled?: boolean;
	/** CSS class to ignore when detecting outside clicks */
	ignoreClass?: string;
	/** Event type to listen for */
	eventType?: 'mousedown' | 'mouseup' | 'click';
}

/**
 * Modern React 19 compatible hook for detecting clicks outside an element.
 * Replaces the deprecated react-onclickoutside library which uses findDOMNode.
 *
 * @param ref - React ref to the element to detect clicks outside of
 * @param callback - Function to call when a click outside is detected
 * @param options - Configuration options
 *
 * @example
 * ```tsx
 * const menuRef = useRef<HTMLDivElement>(null);
 *
 * useClickOutside(menuRef, () => {
 *   setIsOpen(false);
 * }, { enabled: isOpen });
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
	ref: RefObject<T | null>,
	callback: (event: MouseEvent | TouchEvent) => void,
	options: UseClickOutsideOptions = {}
): void {
	const {
		enabled = true,
		ignoreClass = 'ignore-react-onclickoutside',
		eventType = 'mousedown',
	} = options;

	const handleClickOutside = useCallback(
		(event: MouseEvent | TouchEvent) => {
			const target = event.target as Node;

			// Check if click target has the ignore class
			if (target instanceof Element) {
				if (target.classList?.contains(ignoreClass)) {
					return;
				}
				// Check if any ancestor has the ignore class
				if (target.closest(`.${ignoreClass}`)) {
					return;
				}
			}

			// Check if click is inside the ref element
			if (ref.current && !ref.current.contains(target)) {
				callback(event);
			}
		},
		[ref, callback, ignoreClass]
	);

	useEffect(() => {
		if (!enabled) {
			return;
		}

		// Add event listeners
		document.addEventListener(eventType, handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);

		return () => {
			document.removeEventListener(eventType, handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [enabled, eventType, handleClickOutside]);
}

export default useClickOutside;









