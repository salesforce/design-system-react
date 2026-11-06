/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { forwardRef, ReactNode, AnchorHTMLAttributes } from 'react';
import KEYS from '../../../utilities/key-code';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children?: ReactNode;
	onOpen?: () => void;
	onClose?: () => void;
}

// `SimpleDataTableInteractiveElement` focuses the link through its `ref`
const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
	// Avoid passing props to <a> that it doesn't understand
	const { onOpen, onClose, children, onClick, ...passThroughProps } = props;

	return (
		<a
			ref={ref}
			onKeyDown={(event) => {
				if (event.keyCode === KEYS.ENTER && onClick) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onClick(event as any);
				}
			}}
			onClick={onClick}
			{...passThroughProps}
		>
			{children}
		</a>
	);
});

Link.displayName = 'SimpleDataTableLink';

export default Link;
