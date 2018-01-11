'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.memoize');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var canvas = document.createElement('canvas');
var docFragment = document.createDocumentFragment();
docFragment.appendChild(canvas);
var canvasContext = canvas.getContext('2d');

var measureWidth = (0, _lodash2.default)(function (text, font) {
	canvasContext.font = font;

	return canvasContext.measureText(text).width;
});

var TextTruncate = (0, _createReactClass2.default)({
	displayName: 'TextTruncate',

	propTypes: {
		containerClassName: _propTypes2.default.string,
		line: _propTypes2.default.number,
		prefix: _propTypes2.default.string,
		suffix: _propTypes2.default.string,
		text: _propTypes2.default.string,
		textTruncateChild: _propTypes2.default.node,
		truncateText: _propTypes2.default.string,
		wrapper: _propTypes2.default.func
	},

	getDefaultProps: function getDefaultProps() {
		return {
			line: 1,
			text: '',
			truncateText: '…'
		};
	},
	getInitialState: function getInitialState() {
		return {};
	},
	onResize: function onResize() {
		this.update(this.props);
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener('resize', this.onResize, false);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.update(nextProps);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('resize', this.onResize, false);
	},
	update: function update(nextProps) {
		this.getRenderText(this.scope, nextProps);
	},
	getRenderText: function getRenderText(ref, nextProps) {
		if (!ref) {
			return;
		}

		this.scope = ref;

		// nextProps will be undefined for resize events, but will change if search or other props are changed
		var propsToRender = void 0;
		if (nextProps) {
			propsToRender = nextProps;
		} else {
			propsToRender = this.props;
		}

		var _propsToRender = propsToRender,
		    containerClassName = _propsToRender.containerClassName,
		    line = _propsToRender.line,
		    prefix = _propsToRender.prefix,
		    suffix = _propsToRender.suffix,
		    text = _propsToRender.text,
		    textTruncateChild = _propsToRender.textTruncateChild,
		    truncateText = _propsToRender.truncateText,
		    wrapper = _propsToRender.wrapper,
		    props = _objectWithoutProperties(_propsToRender, ['containerClassName', 'line', 'prefix', 'suffix', 'text', 'textTruncateChild', 'truncateText', 'wrapper']);

		var scopeWidth = this.scope.getBoundingClientRect().width;
		var style = window.getComputedStyle(this.scope);
		var font = [style['font-weight'], style['font-style'], style['font-size'], style['font-family']].join(' ');

		// return if display:none
		if (scopeWidth === 0) {
			this.setState({ renderText: null });
			return;
		}

		var child = void 0;
		var outputText = text;

		// return if all of text can be displayed
		if (scopeWidth < measureWidth(text, font)) {
			var currentPos = 1;
			var maxTextLength = text.length;
			var truncatedText = '';
			var splitPos = 0;
			var startPos = 0;
			var displayLine = line;
			var width = 0;
			var lastIsEng = false;
			var lastSpaceIndex = -1;

			while (displayLine--) {
				var ext = '';
				var extraWidthDueToPrefixStyle = 0;

				if (prefix && displayLine === line - 1) {
					ext += ' ' + prefix;
					// MAGIC NUMBER: (width at letter-spacing of 0.25rems - width at normal) / number of letters
					extraWidthDueToPrefixStyle = prefix.length * 0.66;
				}

				if (!displayLine) {
					ext += truncateText;

					if (suffix) {
						ext += ' ' + suffix;
					}
				}

				while (currentPos <= maxTextLength) {
					truncatedText = text.substr(startPos, currentPos);
					width = measureWidth(truncatedText + ext, font) + extraWidthDueToPrefixStyle;

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
						var lastWidth = 0;
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
							width = measureWidth(truncatedText + ext, font) + extraWidthDueToPrefixStyle;
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
			}

			if (startPos !== maxTextLength) {
				outputText = '' + text.substr(0, startPos) + truncateText + ' ';
				child = textTruncateChild;
			}
		}

		var renderText = void 0;
		if (wrapper) {
			renderText = wrapper(outputText, child);
		} else {
			renderText = _react2.default.createElement(
				'div',
				props,
				outputText,
				child
			);
		}

		this.setState({ renderText: renderText });
	},
	render: function render() {
		var containerClassName = this.props.containerClassName;

		// inline style override

		return _react2.default.createElement(
			'div',
			{
				ref: this.getRenderText,
				className: containerClassName,
				style: { overflow: 'hidden' }
			},
			this.state.renderText
		);
	}
});

exports.default = TextTruncate;