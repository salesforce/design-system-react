/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { type ReactNode } from 'react';

import escapeRegExp from 'lodash.escaperegexp';

// ## Constants
import { HIGHLIGHTER } from '../../../utilities/constants';

// A case-insensitive matcher for a string search; a RegExp is used as given,
// minus `g`/`y`, whose `lastIndex` state would skip matches between calls.
const toMatcher = (search: string | RegExp) =>
	search instanceof RegExp
		? new RegExp(search.source, search.flags.replace(/[gy]/g, ''))
		: new RegExp(escapeRegExp(search), 'i');

/**
 * Split `text` into plain `<span>`s and `<mark>`ed matches of `search`. Same
 * markup as `react-highlighter-ts`, which this replaces: it hard-depends on
 * React 17, so a consumer's install nested a React 17 copy under it whose
 * elements React 19 refuses to render.
 */
const highlight = (text: string, search: string | RegExp) => {
	const matcher = toMatcher(search);
	const parts: ReactNode[] = [];
	let remaining = text;
	let count = 0;
	while (remaining) {
		const match = matcher.exec(remaining);
		// A zero-width match would never advance, so the rest stays plain.
		if (!match || match[0] === '') {
			parts.push(<span key={`${remaining}-${count}`}>{remaining}</span>);
			break;
		}
		const before = remaining.slice(0, match.index);
		if (before) parts.push(<span key={`${before}-${count}`}>{before}</span>);
		parts.push(
			<mark key={`${match[0]}-${count}`} className="">
				{match[0]}
			</mark>
		);
		remaining = remaining.slice(match.index + match[0].length);
		count += 1;
	}
	return parts;
};

const HighlightedText = ({
	className,
	search,
	text,
}: {
	className?: string;
	search: string | RegExp;
	text: string;
}) => (
	<span className={className} title={text}>
		{highlight(text, search)}
	</span>
);

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
		const { search } = props;
		let children;
		if (typeof props.children === 'string') {
			children = (
				<HighlightedText
					className={props.className}
					search={search}
					text={props.children}
				/>
			);
		} else {
			const findString = (nodeArr: ReactNode[]) =>
				nodeArr.map((element) => {
					let newElement;
					if (typeof element === 'string') {
						newElement = (
							<HighlightedText
								key={element}
								className={props.className}
								search={search}
								text={element}
							/>
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
