/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Controls from '../controls';
import Icon from '../../../icon';
import Info from '../info';
import Label from '../label';
import MediaObject from '../../../media-object';
import Title from '../title';

const displayName = 'PageHeaderObjectHome';
const propTypes = {
	/**
	 * The label property can be a string or a React element
	 */
	label: PropTypes.node,
	/**
	 * The page header icon
	 */
	icon: PropTypes.element,
	/**
	 * The info property can be a string or a React element
	 */
	info: PropTypes.node,
	/**
	 * Used with the `object-home` variant. Accepts a node, typically a Dropdown component
	 */
	nameSwitcherDropdown: PropTypes.node,
	/**
	 * Content to appear on the right hand side of the page header
	 * prop 'contentRight' will be deprecated soon, use 'onRenderActions' instead
	 */
	onRenderActions: PropTypes.func,
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
	 * An array of react elements presumably anchor <a> elements.
	 */
	trail: PropTypes.array,
	/**
	 * The type of component
	 * Note: Extra options are added to make the version backward compatible
	 */
	variant: PropTypes.string,
};

const ObjectHome = (props) => {
	let icon;

	// Backwards compatibility
	if (props.iconName) {
		icon = (
			<Icon
				category={props.iconCategory}
				className="slds-page-header__icon"
				name={props.iconName}
				position={props.iconPosition}
				size={props.iconSize}
				variant={props.iconVariant}
			/>
		);
	} else if (props.icon) {
		let iconClasses = 'slds-page-header__icon';

		if (props.icon.props) {
			iconClasses = classnames(props.icon.props.className, iconClasses);
		}

		icon = React.cloneElement(props.icon, { className: iconClasses });
	}

	return (
		<React.Fragment>
			<div className="slds-page-header__row">
				<div className="slds-page-header__col-title">
					<MediaObject
						body={
							<React.Fragment>
								{props.trail ? (
									<Label style={{ lineHeight: '1.3' }} trail={props.trail} />
								) : null}
								<div className="slds-page-header__name">
									<Title
										content={props.title}
										label={!props.trail ? props.label : null}
									/>
									{props.nameSwitcherDropdown ? (
										<div className="slds-page-header__name-switcher">
											{props.nameSwitcherDropdown}
										</div>
									) : null}
								</div>
							</React.Fragment>
						}
						figure={icon}
					/>
				</div>
				<Controls
					className={classnames({
						'slds-align-middle slds-p-bottom_none':
							!props.onRenderControls && !props.navRight,
					})}
					contentRight={props.contentRight}
					onRenderActions={props.onRenderActions}
					type="actions"
				/>
			</div>
			<div className="slds-page-header__row">
				<div className="slds-page-header__col-meta">
					<Info content={props.info} variant={props.variant} />
				</div>
				<Controls
					className={classnames({
						'slds-align-middle': !props.onRenderActions && !props.comntentRight,
					})}
					navRight={props.navRight}
					onRenderControls={props.onRenderControls}
					type="controls"
				/>
			</div>
		</React.Fragment>
	);
};

ObjectHome.displayName = displayName;
ObjectHome.propTypes = propTypes;

export default ObjectHome;
