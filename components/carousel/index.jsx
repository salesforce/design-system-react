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
		const {
			hasAutoplay,
			hasPreviousNextPanelNavigation,
			isInfinite,
		} = this.props;
		const id = this.props.id || this.generatedId;
		const isPreviousBtnDisabled = !isInfinite && this.canNotGoToPrevious();
		const isNextBtnDisabled = !isInfinite && this.canNotGoToNext();

		return (
			<div className="slds-carousel" id={id}>
				<div className="slds-grid_vertical slds-col slds-path__scroller">
					{hasAutoplay && (
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
						{hasPreviousNextPanelNavigation && (
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
						{hasPreviousNextPanelNavigation && (
							<CarouselNavigator
								orientation="right"
								isDisabled={isNextBtnDisabled}
								onClick={this.onNextPanelHandler}
							/>
						)}
					</div>
					<CarouselIndicators
						className={{ display: 'none' }}
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
	 * Array of objects with shape, needed for building a carousel item.
	 * A shape would have:
	 *   - id: 0   [REQUIRED]
	 *   - heading: "All my things! Part 0" // (Visible heading for default render)
	 *   - description: "Card 0 description."
	 *          // (Visible paragraph text for default render and navigation bullet text used in
	 *              assistive text tag)   [REQUIRED]
	 *   - imageAssistiveText: "First card accessible description."
	 *          // (image alt text, OPTIONAL, required if `src` is present),
	 *   - href: "https://www.salesforce.com" // (OPTIONAL, void(0) if not provided for default template
	 *   - src: "/images/examples/carousel-01.png"
	 */
	items: PropTypes.array.isRequired,
	/**
	 * Number of items to be displayed at a time in the carousel
	 */
	itemsPerPanel: PropTypes.number,
	/**
	 * Boolean showing whether the autoplay feature is available or not
	 */
	hasAutoplay: PropTypes.bool,
	/**
	 * Interval for the autoplay iteration
	 */
	autoplayInterval: PropTypes.number,
	/**
	 * Boolean for displaying the navigation indicators (left/right arrows) of the carousel
	 */
	hasPreviousNextPanelNavigation: PropTypes.bool,
	/**
	 * Boolean for infinite loop navigation
	 */
	isInfinite: PropTypes.bool,
	/**
	 * CSS classes that are applied to the component
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * CSS that is applied to carousel indicators
	 */
	indicatorStyles: PropTypes.object,
	/**
	 * Id of component, if desired. If not provided an id is automatically generated
	 */
	id: PropTypes.string,
	/**
	 * Accepts a custom carousel item rendering function
	 */
	onRenderItem: PropTypes.func,
	/**
	 * Description of the menu for screenreaders.
	 */
	assistiveText: PropTypes.object,
};

Carousel.defaultProps = {
	itemsPerPanel: 1,
	hasAutoplay: false,
	hasPreviousNextPanelNavigation: false,
	isInfinite: false,
	assistiveText: {
		nextPanel: 'Next Panel',
		previousPanel: 'Previous Panel',
	},
};

export default Carousel;
