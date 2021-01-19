/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DetailBlock from './detail-block';

const displayName = 'PageHeaderDetailRow';
const propTypes = {
	children: PropTypes.node,
	/**
	 * Optional class name
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * An array of detail blocks
	 */
	details: PropTypes.array,
};
const defaultProps = {};

class DetailRow extends Component {
	renderDetails() {
		if (this.props.children !== undefined) {
			return this.props.children;
		}

		if (this.props.details) {
			return this.props.details.map((detail, i) => {
				const key = `page-header-detail-block-${i}`;

				return (
					<DetailBlock
						key={key}
						flavor={detail.flavor}
						label={detail.label}
						content={detail.content}
						truncate={detail.truncate}
					/>
				);
			});
		}

		return null;
	}

	render() {
		const classes = classnames(
			'slds-page-header__detail-row',
			this.props.className
		);

		return <ul className={classes}>{this.renderDetails()}</ul>;
	}
}

DetailRow.displayName = displayName;
DetailRow.propTypes = propTypes;
DetailRow.defaultProps = defaultProps;

export default DetailRow;
