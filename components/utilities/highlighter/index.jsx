/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### ReactHighlighter
import ReactHighlighter from 'react-highlighter';

// ## Constants
import { HIGHLIGHTER } from '../../../utilities/constants';

/**
 * A utility component that highlights occurrences of a particular pattern in its contents.
 */
const Highlighter = (props) => {
	if (props.search) {
		let children;
		if (typeof props.children === 'string') {
			children = (
				<ReactHighlighter
					className={props.className}
					matchClass={null}
					matchElement="mark"
					search={props.search}
					title={props.children}
				>
					{props.children}
				</ReactHighlighter>
			);
		} else {
			const findString = (nodeArr) =>
				nodeArr.map((element) => {
					let newElement;
					if (typeof element === 'string') {
						newElement = (
							<ReactHighlighter
								key={element}
								className={props.className}
								matchClass={null}
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

			if (props.children.props) {
				const node = props.children.props.children;
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

// ### Prop Types
Highlighter.propTypes = {
	/**
	 * The full string to display.
	 */
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.node,
	]),
	className: PropTypes.string,
	/**
	 * The string of text (or Regular Expression) to highlight.
	 */
	search: PropTypes.any,
};

export default Highlighter;
