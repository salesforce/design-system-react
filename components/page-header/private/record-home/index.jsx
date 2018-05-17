/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import DetailRow from '../detail-row';
import MediaObject from '../../../media-object';

const displayName = 'PageHeaderRecordHome';
const propTypes = {
	/**
	 * Content to appear on the right hand side of the page header
	 */
	contentRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * An array of detail blocks
	 */
	details: PropTypes.array,
	/**
	 * Icon node passed by PageHeader
	 */
	icon: PropTypes.node,
	/**
	 * Info node passed by PageHeader
	 */
	info: PropTypes.node,
	/**
	 * Heading above title
	 */
	label: PropTypes.node,
	/**
	 * Title node passed by PageHeader
	 */
	title: PropTypes.node,
};

const RecordHome = (props) => (
	<div>
		<div className="slds-grid">
			<div className="slds-col slds-has-flexi-truncate">
				<MediaObject
					body={
						<div>
							{props.label}
							{props.title}
							{props.info}
						</div>
					}
					className="slds-no-space slds-grow"
					figure={props.icon}
				/>
			</div>
			<div className="slds-col slds-no-flex slds-grid slds-align-top">
				{props.contentRight}
			</div>
		</div>
		<DetailRow details={props.details} />
	</div>
);

RecordHome.displayName = displayName;
RecordHome.propTypes = propTypes;

export default RecordHome;
