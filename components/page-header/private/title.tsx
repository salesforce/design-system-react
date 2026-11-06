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
	/**
	 * Heading level of the title element
	 */
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}

class Title extends Component<PageHeaderTitleProps> {
	static displayName = displayName;

	static defaultProps: Partial<PageHeaderTitleProps> = {
		// align: 'middle',
		truncate: true,
	};

	render() {
		// `0` is a valid title; a missing, empty or boolean one renders nothing
		const { content } = this.props;
		if (content == null || content === '' || typeof content === 'boolean')
			return null;

		const classes = classnames(
			'slds-page-header__title',
			this.props.className,
			{
				'slds-truncate': this.props.truncate,
				[`slds-align-${this.props.align}`]: this.props.align,
			}
		);

		const Heading = `h${this.props.level ?? 1}` as const;

		return (
			<div className="slds-page-header__name-title">
				<Heading>
					<Label content={this.props.label} />
					<span
						className={classes}
						title={
							typeof this.props.content === 'string' ||
							typeof this.props.content === 'number'
								? String(this.props.content)
								: undefined
						}
					>
						{this.props.content}
					</span>
				</Heading>
			</div>
		);
	}
}

export default Title;
