/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Badges Component

// Implements the [Badges design pattern](https://www.lightningdesignsystem.com/components/badges/) in React.

import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import classNames from 'classnames';

import BadgeIcon from '../icon/badge-icon';

import { BADGE } from '../../utilities/constants';

const propTypes = {
	/**
	 * Change badge color and that of text accordingly
	 */
	color: PropTypes.oneOf(['inverse', 'lightest']),
	/**
	 * CSS classes that are applied to the span.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
	 */
	iconCategory: requiredIf(
		PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
		(props) => !!props.iconName
	),
	/**
	 * CSS classes to be added to icon.
	 */
	iconClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
	 */
	iconName: PropTypes.string,
	/**
	 * Path to the icon. This will override any global icon settings.
	 */
	iconPath: PropTypes.string,
	/**
	 * Position of the icon. If omitted icon will be positioned to the left.
	 */
	iconPosition: PropTypes.oneOf(['left', 'right']),
	/**
	 * HTML id applied on the badge span.
	 */
	id: PropTypes.string,
	/**
	 * Description of icon if required.
	 */
	iconTite: PropTypes.string,
};

const defaultProps = {
	assistiveText: {},
	color: '',
	iconPosition: 'left',
};

/**
 * Badges are labels which hold small amounts of information.
 */
class Badge extends React.Component {
	/**
	 * ID as a string
	 * @returns {string} id
	 */
	getId() {
		return this.props.id;
	}

	/**
	 * Render icon according to the passed props.
	 */
	renderIcon = () => (
		<BadgeIcon
			category={this.props.iconCategory || 'utility'}
			className={classNames(
				{
					'slds-global-header__icon':
						this.props.iconVariant === 'global-header',
				},
				this.props.iconClassName
			)}
			inverse={this.props.color === 'inverse'}
			name={this.props.iconName}
			path={this.props.iconPath}
			position={this.props.iconPosition}
			title={this.props.iconTitle}
		/>
	);

	/**
	 * Render data other than icon in a badge.
	 */
	renderLabel = () => {
		if (this.props.iconPosition === 'right' || !this.props.iconName) {
			return this.props.children;
		}
		return <span>{this.props.children}</span>;
	};

	/**
	 * Render badge component
	 */
	renderBadge = () => (
		<span
			className={classNames(
				'slds-badge',
				{
					[`slds-badge_${this.props.color}`]: this.props.color,
				},
				this.props.className
			)}
			id={this.getId()}
		>
			{this.props.iconPosition === 'right' && this.renderLabel()}
			{this.props.iconName && this.renderIcon()}
			{this.props.iconPosition === 'left' && this.renderLabel()}
		</span>
	);

	render() {
		return this.renderBadge();
	}
}

Badge.displayName = BADGE;
Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
