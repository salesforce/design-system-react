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
	 * An array of detail blocks (used in "recordHome" variant)
	 */
	details: PropTypes.array,
	/**
	 * The label property can be a string or a React element
	 */
	label: PropTypes.node,
	/**
	 * The page header icon
	 */
	icon: PropTypes.element,
	/**
	 * The icon category
	 */
	iconCategory: PropTypes.string,
	/**
	 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
	 */
	iconName: PropTypes.string,
	/**
	 * If omitted, icon position is centered.
	 */
	iconPosition: PropTypes.string,
	/**
	 * Determines the size of the icon.
	 */
	iconSize: PropTypes.string,
	/**
	 * For icon variants, please reference <a href='http://www.lightningdesignsystem.com/components/buttons/#icon'>Lightning Design System Icons</a>.
	 */
	iconVariant: PropTypes.string,
	/**
	 * Content to appear on the right hand side of the page header
	 * prop 'contentRight' will be deprecated soon, use 'onRenderActions' instead
	 */
	onRenderActions: PropTypes.func,
	/**
	 * The title property can be a string or a React element
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
								<Title content={props.title} label={props.label} />
							</div>
						</>
					}
					figure={
						props.iconName ? (
							<Icon
								category={props.iconCategory}
								className="slds-page-header__icon"
								name={props.iconName}
								position={props.iconPosition}
								size={props.iconSize}
								variant={props.iconVariant}
							/>
						) : (
							props.icon
						)
					}
				/>
			</div>
			<Controls
				contentRight={props.contentRight}
				onRenderActions={props.onRenderActions}
				type="actions"
			/>
		</div>
		{props.details ? (
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
