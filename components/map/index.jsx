/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Map design pattern](https://lightningdesignsystem.com/components/map/) in React.
// Based on SLDS v2.4.0
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import Icon from '../icon';
import Modal from '../modal';
import { MAP } from '../../utilities/constants';

const displayName = MAP;

const propTypes = {
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * Whether the modal containing the map is open. Only for `modal` variant
	 */
	isModalOpen: PropTypes.bool,
	/**
	 * Title for the Map component.
	 */
	title: PropTypes.string,
	/**
	 * Accepts Map locations as an array of Objects
	 */
	locations: PropTypes.arrayOf(PropTypes.object),
	/**
	 * Accepts a Google Map API Key that will be used for showing the map
	 */
	googleAPIKey: PropTypes.string.isRequired,
	/**
	 * Accepts a node that will be shown at the footer of the modal containing the map. Only for `modal` variant
	 */
	modalFooter: PropTypes.node,
	/**
	 * Selects the variant of Map component
	 */
	variant: PropTypes.oneOf(['standalone', 'modal']),
};

const defaultProps = {
	isModalOpen: true,
	variant: 'standalone',
};

/**
 * A map component is used to find a location
 */
class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 0,
		};
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the Map's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		const mapContainer = (
			<div
				id={this.getId()}
				className={classNames(
					`slds-grid`,
					`slds-has-coordinates`,
					this.props.className
				)}
			>
				<div className="slds-map_container">
					<div className="slds-map">
						<iframe
							id={`${this.getId()}-google-map`}
							title="Google Maps iframe"
							src={`https://www.google.com/maps/embed/v1/place?key=${
								this.props.googleAPIKey
							}&q=${encodeURIComponent(
								this.props.locations[this.state.selected].address
							)}`}
						/>
					</div>
				</div>
				<div className="slds-coordinates">
					<div className="slds-coordinates__header">
						<h2 className="slds-coordinates__title">{`${this.props.title} (${
							this.props.locations.length
						})`}</h2>
					</div>
					<ul className="slds-coordinates__list">
						{this.props.locations.map((location, i) => (
							<li className="slds-coordinates__item">
								<span className="slds-assistive-text" aria-live="polite" />
								<button
									type="button"
									onClick={() => this.setState({ selected: i })}
									className="slds-coordinates__item-action slds-button_reset slds-media"
									aria-pressed={this.state.selected === i}
								>
									<span className="slds-media__figure">
										<Icon category="standard" name="account" />
									</span>
									<span className="slds-media__body">
										<span className="slds-text-link">{location.name}</span>
										<span>{location.address}</span>
									</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		);

		return this.props.variant === 'standalone' ? (
			mapContainer
		) : (
			<Modal
				isOpen={this.props.isModalOpen}
				size="medium"
				title={`${this.props.title} (${this.props.locations.length})`}
				footer={this.props.modalFooter}
			>
				{mapContainer}
			</Modal>
		);
	}
}

Map.displayName = displayName;
Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
