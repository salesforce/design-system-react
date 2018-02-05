/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

import memoize from 'lodash.memoize';

const canvas = document.createElement('canvas');
const docFragment = document.createDocumentFragment();
docFragment.appendChild(canvas);
const canvasContext = canvas.getContext('2d');

const measureWidth = memoize((text, font) => {
	canvasContext.font = font;

	return canvasContext.measureText(text).width;
});

const TextTruncate = createReactClass({
	displayName: 'TextTruncate',

	propTypes: {
		containerClassName: PropTypes.string,
		line: PropTypes.number,
		prefix: PropTypes.string,
		suffix: PropTypes.string,
		text: PropTypes.string,
		textTruncateChild: PropTypes.node,
		truncateText: PropTypes.string,
		wrapper: PropTypes.func,
	},

	getDefaultProps () {
		return {
			line: 1,
			text: '',
			truncateText: '…',
		};
	},

	getInitialState () {
		return {};
	},

	componentDidMount () {
		window.addEventListener('resize', this.onResize, false);
	},

	componentWillReceiveProps (nextProps) {
		this.update(nextProps);
	},

	componentWillUnmount () {
		window.removeEventListener('resize', this.onResize, false);
	},

	onResize () {
		this.update(this.props);
	},

	getRenderText (ref, nextProps) {
		if (!ref) {
			return;
		}

		this.scope = ref;

		// nextProps will be undefined for resize events, but will change if search or other props are changed
		let propsToRender;
		if (nextProps) {
			propsToRender = nextProps;
		} else {
			propsToRender = this.props;
		}

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
		} = propsToRender;

		const scopeWidth = this.scope.getBoundingClientRect().width;
		const style = window.getComputedStyle(this.scope);
		const font = [
			style['font-weight'],
			style['font-style'],
			style['font-size'],
			style['font-family'],
		].join(' ');

		// return if display:none
		if (scopeWidth === 0) {
			this.setState({ renderText: null });
			return;
		}

		let child;
		let outputText = text;

		// return if all of text can be displayed
		if (scopeWidth < measureWidth(text, font)) {
			let currentPos = 1;
			const maxTextLength = text.length;
			let truncatedText = '';
			let splitPos = 0;
			let startPos = 0;
			let displayLine = line;
			let width = 0;
			let lastIsEng = false;
			let lastSpaceIndex = -1;

			while (displayLine !== 0) {
				let ext = '';
				let extraWidthDueToPrefixStyle = 0;

				if (prefix && displayLine === line - 1) {
					ext += ` ${prefix}`;
					// MAGIC NUMBER: (width at letter-spacing of 0.25rems - width at normal) / number of letters
					extraWidthDueToPrefixStyle = prefix.length * 0.66;
				}

				if (!displayLine) {
					ext += truncateText;

					if (suffix) {
						ext += ` ${suffix}`;
					}
				}

				while (currentPos <= maxTextLength) {
					truncatedText = text.substr(startPos, currentPos);
					width =
						measureWidth(truncatedText + ext, font) +
						extraWidthDueToPrefixStyle;

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
						let lastWidth = 0;
						do {
							currentPos -= 1;
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
							width =
								measureWidth(truncatedText + ext, font) +
								extraWidthDueToPrefixStyle;
							if (width === lastWidth) {
								currentPos = 0;
								break;
							} else {
								lastWidth = width;
							}
						} while (width >= scopeWidth);
						startPos += currentPos;
						break;
					}
				}

				if (currentPos >= maxTextLength) {
					startPos = maxTextLength;
					break;
				}

				displayLine -= 1; // iterate
			}

			if (startPos !== maxTextLength) {
				outputText = `${text.substr(0, startPos)}${truncateText} `;
				child = textTruncateChild;
			}
		}

		let renderText;
		if (wrapper) {
			renderText = wrapper(outputText, child);
		} else {
			renderText = (
				<div {...props}>
					{outputText}
					{child}
				</div>
			);
		}

		this.setState({ renderText });
	},

	update (nextProps) {
		this.getRenderText(this.scope, nextProps);
	},

	render () {
		const { containerClassName } = this.props;

		// inline style override
		return (
			<div
				ref={this.getRenderText}
				className={containerClassName}
				style={{ overflow: 'hidden' }}
			>
				{this.state.renderText}
			</div>
		);
	},
});

export default TextTruncate;
