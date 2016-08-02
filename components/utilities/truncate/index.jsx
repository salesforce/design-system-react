/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';

import debounce from 'lodash.debounce';
import memoize from 'lodash.memoize';

const canvas = document.createElement('canvas');
const docFragment = document.createDocumentFragment();
docFragment.appendChild(canvas);

const onDebouncedResize = debounce((callback) => window.requestAnimationFrame(callback), 100);

const measureWidth = memoize((text, font) => {
	const canvasContext = canvas.getContext('2d');
	canvasContext.font = font;

	return canvasContext.measureText(text).width;
});

const TextTruncate = React.createClass({
	displayName: 'TextTruncate',

	propTypes: {
		containerClassName: React.PropTypes.string,
		line: React.PropTypes.number,
		prefix: React.PropTypes.string,
		suffix: React.PropTypes.string,
		text: React.PropTypes.string,
		textTruncateChild: React.PropTypes.node,
		truncateText: React.PropTypes.string,
		wrapper: React.PropTypes.func
	},

	getDefaultProps () {
		return {
			line: 1,
			text: '',
			truncateText: '…'
		};
	},

	componentDidMount () {
		const style = window.getComputedStyle(this.refs.scope);
		this.font = [
			style['font-weight'],
			style['font-style'],
			style['font-size'],
			style['font-family']
		].join(' ');

		this.forceUpdate();

		window.addEventListener('resize', this.onResize, false);
	},

	componentWillUnmount () {
		window.removeEventListener('resize', this.onResize, false);
	},

	onResize () {
		onDebouncedResize(this.update);
	},

	update () {
		this.forceUpdate();
	},

	getRenderText () {
		const {
			containerClassName, // eslint-disable-line no-unused-vars
			line,
			prefix,
			suffix,
			text,
			textTruncateChild,
			truncateText,
			wrapper,
			...props
		} = this.props;

		const scopeWidth = this.refs.scope.getBoundingClientRect().width;

		// return if display:none
		if (scopeWidth === 0) {
			return null;
		}

		let child;
		let outputText = text;

		// return if all of text can be displayed
		if (scopeWidth < measureWidth(text, this.font)) {
			let currentPos = 1;
			const maxTextLength = text.length;
			let truncatedText = '';
			let splitPos = 0;
			let startPos = 0;
			let displayLine = line;
			let width = 0;
			let lastIsEng = false;
			let lastSpaceIndex = -1;

			while (displayLine--) {
				let ext = '';
				let prefixWidth = 0;

				if (prefix && displayLine === line - 1) {
					ext += ` ${prefix}`;
					prefixWidth = (prefix.length);
				}

				if (!displayLine) {
					ext += truncateText;

					if (suffix) {
						ext += ` ${suffix}`;
					}
				}

				while (currentPos <= maxTextLength) {
					truncatedText = text.substr(startPos, currentPos);
					width = measureWidth(truncatedText + ext, this.font) + prefixWidth;

					if (width < scopeWidth) {
						splitPos = text.indexOf(' ', currentPos + 1);
						if (splitPos === -1) {
							currentPos += 1;
							lastIsEng = false;
						} else {
							lastIsEng = true;
							currentPos = splitPos;
						}
					} else {
						do {
							currentPos--;
							truncatedText = text.substr(startPos, currentPos);
							if (truncatedText[truncatedText.length - 1] === ' ') {
								truncatedText = text.substr(startPos, currentPos - 1);
							}
							if (lastIsEng) {
								lastSpaceIndex = truncatedText.lastIndexOf(' ');
								if (lastSpaceIndex > -1) {
									currentPos = lastSpaceIndex;
									truncatedText = text.substr(startPos, currentPos);
								}
							}
							width = measureWidth(truncatedText + ext, this.font) + prefixWidth;
						} while (width >= scopeWidth);
						startPos += currentPos;
						break;
					}
				}

				if (currentPos >= maxTextLength) {
					startPos = maxTextLength;
					break;
				}
			}

			if (startPos !== maxTextLength) {
				outputText = `${text.substr(0, startPos)}${truncateText} `;
				child = textTruncateChild;
			}
		}

		if (wrapper) {
			return wrapper(outputText, child);
		}

		return (
			<div {...props}>
				{outputText}
				{child}
			</div>
		);
	},

	render () {
		const {
			text,
			containerClassName
		} = this.props;

		let renderText = text;
		if (this.refs.scope) {
			renderText = this.getRenderText();
		}

		return (
			<div ref="scope" className={containerClassName} style={{ overflow: 'hidden' }}>
				{renderText}
			</div>
		);
	}
});

export default TextTruncate;
