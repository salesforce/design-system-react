/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { type MouseEvent } from 'react';
import classNames from 'classnames';
import Button from '../../button';
import { type SplitViewAssistiveText } from '../index';

export const DISPLAY_NAME = 'SLDSSplitViewToggleButton';
export const TOGGLE_BUTTON_WIDTH = '0.75rem';

export interface ToggleButtonProps {
	/**
	 * Unique html id placed on the button for aria-controls
	 */
	ariaControls: string;
	/**
	 * **Assistive text for accessibility**
	 * * `closeToggle`: Text while the split view is open (the button closes it).
	 * * `openToggle`: Text while the split view is closed (the button opens it).
	 */
	assistiveText: Required<
		Pick<SplitViewAssistiveText, 'closeToggle' | 'openToggle'>
	>;
	/**
	 * **Event Callbacks**
	 * * `onClick`: Called when the button is clicked.
	 */
	events: {
		onClick: (event: MouseEvent<HTMLButtonElement>) => void;
	};
	/**
	 * Determines if the panel is open
	 */
	isOpen: boolean;
}

const SplitViewToggleButton = ({
	isOpen,
	assistiveText,
	ariaControls,
	events,
}: ToggleButtonProps) => {
	const toggleAssistiveText = isOpen
		? assistiveText.closeToggle
		: assistiveText.openToggle;

	return (
		<Button
			className={classNames(
				'slds-button slds-button_icon slds-split-view__toggle-button',
				{ 'slds-is-open': isOpen }
			)}
			aria-expanded={isOpen}
			aria-controls={ariaControls}
			title={toggleAssistiveText}
			variant="base"
			iconName="left"
			iconCategory="utility"
			iconSize="x-small"
			onClick={events.onClick}
			assistiveText={{ icon: toggleAssistiveText }}
		/>
	);
};

SplitViewToggleButton.displayName = DISPLAY_NAME;

export default SplitViewToggleButton;
