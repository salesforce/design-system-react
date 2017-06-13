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
		if (typeof props.children  === 'string') {
			children = <ReactHighlighter className={props.className} matchClass={null} matchElement="mark" search={props.search}>
							{props.children}
						</ReactHighlighter>;
		} else {
			const findString = (nodeArr) => {
				return nodeArr.map(element => {
					if (typeof element === 'string') {
						return (<ReactHighlighter key={element} className={props.className} matchClass={null} matchElement="mark" search={props.search}>
							{element}
						</ReactHighlighter>);
					} else {
						return element;
					}
				});
			};

			const node = props.children.props.children;
			children = node instanceof Array ? findString(node) : node;
		}


		return (
			<span>
				{children}
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
		PropTypes.node
	]),
	className: PropTypes.string,
	/**
	 * The string of text (or Regular Expression) to highlight.
	 */
	search: PropTypes.any
};

module.exports = Highlighter;
