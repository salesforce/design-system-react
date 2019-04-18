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
import '../../styles/carousel/carousel.css';

import { CAROUSEL } from '../../utilities/constants';

import CarouselIndicators from './private/carousel-indicators';
import PreviousNextCarouselNavigator from './private/previous-next-carousel-navigator';
import CarouselItem from './private/carousel-item';
import AutoPlayButton from './private/auto-play-button';

// ### Event Helpers
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';
/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
class Carousel extends React.Component {
	constructor(props) {
		super(props);

		const { items, itemsPerPanel } = this.props;

		this.nrOfPanels = Math.ceil(items.length / itemsPerPanel);
		this.stageItem = React.createRef();

		this.state = {
			translateX: -1000000,
			currentPanel: 1,
			isAutoPlayOn: this.props.hasAutoplay,
			stageWidth: 0,
		};
	}

	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	componentDidMount() {
		this.setTranslationAmount(0);
		if (this.props.hasAutoplay) {
			this.startAutoplay();
		}
		this.stageWidth = this.stageItem.current.offsetWidth;
		window.addEventListener('resize', this.setDimensions, false);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setDimensions, false);
		this.stopAutoplay();
	}

	onNextPanelHandler = () => {
		const next = this.state.currentPanel % this.nrOfPanels + 1;
		this.setCurrentPanel(next, this.changeTranslationAutomatically);
	};

	onPreviousPanelHandler = () => {
		const prev =
			(this.state.currentPanel + this.nrOfPanels - 1) % this.nrOfPanels;
		this.setCurrentPanel(prev, this.changeTranslationAutomatically);
	};

	onIndicatorClickHandler = (panel) => {
		this.setCurrentPanel(panel, this.changeTranslationAutomatically);
	};

	onAutoPlayBtnClick = () => {
		const { isAutoPlayOn } = this.state;
		const actionToTake = isAutoPlayOn ? this.stopAutoplay : this.startAutoplay;

		this.setState({
			isAutoPlayOn: !isAutoPlayOn,
		});
		actionToTake();
	};

	setDimensions = () => {
		this.setState(
			{ stageWidth: this.stageItem.current.offsetWidth },
			this.changeTranslationAutomatically
		);
	};

	setTranslationAmount = (amount, cb) => {
		this.setState({ translateX: amount }, cb);
	};

	setCurrentPanel = (amount, cb) => {
		this.setState({ currentPanel: amount }, cb);
	};

	startAutoplay = () => {
		this.autoplayId = setInterval(() => {
			if (this.canGoToNext()) {
				this.onNextPanelHandler();
			} else {
				this.stopAutoplay();
			}
		}, this.props.autoplayInterval);
	};

	stopAutoplay = () => {
		if (this.autoplayId) {
			clearInterval(this.autoplayId);
		}
		this.setState({ isAutoPlayOn: false });
	};

	changeTranslationAutomatically = () => {
		this.setTranslationAmount(
			-(
				(this.state.stageWidth || this.stageWidth) *
				(this.state.currentPanel - 1)
			)
		);
	};

	canGoToNext = () => this.state.currentPanel < this.nrOfPanels;

	canGoToPrevious = () => this.state.currentPanel > 1;

	handleKeyDown = (event) => {
		const keyDownCallbacks = {
			[KEYS.LEFT]: () => {
				if (this.canGoToPrevious()) {
					this.onPreviousPanelHandler();
				}
			},
			[KEYS.RIGHT]: () => {
				if (this.canGoToNext()) {
					this.onNextPanelHandler();
				}
			},
		};

		if (keyDownCallbacks[event.keyCode]) {
			EventUtil.trapImmediate(event);
			keyDownCallbacks[event.keyCode](event.shiftKey ? 10 : 1);
		}
	};

	render() {
		const {
			hasAutoplay,
			hasPreviousNextPanelNavigation,
			isInfinite,
		} = this.props;
		const id = this.props.id || this.generatedId;
		const isPreviousBtnDisabled = !(isInfinite || this.canGoToPrevious());
		const isNextBtnDisabled = !(isInfinite || this.canGoToNext());
		const itemWidth =
			(this.state.stageWidth || this.stageWidth) / this.props.itemsPerPanel;

		return (
			<div className="slds-carousel" id={id} onKeyDown={this.handleKeyDown}>
				<div className="slds-grid_vertical slds-col slds-path__scroller">
					{hasAutoplay && (
						<AutoPlayButton
							isAutoPlayOn={this.state.isAutoPlayOn}
							onClick={this.onAutoPlayBtnClick}
						/>
					)}
					<div
						className="slds-is-relative"
						style={{ marginLeft: '60px', marginRight: '60px' }}
					>
						{hasPreviousNextPanelNavigation && (
							<PreviousNextCarouselNavigator
								iconPath="/assets/icons/utility-sprite/svg/symbols.svg#left"
								assistiveText={this.props.assistiveText.previousPanel}
								isDisabled={isPreviousBtnDisabled}
								onClick={this.onPreviousPanelHandler}
								inlineStyle={{ left: '-60px' }}
							/>
						)}
						<div
							ref={this.stageItem}
							className="slds-carousel__stage slds-show"
						>
							<div
								className="slds-carousel__panels slds-is-relative"
								style={{
									transform: `translateX(${this.state.translateX}px)`,
								}}
							>
								{this.props.items.map((item, index) => (
									<CarouselItem
										onClick={() => this.props.onItemClick(item)}
										onRenderItem={this.props.onRenderItem}
										{...item}
										isInCurrentPanel={(
											index >= ((this.state.currentPanel - 1) * this.props.itemsPerPanel) &&
											index < (((this.state.currentPanel - 1) * this.props.itemsPerPanel) + this.props.itemsPerPanel)
										)}
										itemWidth={itemWidth}
										key={item.id}
									/>
								))}
							</div>
						</div>
						{hasPreviousNextPanelNavigation && (
							<PreviousNextCarouselNavigator
								iconPath="/assets/icons/utility-sprite/svg/symbols.svg#right"
								assistiveText={this.props.assistiveText.nextPanel}
								isDisabled={isNextBtnDisabled}
								onClick={this.onNextPanelHandler}
								inlineStyle={{ right: '-60px' }}
							/>
						)}
					</div>
					<CarouselIndicators
						style={this.props.indicatorStyles}
						noOfIndicators={this.nrOfPanels}
						currentIndex={this.state.currentPanel}
						onClick={this.onIndicatorClickHandler}
						items={this.props.items}
						itemsPerPanel={this.props.itemsPerPanel}
					/>
				</div>
			</div>
		);
	}
}

Carousel.displayName = CAROUSEL;

Carousel.propTypes = {
	/**
	 * Description of the carousel items for screen-readers.
	 */
	assistiveText: PropTypes.object,
	/**
	 * Interval for the autoplay iteration
	 */
	autoplayInterval: PropTypes.number,
	/**
	 * CSS classes that are applied to the component
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Boolean showing whether the autoplay feature is available or not
	 */
	hasAutoplay: PropTypes.bool,
	/**
	 * Boolean for displaying the navigation indicators (left/right arrows) of the carousel
	 */
	hasPreviousNextPanelNavigation: PropTypes.bool,
	/**
	 * Id of component, if desired. If not provided an id is automatically generated
	 */
	id: PropTypes.string,
	/**
	 * CSS that is applied to carousel indicators
	 */
	indicatorStyles: PropTypes.object,
	/**
	 * Boolean for infinite loop navigation
	 */
	isInfinite: PropTypes.bool,
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
	 * Accepts a custom carousel item rendering function
	 */
	onRenderItem: PropTypes.func,
	/**
	 * Handler for clicking on a carousel item
	 */
	onItemClick: PropTypes.func,
};

Carousel.defaultProps = {
	assistiveText: {
		nextPanel: 'Next Panel',
		previousPanel: 'Previous Panel',
	},
	autoplayInterval: 4000,
	hasAutoplay: false,
	hasPreviousNextPanelNavigation: false,
	isInfinite: false,
	itemsPerPanel: 1,
};

export default Carousel;
