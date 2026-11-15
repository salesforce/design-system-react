/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { Component } from 'react';
import classnames from 'classnames';
import DetailBlock from './detail-block';
import type { PageHeaderDetailRowProps } from '../types';

const displayName = 'PageHeaderDetailRow';

class DetailRow extends Component<PageHeaderDetailRowProps> {
	static displayName = displayName;

	renderDetails() {
		if (this.props.children !== undefined) {
			return this.props.children;
		}

		if (this.props.details) {
			return this.props.details.map((detail, i) => {
				const key = detail.id ?? `page-header-detail-block-${i}`;

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

export default DetailRow;
