/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { ReactNode, AnchorHTMLAttributes } from 'react';
import KEYS from '../../../utilities/key-code';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children?: ReactNode;
	onRequestFocus?: (node: HTMLAnchorElement) => void;
	onOpen?: () => void;
	onClose?: () => void;
	requestFocus?: boolean;
}

const Link: React.FC<LinkProps> = (props) => {
	// Avoid passing props to <a> that it doesn't understand
	const {
		onRequestFocus,
		onOpen,
		onClose,
		requestFocus,
		children,
		onClick,
		...passThroughProps
	} = props;

	return (
		<a
			ref={(node) => {
				if (node && requestFocus && onRequestFocus) {
					onRequestFocus(node);
				}
			}}
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
};

export default Link;
