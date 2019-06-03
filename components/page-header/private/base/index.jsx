/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

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
	/**
	 * Content which appears in the top right corner. Either of these will work,
	 * but onRenderActions takes precedent. contentRight & navRight also work
	 * but will be deprecated eventually
	 */
	onRenderActions: PropTypes.node,
	onRenderContent: PropTypes.node
};

const renderActions = (props) => {
	let actions = props.onRenderActions || props.onRenderControls;

	if (actions) {
		actions = actions();
	} else {
		actions = props.contentRight || props.navRight;
	}

	if (actions) {
		if (actions.props && actions.props.children) {
			actions =  (
				<>
					{React.Children.map(actions.props.children, (child) => (
						<div className="slds-page-header__control">
							{child}
						</div>
					))}
				</>
			);
		} else {
			actions = <div className="slds-page-header__control">{actions}</div>;
		}

		return (
			<div className="slds-page-header__col-controls slds-align-middle">
				<div className="slds-page-header__controls">
					{actions}
				</div>
			</div>
		);
	}

	return null;
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
		{renderActions(props)}
	</div>
);
Base.displayName = displayName;
Base.propTypes = propTypes;

export default Base;
