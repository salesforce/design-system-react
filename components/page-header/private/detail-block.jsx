/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PopoverTooltip from '../../popover-tooltip';

const displayName = 'PageHeaderDetailRow';
const propTypes = {
	/**
	 * Optional class name
	 */
	className: PropTypes.string,
	/**
	 * label
	 */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * The content property can be a string or a React element
	 */
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * Sets whether the fields truncate
	 */
	truncate: PropTypes.bool,
	flavor: PropTypes.string,
};

const defaultProps = {
	label: '',
	content: '',
};

class DetailBlock extends Component {
	constructor (props) {
		super(props);
		this.state = { showTooltip: false };
	}

	componentDidMount () {
		this._renderFieldTruncation();
	}

	componentDidUpdate (prevProps) {
		if (this.props.content !== prevProps.content) {
			this._renderFieldTruncation();
		}
	}

	// eslint-disable-next-line class-methods-use-this
	_getClassNames (className, flavor) {
		return classnames('slds-page-header__detail-block', className, {
			[`slds-size--${flavor}`]: flavor,
		});
	}

	_renderFieldTruncation () {
		const fieldContent = this.fieldContentRef;
		const isTruncated =
			fieldContent && fieldContent.scrollWidth > fieldContent.offsetWidth;
		if (isTruncated) {
			this.setState({ showTooltip: true });
		} else {
			this.setState({ showTooltip: false });
		}
	}

	render () {
		const { className, content, flavor, label, truncate } = this.props;

		const classes = this._getClassNames(className, flavor);

		/**
		 * Render the label
		 */
		const renderLabel = () => {
			const type = typeof label;

			if (type === 'string') {
				const labelClasses = classnames('slds-text-title', {
					'slds-truncate': truncate,
				});
				return (
					<p className={labelClasses} title={label}>
						{label}
					</p>
				);
			}
			return label;
		};

		/**
		 * Render the content
		 */
		const renderContent = () => {
			const type = typeof content;
			if (type === 'string') {
				const labelClasses = classnames('slds-text-body--regular', {
					'slds-truncate': truncate,
				});
				return (
					<p
						ref={(field) => {
							this.fieldContentRef = field;
						}}
						className={labelClasses}
						content={content}
					>
						{content}
					</p>
				);
			}
			return content;
		};

		/**
		 * Render the content with a tooltip (for content that truncates)
		 */
		const renderContentWithTooltip = () => {
			const labelClasses = classnames('slds-text-body--regular', {
				'slds-truncate': truncate,
			});
			return (
				<PopoverTooltip align="top" content={content}>
					<p tabIndex="0" className={labelClasses}>
						{content}
					</p>
				</PopoverTooltip>
			);
		};

		return (
			<li className={classes}>
				{renderLabel()}
				{this.state.showTooltip ? renderContentWithTooltip() : renderContent()}
			</li>
		);
	}
}

DetailBlock.displayName = displayName;
DetailBlock.propTypes = propTypes;
DetailBlock.defaultProps = defaultProps;

export default DetailBlock;
