/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Label from './label';

const displayName = 'PageHeaderTitle';
const propTypes = {
	/**
	 * Sets the vertical alignment on the title
	 */
	align: PropTypes.oneOf(['top', 'middle', 'bottom']),
	/**
	 * Optional class name
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * The title content
	 */
	content: PropTypes.node,
	/**
	 * Label node, for variants that require a label within the title
	 */
	label: PropTypes.node,
	/**
	 * Sets whether the title will truncate its content responsively.
	 */
	truncate: PropTypes.bool,
};
const defaultProps = {
	// align: 'middle',
	title: 'Page Header Title',
	truncate: true,
};

class Title extends Component {
	render() {
		if (!this.props.content) return null;

		const classes = classnames(
			'slds-page-header__title',
			this.props.className,
			{
				'slds-truncate': this.props.truncate,
				[`slds-align-${this.props.align}`]: this.props.align,
			}
		);

		return (
			<div className="slds-page-header__name-title">
				<h1>
					<Label content={this.props.label} />
					<span
						className={classes}
						title={
							typeof this.props.content === 'string'
								? this.props.content
								: undefined
						}
					>
						{this.props.content}
					</span>
				</h1>
			</div>
		);
	}
}

Title.displayName = displayName;
Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
