/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import classnames from 'classnames';

import type { PageHeaderInfoProps } from '../types';

const displayName = 'PageHeaderInfo';

const Info = (props: PageHeaderInfoProps) => {
	if (!props.content) return null;

	const classes = classnames(
		{
			'slds-page-header__name-meta': props.variant === 'base',
			'slds-page-header__meta-text':
				props.variant === 'object-home' ||
				props.variant === 'objectHome' ||
				props.variant === 'related-list' ||
				props.variant === 'relatedList',
		},
		props.className
	);

	if (typeof props.content === 'string') {
		return <p className={classes}>{props.content}</p>;
	}

	return <div className={classes}>{props.content}</div>;
};

Info.displayName = displayName;

export default Info;
