/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	/**
	 * HTML title attribute. _Tested with snapshot testing._
	 */
	title: PropTypes.string.isRequired,
	/**
	 * The children for the TileMediaBody component. _Tested with Mocha framework and snapshot testing._
	 */
	children: PropTypes.node.isRequired,
};

/**
 * The media body for the Tile component.
 */
const TileMediaBody = ({ title, children }) => (
	<div className="slds-media__body">
		<h3 className="slds-tile__title slds-truncate" title={title}>
			{title}
		</h3>
		{children}
	</div>
);

export default TileMediaBody;

TileMediaBody.propTypes = propTypes;
