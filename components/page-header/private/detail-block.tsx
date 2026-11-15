/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { Component } from 'react';
import classnames from 'classnames';

import type { PageHeaderDetailBlockProps } from '../types';

const displayName = 'PageHeaderDetailRow';

class DetailBlock extends Component<PageHeaderDetailBlockProps> {
	static displayName = displayName;

	static defaultProps: Partial<PageHeaderDetailBlockProps> = {
		content: '',
		label: '',
		truncate: true,
	};

	fieldContentRef: HTMLDivElement | null = null;

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

export default DetailBlock;
