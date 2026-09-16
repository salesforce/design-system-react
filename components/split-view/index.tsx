/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useState, useId, useCallback, type ReactElement, type MouseEvent } from 'react';
import classNames from 'classnames';
import ToggleButton, { TOGGLE_BUTTON_WIDTH } from './private/toggle-button';
import { SPLIT_VIEW } from '../../utilities/constants';

/**
 * Assistive text for SplitView
 */
export interface SplitViewAssistiveText {
	/** Text for open state toggle button */
	toggleButtonOpen?: string;
	/** Text for closed state toggle button */
	toggleButtonClose?: string;
}

/**
 * Event handlers for SplitView
 */
export interface SplitViewEvents {
	/** Called when the split view closes */
	onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
	/** Called when the split view opens */
	onOpen?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Props for the SplitView component
 */
export interface SplitViewProps {
	/** Assistive text for accessibility */
	assistiveText?: SplitViewAssistiveText;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Detail panel content (required) */
	detail: ReactElement | ReactElement[];
	/** Event handlers */
	events?: SplitViewEvents;
	/** HTML id */
	id?: string;
	/** Whether the split view is open */
	isOpen?: boolean;
	/** Master panel content (required) */
	master: ReactElement | ReactElement[];
	/** Width of the master section */
	masterWidth?: string;
}

const defaultAssistiveText: SplitViewAssistiveText = {
	toggleButtonOpen: 'Close split view',
	toggleButtonClose: 'Open split view',
};

/**
 * Split view is used to navigate between records in a list while staying on the same screen.
 */
const SplitView = ({
	assistiveText: propAssistiveText,
	className,
	detail,
	events = {},
	id: propId,
	isOpen: controlledIsOpen,
	master,
	masterWidth = '20rem',
}: SplitViewProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;
	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };

	// Support both controlled and uncontrolled modes
	const [internalIsOpen, setInternalIsOpen] = useState(
		typeof controlledIsOpen === 'boolean' ? controlledIsOpen : true
	);

	const isOpen = typeof controlledIsOpen === 'boolean' ? controlledIsOpen : internalIsOpen;
	const masterViewId = `master_view_${id}`;

	const handleToggle = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			if (typeof controlledIsOpen !== 'boolean') {
				setInternalIsOpen((prev) => !prev);
			}

			if (isOpen && events.onClose) {
				events.onClose(event);
			} else if (!isOpen && events.onOpen) {
				events.onOpen(event);
			}
		},
		[controlledIsOpen, isOpen, events]
	);

	return (
		<div
			id={id}
			className={classNames('slds-grid', className as string)}
			style={{ height: '100%' }}
		>
			<div
				style={{
					maxWidth: isOpen ? masterWidth : '0',
					minWidth: isOpen ? masterWidth : '0',
				}}
				className={classNames('slds-split-view_container', {
					'slds-is-open': isOpen,
					'slds-is-closed': !isOpen,
				})}
			>
				<ToggleButton
					assistiveText={assistiveText}
					ariaControls={masterViewId}
					isOpen={isOpen}
					events={{
						onClick: handleToggle,
					}}
				/>
				<article
					id={masterViewId}
					className="slds-split-view slds-grid slds-grid_vertical slds-grow slds-scrollable_none"
				>
					{isOpen ? master : null}
				</article>
			</div>
			<div
				style={{ marginLeft: TOGGLE_BUTTON_WIDTH }}
				className="slds-grow slds-scrollable_y"
			>
				{detail}
			</div>
		</div>
	);
};

SplitView.displayName = SPLIT_VIEW;

export default SplitView;














