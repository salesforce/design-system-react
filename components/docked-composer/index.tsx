/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useEffect,
	useId,
	useRef,
	type ReactNode,
	type MouseEvent,
} from 'react';
import Button from '../button';
import { useControllableState } from '../../utilities/hooks';

/**
 * Assistive text for DockedComposer
 */
export interface DockedComposerAssistiveText {
	/** Label for expand button */
	expandButton?: string;
	/** Label for minimize button */
	minimizeButton?: string;
	/** Label for close button */
	closeButton?: string;
}

/**
 * Event handlers for DockedComposer
 */
export interface DockedComposerEvents {
	/** Called when minimize is requested */
	onRequestMinimize?: (event: MouseEvent<HTMLButtonElement>) => void;
	/** Called when expand is requested */
	onRequestExpand?: (event: MouseEvent<HTMLButtonElement>) => void;
	/** Called when close is requested */
	onRequestClose?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Props for the DockedComposer component
 */
export interface DockedComposerProps {
	/** Assistive text for accessibility */
	assistiveText?: DockedComposerAssistiveText;
	/** Body content */
	body?: ReactNode;
	/** Additional container class name */
	classNameContainer?: string;
	/** Event handlers */
	events?: DockedComposerEvents;
	/** Header text or element */
	header?: ReactNode;
	/** HTML id */
	id?: string;
	/**
	 * Whether the composer is open. When set, the composer is controlled: update it from
	 * `onRequestMinimize` / `onRequestExpand`. Leave it `undefined` for an uncontrolled composer
	 * (see `defaultIsOpen`). The body is unmounted while closed.
	 */
	isOpen?: boolean;
	/** Initial open state of an uncontrolled composer (`isOpen` is `undefined`). Defaults to `false`. */
	defaultIsOpen?: boolean;
}

const defaultAssistiveText: DockedComposerAssistiveText = {
	expandButton: 'Expand',
	minimizeButton: 'Minimize',
	closeButton: 'Close',
};

/**
 * The Docked Composer is a persistent utility bar that allows a user to continually
 * use the app to complete tasks or gather information while expanding/collapsing a composer window.
 */
const DockedComposer = ({
	assistiveText: propAssistiveText,
	body,
	classNameContainer,
	events = {},
	header,
	id: propId,
	isOpen: isOpenProp,
	defaultIsOpen = false,
}: DockedComposerProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;
	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };

	const [isOpen, setIsOpen] = useControllableState(isOpenProp, defaultIsOpen);

	const sectionClassName = isOpen ? 'slds-is-open' : 'slds-is-closed';

	// An open composer behaves like a dialog: when it mounts open, or the parent opens it without
	// a click, focus the dialog and return focus to where it was when the composer unmounts. A
	// minimized composer is only a bar and leaves focus alone.
	const dialogRef = useRef<HTMLElement | null>(null);
	const returnFocusRef = useRef<HTMLElement | null>(null);

	// The minimize and expand buttons replace each other, so the clicked one unmounts and focus
	// would fall to <body>. When the parent accepts the request, move focus to the button that
	// took its place.
	const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
	const shouldFocusToggleRef = useRef(false);
	const setToggleButtonRef = (node: HTMLButtonElement | null) => {
		toggleButtonRef.current = node;
	};

	// Runs after every render. `false` before the first render, so mounting open counts as opening.
	const previousIsOpenRef = useRef<boolean | undefined>(false);
	useEffect(() => {
		if (previousIsOpenRef.current !== isOpen) {
			if (shouldFocusToggleRef.current) {
				toggleButtonRef.current?.focus();
			} else if (isOpen && dialogRef.current) {
				const active = document.activeElement as HTMLElement | null;
				if (
					!returnFocusRef.current &&
					active &&
					active !== document.body &&
					!dialogRef.current.contains(active)
				) {
					returnFocusRef.current = active;
				}
				dialogRef.current.focus();
			}
		}
		previousIsOpenRef.current = isOpen;
		shouldFocusToggleRef.current = false;
	});

	useEffect(() => {
		// Read the node here: refs are already detached when the cleanup runs.
		const dialog = dialogRef.current;
		return () => {
			// Only restore focus the composer took, and only if it is not already somewhere else.
			const returnFocus = returnFocusRef.current;
			const active = document.activeElement;
			if (
				returnFocus?.isConnected &&
				(!active || active === document.body || dialog?.contains(active))
			) {
				returnFocus.focus();
			}
			returnFocusRef.current = null;
			// Let a remount (React StrictMode replays effects) focus the dialog again.
			previousIsOpenRef.current = false;
		};
	}, []);

	const handleToggle =
		(
			nextIsOpen: boolean,
			handler?: (event: MouseEvent<HTMLButtonElement>) => void
		) =>
		(event: MouseEvent<HTMLButtonElement>) => {
			shouldFocusToggleRef.current = true;
			// No-op when `isOpen` is controlled
			setIsOpen(nextIsOpen);
			handler?.(event);
			// A click's effects run before this timeout. If the parent rejected the request there was
			// no render, so clear the flag here; a later, unrelated `isOpen` change must not take focus.
			setTimeout(() => {
				shouldFocusToggleRef.current = false;
			});
		};

	return (
		<div
			id={`${id}-container`}
			className={`slds-docked_container${classNameContainer ? ` ${classNameContainer}` : ''}`}
		>
			<section
				className={`slds-docked-composer slds-grid slds-grid_vertical ${sectionClassName}`}
				ref={dialogRef}
				role="dialog"
				tabIndex={-1}
				aria-labelledby={`${id}-dialog-heading`}
				aria-describedby={isOpen ? `${id}-body` : undefined}
			>
				<header
					className="slds-docked-composer__header slds-grid slds-shrink-none"
					aria-live="assertive"
				>
					<div className="slds-media slds-media_center slds-no-space">
						<div className="slds-media__body">
							<h2
								className="slds-truncate"
								id={`${id}-dialog-heading`}
								title={typeof header === 'string' ? header : undefined}
							>
								{header}
							</h2>
						</div>
					</div>
					<div className="slds-col_bump-left slds-shrink-none">
						{isOpen ? (
							<Button
								id={`${id}-minimize-button`}
								title={assistiveText.minimizeButton}
								assistiveText={{ icon: assistiveText.minimizeButton }}
								buttonRef={setToggleButtonRef}
								onClick={handleToggle(false, events.onRequestMinimize)}
								iconCategory="utility"
								iconName="minimize_window"
								iconVariant="bare"
								variant="icon"
							/>
						) : (
							<Button
								id={`${id}-expand-button`}
								title={assistiveText.expandButton}
								assistiveText={{ icon: assistiveText.expandButton }}
								buttonRef={setToggleButtonRef}
								onClick={handleToggle(true, events.onRequestExpand)}
								iconCategory="utility"
								iconName="expand_alt"
								iconVariant="bare"
								variant="icon"
							/>
						)}
						<Button
							id={`${id}-close-button`}
							title={assistiveText.closeButton}
							assistiveText={{ icon: assistiveText.closeButton }}
							onClick={events.onRequestClose}
							iconCategory="utility"
							iconName="close"
							iconVariant="bare"
							variant="icon"
						/>
					</div>
				</header>
				{isOpen && (
					<div className="slds-docked-composer__body" id={`${id}-body`}>
						{body}
					</div>
				)}
			</section>
		</div>
	);
};

DockedComposer.displayName = 'SLDSDockedComposer';

export default DockedComposer;
