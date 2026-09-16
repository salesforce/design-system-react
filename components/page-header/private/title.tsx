/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { Component, type ReactNode } from 'react';
import classnames from 'classnames';

import Label from './label';

const displayName = 'PageHeaderTitle';

export interface PageHeaderTitleProps {
	/**
	 * Sets the vertical alignment on the title
	 */
	align?: 'top' | 'middle' | 'bottom';
	/**
	 * Optional class name
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * The title content
	 */
	content?: ReactNode;
	/**
	 * Label node, for variants that require a label within the title
	 */
	label?: ReactNode;
	/**
	 * Sets whether the title will truncate its content responsively.
	 */
	truncate?: boolean;
}

class Title extends Component<PageHeaderTitleProps> {
	static displayName = displayName;

	static defaultProps: Partial<PageHeaderTitleProps> = {
		// align: 'middle',
		truncate: true,
	};

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

export default Title;
