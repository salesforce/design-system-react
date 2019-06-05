/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Controls from '../controls';
import Icon from '../../../icon';
import Info from '../info';
import MediaObject from '../../../media-object';
import Title from '../title';

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
	<div className="slds-page-header__row">
		<div className="slds-page-header__col-title">
			<MediaObject
				body={
					<>
						<div className="slds-page-header__name">
							<Title content={props.title} />
						</div>
						<Info content={props.info} variant={props.variant} />
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
			className="slds-align-middle"
			navRight={props.navRight}
			onRenderControls={props.onRenderControls}
			type="controls"
		/>
	</div>
);
Base.displayName = displayName;
Base.propTypes = propTypes;

export default Base;
