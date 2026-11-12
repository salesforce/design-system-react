/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import { type CSSProperties, type MouseEvent } from 'react';

import Button from '../../../components/button';
import { CAROUSEL_NAVIGATORS } from '../../../utilities/constants';

export interface PreviousNextCarouselNavigatorProps {
	/**
	 * Description of the previous/next navigation icons for screen-readers.
	 */
	assistiveText?: string;
	/**
	 * Name of icon displayed within the navigation button
	 */
	iconName?: 'chevronleft' | 'chevronright';
	/**
	 * Additional styles to be applied to the container
	 */
	inlineStyle?: CSSProperties;
	/**
	 * Determines where the navigator indicator has been disabled
	 */
	isDisabled?: boolean;
	/**
	 * Triggered when the indicator is clicked.
	 */
	onClick?: (event: MouseEvent) => void;
}

/**
 * previousNextCarouselNavigator is used to display previous/next navigation items of the carousel
 */
const previousNextCarouselNavigator = (
	props: PreviousNextCarouselNavigatorProps
) => (
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

export default previousNextCarouselNavigator;
