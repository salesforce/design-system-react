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
	 * The page header icon
	 */
	icon: PropTypes.node,
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
	 * The info property can be a string or a React element
	 */
	info: PropTypes.node,
	/**
	 * Nav content which appears in the upper right hand corner.
	 * prop 'navRight' will be deprecated soon, use 'onRenderControls' instead
	 */
	onRenderControls: PropTypes.func,
	/**
	 * The title property can be a string or a React element
	 */
	title: PropTypes.node,
	/**
	 * The type of component
	 */
	variant: PropTypes.string,
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
