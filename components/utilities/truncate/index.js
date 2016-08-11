define(['exports', 'react', 'lodash.memoize'], function (exports, _react, _lodash) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	var canvas = document.createElement('canvas');
	var docFragment = document.createDocumentFragment();
	docFragment.appendChild(canvas);
	var canvasContext = canvas.getContext('2d');

	var measureWidth = (0, _lodash2.default)(function (text, font) {
		canvasContext.font = font;

		return canvasContext.measureText(text).width;
	});

	var TextTruncate = _react2.default.createClass({
		displayName: 'TextTruncate',

		propTypes: {
			containerClassName: _react2.default.PropTypes.string,
			line: _react2.default.PropTypes.number,
			prefix: _react2.default.PropTypes.string,
			suffix: _react2.default.PropTypes.string,
			text: _react2.default.PropTypes.string,
			textTruncateChild: _react2.default.PropTypes.node,
			truncateText: _react2.default.PropTypes.string,
			wrapper: _react2.default.PropTypes.func
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
		componentDidMount: function componentDidMount() {
			window.addEventListener('resize', this.update, false);
		},
		componentWillReceiveProps: function componentWillReceiveProps() {
			this.update();
		},
		componentWillUnmount: function componentWillUnmount() {
			window.removeEventListener('resize', this.update, false);
		},
		update: function update() {
			if (this.scope) this.getRenderText(this.scope);
		},
		getRenderText: function getRenderText(ref) {
			if (!ref) {
				return;
			}

			this.scope = ref;

			var _props = this.props;
			var containerClassName = _props.containerClassName;
			var // eslint-disable-line no-unused-vars
			line = _props.line;
			var prefix = _props.prefix;
			var suffix = _props.suffix;
			var text = _props.text;
			var textTruncateChild = _props.textTruncateChild;
			var truncateText = _props.truncateText;
			var wrapper = _props.wrapper;

			var props = _objectWithoutProperties(_props, ['containerClassName', 'line', 'prefix', 'suffix', 'text', 'textTruncateChild', 'truncateText', 'wrapper']);

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
				{ ref: this.getRenderText, className: containerClassName, style: { overflow: 'hidden' } },
				this.state.renderText
			);
		}
	});

	exports.default = TextTruncate;
});