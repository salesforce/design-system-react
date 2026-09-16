/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import { type MouseEvent } from 'react';
import Button from '../../../components/button';
import { CAROUSEL_AUTOPLAY_BUTTON } from '../../../utilities/constants';

export interface AutoplayButtonProps {
	/**
	 * Description of the start/pause autoplay button for screen-readers.
	 */
	assistiveText?: string;
	/**
	 * Indicates whether the autoplay button is disabled.
	 */
	isDisabled?: boolean;
	/**
	 * Indicates whether autoplay is enabled
	 */
	isAutoplayOn?: boolean;
	/**
	 * Triggered when the autoplay button is clicked.
	 */
	onClick?: (event: MouseEvent) => void;
}

/**
 *  AutoplayButton is used to start/pause the autoplay iteration of the carousel
 */
const AutoplayButton = ({
	assistiveText,
	isDisabled,
	isAutoplayOn = false,
	onClick,
}: AutoplayButtonProps) => (
	<span className="slds-carousel__autoplay" style={{ left: '66px' }}>
		<Button
			assistiveText={{ icon: assistiveText }}
			className="slds-button_icon"
			disabled={isDisabled}
			iconCategory="utility"
			iconName={isAutoplayOn ? 'pause' : 'play'}
			iconVariant="border-filled"
			iconSize="x-small"
			onClick={onClick}
			variant="icon"
		/>
	</span>
);
AutoplayButton.displayName = CAROUSEL_AUTOPLAY_BUTTON;

export default AutoplayButton;
