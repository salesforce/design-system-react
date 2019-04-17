/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/button';
import { CAROUSEL_NAVIGATORS } from '../../../utilities/constants';
/**
 * previousNextCarouselNavigator is used to display previous/next navigation items of the carousel
 */
const previousNextCarouselNavigator = (props) => (
	<div
		className="slds-carousel__col-center slds-is-absolute"
		style={{ ...props.inlineStyle, top: '50%' }}
	>
		<Button
			className="slds-button slds-button_icon slds-carousel__button slds-button_icon-border-filled slds-button_icon-x-small"
			assistiveText={{ icon: props.assistiveText }}
			iconCategory="utility"
			iconPath={props.iconPath}
			iconVariant="container"
			onClick={props.onClick}
			variant="icon"
			disabled={props.isDisabled}
		/>
	</div>
);
// /assets/icons/utility-sprite/svg/symbols.svg#right
previousNextCarouselNavigator.displayName = CAROUSEL_NAVIGATORS;

// ### Prop Types
previousNextCarouselNavigator.propTypes = {
	/**
	 * Description of the previous/next navigation icons for screen-readers.
	 */
	assistiveText: PropTypes.string,
	/**
	 * Path of the icon to be used for the previous/next navigation
	 */
	iconPath: PropTypes.string.isRequired,
	/**
	 * Determines where the navigator indicator has been disabled
	 */
	isDisabled: PropTypes.bool,
	/**
	 * Triggered when the indicator is clicked.
	 */
	onClick: PropTypes.func,
};

export default previousNextCarouselNavigator;
