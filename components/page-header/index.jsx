/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-redundant-roles */

// # Page Header Component

// Implements the [Page Header design pattern](https://www.lightningdesignsystem.com/components/page-headers) in React.
// Based on SLDS v2.2.1

// ## Dependencies

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Info from './private/info';
import Title from './private/title';
import DetailRow from './private/detail-row';
import DetailBlock from './private/detail-block';
import Base from './private/base';
import RecordHome from './private/record-home';
import ObjectHome from './private/object-home';
import RelatedList from './private/related-list';
import Icon from '../icon';
import Breadcrumb from '../breadcrumb';

// ## Constants
import { PAGE_HEADER } from '../../utilities/constants';

const displayName = PAGE_HEADER;
const propTypes = {
	/**
	 * Optional class name
	 */
	className: PropTypes.string,
	/**
	 * The type of component
	 */
	variant: PropTypes.string,
	/**
	 * The info property can be a string or a React element
	 */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * The title property can be a string or a React element
	 */
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * The info property can be a string or a React element
	 */
	info: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * The page header icon
	 */
	icon: PropTypes.element,
	/**
	 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
	 */
	iconName: PropTypes.string,
	/**
	 * The icons category
	 */
	iconCategory: PropTypes.oneOf([
		'action',
		'custom',
		'doctype',
		'standard',
		'utility',
	]),
	/**
	 * If omitted, icon position is centered.
	 */
	iconPosition: PropTypes.oneOf(['left', 'right']),
	/**
	 * Determines the size of the icon.
	 */
	iconSize: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	/**
	 * For icon variants, please reference <a href='http://www.lightningdesignsystem.com/components/buttons/#icon'>Lightning Design System Icons</a>.
	 */
	iconVariant: PropTypes.oneOf([
		'container',
		'border',
		'border-filled',
		'small',
		'more',
	]),
	/**
	 * Content to appear on the right hand side of the page header
	 */
	contentRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * An array of buttons which appear on the component's right hand side.
	 */
	details: PropTypes.array,
	/**
	 * Nav content which appears in the upper right hand corner.
	 */
	navRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * An array of react elements presumably anchor <a> elements.
	 */
	trail: PropTypes.array,
};

const defaultProps = {
	className: '',
	variant: 'base',
	navRight: '',
	contentRight: '',
	details: [],
	trail: [],
};

/**
 * The PageHeader component adds PageHeader, PageHeader.Info, PageHeader.Title, PageHeader.DetailRow, and PageHeader.DetailBlock.
 */
class PageHeader extends Component {
	_getClassNames (className) {
		return classnames(
			'slds-page-header',
			{
				'slds-page-header--object-home': this.props.variant === 'objectHome',
			},
			className
		);
	}

	render () {
		/**
		 * OPTIMIZE ES7 style object destructuring removes the need for _.omit.
		 * Example: const {foo, ...bar} = this.props;
		 */
		const {
			className,
			contentRight,
			details,
			icon,
			iconCategory,
			iconName,
			iconPosition,
			iconSize,
			iconVariant,
			info,
			label,
			navRight,
			title,
			trail,
			variant,
		} = this.props;

		const classes = this._getClassNames(className);

		/**
		 * Render the icon
		 */
		const renderIcon = () => {
			if (iconName) {
				return (
					<Icon
						name={iconName}
						category={iconCategory}
						position={iconPosition}
						size={iconSize}
						variant={iconVariant}
					/>
				);
			}
			return icon;
		};

		/**
		 * Render the label
		 */
		const renderLabel = () => {
			const type = typeof label;

			if (trail.length > 0) {
				return (
					<nav className="slds-m-bottom--xx-small" role="navigation">
						<Breadcrumb trail={trail} />
					</nav>
				);
			}
			if (type === 'string') {
				return (
					<p className="slds-text-title--caps slds-line-height--reset">
						{label}
					</p>
				);
			}
			return label;
		};

		/**
		 * Render the title
		 */
		const renderTitle = () => {
			const type = typeof title;

			if (type === 'string') {
				return <Title title={title} />;
			}
			return title;
		};

		/**
		 * Render info
		 */
		const renderInfo = () => {
			const type = typeof info;

			if (type === 'string') {
				return <Info>{info}</Info>;
			}
			return info;
		};

		/**
		 * Steal contentRight's children
		 */
		const renderNavRight = () => {
			const type = typeof navRight;

			if (type !== 'string') {
				return (
					<div
						className="slds-col slds-no-flex slds-grid slds-align-top"
						{...navRight.props}
					/>
				);
			}
			return navRight;
		};

		/**
		 * Steal contentRight's children
		 */
		const renderContentRight = () => {
			const type = typeof contentRight;

			if (type !== 'string') {
				return <div className="slds-grid" {...contentRight.props} />;
			}
			return contentRight;
		};

		let Variant;
		switch (variant) {
			case 'objectHome':
				Variant = ObjectHome;
				break;
			case 'recordHome':
				Variant = RecordHome;
				break;
			case 'relatedList':
				Variant = RelatedList;
				break;
			default:
				Variant = Base;
		}

		return (
			<div className={classes}>
				<Variant
					label={renderLabel()}
					icon={renderIcon()}
					title={renderTitle()}
					info={renderInfo()}
					contentRight={renderContentRight()}
					navRight={renderNavRight()}
					details={details}
				/>
			</div>
		);
	}
}

PageHeader.displayName = displayName;
PageHeader.propTypes = propTypes;
PageHeader.defaultProps = defaultProps;

export default PageHeader;
export { Info, Title, DetailRow, DetailBlock };
