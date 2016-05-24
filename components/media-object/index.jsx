/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable indent */

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classnames from 'classnames';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

import { MEDIA_OBJECT } from '../utilities/constants';

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
export const cssClasses = {
	base: 'slds-media',
	figure: 'slds-media__figure',
	body: 'slds-media__body'
};

/**
 * A media object should be used when text and a figure next to each other is needed.
 */
const MediaObject = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: MEDIA_OBJECT,
	// ### Prop Types
	propTypes: {
		/**
		 * Allows truncation in nested flexbox containers. Often the body may need to be truncated.
		 */
		canTruncate: PropTypes.bool,
		/**
		 * Class names to be added to the Media Object.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * The body is often text such as a heading or paragraph.
		 */
		body: PropTypes.node,
		/**
		 * The figure is the optional visualization of the text within the body.
		 */
		figure: PropTypes.node,
		/**
		 * Vertically centers the body with the middle of the figure.
		 */
		verticalCenter: PropTypes.bool
	},

	_renderMediaFigure () {
		// icon should be size small
		return (
			<div className={cssClasses.figure}>
				{this.props.figure}
			</div>
		);
	},

	render () {
		let mediaFigure = null;
		if (this.props.figure) {
			mediaFigure = this._renderMediaFigure();
		}

		return (
			<div className={
					classnames(
						cssClasses.base,
						{
							'slds-media--center': this.props.verticalCenter,
							'slds-has-flexi-truncate': this.props.canTruncate
							}, this.props.className)}>
				{mediaFigure}
				<div className={cssClasses.body}>
					{this.props.body}
				</div>
			</div>
		)
	}
});

export default MediaObject;
