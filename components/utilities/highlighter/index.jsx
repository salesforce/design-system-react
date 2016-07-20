/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
