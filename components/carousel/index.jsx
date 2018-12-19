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

// ### Event Helpers
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './docs.json';

import { CAROUSEL } from '../../utilities/constants';

import CarouselItem from './item';

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
class Carousel extends React.Component {
	constructor() {
		// eslint-disable-next-line prefer-rest-params
		super(...arguments);

		this.generatedId = shortid.generate();
		this.itemWidth = 288;
		this.stageWidth = this.itemWidth * this.props.itemsPerPanel;
		this.nrOfPanels = Math.ceil(
			this.props.items.length / this.props.itemsPerPanel
		);
		this.state = {
			translateX: -1000000,
			currentPanel: 1,
		};
	}

	componentDidMount() {
		checkProps(CAROUSEL, this.props, componentDoc);
		this.setTransalationAmount(0);
	}

	onNextPanelHandler = () => {
		const next = this.canNotGoToNext() ? 1 : this.state.currentPanel + 1;
		this.setCurrentPanel(next, () => {
			this.changeTranslationAutomatically();
		});
	};

	onPreviousPanelHandler = () => {
		const prev = this.canNotGoToPrevious()
			? this.nrOfPanels
			: this.state.currentPanel - 1;
		this.setCurrentPanel(prev, () => {
			this.changeTranslationAutomatically();
		});
	};

	onIndicatorClickHandler = (panel) => {
		this.setCurrentPanel(panel, () => {
			this.changeTranslationAutomatically();
		});
	};

	setTransalationAmount = (amount, cb) => {
		this.setState(() => ({ translateX: amount }), cb);
	};

	setCurrentPanel = (amount, cb) => {
		this.setState(() => ({ currentPanel: amount }), cb);
	};

	getId() {
		return this.props.id || this.generatedId;
	}

	changeTranslationAutomatically = () => {
		this.setTransalationAmount(
			-(this.stageWidth * (this.state.currentPanel - 1))
		);
	};

	canNotGoToNext = () => this.state.currentPanel >= this.nrOfPanels;

	canNotGoToPrevious = () => this.state.currentPanel <= 1;

	showIndicators = () => {
		const indicators = [];
		for (let ind = 1; ind <= this.nrOfPanels; ind++)
			indicators.push(
				<li
					className="slds-carousel__indicator slds-m-horizontal_xx-small"
					role="presentation"
					key={ind}
				>
					<a
						id={`indicator-id-${ind}`}
						className={
							ind === this.state.currentPanel
								? 'slds-carousel__indicator-action slds-is-active'
								: 'slds-carousel__indicator-action'
						}
						href="javascript:void(0);"
						role="tab"
						tabIndex="0"
						aria-selected={ind === this.state.currentPanel ? 'true' : null}
						aria-controls={`panel-${ind}`}
						title="Visit App Exchange tab"
						onClick={() => {
							this.onIndicatorClickHandler(ind);
						}}
					>
						<span className="slds-assistive-text">Panel {ind}</span>
					</a>
				</li>
			);
		return indicators;
	};

	render() {
		return (
			<div className="slds-carousel" id={this.getId()}>
				<div className="slds-grid_vertical slds-col slds-path__scroller">
					{this.props.showAutoplay ? (
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
					) : null}

					<div className="slds-grid  slds-grid_vertical-align-center">
						{this.props.showNavigation ? (
							<div className="slds-carousel__col-center">
								<button
									className="slds-button slds-button_icon slds-carousel__button slds-button_icon-border-filled slds-button_icon-x-small"
									disabled={!this.props.infinite && this.canNotGoToPrevious()}
									onClick={this.onPreviousPanelHandler}
								>
									<svg
										className="slds-icon slds-icon-text-default"
										aria-hidden="true"
										style={{ width: '60%', height: '100%' }}
									>
										<use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#left" />
									</svg>
								</button>
							</div>
						) : null}
						<div
							className="slds-carousel__stage slds-carousel__col-center"
							style={{ width: this.stageWidth }}
						>
							<div
								className="slds-carousel__panels slds-is-relative"
								style={{ transform: `translateX(${this.state.translateX}px)` }}
							>
								{this.props.items.map((item) => (
									<CarouselItem
										{...item}
										itemWidth={this.itemWidth}
										key={item.id}
									/>
								))}
							</div>
						</div>
						{this.props.showNavigation ? (
							<div className="slds-carousel__col-center">
								<button
									className="slds-button slds-button_icon slds-carousel__button slds-button_icon-border-filled slds-button_icon-x-small"
									disabled={!this.props.infinite && this.canNotGoToNext()}
									onClick={this.onNextPanelHandler}
								>
									<svg
										className="slds-icon slds-icon-text-default"
										aria-hidden="true"
										style={{ width: '60%', height: '100%' }}
									>
										<use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#right" />
									</svg>
								</button>
							</div>
						) : null}
					</div>
					<ul
						className="slds-carousel__indicators slds-col slds-text-align_center"
						role="tablist"
					>
						{this.showIndicators()}
					</ul>
				</div>
			</div>
		);
	}
}

Carousel.displayName = CAROUSEL;

Carousel.propTypes = {
	/**
	 * Content to be injected inside inside the carousel, if any
	 */
	children: PropTypes.node,
	items: PropTypes.array.isRequired,
	itemsPerPanel: PropTypes.number,
	autoplay: PropTypes.bool,
	showAutoplay: PropTypes.bool,
	showNavigation: PropTypes.bool,
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
