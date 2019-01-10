/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import { CAROUSEL_AUTOPLAY_BUTTON } from '../../../utilities/constants';

/**
 *  AutoPlayButton is used to start/pause the autoplay iteration of the carousel
 */
const AutoPlayButton = (props) => {
	const icon = props.isAutoPlayOn
		? '/assets/icons/utility-sprite/svg/symbols.svg#pause'
		: '/assets/icons/utility-sprite/svg/symbols.svg#play';

	return (
		<span className="slds-carousel__autoplay">
			<button
				className="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
				aria-pressed="false"
				title="Start / Stop auto-play"
				onClick={props.onClick}
			>
				<svg className="slds-button__icon" aria-hidden="true">
					<use xlinkHref={icon} />
				</svg>
				<span className="slds-assistive-text">{props.assistiveText}</span>
			</button>
		</span>
	);
};
AutoPlayButton.displayName = CAROUSEL_AUTOPLAY_BUTTON;

// ### Prop Types
AutoPlayButton.propTypes = {
	/**
	 * Triggered when the autoplay button is clicked.
	 */
	onClick: PropTypes.func,
	/**
	 * Description of the start/pause autoplay button for screen-readers.
	 */
	assistiveText: PropTypes.string,
	isAutoPlayOn: PropTypes.bool,
};

AutoPlayButton.defaultProps = {
	assistiveText: 'Start / Stop auto-play',
	isAutoPlayOn: false,
};

export default AutoPlayButton;
