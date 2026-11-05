/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useCallback,
	useId,
	type ReactNode,
	type MouseEvent,
} from 'react';
import Button from '../button';

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
 * Data passed to `onRequestMinimize` and `onRequestExpand`
 */
export interface DockedComposerRequestToggleData {
	/** The requested open state: `false` for minimize, `true` for expand */
	isOpen: boolean;
}

/**
 * Data passed to `onRequestClose`
 */
export interface DockedComposerRequestCloseData {
	/** What caused the request. Only the close button can request a close. */
	trigger: 'close-button';
}

/**
 * Event handlers for DockedComposer
 */
export interface DockedComposerEvents {
	/** Called when the minimize button is clicked. `data.isOpen` is `false`. */
	onRequestMinimize?: (
		event: MouseEvent<HTMLButtonElement>,
		data: DockedComposerRequestToggleData
	) => void;
	/** Called when the expand button is clicked. `data.isOpen` is `true`. */
	onRequestExpand?: (
		event: MouseEvent<HTMLButtonElement>,
		data: DockedComposerRequestToggleData
	) => void;
	/** Called when the close button is clicked. `data.trigger` is `'close-button'`. */
	onRequestClose?: (
		event: MouseEvent<HTMLButtonElement>,
		data: DockedComposerRequestCloseData
	) => void;
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
	/** Whether the composer is open */
	isOpen?: boolean;
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
	isOpen,
}: DockedComposerProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;
	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };

	const { onRequestMinimize, onRequestExpand, onRequestClose } = events;
	const handleMinimize = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			onRequestMinimize?.(event, { isOpen: false });
		},
		[onRequestMinimize]
	);
	const handleExpand = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			onRequestExpand?.(event, { isOpen: true });
		},
		[onRequestExpand]
	);
	const handleClose = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			onRequestClose?.(event, { trigger: 'close-button' });
		},
		[onRequestClose]
	);

	const sectionClassName = isOpen ? 'slds-is-open' : 'slds-is-closed';

	return (
		<div
			id={`${id}-container`}
			className={`slds-docked_container${classNameContainer ? ` ${classNameContainer}` : ''}`}
		>
			<section
				className={`slds-docked-composer slds-grid slds-grid_vertical ${sectionClassName}`}
				role="dialog"
				aria-labelledby={`${id}-dialog-heading`}
				aria-describedby={`${id}-body`}
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
								onClick={handleMinimize}
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
								onClick={handleExpand}
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
							onClick={handleClose}
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
