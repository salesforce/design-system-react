/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { type ComponentType, type ReactNode } from 'react';

// ### ReactHighlighter
// `react-highlighter-ts` ships React-17-era types that require props React 19
// no longer models (e.g. `placeholder`, pointer-capture handlers). Alias to a
// permissive component type so this wrapper compiles against React 19.
import { Highlight } from 'react-highlighter-ts';

// ## Constants
import { HIGHLIGHTER } from '../../../utilities/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactHighlighter = Highlight as unknown as ComponentType<any>;

export interface HighlighterProps {
	/**
	 * The full string to display.
	 */
	children?: ReactNode;
	className?: string;
	/**
	 * The string of text (or Regular Expression) to highlight.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	search?: any;
}

/**
 * A utility component that highlights occurrences of a particular pattern in its contents.
 */
const Highlighter = (props: HighlighterProps) => {
	if (props.search) {
		let children;
		if (typeof props.children === 'string') {
			children = (
				<ReactHighlighter
					className={props.className}
					matchClass=""
					matchElement="mark"
					search={props.search}
					title={props.children}
				>
					{props.children}
				</ReactHighlighter>
			);
		} else {
			const findString = (nodeArr: ReactNode[]) =>
				nodeArr.map((element) => {
					let newElement;
					if (typeof element === 'string') {
						newElement = (
							<ReactHighlighter
								key={element}
								className={props.className}
								matchClass=""
								matchElement="mark"
								search={props.search}
								title={element}
							>
								{element}
							</ReactHighlighter>
						);
					} else {
						newElement = element;
					}
					return newElement;
				});

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const childElement = props.children as any;
			if (childElement && childElement.props) {
				const node = childElement.props.children;
				children = node instanceof Array ? findString(node) : node;
			}
		}

		return <span>{children}</span>;
	}

	if (typeof props.children === 'string') {
		return (
			<span className={props.className} title={props.children}>
				{props.children}
			</span>
		);
	}

	return <span className={props.className}>{props.children}</span>;
};

// ### Display Name
Highlighter.displayName = HIGHLIGHTER;

export default Highlighter;
