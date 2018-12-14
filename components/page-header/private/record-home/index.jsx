/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import DetailRow from '../detail-row';
import MediaObject from '../../../media-object';

const displayName = 'PageHeaderRecordHome';
const propTypes = {
	/**
	 * Heading above title
	 */
	label: PropTypes.node,
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
	/**
	 * Content to appear on the right hand side of the page header
	 */
	contentRight: PropTypes.node,
	/**
	 * An array of detail blocks
	 */
	details: PropTypes.array,
	/**
	 * Nav content which appears in the upper right hand corner.
	 */
	navRight: PropTypes.node,
};

const RecordHome = (props) => (
	<div>
		<div className="slds-page-header__row slds-grid">
			<div className="slds-page-header__col-title slds-col slds-has-flexi-truncate">
				<MediaObject
					body={
						<div className="slds-page-header__name">
							<div className="slds-page-header__name-title">
								{props.label}
								{props.title}
							</div>
						</div>
					}
					className="slds-no-space slds-grow"
					figure={props.icon}
				/>
			</div>
			<div className="slds-page-header__col-actions slds-col slds-no-flex slds-grid slds-align-top slds-p-bottom_xx-small">
				<div className="slds-page-header__controls">{props.navRight}</div>
			</div>
		</div>
		<div className="slds-page-header__row slds-grid">
			<div className="slds-page-header__col-meta slds-col slds-align-bottom">
				<p className="slds-page-header__meta-text">{props.info}</p>
			</div>
			<div className="slds-page-header__col-controls slds-col slds-no-flex slds-grid slds-align-bottom">
				<div className="slds-page-header__controls">{props.contentRight}</div>
			</div>
		</div>
		<DetailRow details={props.details} />
	</div>
);

RecordHome.displayName = displayName;
RecordHome.propTypes = propTypes;

export default RecordHome;
