/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	/**
	 * The media figure for this tile. It can be an icon, avatar or a task.
	 */
	mediaFigure: PropTypes.node.isRequired,
};

/**
 * The media figure for the Tile component.
 */
const TileMediaFigure = ({ mediaFigure }) => (
	<div className="slds-media__figure">{mediaFigure}</div>
);

export default TileMediaFigure;

TileMediaFigure.propTypes = propTypes;
