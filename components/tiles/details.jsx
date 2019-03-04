/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	/**
	 * The content for the Tile component. _Tested with Mocha framework and snapshot testing._
	 */
	children: PropTypes.node.isRequired,
};

/**
 * The content for the Tile component.
 */
const TileDetails = ({ children }) => (
	<div className="slds-tile__detail">{children}</div>
);

export default TileDetails;

TileDetails.propTypes = propTypes;
