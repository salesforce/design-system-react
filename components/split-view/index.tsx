/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useId,
	useCallback,
	useEffect,
	type ReactNode,
	type MouseEvent,
} from 'react';
import classNames from 'classnames';
import ToggleButton, { TOGGLE_BUTTON_WIDTH } from './private/toggle-button';
import { SPLIT_VIEW } from '../../utilities/constants';
import checkProps from './check-props';
import { useControllableState } from '../../utilities/hooks';
import componentDoc from './component.json';

/**
 * Assistive text for SplitView
 */
export interface SplitViewAssistiveText {
	/** Text for the toggle button while the split view is open (the button closes it) */
	closeToggle?: string;
	/** Text for the toggle button while the split view is closed (the button opens it) */
	openToggle?: string;
	/** @deprecated Use `closeToggle` instead. Despite its name, this is the text shown while open. */
	toggleButtonOpen?: string;
	/** @deprecated Use `openToggle` instead. Despite its name, this is the text shown while closed. */
	toggleButtonClose?: string;
}

/**
 * Data passed to `events.onToggle`
 */
export interface SplitViewToggleData {
	/** The requested (next) open state: `true` when the toggle asks to open, `false` when it asks to close */
	isOpen: boolean;
}

/**
 * Event handlers for SplitView
 */
export interface SplitViewEvents {
	/**
	 * Called when the toggle button is clicked. `data.isOpen` is the requested (next) open state.
	 * Called whether or not `isOpen` is controlled; when `isOpen` is passed, update it from this callback.
	 */
	onToggle?: (
		event: MouseEvent<HTMLButtonElement>,
		data: SplitViewToggleData
	) => void;
	/**
	 * Called when the split view closes. Only called when `events.onToggle` is not provided.
	 * @deprecated use `events.onToggle`
	 */
	onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
	/**
	 * Called when the split view opens. Only called when `events.onToggle` is not provided.
	 * @deprecated use `events.onToggle`
	 */
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
	detail: ReactNode;
	/**
	 * **Event handlers**
	 * * `onToggle`: Called with `(event, { isOpen })` when the toggle button is clicked; `isOpen` is the requested (next) state.
	 * * `onOpen` / `onClose`: Deprecated, use `onToggle`.
	 */
	events?: SplitViewEvents;
	/** HTML id */
	id?: string;
	/**
	 * Whether the split view is open. Pass it to control the open state and update it from
	 * `events.onToggle`. Leave it `undefined` to let the split view manage the open state itself,
	 * starting from `defaultIsOpen`.
	 */
	isOpen?: boolean;
	/**
	 * Whether the split view starts open when `isOpen` is not passed.
	 * Defaults to `true` (the split view starts open); an exception to the boolean-default rule.
	 */
	defaultIsOpen?: boolean;
	/** Master panel content (required) */
	master: ReactNode;
	/** Width of the master section */
	masterWidth?: string;
}

const defaultAssistiveText = {
	closeToggle: 'Close split view',
	openToggle: 'Open split view',
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
	isOpen: isOpenProp,
	defaultIsOpen = true,
	master,
	masterWidth = '20rem',
}: SplitViewProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;
	const assistiveText = {
		closeToggle:
			propAssistiveText?.closeToggle ??
			propAssistiveText?.toggleButtonOpen ??
			defaultAssistiveText.closeToggle,
		openToggle:
			propAssistiveText?.openToggle ??
			propAssistiveText?.toggleButtonClose ??
			defaultAssistiveText.openToggle,
	};

	// Check props in development
	useEffect(() => {
		checkProps(
			SPLIT_VIEW,
			{ assistiveText: propAssistiveText, events },
			componentDoc
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Only run on mount

	// Open state is ephemeral UI state: controlled when `isOpen` is passed
	const [isOpen, setIsOpen] = useControllableState(isOpenProp, defaultIsOpen);
	const masterViewId = `master_view_${id}`;

	const handleToggle = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			// No-op when `isOpen` is controlled
			setIsOpen(!isOpen);

			if (events.onToggle) {
				events.onToggle(event, { isOpen: !isOpen });
			} else if (isOpen && events.onClose) {
				events.onClose(event);
			} else if (!isOpen && events.onOpen) {
				events.onOpen(event);
			}
		},
		[setIsOpen, isOpen, events]
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
