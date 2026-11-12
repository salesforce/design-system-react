/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # CarouselItem Component

// Implements the [CarouselItem design pattern](https://www.lightningdesignsystem.com/components/carousel/) in React.

import { type FocusEvent, type MouseEvent, type ReactNode } from 'react';

import Button from '../../button';

import { CAROUSEL_ITEM } from '../../../utilities/constants';
import { type CarouselRenderItemData } from '../index';

export interface CarouselItemProps {
	/**
	 * Label of the button to be displayed. If not provided, no button will be rendered.
	 */
	buttonLabel?: string;
	/**
	 * Carousel HTML ID
	 */
	carouselId?: string;
	/**
	 * CSS classes that are applied to the component
	 */
	className?: string | string[] | Record<string, boolean>;
	/**
	 * Visible paragraph text to be displayed on the carousel item
	 */
	description?: string | ReactNode;
	/**
	 * Function to generate the panel HTML `id`.
	 */
	getPanelId?: (params: { carouselId: string; itemId: string }) => string;
	/**
	 * Carousel Item's visible heading
	 */
	heading?: string | Record<string, unknown>;
	/**
	 * Link URL
	 */
	href?: string;
	/**
	 * Id of the item component.
	 */
	id?: string;
	/**
	 * Image alt text
	 */
	imageAssistiveText?: string;
	/**
	 * Boolean indicating whether this item is currently visible in the active parent carousel panel
	 */
	isInCurrentPanel?: boolean;
	/**
	 * Width of the carousel item
	 */
	itemWidth?: number;
	/**
	 * Triggered when the item is clicked.
	 */
	onClick?: (event: MouseEvent) => void;
	/**
	 * Accepts a callback to handle when the a tag is focused on
	 */
	onFocus?: (event: FocusEvent) => void;
	/**
	 * Renders the item's content in place of the default image, heading and description. Called with `{ item }`.
	 */
	renderItem?: (data: CarouselRenderItemData) => ReactNode;
	/**
	 * Index of the panel this item belongs to, to be used when associating it to an indicator
	 */
	panelIndex?: number;
	/**
	 * Path of the image to be used
	 */
	src?: string;
}

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
const CarouselItem = ({
	buttonLabel,
	carouselId,
	description,
	heading,
	href = '#',
	id,
	imageAssistiveText,
	isInCurrentPanel,
	itemWidth,
	onFocus,
	renderItem,
	panelIndex,
	src,
	getPanelId,
	className,
	onClick,
}: CarouselItemProps) => {
	function handleOnClick(event: MouseEvent) {
		if (href === '#') {
			event.preventDefault();
		}

		if (onClick) {
			onClick(event);
		}
	}

	return (
		<div
			id={getPanelId?.({ carouselId, itemId: id } as {
				carouselId: string;
				itemId: string;
			})}
			className="slds-carousel__panel slds-m-horizontal_xx-small slds-list_horizontal"
			role="tabpanel"
			aria-hidden="false"
			aria-labelledby={`indicator-id-${carouselId}-${panelIndex}`}
			style={{
				margin: 0,
				maxWidth: `${itemWidth}px`,
				padding: '0 6px',
			}}
		>
			{renderItem ? (
				renderItem({
					item: {
						buttonLabel,
						carouselId,
						className,
						description,
						heading,
						href,
						id,
						imageAssistiveText,
						isInCurrentPanel,
						itemWidth,
						onFocus,
						panelIndex,
						src,
						getPanelId,
					},
				})
			) : (
				<a
					className="slds-carousel__panel-action slds-text-link_reset"
					href={href}
					onClick={handleOnClick}
					onFocus={onFocus}
					style={{
						backgroundColor: 'white',
						width: '100%',
					}}
					tabIndex={isInCurrentPanel ? 0 : -1}
				>
					<div className="slds-carousel__image">
						<img src={src} alt={imageAssistiveText || (heading as string)} />
					</div>
					<div className="slds-carousel__content" style={{ height: 'auto' }}>
						<h2 className="slds-carousel__content-title">
							{heading as ReactNode}
						</h2>
						<div
							className="slds-p-bottom_x-small slds-text-body_small"
							style={{ minHeight: '40px' }}
						>
							{description}
						</div>
						{buttonLabel && (
							<Button
								label={buttonLabel}
								tabIndex={isInCurrentPanel ? 0 : -1}
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

export default CarouselItem;
