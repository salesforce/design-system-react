/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import { CARD_FOOTER } from '../../../utilities/constants';

const CardFooter = (props) => (
	<div className="slds-card__footer">{props.children}</div>
);

CardFooter.displayName = CARD_FOOTER;

CardFooter.propTypes = {
	/**
	 * Elements to place in the footer.
	 */
	children: PropTypes.node,
};

export default CardFooter;
