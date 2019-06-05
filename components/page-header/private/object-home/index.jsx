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

const ObjectHome = (props) => (
	<>
		<div className="slds-page-header__row">
			<div className="slds-page-header__col-title">
				<MediaObject
					body={
						<>
							{(props.trail) ? (
								<Label style={{ lineHeight: '1.3' }} trail={props.trail} />
							) : null}
							<div className="slds-page-header__name">
								<Title
									content={props.title}
									label={(!props.trail) ? props.label : null}
								/>
								{(props.nameSwitcherDropdown) ? (
									<div className="slds-page-header__name-switcher">
										{props.nameSwitcherDropdown}
									</div>
								) : null}
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
				className={classnames({
					'slds-align-middle slds-p-bottom_none': !props.onRenderControls && !props.navRight
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
					'slds-align-middle': !props.onRenderActions && !props.comntentRight
				})}
				navRight={props.navRight}
				onRenderControls={props.onRenderControls}
				type="controls"
			/>
		</div>
	</>
);

ObjectHome.displayName = displayName;
ObjectHome.propTypes = propTypes;

export default ObjectHome;
