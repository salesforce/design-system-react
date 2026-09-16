/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { Component, type ReactNode } from 'react';
import classnames from 'classnames';
import DetailBlock, {
	type PageHeaderDetailBlockProps,
} from './detail-block';

const displayName = 'PageHeaderDetailRow';

export interface PageHeaderDetailRowProps {
	children?: ReactNode;
	/**
	 * Optional class name
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * An array of detail blocks
	 */
	details?: PageHeaderDetailBlockProps[];
}

class DetailRow extends Component<PageHeaderDetailRowProps> {
	static displayName = displayName;

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

export default DetailRow;
