/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useState,
	useRef,
	useEffect,
	useLayoutEffect,
	useCallback,
	useId,
	type KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import { ACCORDION } from '../../utilities/constants';
import type { ChildrenOf } from '../../types/common';
import type { AccordionPanelProps, AccordionPanelInjectedProps } from './panel';

/**
 * Props for the Accordion component
 */
export interface AccordionProps {
	/** `AccordionPanel` elements */
	children: ChildrenOf<AccordionPanelProps>;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** HTML id */
	id?: string | number;
}

/**
 * An accordion allows a user to toggle the display of sections of content.
 * The accordion component wraps accordion panels that can be selected and expanded.
 */
const Accordion = ({
	children,
	className,
	id: propId,
}: AccordionProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;

	const [currButtonIndex, setCurrButtonIndex] = useState<number | null>(0);
	const summaryButtonsRef = useRef<HTMLButtonElement[]>([]);
	const childCount = React.Children.count(children);

	// Resync the tracked index whenever the panel count changes (e.g. a panel
	// is removed). Removing a panel before the focused one shifts the focused
	// button to an earlier index without moving DOM focus off of it, so
	// currButtonIndex can end up in range but pointing at the wrong button.
	// This has to run in a layout effect rather than during render: refs are
	// only reattached to their new positions during the commit that follows
	// this render, so summaryButtonsRef.current isn't resynced yet while the
	// component function is running.
	const prevChildCountRef = useRef(childCount);
	useLayoutEffect(() => {
		if (prevChildCountRef.current === childCount) {
			return;
		}
		prevChildCountRef.current = childCount;

		if (currButtonIndex === null) {
			return;
		}

		const focusedIndex = summaryButtonsRef.current.findIndex(
			(button) => button === document.activeElement
		);

		if (focusedIndex !== -1) {
			if (focusedIndex !== currButtonIndex) {
				setCurrButtonIndex(focusedIndex);
			}
		} else if (currButtonIndex > childCount - 1) {
			setCurrButtonIndex(childCount > 0 ? childCount - 1 : null);
		}
	}, [childCount, currButtonIndex]);

	// Focus management. Only move focus when the index changes, never on
	// mount, so rendering an Accordion doesn't steal focus from the page.
	const prevButtonIndexRef = useRef(currButtonIndex);
	useEffect(() => {
		if (prevButtonIndexRef.current === currButtonIndex) {
			return;
		}
		prevButtonIndexRef.current = currButtonIndex;
		if (
			currButtonIndex !== null &&
			summaryButtonsRef.current[currButtonIndex]
		) {
			summaryButtonsRef.current[currButtonIndex].focus();
		}
	}, [currButtonIndex]);

	const handleClickSummary = useCallback(() => {
		setCurrButtonIndex(null);
	}, []);

	const handleKeyDownSummary = useCallback(
		(e: KeyboardEvent<HTMLButtonElement>) => {
			if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
				return;
			}
			e.preventDefault();

			// Start from the button that has the key event, not the last index
			// reached with the arrows: Tab or a click can move focus without
			// updating currButtonIndex
			const buttonIndex = summaryButtonsRef.current.indexOf(e.currentTarget);
			if (buttonIndex === -1) {
				return;
			}

			let nextIndex;
			if (e.key === 'ArrowDown') {
				nextIndex = buttonIndex < childCount - 1 ? buttonIndex + 1 : 0;
			} else {
				nextIndex = buttonIndex > 0 ? buttonIndex - 1 : childCount - 1;
			}

			setCurrButtonIndex(nextIndex);
			// Focus here as well: the focus effect only runs when the index
			// changes, and a stale index can already equal nextIndex
			summaryButtonsRef.current[nextIndex]?.focus();
		},
		[childCount]
	);

	const addSummaryButton = useCallback(
		(index: number, button: HTMLButtonElement | null) => {
			if (button === null) {
				delete summaryButtonsRef.current[index];
			} else {
				summaryButtonsRef.current[index] = button;
			}
		},
		[]
	);

	return (
		<ul
			// @ts-expect-error name attribute on ul is non-standard but kept for compatibility
			name={id}
			className={classNames('slds-accordion', className as string)}
		>
			{React.Children.map(children, (child, index) => {
				if (React.isValidElement<AccordionPanelProps>(child)) {
					return React.cloneElement<
						AccordionPanelProps & AccordionPanelInjectedProps
					>(child, {
						refs: {
							summaryButton: (button: HTMLButtonElement | null) =>
								addSummaryButton(index, button),
						},
						onClickSummary: handleClickSummary,
						onKeyDownSummary: handleKeyDownSummary,
					});
				}
				return child;
			})}
		</ul>
	);
};

Accordion.displayName = ACCORDION;

export default Accordion;
