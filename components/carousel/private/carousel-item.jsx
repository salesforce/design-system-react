/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # CarouselItem Component

// Implements the [CarouselItem design pattern](https://www.lightningdesignsystem.com/components/carousel/) in React.

import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../button';

import { CAROUSEL_ITEM } from '../../../utilities/constants';

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
const CarouselItem = (props) => {
	function handleOnClick(event) {
		if (props.href === '#') {
			event.preventDefault();
		}

		if (props.onClick) {
			props.onClick(event);
		}
	}

	return (
		<div
			id={props.getPanelId({ carouselId: props.carouselId, itemId: props.id })}
			className="slds-carousel__panel slds-m-horizontal_xx-small slds-list_horizontal"
			role="tabpanel"
			aria-hidden="false"
			aria-labelledby={`indicator-id-${props.carouselId}-${props.panelIndex}`}
			style={{
				margin: 0,
				maxWidth: `${props.itemWidth}px`,
				padding: '0 6px',
			}}
		>
			{props.onRenderItem ? (
				props.onRenderItem({ item: props })
			) : (
				<a
					className="slds-carousel__panel-action slds-text-link_reset"
					href={props.href}
					onClick={handleOnClick}
					onFocus={props.onFocus}
					style={{
						backgroundColor: 'white',
						width: '100%',
					}}
					tabIndex={props.isInCurrentPanel ? '0' : '-1'}
				>
					<div className="slds-carousel__image">
						<img
							src={props.src}
							alt={props.imageAssistiveText || props.heading}
						/>
					</div>
					<div className="slds-carousel__content" style={{ height: 'auto' }}>
						<h2 className="slds-carousel__content-title">{props.heading}</h2>
						<div
							className="slds-p-bottom_x-small slds-text-body_small"
							style={{ minHeight: '40px' }}
						>
							{props.description}
						</div>
						{props.buttonLabel && (
							<Button
								label={props.buttonLabel}
								tabIndex={props.isInCurrentPanel ? '0' : '-1'}
								variant="neutral"
							/>
						)}
					</div>
				</a>
			)}
		</div>
	);
};

CarouselItem.displayName = CAROUSEL_ITEM;

CarouselItem.propTypes = {
	/**
	 * Label of the button to be displayed. If not provided, no button will be rendered.
	 */
	buttonLabel: PropTypes.string,
	/**
	 * Carousel HTML ID
	 */
	carouselId: PropTypes.string,
	/**
	 * CSS classes that are applied to the component
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Visible paragraph text to be displayed on the carousel item
	 */
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Carousel Item's visible heading
	 */
	heading: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	href: PropTypes.string,
	/**
	 * Id of the item component.
	 */
	id: PropTypes.number.isRequired,
	/**
	 * Image alt text
	 */
	imageAssistiveText: PropTypes.string,
	/**
	 * Boolean indicating whether this item is currently visible in the active parent carousel panel
	 */
	isInCurrentPanel: PropTypes.bool,
	/**
	 * Width of the carousel item
	 */
	itemWidth: PropTypes.number,
	/**
	 * Accepts a callback to handle when the a tag is focused on
	 */
	onFocus: PropTypes.func,
	/**
	 * Accepts a custom carousel item rendering function
	 */
	onRenderItem: PropTypes.func,
	/**
	 * Index of the panel this item belongs to, to be used when associating it to an indicator
	 */
	panelIndex: PropTypes.number,
	/**
	 * Path of the image to be used
	 */
	src: PropTypes.string.isRequired,
};

CarouselItem.defaultProps = {
	href: '#',
};

export default CarouselItem;
