/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { ReactNode } from 'react';
import classNames from 'classnames';
import isFunction from 'lodash.isfunction';

export interface RenderInitialBranchProps {
	htmlId: string | number;
	initalClassName?: string | string[] | Record<string, boolean>;
	initialStyle?: React.CSSProperties;
	onScroll?: (
		event: React.UIEvent<HTMLUListElement>,
		data: { percentage: number }
	) => void;
}

const handleScroll = (
	event: React.UIEvent<HTMLUListElement>,
	props: RenderInitialBranchProps
) => {
	const target = event.target as HTMLUListElement;
	const percentage =
		(target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;

	if (isFunction(props.onScroll)) {
		props.onScroll(event, { percentage });
	}
};

const RenderInitialBranch = (
	children: ReactNode,
	props: RenderInitialBranchProps
): React.ReactElement => (
	<ul
		aria-labelledby={`${props.htmlId}__heading`}
		className={classNames('slds-tree', props.initalClassName)}
		onScroll={(event) => handleScroll(event, props)}
		role="tree"
		style={props.initialStyle}
	>
		{children}
	</ul>
);

RenderInitialBranch.displayName = 'TreeInitialNode';

export default RenderInitialBranch;

