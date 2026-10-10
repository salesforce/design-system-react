/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useState,
	useRef,
	useEffect,
	useLayoutEffect,
	useCallback,
	useId,
	type ReactNode,
	type ReactElement,
	type KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import { ACCORDION } from '../../utilities/constants';

/**
 * Props for the Accordion component
 */
export interface AccordionProps {
	/** Accordion panel children */
	children: ReactNode;
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

	// Focus management
	useEffect(() => {
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
			let buttonIndex = currButtonIndex;

			if (buttonIndex === null) {
				buttonIndex = summaryButtonsRef.current.findIndex(
					(el) => el && el.id === (e.target as HTMLElement).id
				);
			}

			if (e.key === 'ArrowDown') {
				e.preventDefault();
				if (buttonIndex < childCount - 1) {
					setCurrButtonIndex(buttonIndex + 1);
				} else {
					setCurrButtonIndex(0);
				}
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				if (buttonIndex > 0) {
					setCurrButtonIndex(buttonIndex - 1);
				} else {
					setCurrButtonIndex(childCount - 1);
				}
			}
		},
		[currButtonIndex, childCount]
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
				if (React.isValidElement(child)) {
					return React.cloneElement(
						child as ReactElement<{
							refs?: {
								summaryButton: (button: HTMLButtonElement | null) => void;
							};
							onClickSummary?: () => void;
							onKeyDownSummary?: (e: KeyboardEvent<HTMLButtonElement>) => void;
						}>,
						{
							refs: {
								summaryButton: (button: HTMLButtonElement | null) =>
									addSummaryButton(index, button),
							},
							onClickSummary: handleClickSummary,
							onKeyDownSummary: handleKeyDownSummary,
						}
					);
				}
				return child;
			})}
		</ul>
	);
};

Accordion.displayName = ACCORDION;

export default Accordion;
