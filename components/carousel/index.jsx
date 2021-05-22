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
import AutoplayButton from './private/auto-play-button';

// ### Event Helpers
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

/* eslint-disable jsx-a11y/no-static-element-interactions */

// ### Default Props
const defaultProps = {
	assistiveText: {
		autoplayButton: 'Start / Stop auto-play',
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
		 * Dictates the currently active/visible carousel panel. Use with `onRequestPanelChange` for a controlled carousel component. If not provided, the carousel will manage this itself via state.
		 */
		currentPanel: PropTypes.number,
		/**
		 * Boolean showing whether the autoplay button is available or not
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
		 * Boolean that dictates whether autoplay is active or not. Use with `onRequestAutoplayToggle` for a controlled carousel component.
		 */
		isAutoplayOn: PropTypes.bool,
		/**
		 * Boolean for infinite loop navigation. Note: if not true autoplay will stop automatically at the last panel.
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
		 * * `href`: Used for item link, if not provided '#' is used instead
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
		 * Called whenever `isAutoplayOn` is requested to be toggled on or off. Use with `isAutoplayOn` prop for a controlled carousel component. Passes an event object and a data object with the current `isAutoplayOn` value as an attribute.
		 */
		onRequestAutoplayToggle: PropTypes.func,
		/**
		 * Called whenever the panel is requested to change due to user interaction or auto-play. Use with `currentPanel` for a controlled carousel component. Passes an event object and a data object with `currentPanel` and `requestedPanel` attributes.
		 */
		onRequestPanelChange: PropTypes.func,
		/**
		 * Handler for clicking on a carousel item
		 */
		onItemClick: PropTypes.func,
	};

	// ### Default Props
	static defaultProps = defaultProps;

	constructor(props) {
		super(props);

		this.nrOfPanels = Math.ceil(props.items.length / props.itemsPerPanel);
		this.stageItem = React.createRef();

		this.state = {
			currentPanel: props.currentPanel !== undefined ? props.currentPanel : 0,
			indicatorsHaveFocus: false,
			isAutoplayOn:
				props.isAutoplayOn !== undefined
					? props.isAutoplayOn
					: props.hasAutoplay,
			stageWidth: 0,
			translateX: -1000000,
		};

		this.generatedId = shortid.generate();
	}

	componentDidMount() {
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

		this.changeTranslationAutomatically();

		if (this.getIsAutoplayOn()) {
			this.startAutoplay({ mountAutoplayEvent: true });
		}
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.currentPanel !== undefined &&
			prevProps.currentPanel !== this.props.currentPanel
		) {
			this.changeTranslationAutomatically();
		}
		if (
			this.props.isAutoplayOn !== undefined &&
			prevProps.isAutoplayOn !== this.props.isAutoplayOn
		) {
			if (this.props.isAutoplayOn) {
				this.startAutoplay({ updateAutoplayEvent: true });
			} else {
				this.stopAutoplay({ updateAutoplayEvent: true }, true);
			}
		}
		if (
			prevProps.items.length !== this.props.items.length ||
			prevProps.itemsPerPanel !== this.props.itemsPerPanel
		) {
			this.nrOfPanels = Math.ceil(
				this.props.items.length / this.props.itemsPerPanel
			);
		}
	}

	componentWillUnmount() {
		if (canUseEventListeners) {
			window.removeEventListener('resize', this.setDimensions, false);
		}
		this.stopAutoplay({ unmountAutoplayEvent: true }, true);
	}

	onNextPanelHandler = (event) => {
		let next = this.getCurrentPanel() + 1;
		if (next > this.nrOfPanels - 1) {
			next = 0;
		}
		this.setCurrentPanel(event, next, this.changeTranslationAutomatically);
	};

	onPreviousPanelHandler = (event) => {
		let prev = this.getCurrentPanel() - 1;
		if (prev < 0) {
			prev = this.nrOfPanels - 1;
		}
		this.setCurrentPanel(event, prev, this.changeTranslationAutomatically);
	};

	onIndicatorBlur = () => {
		this.setState({ indicatorsHaveFocus: false });
	};

	onIndicatorClickHandler = (event, panel) => {
		this.setCurrentPanel(event, panel, this.changeTranslationAutomatically);
		this.setState({ indicatorsHaveFocus: true });
		if (this.getIsAutoplayOn()) {
			this.stopAutoplay(event);
		}
	};

	onIndicatorFocus = (event) => {
		this.setState({ indicatorsHaveFocus: true });
		if (this.getIsAutoplayOn()) {
			this.stopAutoplay(event);
		}
	};

	onAutoplayBtnClick = (event) => {
		const isAutoplayOn = this.getIsAutoplayOn();

		if (this.props.onRequestAutoplayToggle) {
			this.props.onRequestAutoplayToggle(event, { isAutoplayOn });
		} else {
			const actionToTake = isAutoplayOn
				? this.stopAutoplay
				: this.startAutoplay;

			this.setState({
				isAutoplayOn: !isAutoplayOn,
			});
			actionToTake(event);
		}
	};

	getPanelId = ({ carouselId, itemId }) => `content-id-${carouselId}-${itemId}`;

	getCurrentPanel() {
		return this.props.currentPanel !== undefined
			? this.props.currentPanel
			: this.state.currentPanel;
	}

	getIsAutoplayOn() {
		return this.props.isAutoplayOn !== undefined
			? this.props.isAutoplayOn
			: this.state.isAutoplayOn;
	}

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

	setCurrentPanel = (event, amount, cb) => {
		if (this.props.onRequestPanelChange) {
			this.props.onRequestPanelChange(event, {
				currentPanel: this.getCurrentPanel(),
				requestedPanel: amount,
			});
		} else {
			this.setState({ currentPanel: amount }, cb);
		}
	};

	startAutoplay = (event) => {
		this.autoplayId = setInterval(() => {
			if (this.canGoToNext()) {
				this.onNextPanelHandler(event);
			} else if (this.props.isInfinite) {
				this.setCurrentPanel(event, 0, this.changeTranslationAutomatically);
			} else {
				this.stopAutoplay(event);
			}
		}, this.props.autoplayInterval);
	};

	stopAutoplay = (event, ignoreCallbacksAndStateUpdates) => {
		if (this.autoplayId) {
			clearInterval(this.autoplayId);
		}

		if (!ignoreCallbacksAndStateUpdates) {
			if (this.props.onRequestAutoplayToggle) {
				this.props.onRequestAutoplayToggle(event, {
					isAutoplayOn: this.getIsAutoplayOn(),
				});
			} else {
				this.setState({ isAutoplayOn: false });
			}
		}
	};

	changeTranslationAutomatically = () => {
		this.setTranslationAmount(
			-((this.state.stageWidth || this.stageWidth) * this.getCurrentPanel())
		);
	};

	canGoToNext = () => this.getCurrentPanel() < this.nrOfPanels - 1;

	canGoToPrevious = () => this.getCurrentPanel() > 0;

	handleKeyDown = (event) => {
		const keyDownCallbacks = {
			[KEYS.LEFT]: () => {
				if (this.props.isInfinite || this.canGoToPrevious()) {
					this.onPreviousPanelHandler(event);
					this.setState({ indicatorsHaveFocus: true });
					if (this.getIsAutoplayOn()) {
						this.stopAutoplay(event);
					}
				}
			},
			[KEYS.RIGHT]: () => {
				if (this.props.isInfinite || this.canGoToNext()) {
					this.onNextPanelHandler(event);
					this.setState({ indicatorsHaveFocus: true });
					if (this.getIsAutoplayOn()) {
						this.stopAutoplay(event);
					}
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
		const currentPanel = this.getCurrentPanel();
		const id = this.props.id || this.generatedId;
		const isPreviousBtnDisabled = !(isInfinite || this.canGoToPrevious());
		const isNextBtnDisabled = !(isInfinite || this.canGoToNext());
		const itemWidth =
			(this.state.stageWidth || this.stageWidth) / this.props.itemsPerPanel;
		const carouselMargins = hasPreviousNextPanelNavigation
			? { marginLeft: '44px', marginRight: '44px' }
			: {};
		return (
			<div
				className={classnames('slds-carousel', this.props.className)}
				id={id}
				onKeyDown={this.handleKeyDown}
			>
				<div className="slds-grid_vertical slds-col slds-path__scroller">
					{hasAutoplay && (
						<AutoplayButton
							assistiveText={this.props.assistiveText.autoplayButton}
							isAutoplayOn={this.getIsAutoplayOn()}
							onClick={this.onAutoplayBtnClick}
						/>
					)}
					<div className="slds-is-relative" style={carouselMargins}>
						{hasPreviousNextPanelNavigation && (
							<PreviousNextCarouselNavigator
								assistiveText={this.props.assistiveText.previousPanel}
								iconName="chevronleft"
								isDisabled={isPreviousBtnDisabled}
								onClick={(event) => {
									if (this.getIsAutoplayOn()) {
										this.stopAutoplay(event);
									}
									this.onPreviousPanelHandler(event);
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
										carouselId={id}
										getPanelId={this.getPanelId}
										onClick={(event) => {
											this.props.onItemClick(event, { item });
										}}
										onFocus={(event) => {
											if (this.getIsAutoplayOn()) {
												this.stopAutoplay(event);
											}
										}}
										onRenderItem={this.props.onRenderItem}
										{...item}
										isInCurrentPanel={
											index >= currentPanel * this.props.itemsPerPanel &&
											index <
												currentPanel * this.props.itemsPerPanel +
													this.props.itemsPerPanel
										}
										itemWidth={itemWidth}
										key={item.id}
										panelIndex={
											Math.ceil((index + 1) / this.props.itemsPerPanel) - 1
										}
									/>
								))}
							</div>
						</div>
						{hasPreviousNextPanelNavigation && (
							<PreviousNextCarouselNavigator
								assistiveText={this.props.assistiveText.nextPanel}
								iconName="chevronright"
								isDisabled={isNextBtnDisabled}
								onClick={(event) => {
									if (this.getIsAutoplayOn()) {
										this.stopAutoplay(event);
									}
									this.onNextPanelHandler(event);
								}}
								inlineStyle={{ right: '-38px' }}
							/>
						)}
					</div>
					<CarouselIndicators
						noOfIndicators={this.nrOfPanels}
						carouselId={id}
						currentIndex={currentPanel}
						getPanelId={this.getPanelId}
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
