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
	className: PropTypes.string,
	/**
	 * An array of detail blocks
	 */
	details: PropTypes.array,
};
const defaultProps = {};

class DetailRow extends Component {
	// eslint-disable-next-line class-methods-use-this
	_getClassNames (className) {
		return classnames('slds-grid slds-page-header__detail-row', className);
	}

	render () {
		const { children, className, details } = this.props;
		const classes = this._getClassNames(className);

		/**
		 * Render the deets
		 */
		const renderDetails = () => {
			if (children !== undefined) {
				return children;
			}

			return details.map((detail, i) => {
				const key = `PageHeader.detailBlock.${i}`;

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
		};

		return <ul className={classes}>{renderDetails()}</ul>;
	}
}

DetailRow.displayName = displayName;
DetailRow.propTypes = propTypes;
DetailRow.defaultProps = defaultProps;

export default DetailRow;
