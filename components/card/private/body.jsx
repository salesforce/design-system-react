/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally joining classNames together."
import classNames from 'classnames';

import { CARD_BODY } from '../../../utilities/constants';

const CardBody = (props) => (
	<div className={classNames('slds-card__body', props.className)} id={props.id}>
		{props.children}
	</div>
);

CardBody.displayName = CARD_BODY;

CardBody.propTypes = {
	/**
	 * Elements to place in the body.
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to the card.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Set the HTML `id` of the body.
	 */
	id: PropTypes.string,
};

export default CardBody;
