/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React, { type FocusEvent, type MouseEvent } from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classnames from 'classnames';

import { CAROUSEL_INDICATORS } from '../../../utilities/constants';
import { type CarouselItemData } from '../index';

export interface CarouselIndicatorsProps {
	/**
	 * Carousel HTML ID
	 */
	carouselId?: string;
	/**
	 * CSS classes that are applied to the component
	 */
	className?: string | string[] | Record<string, boolean>;
	/**
	 * Selected indicator
	 */
	currentIndex?: number;
	/**
	 * Function to generate the panel HTML `id`.
	 */
	getPanelId?: (params: { carouselId: string; itemId: string }) => string;
	/**
	 * Passed from carousel parent state, dictates if indicator currently has focus
	 */
	hasFocus?: boolean;
	/**
	 * Array of objects with shape, needed for building a carousel items
	 */
	items?: CarouselItemData[];
	/**
	 * Number of items to be displayed at a time in the carousel
	 */
	itemsPerPanel?: number;
	/**
	 * Number of indicators to be displayed (corresponds to the number of panels in the carousel)
	 */
	noOfIndicators: number;
	/**
	 * Fires on indicator blur, allows parent carousel to adjust indicatorsHaveFocus state accordingly
	 */
	onBlur?: () => void;
	/**
	 * Triggered when the indicator is clicked.
	 */
	onClick?: (event: MouseEvent, panel: number) => void;
	/**
	 * Fires on indicator focus, allows parent carousel to adjust indicatorsHaveFocus state accordingly
	 */
	onFocus?: (event: FocusEvent) => void;
}

/**
 * CarouselIndicators is used to display the list of indicators associated to the number of panels
 * a carousel has
 */
class CarouselIndicators extends React.Component<CarouselIndicatorsProps> {
	static displayName = CAROUSEL_INDICATORS;

	static defaultProps: Partial<CarouselIndicatorsProps> = {
		currentIndex: 0,
	};

	indicators: Array<HTMLAnchorElement | null> = [];

	componentDidUpdate() {
		if (this.props.hasFocus && this.indicators[this.props.currentIndex ?? 0]) {
			this.indicators[this.props.currentIndex ?? 0]?.focus();
		}
	}

	onFocus = (event: FocusEvent) => {
		this.indicators[this.props.currentIndex ?? 0]?.focus();
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	};

	render() {
		const { props } = this;

		return (
			<ul
				className="slds-carousel__indicators slds-col slds-text-align_center"
				role="tablist"
			>
				{[...Array(props.noOfIndicators).keys()].map((index) => {
					const isSelectedPanel = index === props.currentIndex;
					const indicatorActionClassName = classnames(
						'slds-carousel__indicator-action',
						props.className,
						{
							'slds-is-active': isSelectedPanel,
						}
					);
					let assistiveText = `${index}`;
					let title = `${index}`;
					let id = '';

					if (props.items && props.items.length > 0) {
						// eslint-disable-next-line prefer-destructuring
						id = props.items[index].id;

						const startItemIndex = index * (props.itemsPerPanel ?? 0);
						let autoIndicatorText = '';

						for (
							let i = startItemIndex;
							i < startItemIndex + (props.itemsPerPanel ?? 0);
							i += 1
						) {
							if (props.items[i] && props.items[i].heading) {
								autoIndicatorText = !autoIndicatorText
									? ''
									: `${autoIndicatorText}, `;
								autoIndicatorText += props.items[i].heading;
							}
						}

						if (autoIndicatorText) {
							assistiveText = autoIndicatorText;
							title = autoIndicatorText;
						}
					}

					return (
						<li
							className="slds-carousel__indicator slds-m-horizontal_xx-small"
							key={index}
							role="presentation"
							style={{ margin: 0, padding: '0 5px' }}
						>
							<a
								ref={(component) => {
									this.indicators[index] = component;
								}}
								id={`indicator-id-${props.carouselId}-${index}`}
								className={indicatorActionClassName}
								role="tab"
								tabIndex={isSelectedPanel ? 0 : -1}
								aria-selected={isSelectedPanel}
								aria-controls={props.getPanelId?.({
									carouselId: props.carouselId,
									itemId: id,
								} as { carouselId: string; itemId: string })}
								title={title}
								onBlur={props.onBlur}
								onClick={(event) => props.onClick?.(event, index)}
								onFocus={this.onFocus}
							>
								<span className="slds-assistive-text">{assistiveText}</span>
							</a>
						</li>
					);
				})}
			</ul>
		);
	}
}

export default CarouselIndicators;
