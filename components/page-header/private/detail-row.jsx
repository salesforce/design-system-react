/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { Component } from 'react';
import classnames from 'classnames';
import DetailBlock from './detail-block';

const displayName = 'PageHeaderDetailRow';
const propTypes = {
	children: React.PropTypes.node,
	/**
	 * Optional class name
	 */
	className: React.PropTypes.string,
	/**
	 * An array of detail blocks
	 */
	details: React.PropTypes.array
};
const defaultProps = {};

class DetailRow extends Component {
	render () {
		const { children, className, details } = this.props;
		const classes = this._getClassNames(className);

		let detailsElement;

		/**
		 * Render the deets
		 */
		const renderDetails = () => {
			if (children !== void (0)) {
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

		detailsElement = renderDetails();

		return (
			<ul className={classes}>
				{detailsElement}
			</ul>
		);
	}

	_getClassNames (className) {
		return classnames('slds-grid slds-page-header__detail-row', className);
	}
}

DetailRow.displayName = displayName;
DetailRow.propTypes = propTypes;
DetailRow.defaultProps = defaultProps;

export default DetailRow;
