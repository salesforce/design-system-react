/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import MediaObject from '../../../media-object';

const displayName = 'PageHeaderBase';
const propTypes = {
	/**
	 * Title node passed by PageHeader
	 */
	title: PropTypes.node,
	/**
	 * Info node passed by PageHeader
	 */
	info: PropTypes.node,
	/**
	 * Icon node passed by PageHeader
	 */
	icon: PropTypes.node,
};

const Base = (props) => (
	<div className="slds-page-header__row">
		<div className="slds-page-header__col-title">
			<MediaObject
				body={
					<div>
						<div className="slds-page-header__name">
							<div className="slds-page-header__name-title">{props.title}</div>
						</div>
						<p className="slds-page-header__name-meta slds-text-body_small slds-line-height_reset">
							{props.info}
						</p>
					</div>
				}
				figure={props.icon}
			/>
		</div>
	</div>
);

Base.displayName = displayName;
Base.propTypes = propTypes;

export default Base;
