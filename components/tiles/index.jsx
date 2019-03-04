/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tiles Component

// Implements the [Tiles design pattern](https://www.lightningdesignsystem.com/components/tiles/) in React.

import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utilities/class-names';

const propTypes = {
	/**
	 * HTML title attribute. _Tested with snapshot testing._
	 */
	title: PropTypes.string,
	/**
	 * Action overflow menu dropdown for the tile.
	 */
	dropdownButton: PropTypes.node,
	/**
	 * Different types of tile formats.
	 */
	variant: PropTypes.oneOf(['media', 'board']),
	/**
	 * The content for the Tile component.
	 */
	children: PropTypes.node.isRequired,
};

class Tiles extends React.Component {
	render() {
		return (
			<article
				className={classNames(
					'slds-tile',
					{ 'slds-hint-parent': this.props.dropdownButton },
					{ 'slds-media': this.props.variant === 'media' },
					{ 'slds-tile_board': this.props.variant === 'board' }
				)}
			>
				{this.props.dropdownButton && this.props.variant !== 'media' ? (
					<div className="slds-grid slds-grid_align-spread slds-has-flexi-truncate">
						<h3
							className="slds-tile__title slds-truncate"
							title={this.props.title}
						>
							{this.props.title}
						</h3>
						<div className="slds-shrink-none">{this.props.dropdownButton}</div>
					</div>
				) : (
					<h3
						className="slds-tile__title slds-truncate"
						title={this.props.title}
					>
						{this.props.title}
					</h3>
				)}
				{this.props.children}
			</article>
		);
	}
}

Tiles.propTypes = propTypes;

export default Tiles;
