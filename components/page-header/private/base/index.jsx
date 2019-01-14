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
	/**
	 * Nav content which appears in the upper right hand corner.
	 */
	navRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

const Base = (props) => (
	<div className="slds-grid slds-page-header__row">
		<div className="slds-col slds-page-header__col-title">
			<MediaObject
				body={
					<div>
						{props.title}
						{props.info}
					</div>
				}
				className="slds-no-space slds-grow"
				figure={props.icon}
			/>
		</div>
		<div className="slds-col slds-no-flex slds-grid slds-align-top">
			{props.navRight}
		</div>
	</div>
);

Base.displayName = displayName;
Base.propTypes = propTypes;

export default Base;
