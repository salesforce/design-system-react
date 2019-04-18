/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classnames from 'classnames';

import { CAROUSEL_INDICATORS } from '../../../utilities/constants';

/**
 * CarouselIndicators is used to display the list of indicators associated to the number of panels
 * a carousel has
 */
class CarouselIndicators extends React.Component {
	onFocus = () => {
		this[`indicator${this.props.currentIndex}`].focus();
	};

	render() {
		const { props } = this;

		return (
			<ul
				className="slds-carousel__indicators slds-col slds-text-align_center"
				role="tablist"
			>
				{[...Array(props.noOfIndicators).keys()].map((key) => {
					const index = key + 1;
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

					if (props.items && props.items.length > 0) {
						const startItemIndex = (index - 1) * props.itemsPerPanel;
						let autoIndicatorText = '';

						for (
							let i = startItemIndex;
							i < startItemIndex + props.itemsPerPanel;
							i++
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

					if (isSelectedPanel && this[`indicator${index}`]) {
						this[`indicator${index}`].focus();
					}

					return (
						<li
							className="slds-carousel__indicator slds-m-horizontal_xx-small"
							key={index}
							role="presentation"
							style={{ margin: 0, padding: '0 8px' }}
						>
							<a
								ref={(component) => {
									this[`indicator${index}`] = component;
								}}
								id={`indicator-id-${index}`}
								className={indicatorActionClassName}
								role="tab"
								tabIndex={isSelectedPanel ? '0' : '-1'}
								aria-selected={isSelectedPanel}
								aria-controls={`panel-${index}`}
								title={title}
								onClick={() => props.onClick(index)}
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

CarouselIndicators.displayName = CAROUSEL_INDICATORS;

CarouselIndicators.defaultProps = {
	currentIndex: 0,
};

// ### Prop Types
CarouselIndicators.propTypes = {
	/**
	 * CSS classes that are applied to the component
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Selected indicator
	 */
	currentIndex: PropTypes.number,
	/**
	 * Array of objects with shape, needed for building a carousel items
	 */
	items: PropTypes.array,
	/**
	 * Number of items to be displayed at a time in the carousel
	 */
	itemsPerPanel: PropTypes.number,
	/**
	 * Number of indicators to be displayed (corresponds to the number of panels in the carousel)
	 */
	noOfIndicators: PropTypes.number.isRequired,
	/**
	 * Triggered when the indicator is clicked.
	 */
	onClick: PropTypes.func,
};

export default CarouselIndicators;
