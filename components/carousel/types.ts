/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { FocusEvent, MouseEvent, ReactNode } from 'react';

import type { CarouselRenderItemData } from './index';

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
