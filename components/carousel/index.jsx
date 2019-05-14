/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Carousel Component

// Implements the [Carousel design pattern](https://www.lightningdesignsystem.com/components/carousel/) in React.

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import { CAROUSEL } from '../../utilities/constants';

import {
	canUseDOM,
	canUseEventListeners,
} from '../../utilities/execution-environment';

import CarouselIndicators from './private/carousel-indicators';
import PreviousNextCarouselNavigator from './private/previous-next-carousel-navigator';
import CarouselItem from './private/carousel-item';
import AutoPlayButton from './private/auto-play-button';

// ### Event Helpers
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './docs.json';

/* eslint-disable jsx-a11y/no-static-element-interactions */

// ### Default Props
const defaultProps = {
	assistiveText: {
		autoPlayButton: 'Start / Stop auto-play',
		nextPanel: 'Next Panel',
		previousPanel: 'Previous Panel',
	},
	autoplayInterval: 4000,
	hasAutoplay: false,
	hasPreviousNextPanelNavigation: false,
	isInfinite: false,
	itemsPerPanel: 1,
};

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 * Currently panel index and auto play cannot be controlled by the app.
 */
class Carousel extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = CAROUSEL;

	// ### Prop Types
	static propTypes = {
		/**
		 * Description of the carousel items for screen-readers.
		 */
		assistiveText: PropTypes.object,
		/**
		 * Interval for the autoplay iteration
		 */
		autoplayInterval: PropTypes.number,
		/**
		 * CSS classes that are applied to the main 'slds-carousel' classed component container
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
		 * * **Array of item objects used by the default carousel item renderer.**
		 * Each object can contain:
		 * * `id`: The id of the carousel item. [REQUIRED]
		 * * `heading`: Primary string that will be used as the heading
		 * * `description`: Secondary string that is used to describe the item
		 * * `buttonLabel`: If assigned a call to button action will be rendered with this text, if unassigned no button is rendered
		 * * `imageAssistiveText`: Image alt text, if not present heading will be used instead
		 * * `href`: Used for item link, if not provided 'javascript:void(0);' is used instead
		 * * `src`: Item image src value
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

	// ### Default Props
	static defaultProps = defaultProps;

	constructor(props) {
		super(props);

		const { items, itemsPerPanel } = this.props;

		this.nrOfPanels = Math.ceil(items.length / itemsPerPanel);
		this.stageItem = React.createRef();

		this.state = {
			currentPanel: 1,
			indicatorsHaveFocus: false,
			isAutoPlayOn: this.props.hasAutoplay,
			stageWidth: 0,
			translateX: -1000000,
		};
	}

	componentWillMount() {
		this.generatedId = shortid.generate();
		checkProps(CAROUSEL, componentDoc);
	}

	componentDidMount() {
		this.setTranslationAmount(0);
		if (this.props.hasAutoplay) {
			this.startAutoplay();
		}
		if (
			canUseDOM &&
			this.stageItem !== undefined &&
			this.stageItem.current !== undefined &&
			this.stageItem.current.offsetWidth !== undefined
		) {
			this.stageWidth = this.stageItem.current.offsetWidth;
		}
		if (canUseEventListeners) {
			window.addEventListener('resize', this.setDimensions, false);
		}
	}

	componentWillUnmount() {
		if (canUseEventListeners) {
			window.removeEventListener('resize', this.setDimensions, false);
		}
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

	onIndicatorBlur = () => {
		this.setState({ indicatorsHaveFocus: false });
	};

	onIndicatorClickHandler = (panel) => {
		this.setCurrentPanel(panel, this.changeTranslationAutomatically);
		this.setState({ indicatorsHaveFocus: true });
		this.stopAutoplay();
	};

	onIndicatorFocus = () => {
		this.setState({ indicatorsHaveFocus: true });
		this.stopAutoplay();
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
		if (
			canUseDOM &&
			this.stageItem !== undefined &&
			this.stageItem.current !== undefined &&
			this.stageItem.current.offsetWidth !== undefined
		) {
			this.setState(
				{ stageWidth: this.stageItem.current.offsetWidth },
				this.changeTranslationAutomatically
			);
		}
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
				this.setCurrentPanel(1, this.changeTranslationAutomatically);
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
					this.setState({ indicatorsHaveFocus: true });
					this.stopAutoplay();
				}
			},
			[KEYS.RIGHT]: () => {
				if (this.canGoToNext()) {
					this.onNextPanelHandler();
					this.setState({ indicatorsHaveFocus: true });
					this.stopAutoplay();
				}
			},
		};

		if (keyDownCallbacks[event.keyCode]) {
			EventUtil.trapImmediate(event);
			keyDownCallbacks[event.keyCode]();
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
			<div
				className={classnames('slds-carousel', this.props.className)}
				id={id}
				onKeyDown={this.handleKeyDown}
			>
				<div className="slds-grid_vertical slds-col slds-path__scroller">
					{hasAutoplay && (
						<AutoPlayButton
							assistiveText={this.props.assistiveText.autoPlayButton}
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
								assistiveText={this.props.assistiveText.previousPanel}
								iconName="chevronleft"
								isDisabled={isPreviousBtnDisabled}
								onClick={() => {
									this.stopAutoplay();
									this.onPreviousPanelHandler();
								}}
								inlineStyle={{ left: '-38px' }}
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
										onClick={(event) => {
											this.props.onItemClick(event, { item });
										}}
										onFocus={() => {
											this.stopAutoplay();
										}}
										onRenderItem={this.props.onRenderItem}
										{...item}
										isInCurrentPanel={
											index >=
												(this.state.currentPanel - 1) *
													this.props.itemsPerPanel &&
											index <
												(this.state.currentPanel - 1) *
													this.props.itemsPerPanel +
													this.props.itemsPerPanel
										}
										itemWidth={itemWidth}
										key={item.id}
									/>
								))}
							</div>
						</div>
						{hasPreviousNextPanelNavigation && (
							<PreviousNextCarouselNavigator
								assistiveText={this.props.assistiveText.nextPanel}
								iconName="chevronright"
								isDisabled={isNextBtnDisabled}
								onClick={() => {
									this.stopAutoplay();
									this.onNextPanelHandler();
								}}
								inlineStyle={{ right: '-38px' }}
							/>
						)}
					</div>
					<CarouselIndicators
						style={this.props.indicatorStyles}
						noOfIndicators={this.nrOfPanels}
						currentIndex={this.state.currentPanel}
						hasFocus={this.state.indicatorsHaveFocus}
						onBlur={this.onIndicatorBlur}
						onClick={this.onIndicatorClickHandler}
						onFocus={this.onIndicatorFocus}
						items={this.props.items}
						itemsPerPanel={this.props.itemsPerPanel}
					/>
				</div>
			</div>
		);
	}
}

export default Carousel;
