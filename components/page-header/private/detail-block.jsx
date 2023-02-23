/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const displayName = 'PageHeaderDetailRow';
const propTypes = {
	/**
	 * Optional class name
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * The content property can be a string or a React element
	 */
	content: PropTypes.node,
	/**
	 * Sets the 'flavor' of a block, which adds the following sizing class: `slds-size_${flavor}`
	 */
	flavor: PropTypes.string,
	/**
	 * Sets the label of a detail block
	 */
	label: PropTypes.node,
	/**
	 * Sets whether the fields truncate
	 */
	truncate: PropTypes.bool,
};

const defaultProps = {
	content: '',
	label: '',
	truncate: true,
};

class DetailBlock extends Component {
	renderContent() {
		const { content, truncate } = this.props;

		if (typeof content === 'string') {
			const labelClasses = classnames({ 'slds-truncate': truncate });

			return (
				<div
					className={labelClasses}
					ref={(field) => {
						this.fieldContentRef = field;
					}}
					title={content}
				>
					{content}
				</div>
			);
		}

		return content;
	}

	renderLabel() {
		const { label, truncate } = this.props;

		if (typeof label === 'string') {
			const labelClasses = classnames('slds-text-title', {
				'slds-truncate': truncate,
			});

			return (
				<div className={labelClasses} title={label}>
					{label}
				</div>
			);
		}

		return label;
	}

	render() {
		const { className, flavor } = this.props;

		const classes = classnames('slds-page-header__detail-block', className, {
			[`slds-size_${flavor}`]: flavor,
		});

		return (
			<li className={classes}>
				{this.renderLabel()}
				{this.renderContent()}
			</li>
		);
	}
}

DetailBlock.displayName = displayName;
DetailBlock.propTypes = propTypes;
DetailBlock.defaultProps = defaultProps;

export default DetailBlock;
