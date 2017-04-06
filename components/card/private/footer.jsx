/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
// React is an external dependency of the project.
import React from 'react';

import { CARD_FOOTER } from '../../../utilities/constants';

const CardFooter = (props) => (
	<div className="slds-card__footer">
		{props.children}
	</div>
);

CardFooter.displayName = CARD_FOOTER;

CardFooter.propTypes = {
	/**
	 * Elements to place in the footer.
	 */
	children: React.PropTypes.node
};

export default CardFooter;
