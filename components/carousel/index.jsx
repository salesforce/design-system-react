/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Carousel Component

// Implements the [Carousel design pattern](https://www.lightningdesignsystem.com/components/carousel/) in React.

import React from 'react';
import PropTypes from 'prop-types';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// import classNames from 'classnames';

import '../../styles/carousel/carousel.css';

// ### Event Helpers - TBD
// import KEYS from '../../utilities/key-code';
// import EventUtil from '../../utilities/event';

// This component's `checkProps` which issues warnings to developers about properties when in
// development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './docs.json';

import { CAROUSEL } from '../../utilities/constants';

import CarouselIndicators from './private/carousel-indicators';
import CarouselNavigator from './private/carousel-navigator';

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
class Carousel extends React.Component {
	constructor(props) {
		super(props);

		const { items, itemsPerPanel } = this.props;

		this.generatedId = shortid.generate();
		// this will be removed
		this.itemWidth = 288;
		this.stageWidth = this.itemWidth * itemsPerPanel;
		this.nrOfPanels = Math.ceil(items.length / itemsPerPanel);

		this.state = {
			translateX: -1000000,
			currentPanel: 1,
		};
	}

	componentDidMount() {
		checkProps(CAROUSEL, this.props, componentDoc);
		this.setTranslationAmount(0);
	}

	onNextPanelHandler = () => {
		const next = this.canNotGoToNext() ? 1 : this.state.currentPanel + 1;
		this.setCurrentPanel(next, this.changeTranslationAutomatically);
	};

	onPreviousPanelHandler = () => {
		const prev = this.canNotGoToPrevious()
			? this.nrOfPanels
			: this.state.currentPanel - 1;
		this.setCurrentPanel(prev, this.changeTranslationAutomatically);
	};

	onIndicatorClickHandler = (panel) => {
		this.setCurrentPanel(panel, this.changeTranslationAutomatically);
	};

	setTranslationAmount = (amount, cb) => {
		this.setState(() => ({ translateX: amount }), cb);
	};

	setCurrentPanel = (amount, cb) => {
		this.setState(() => ({ currentPanel: amount }), cb);
	};

	changeTranslationAutomatically = () => {
		this.setTranslationAmount(
			-(this.stageWidth * (this.state.currentPanel - 1))
		);
	};

	canNotGoToNext = () => this.state.currentPanel >= this.nrOfPanels;

	canNotGoToPrevious = () => this.state.currentPanel <= 1;

	render() {
		const { showAutoplay, showNavigation, infinite } = this.props;
		const id = this.props.id || this.generatedId;
		const isPreviousBtnDisabled = !infinite && this.canNotGoToPrevious();
		const isNextBtnDisabled = !infinite && this.canNotGoToNext();

		return (
			<div className="slds-carousel" id={id}>
				<div className="slds-grid_vertical slds-col slds-path__scroller">
					{showAutoplay && (
						<span className="slds-carousel__autoplay">
							<button
								className="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
								aria-pressed="false"
								title="Stop auto-play"
							>
								<svg className="slds-button__icon" aria-hidden="true">
									<use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#pause" />
								</svg>
								<span className="slds-assistive-text">Stop auto-play</span>
							</button>
						</span>
					)}
					<div className="slds-grid  slds-grid_vertical-align-center">
						{showNavigation && (
							<CarouselNavigator
								orientation="left"
								isDisabled={isPreviousBtnDisabled}
								onClick={this.onPreviousPanelHandler}
							/>
						)}
						<div
							className="slds-carousel__stage slds-carousel__col-center"
							style={{ width: this.stageWidth }}
						>
							<div
								className="slds-carousel__panels slds-is-relative"
								style={{ transform: `translateX(${this.state.translateX}px)` }}
							>
								{this.props.items}
							</div>
						</div>
						{showNavigation && (
							<CarouselNavigator
								orientation="right"
								isDisabled={isNextBtnDisabled}
								onClick={this.onNextPanelHandler}
							/>
						)}
					</div>
					<CarouselIndicators
						className={this.props.indicatorStyles}
						noOfIndicators={this.nrOfPanels}
						currentIndex={this.state.currentPanel}
						onClick={this.onIndicatorClickHandler}
					/>
				</div>
			</div>
		);
	}
}

Carousel.displayName = CAROUSEL;

Carousel.propTypes = {
	/**
	 * Content to be injected inside the carousel
	 */
	items: PropTypes.array.isRequired,
	/**
	 * Number of items to be displayed at a time in the carousel
	 */
	itemsPerPanel: PropTypes.number,
	/**
	 * Boolean showing whether the autoplay feature is available or not
	 */
	showAutoplay: PropTypes.bool,
	/**
	 * Interval for the autoplay iteration
	 */
	autoplayInterval: PropTypes.number,
	/**
	 * Boolean for displaying the navigation indicators left/right arrows) of the carousel
	 */
	showNavigation: PropTypes.bool,
	/**
	 * Boolean
	 */
	infinite: PropTypes.bool,
	/**
	 * CSS classes that are applied to the component
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * CSS classes that are applied to carousel indicators
	 */
	indicatorStyles: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Id of component, if desired. If not provided an id is automatically generated
	 */
	id: PropTypes.string,
};

Carousel.defaultProps = {
	itemsPerPanel: 3,
	showAutoplay: false,
	showNavigation: true,
	infinite: false,
};

export default Carousel;
