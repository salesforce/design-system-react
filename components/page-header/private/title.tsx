/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { Component } from 'react';
import classnames from 'classnames';

import type { PageHeaderTitleProps } from '../types';

import Label from './label';

const displayName = 'PageHeaderTitle';

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

		return (
			<div className="slds-page-header__name-title">
				<h1>
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
				</h1>
			</div>
		);
	}
}

export default Title;
