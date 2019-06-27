/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Welcome Mat Tile design pattern](https://lightningdesignsystem.com/components/welcome-mat/) in React.
// Based on SLDS v2.4.0
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import Icon from '../icon';

import { WELCOME_MAT_TILE } from '../../utilities/constants';

const displayName = WELCOME_MAT_TILE;

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
	 * Title for the tile component.
	 */
	title: PropTypes.string,
	/**
	 * Description for the tile component.
	 */
	description: PropTypes.string,
	/**
	 * Href for the tile link
	 */
	href: PropTypes.string,
	/**
	 * Icon for the tile
	 */
	icon: PropTypes.string,
	/**
	 * Whether the tile is completed
	 */
	isComplete: PropTypes.bool,
	/**
	 * Variant of the Welcome Mat Tile
	 */
	variant: PropTypes.oneOf([
		'steps',
		'info-only',
		'splash',
		'trailhead-connected',
	]),
};

const defaultProps = {
	isComplete: false,
	variant: 'steps',
};

/**
 * Tile component item represents a tile in a Welcome Mat
 */
class Tile extends React.Component {
	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the Welcome Mat Tile's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		const body = (
			<React.Fragment>
				<div
					className={classNames(
						'slds-media__figure',
						'slds-media__figure_fixed-width',
						'slds-align_absolute-center'
					)}
				>
					<div className="slds-welcome-mat__tile-figure">
						<div className="slds-welcome-mat__tile-icon-container">
							<Icon category="utility" name={this.props.icon} />
							{this.props.isComplete && this.props.variant !== 'info-only' ? (
								<Icon category="action" name="check" />
							) : null}
						</div>
					</div>
				</div>
				<div className="slds-media__body">
					<div className="slds-welcome-mat__tile-body">
						<h3 className="slds-welcome-mat__tile-title">{this.props.title}</h3>
						<p className="slds-welcome-mat__tile-description">
							{this.props.description}
						</p>
					</div>
				</div>
			</React.Fragment>
		);

		return (
			<div
				id={this.getId()}
				className={classNames(
					'slds-welcome-mat__tile',
					this.props.variant === 'info-only'
						? 'slds-welcome-mat__tile_info-only'
						: null,
					this.props.isComplete && this.props.variant !== 'info-only'
						? 'slds-welcome-mat__tile_complete'
						: null,
					this.props.className
				)}
			>
				{this.props.variant === 'info-only' ? (
					<div className="slds-media">{body}</div>
				) : (
					<a
						href={this.props.href}
						className="slds-box slds-box_link slds-media"
					>
						{body}
					</a>
				)}
			</div>
		);
	}
}

Tile.displayName = displayName;
Tile.propTypes = propTypes;
Tile.defaultProps = defaultProps;

export default Tile;
