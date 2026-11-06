/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactElement, type ReactNode, type Ref } from 'react';
import classNames from 'classnames';

/**
 * A trigger slot: an element, which the component merges its props into (see
 * `mergeProps`), or a function that receives the component's props and returns
 * the trigger, for full control over where they go.
 */
export type TriggerRender<P> = ReactElement | ((props: P) => ReactNode);

// Props that hold space-separated lists, so both sides' values are kept
const JOINED_PROPS = ['className', 'aria-describedby', 'aria-labelledby'];

const isHandler = (key: string, value: unknown) =>
	/^on[A-Z]/.test(key) && typeof value === 'function';

const setRef = <T>(ref: Ref<T> | undefined, node: T | null) => {
	if (typeof ref === 'function') {
		ref(node);
	} else if (ref) {
		(ref as React.RefObject<T | null>).current = node;
	}
};

/**
 * Merges a component's props into the props of an element a consumer passed it.
 * The consumer's props win, except:
 * - event handlers (`onClick`, …) are composed: the consumer's runs, then the component's
 * - `ref`s are composed, so both are set
 * - `className`, `aria-describedby` and `aria-labelledby` are joined, without duplicates
 * - `style`s are merged, the consumer's properties winning
 * An `undefined` consumer value never overrides the component's.
 */
const mergeProps = (
	componentProps: Record<string, unknown>,
	consumerProps: Record<string, unknown>
): Record<string, unknown> => {
	const merged: Record<string, unknown> = { ...componentProps };

	Object.keys(consumerProps).forEach((key) => {
		const consumerValue = consumerProps[key];
		const componentValue = componentProps[key];

		if (consumerValue === undefined) return;

		if (isHandler(key, consumerValue) && typeof componentValue === 'function') {
			merged[key] = (...args: unknown[]) => {
				(consumerValue as (...a: unknown[]) => void)(...args);
				(componentValue as (...a: unknown[]) => void)(...args);
			};
		} else if (key === 'ref' && componentValue) {
			merged.ref = (node: unknown) => {
				setRef(consumerValue as Ref<unknown>, node);
				setRef(componentValue as Ref<unknown>, node);
			};
		} else if (JOINED_PROPS.includes(key)) {
			const tokens = classNames(
				componentValue as string,
				consumerValue as string
			).split(' ');
			merged[key] =
				Array.from(new Set(tokens)).filter(Boolean).join(' ') || undefined;
		} else if (key === 'style' && componentValue) {
			merged.style = {
				...(componentValue as object),
				...(consumerValue as object),
			};
		} else {
			merged[key] = consumerValue;
		}
	});

	return merged;
};

/**
 * Renders a `TriggerRender` slot with the component's trigger props.
 */
export const renderTrigger = <P extends object>(
	trigger: TriggerRender<P>,
	props: P
): ReactNode => {
	if (typeof trigger === 'function') {
		return trigger(props);
	}
	if (React.isValidElement(trigger)) {
		return React.cloneElement(
			trigger,
			mergeProps(
				props as Record<string, unknown>,
				trigger.props as Record<string, unknown>
			)
		);
	}
	return trigger;
};

export default mergeProps;
