/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Controls from '../controls';
import DetailRow from '../detail-row';
import Icon from '../../../icon';
import MediaObject from '../../../media-object';
import Title from '../title';

const displayName = 'PageHeaderRecordHome';
const propTypes = {
	/**
	 * Content to appear on the right hand side of the page header
	 * 'contentRight' prop will be deprecated soon, instead use 'onRenderActions'
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
	<>
		<div className="slds-page-header__row">
			<div className="slds-page-header__col-title">
				<MediaObject
					body={
						<>
							<div className="slds-page-header__name">
								<Title
									content={props.title}
									label={props.label}
								/>
							</div>
						</>
					}
					figure={(props.iconName) ? (
						<Icon
							category={props.iconCategory}
							className="slds-page-header__icon"
							name={props.iconName}
							position={props.iconPosition}
							size={props.iconSize}
							variant={props.iconVariant}
						/>
					) : props.icon}
				/>
			</div>
			<Controls
				contentRight={props.contentRight}
				onRenderActions={props.onRenderActions}
				type="actions"
			/>
		</div>
		{(props.details) ? (
			<div className="slds-page-header__row slds-page-header__row_gutters">
				<div className="slds-page-header__col-details">
					<DetailRow details={props.details} />
				</div>
			</div>
		) : null}
	</>
);

RecordHome.displayName = displayName;
RecordHome.propTypes = propTypes;

export default RecordHome;
