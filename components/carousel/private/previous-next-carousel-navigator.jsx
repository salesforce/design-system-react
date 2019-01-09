/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import { CAROUSEL_NAVIGATORS } from '../../../utilities/constants';

/**
 * previousNextCarouselNavigator is used to display previous/next navigation items of the carousel
 */
const previousNextCarouselNavigator = (props) => (
	<div className="slds-carousel__col-center slds-align_absolute-center">
		<button
			className="slds-button slds-button_icon slds-carousel__button slds-button_icon-border-filled slds-button_icon-x-small"
			disabled={props.isDisabled}
			onClick={props.onClick}
		>
			<svg
				className="slds-icon slds-icon-text-default"
				aria-hidden="true"
				style={{ width: '60%', height: '100%' }}
			>
				<use xlinkHref={props.icon} />
			</svg>
			<span className="slds-assistive-text">{props.assistiveText}</span>
		</button>
	</div>
);

previousNextCarouselNavigator.displayName = CAROUSEL_NAVIGATORS;

// ### Prop Types
previousNextCarouselNavigator.propTypes = {
	/**
	 * Determines where the navigator indicator has been disabled
	 */
	isDisabled: PropTypes.bool,
	/**
	 * Triggered when the indicator is clicked.
	 */
	onClick: PropTypes.func,
	/**
	 * Path of the icon to be used for the previous/next navigation
	 */
	icon: PropTypes.string.isRequired,
	/**
	 * Description of the previous/next navigation icons for screen-readers.
	 */
	assistiveText: PropTypes.string,
};

export default previousNextCarouselNavigator;
