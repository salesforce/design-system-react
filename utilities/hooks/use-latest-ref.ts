/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useInsertionEffect, useRef, type RefObject } from 'react';

/**
 * A ref that always holds the latest `value`. Read consumer callbacks (such as an `events`
 * object, which is usually a new object every render) through it inside handlers, so the
 * handlers can stay stable without calling a stale callback.
 *
 * Only read `ref.current` in event handlers and effects, never during render. The ref is
 * updated in an insertion effect, which runs before every layout effect in the commit, so
 * handlers called from a child's `componentDidUpdate` or layout effect see the new value.
 *
 * @example
 * ```tsx
 * const eventsRef = useLatestRef(events);
 *
 * const handleChange = useCallback((event) => {
 *   eventsRef.current.onChange?.(event, { value: event.target.value });
 * }, [eventsRef]);
 * ```
 */
export function useLatestRef<T>(value: T): RefObject<T> {
	const ref = useRef(value);
	useInsertionEffect(() => {
		ref.current = value;
	});
	return ref;
}
