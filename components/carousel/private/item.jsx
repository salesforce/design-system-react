/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # CarouselItem Component

// Implements the [CarouselItem design pattern](https://www.lightningdesignsystem.com/components/carousel/) in React.

import React from 'react';
import PropTypes from 'prop-types';

import '../../../styles/carousel/carousel.css';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './../check-props';
import componentDoc from './../docs.json';

import { CAROUSEL_ITEM } from '../../../utilities/constants';
import Button from './../../button';

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
class CarouselItem extends React.Component {
	// eslint-disable-next-line no-useless-constructor
	constructor() {
		// eslint-disable-next-line prefer-rest-params
		super(...arguments);
	}

	componentDidMount() {
		checkProps(CAROUSEL_ITEM, this.props, componentDoc);
	}

	render() {
		return (
			<div
				id={`content-id-${this.props.id}`}
				className="slds-carousel__panel slds-m-horizontal_xx-small"
				role="tabpanel"
				aria-hidden="false"
				aria-labelledby={`indicator-id-${this.props.id}`}
				style={{ maxWidth: `${this.props.itemWidth - 8}px` }}
			>
				<a
					href="javascript:void(0);"
					className="slds-carousel__panel-action slds-text-link_reset"
					tabIndex="0"
				>
					<div className="slds-carousel__image">
						<img src={this.props.image} alt="Visit App Exchange" />
					</div>
					<div className="slds-carousel__content">
						<h2 className="slds-carousel__content-title">{this.props.title}</h2>
						<p className="slds-p-bottom_x-small slds-text-body_small">
							{this.props.description}
						</p>
						{this.props.buttonText &&
							<Button
								label={this.props.buttonText}
								className="slds-button_outline-brand"
							/>
						}
					</div>
				</a>
			</div>
		);
	}
}

CarouselItem.displayName = CAROUSEL_ITEM;

CarouselItem.propTypes = {
	/**
	 * Content to be injected inside inside the carousel, if any
	 */
	children: PropTypes.node,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	buttonText: PropTypes.string,
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
	 * Id of component, if desired. If not provided an id is automatically generated
	 */
	id: PropTypes.number,
};

CarouselItem.defaultProps = {
	// Stud
	itemWidth: 258,
};

export default CarouselItem;
