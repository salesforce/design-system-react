/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/button';
import { CAROUSEL_AUTOPLAY_BUTTON } from '../../../utilities/constants';

/**
 *  AutoplayButton is used to start/pause the autoplay iteration of the carousel
 */
const AutoplayButton = ({
	assistiveText,
	isDisabled,
	isAutoplayOn = false,
	onClick,
}) => (
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

// ### Prop Types
AutoplayButton.propTypes = {
	/**
	 * Description of the start/pause autoplay button for screen-readers.
	 */
	assistiveText: PropTypes.string,
	/**
	 * Indicates whether autoplay is enabled
	 */
	isAutoplayOn: PropTypes.bool,
	/**
	 * Triggered when the autoplay button is clicked.
	 */
	onClick: PropTypes.func,
};

export default AutoplayButton;
