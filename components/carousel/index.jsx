/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Carousel Component

// Implements the [Carousel design pattern](https://www.lightningdesignsystem.com/components/carousel/) in React.

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ### Event Helpers
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './docs.json';

import { CAROUSEL } from '../../utilities/constants';

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
class Carousel extends React.Component {
	constructor() {
		super(...arguments);

		this.generatedId = shortid.generate();
	}

	componentDidMount() {
		checkProps(CAROUSEL, this.props, componentDoc);
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		return (
			<div className="slds-carousel" id={this.getId()}>
				<div className="slds-carousel__stage">
					<span className="slds-carousel__autoplay">
						<button className="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-pressed="false" title="Stop auto-play">
							{/*<svg className="slds-button__icon" aria-hidden="true">
								<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#pause"></use>
							</svg>*/}
							<span className="slds-assistive-text">Stop auto-play</span>
						</button>
					</span>
					<div className="slds-carousel__panels" style={{ transform: 'translateX(0%)' }}>
						<div id="content-id-01" className="slds-carousel__panel" role="tabpanel" aria-hidden="false" aria-labelledby="indicator-id-01">
							<a href="javascript:void(0);" className="slds-carousel__panel-action slds-text-link_reset" tabIndex="0">
								<div className="slds-carousel__image">
									<img src="/assets/images/carousel/carousel-01.jpg" alt="Visit App Exchange" />
								</div>
								<div className="slds-carousel__content">
									<h2 className="slds-carousel__content-title">Visit App Exchange</h2>
									<p>Extend Salesforce with the #1 business marketplace.</p>
								</div>
							</a>
						</div>
						<div id="content-id-02" className="slds-carousel__panel" role="tabpanel" aria-hidden="true" aria-labelledby="indicator-id-02">
							<a href="javascript:void(0);" className="slds-carousel__panel-action slds-text-link_reset" tabIndex="-1">
								<div className="slds-carousel__image">
									<img src="/assets/images/carousel/carousel-02.jpg" alt="Click to Customize"/>
								</div>
								<div className="slds-carousel__content">
									<h2 className="slds-carousel__content-title">Click to Customize</h2>
									<p>Use the Object Manager to add fields, build layouts, and more.</p>
								</div>
							</a>
						</div>
						<div id="content-id-03" className="slds-carousel__panel" role="tabpanel" aria-hidden="true" aria-labelledby="indicator-id-03">
							<a href="javascript:void(0);" className="slds-carousel__panel-action slds-text-link_reset" tabIndex="-1">
								<div className="slds-carousel__image">
									<img src="/assets/images/carousel/carousel-03.jpg" alt="Download SalesforceA"/>
								</div>
								<div className="slds-carousel__content">
									<h2 className="slds-carousel__content-title">Download SalesforceA</h2>
									<p>Get the mobile app that's just for Salesforce admins.</p>
								</div>
							</a>
						</div>
					</div>
					<ul className="slds-carousel__indicators" role="tablist">
						<li className="slds-carousel__indicator" role="presentation">
							<a id="indicator-id-01" className="slds-carousel__indicator-action slds-is-active" href="javascript:void(0);" role="tab" tabIndex="0" aria-selected="true" aria-controls="content-id-01" title="Visit App Exchange tab">
								<span className="slds-assistive-text">Visit App Exchange tab</span>
							</a>
						</li>
						<li className="slds-carousel__indicator" role="presentation">
							<a id="indicator-id-02" className="slds-carousel__indicator-action" href="javascript:void(0);" role="tab" tabIndex="-1" aria-selected="false" aria-controls="content-id-02" title="Click to Customize tab">
								<span className="slds-assistive-text">Click to Customize tab</span>
							</a>
						</li>
						<li className="slds-carousel__indicator" role="presentation">
							<a id="indicator-id-03" className="slds-carousel__indicator-action" href="javascript:void(0);" role="tab" tabIndex="-1" aria-selected="false" aria-controls="content-id-03" title="Download SalesforceA tab">
								<span className="slds-assistive-text">Download SalesforceA tab</span>
							</a>
						</li>
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
	// Stub
};

export default Carousel;
