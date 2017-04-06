/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';

// ### ReactHighlighter
import ReactHighlighter from 'react-highlighter';

// ## Constants
import { HIGHLIGHTER } from '../../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

/**
 * A utility component that highlights occurrences of a particular pattern in its contents.
 */
const Highlighter = (props) => {
	if (props.search) {
		return (
			<ReactHighlighter className={props.className} matchClass={null} matchElement="mark" search={props.search}>
				{props.children}
			</ReactHighlighter>
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
		React.PropTypes.string,
		React.PropTypes.number,
		React.PropTypes.bool
	]),
	className: PropTypes.string,
	/**
	 * The string of text (or Regular Expression) to highlight.
	 */
	search: PropTypes.any
};

module.exports = Highlighter;
