/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { Component, type ReactNode } from 'react';

import memoize from 'memoize-one';

const documentDefined = typeof document !== 'undefined';

let canvas: HTMLCanvasElement | undefined;
let docFragment: DocumentFragment | undefined;
let canvasContext: CanvasRenderingContext2D | null;
let measureWidth: (text: string, font: string) => number = () => 0;

if (documentDefined) {
	canvas = document.createElement('canvas');
	if (canvas.getContext) {
		docFragment = document.createDocumentFragment();
		docFragment.appendChild(canvas);
		canvasContext = canvas.getContext('2d');
		measureWidth = memoize((text: string, font: string) => {
			if (!canvasContext) {
				return 0;
			}
			canvasContext.font = font;
			return canvasContext.measureText(text).width;
		});
	}
}

export interface TruncateProps {
	containerClassName?: string;
	line?: number;
	prefix?: string;
	suffix?: string;
	text?: string;
	textTruncateChild?: ReactNode;
	truncateText?: string;
	wrapper?: (outputText: string, child?: ReactNode) => ReactNode;
	// Any additional props are spread onto the rendered element.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

interface TruncateState {
	renderText?: ReactNode;
}

class TextTruncate extends Component<TruncateProps, TruncateState> {
	static displayName = 'TextTruncate';

	static defaultProps: Partial<TruncateProps> = {
		line: 1,
		text: '',
		truncateText: '…',
	};

	state: TruncateState = {};

	scope: HTMLElement | null = null;

	componentDidMount() {
		window.addEventListener('resize', this.onResize, false);
	}

	componentDidUpdate(nextProps: TruncateProps) {
		if (nextProps.text !== this.props.text) {
			this.update(nextProps);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize, false);
	}

	onResize = () => {
		this.update(this.props);
	};

	getRenderText = (ref: HTMLElement | null, nextProps?: TruncateProps) => {
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
			containerClassName, // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars
			line,
			prefix,
			suffix,
			text,
			textTruncateChild,
			truncateText,
			wrapper,
			...props
		} = propsToRender;

		const resolvedText = text ?? '';
		const resolvedTruncateText = truncateText ?? '…';
		const resolvedLine = line ?? 1;

		const scopeWidth = this.scope.getBoundingClientRect().width;
		const style = window.getComputedStyle(this.scope);
		const font = [
			style['font-weight' as keyof CSSStyleDeclaration],
			style['font-style' as keyof CSSStyleDeclaration],
			style['font-size' as keyof CSSStyleDeclaration],
			style['font-family' as keyof CSSStyleDeclaration],
		].join(' ');

		// return if display:none
		if (scopeWidth === 0) {
			this.setState({ renderText: null });
			return;
		}

		let child: ReactNode;
		let outputText = resolvedText;

		// return if all of text can be displayed
		if (scopeWidth < measureWidth(resolvedText, font)) {
			let currentPos = 1;
			const maxTextLength = resolvedText.length;
			let truncatedText = '';
			let splitPos = 0;
			let startPos = 0;
			let displayLine = resolvedLine;
			let width = 0;
			let lastIsEng = false;
			let lastSpaceIndex = -1;

			while (displayLine !== 0) {
				let ext = '';
				let extraWidthDueToPrefixStyle = 0;

				if (prefix && displayLine === resolvedLine - 1) {
					ext += ` ${prefix}`;
					// MAGIC NUMBER: (width at letter-spacing of 0.25rems - width at normal) / number of letters
					extraWidthDueToPrefixStyle = prefix.length * 0.66;
				}

				if (!displayLine) {
					ext += resolvedTruncateText;

					if (suffix) {
						ext += ` ${suffix}`;
					}
				}

				while (currentPos <= maxTextLength) {
					truncatedText = resolvedText.substr(startPos, currentPos);
					width =
						measureWidth(truncatedText + ext, font) +
						extraWidthDueToPrefixStyle;

					if (width < scopeWidth) {
						splitPos = resolvedText.indexOf(' ', currentPos + 1);
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
							truncatedText = resolvedText.substr(startPos, currentPos);
							if (truncatedText[truncatedText.length - 1] === ' ') {
								truncatedText = resolvedText.substr(startPos, currentPos - 1);
							}
							if (lastIsEng) {
								lastSpaceIndex = truncatedText.lastIndexOf(' ');
								if (lastSpaceIndex > -1) {
									currentPos = lastSpaceIndex;
									truncatedText = resolvedText.substr(startPos, currentPos);
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
				outputText = `${resolvedText.substr(0, startPos)}${resolvedTruncateText} `;
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
	};

	update = (nextProps?: TruncateProps) => {
		this.getRenderText(this.scope, nextProps);
	};

	render() {
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
	}
}

export default TextTruncate;
