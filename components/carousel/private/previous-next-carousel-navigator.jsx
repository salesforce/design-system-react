/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';
import { CAROUSEL_NAVIGATORS } from '../../../utilities/constants';

/**
 * previousNextCarouselNavigator is used to display previous/next navigation items of the carousel
 */
const previousNextCarouselNavigator = (props) => (
	<div
		className="slds-carousel__col-center slds-is-absolute"
		style={{ ...props.inlineStyle, margin: '-12px 0 0', top: '50%' }}
	>
		<Button
			assistiveText={{ icon: props.assistiveText }}
			className="slds-button_icon slds-carousel__button"
			disabled={props.isDisabled}
			iconCategory="utility"
			iconName={props.iconName}
			iconVariant="border-filled"
			iconSize="small"
			onClick={props.onClick}
			variant="icon"
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
	 * Name of icon displayed within the navigation button
	 */
	iconName: PropTypes.oneOf(['chevronleft', 'chevronright']),
	/**
	 * Determines where the navigator indicator has been disabled
	 */
	isDisabled: PropTypes.bool,
	/**
	 * Additional styles to be applied to the container
	 */
	inlineStyle: PropTypes.object,
	/**
	 * Triggered when the indicator is clicked.
	 */
	onClick: PropTypes.func,
};

export default previousNextCarouselNavigator;
