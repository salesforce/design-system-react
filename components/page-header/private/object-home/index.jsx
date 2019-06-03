/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../icon';
import Info from '../info';
import MediaObject from '../../../media-object';
import Title from '../title';

const displayName = 'PageHeaderObjectHome';
const propTypes = {
	/**
	 * Content to appear on the right hand side of the page header
	 * 'contentRight' prop will be deprecated soon, instead use 'onRenderActions'
	 */
	contentRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
	 * Nav content which appears in the upper right hand corner.
	 * 'navRight' prop will be deprecated soon, instaed use 'onRenderControls'
	 */
	navRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * Title node passed by PageHeader
	 */
	title: PropTypes.node,
};

const renderActionsOrControls = (props, type) => {
	let components;

	if (type === 'actions') {
		components = (props.onRenderControls) ? props.onRenderControls() : props.navRight;
	} else {
		components = (props.onRenderActions) ? props.onRenderActions() : props.contentRight;
	}

	if (components) {
		if (components.props && components.props.children) {
			components =  (
				<>
					{React.Children.map(components.props.children, (child) => (
						<div className="slds-page-header__control">
							{child}
						</div>
					))}
				</>
			);
		} else {
			components = <div className="slds-page-header__control">{components}</div>;
		}


		return (
			<div className={`slds-page-header__col-${type}`}>
				<div className="slds-page-header__controls">
					{components}
				</div>
			</div>
		);
	}

	return null;
};

const ObjectHome = (props) => (
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
			{renderActionsOrControls(props, 'actions')}
		</div>
		<div className="slds-page-header__row">
			<div className="slds-page-header__col-meta">
				<Info content={props.info} variant={props.variant} />
			</div>
			{renderActionsOrControls(props, 'controls')}
		</div>
	</>
);

ObjectHome.displayName = displayName;
ObjectHome.propTypes = propTypes;

export default ObjectHome;
