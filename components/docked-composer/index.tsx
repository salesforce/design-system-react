/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, type ReactNode, type MouseEvent } from 'react';
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
								onClick={events.onRequestMinimize}
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
								onClick={events.onRequestExpand}
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














