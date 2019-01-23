/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # CarouselItem Component

// Implements the [CarouselItem design pattern](https://www.lightningdesignsystem.com/components/carousel/) in React.

import React from 'react';
import PropTypes from 'prop-types';

// import Card from '~/components/card';
import '../../../styles/carousel/carousel.css';
import { CAROUSEL_ITEM } from '../../../utilities/constants';

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
const CarouselItem = (props) => (
	<div
		id={`content-id-${props.id}`}
		className="slds-carousel__panel slds-m-horizontal_xx-small slds-list_horizontal"
		role="tabpanel"
		aria-hidden="false"
		aria-labelledby={`indicator-id-${props.id}`}
		style={{
			maxWidth: `${props.itemWidth}px`,
		}}
	>
		{props.onRenderItem ? (
			props.onRenderItem(props)
		) : (
			<span className="slds-carousel__panel-action slds-text-link_reset">
				<div className="slds-carousel__image">
					<img src={props.src} alt={props.imageAssistiveText} />
				</div>
				<div className="slds-carousel__content">
					<h2 className="slds-carousel__content-title">{props.heading}</h2>
					<div
						className="slds-p-bottom_x-small slds-text-body_small"
						style={{ minHeight: '40px' }}
					>
						{props.description}
					</div>
					{props.CTALabel && (
						<a
							className="slds-button slds-button_neutral slds-button_outline-brand"
							href={props.href}
							target="_blank"
						>
							{props.CTALabel}
						</a>
					)}
				</div>
			</span>
		)}
	</div>
);

CarouselItem.displayName = CAROUSEL_ITEM;

CarouselItem.propTypes = {
	/**
	 * Carousel Item's visible heading
	 */
	heading: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	/**
	 * Visible paragraph text to be displayed on the carousel item
	 */
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	/**
	 * Path of the image to be used
	 */
	src: PropTypes.string.isRequired,
	/**
	 * Image alt text
	 */
	imageAssistiveText: PropTypes.string,
	/**
	 * Label of the button to be displayed
	 */
	CTALabel: PropTypes.string,
	/**
	 * Width of the carousel item
	 */
	itemWidth: PropTypes.number,
	/**
	 * CSS classes that are applied to the component
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	/**
	 * Id of the item component.
	 */
	id: PropTypes.number.isRequired,
    href: PropTypes.string,
    /**
	 * Accepts a custom carousel item rendering function
	 */
    onRenderItem: PropTypes.func,
    buttonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

CarouselItem.defaultProps = {
	imageAssistiveText: 'Card image description',
	buttonLabel: 'Get Started',
	href: 'javascript:void(0);',
};

export default CarouselItem;
