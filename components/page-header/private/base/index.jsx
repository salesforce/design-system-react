/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import MediaObject from '../../../media-object';

const displayName = 'PageHeaderBase';
const propTypes = {
	/**
	 * Icon node passed by PageHeader
	 */
	icon: PropTypes.node,
	/**
	 * Title node passed by PageHeader
	 */
	title: PropTypes.node,
	/**
	 * Info node passed by PageHeader
	 */
	info: PropTypes.node,
};

const Base = (props) => (
	<MediaObject
		body={
			<div>
				{props.title}
				{props.info}
			</div>
		}
		figure={props.icon}
		verticalCenter
	/>
);

Base.displayName = displayName;
Base.propTypes = propTypes;

export default Base;
