/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Badge design pattern](https://latest-216.lightningdesignsystem.com/components/badges/) in React.

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ## Constants
import { BADGE } from '../../utilities/constants';

/**
 * Badges are labels which hold small amounts of information.
 */
class Badge extends React.Component {
	constructor(props) {
		super(props);
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the Badge's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		const icon = this.props.icon && (
			<span
				className={classNames(
					'slds-badge__icon',
					`slds-badge__icon_${this.props.iconAlignment}`
				)}
				style={this.props.style}
			>
				{this.props.icon}
			</span>
		);

		return (
			<span
				id={this.getId()}
				className={classNames(
					'slds-badge',
					{
						'slds-badge_inverse': this.props.color === 'inverse',
						'slds-badge_lightest': this.props.color === 'light',
						'slds-theme_success': this.props.color === 'success',
						'slds-theme_warning': this.props.color === 'warning',
						'slds-theme_error': this.props.color === 'error',
					},
					this.props.className
				)}
			>
				{this.props.iconAlignment === 'left' ? (
					<React.Fragment>
						{icon}
						{this.props.content}
					</React.Fragment>
				) : (
					<React.Fragment>
						{this.props.content}
						{icon}
					</React.Fragment>
				)}
			</span>
		);
	}
}

Badge.displayName = BADGE;

Badge.propTypes = {
	/**
	 * CSS classes that are applied to the component
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	/**
	 * Id of component, if desired. If not provided an id is automatically generated
	 */
	id: PropTypes.string,

	/**
	 * Custom styles to be passed to the component
	 */
	style: PropTypes.object,

	/**
	 * Color variant for the badge component
	 */
	color: PropTypes.oneOf([
		'default',
		'inverse',
		'light',
		'success',
		'warning',
		'error',
	]),

	/**
	 * Icon alignment for the badge component
	 */
	iconAlignment: PropTypes.oneOf(['left', 'right']),

	/**
	 *  Content to be placed inside the badge component
	 */
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Badge.defaultProps = {
	iconAlignment: 'left',
	color: 'default',
};

export default Badge;
