/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useCallback, useRef, useState } from 'react';

/**
 * State for ephemeral UI (`isOpen`, a carousel's current panel) that may be
 * controlled or uncontrolled. Data and values are always controlled and must
 * not use this hook (see "Control model" in docs/codebase-overview.md).
 *
 * The mode is chosen by whether `value` is `!== undefined`, never by whether a
 * callback was passed. When controlled, `value` is always returned and the
 * setter is a no-op, so the component must report the requested state through
 * its callback and let the parent decide. When uncontrolled, the state starts
 * at `defaultValue` and the setter updates it.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useControllableState(props.isOpen, props.defaultIsOpen ?? false);
 *
 * const handleToggle = (event) => {
 *   setIsOpen(!isOpen);
 *   props.onToggle?.(event, { isOpen: !isOpen });
 * };
 * ```
 */
export function useControllableState<T>(
	value: T | undefined,
	defaultValue: T
): [value: T, setValue: (next: T) => void, isControlled: boolean] {
	const [internalValue, setInternalValue] = useState<T>(defaultValue);
	const isControlled = value !== undefined;
	const isControlledRef = useRef(isControlled);
	isControlledRef.current = isControlled;

	const setValue = useCallback((next: T) => {
		if (!isControlledRef.current) {
			setInternalValue(next);
		}
	}, []);

	return [isControlled ? (value as T) : internalValue, setValue, isControlled];
}
