'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.truncate = truncate;
exports.textContent = textContent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

function truncate(_ref) {
	var _ref$inputString = _ref.inputString;
	var inputString = _ref$inputString === undefined ? '' : _ref$inputString;
	var _ref$maxLength = _ref.maxLength;
	var maxLength = _ref$maxLength === undefined ? 140 : _ref$maxLength;
	var _ref$truncationChars = _ref.truncationChars;
	var truncationChars = _ref$truncationChars === undefined ? '...' : _ref$truncationChars;
	var _ref$startingLength = _ref.startingLength;
	var startingLength = _ref$startingLength === undefined ? 0 : _ref$startingLength;

	var outputString = void 0;

	if (inputString.length <= maxLength) {
		outputString = inputString;
	} else {
		(function () {
			var words = inputString.split(' ');
			var length = startingLength + truncationChars.length - 1;

			outputString = words.reduce(function (combined, word) {
				length += word.length + 1;

				if (length <= maxLength) {
					combined.push(word);
				}

				return combined;
			}, []).join(' ');

			outputString += truncationChars;
		})();
	}

	return outputString;
}

function textContentArray(child) {
	var text = [];

	if (typeof child === 'string' || typeof child === 'number') {
		text.push(child);
	} else if (Array.isArray(child)) {
		text.push(child.forEach(textContentArray));
	} else if (child && child.props) {
		var children = child.props.children;

		text.push(textContentArray(children));
	}

	return text;
}

function textContent(child) {
	return textContentArray(child).join('');
}

var TextTruncate = function (_Component) {
	_inherits(TextTruncate, _Component);

	function TextTruncate() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret2;

		_classCallCheck(this, TextTruncate);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret2 = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TextTruncate)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onResize = function () {
			window.requestAnimationFrame(_this.update.bind(_this));
		}, _this.update = function () {
			_this.forceUpdate();
		}, _temp), _possibleConstructorReturn(_this, _ret2);
	}

	_createClass(TextTruncate, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var canvas = document.createElement('canvas');
			var docFragment = document.createDocumentFragment();
			var style = window.getComputedStyle(this.refs.scope);
			var font = [style['font-weight'], style['font-style'], style['font-size'], style['font-family']].join(' ');

			docFragment.appendChild(canvas);
			this.canvas = canvas.getContext('2d');
			this.canvas.font = font;
			this.forceUpdate();
			window.addEventListener('resize', this.onResize);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('resize', this.onResize);
		}
	}, {
		key: 'measureWidth',
		value: function measureWidth(text) {
			return this.canvas.measureText(text).width;
		}
	}, {
		key: 'getRenderText',
		value: function getRenderText() {
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

			var scopeWidth = this.refs.scope.getBoundingClientRect().width;

			// return if display:none
			if (scopeWidth === 0) {
				return null;
			}

			// return if all of text can be displayed
			if (scopeWidth >= this.measureWidth(text)) {
				return _react2.default.createElement(
					'div',
					props,
					text
				);
			}

			var childText = '';
			if (textTruncateChild && typeof textTruncateChild.type === 'string') {
				if (['span', 'a'].includes(textTruncateChild.type)) {
					childText = textTruncateChild.props.children;
				}
			}

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
				var ext = void 0;
				var prefixWidth = 0;
				if (prefix && displayLine === line - 1) {
					ext = prefix;
					prefixWidth = prefix.length - 1;
				} else if (!displayLine) {
					ext = truncateText + ' ' + childText;

					if (suffix) {
						ext += suffix;
					}
				}

				while (currentPos <= maxTextLength) {
					truncatedText = text.substr(startPos, currentPos);
					width = this.measureWidth(truncatedText + ext) + prefixWidth;
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
							width = this.measureWidth(truncatedText + ext) + prefixWidth;
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

			if (startPos === maxTextLength) {
				return text;
			}

			var outputText = '' + text.substr(0, startPos) + truncateText + ' ';
			if (wrapper) {
				return wrapper(outputText);
			}

			return _react2.default.createElement(
				'div',
				props,
				outputText,
				textTruncateChild
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var text = _props2.text;
			var containerClassName = _props2.containerClassName;


			var renderText = text;
			if (this.refs.scope) {
				renderText = this.getRenderText();
			}

			return _react2.default.createElement(
				'div',
				{ ref: 'scope', className: containerClassName, style: { overflow: 'hidden' } },
				renderText
			);
		}
	}]);

	return TextTruncate;
}(_react.Component);

TextTruncate.propTypes = {
	containerClassName: _react2.default.PropTypes.string,
	line: _react2.default.PropTypes.number,
	prefix: _react2.default.PropTypes.string,
	suffix: _react2.default.PropTypes.string,
	text: _react2.default.PropTypes.string,
	textTruncateChild: _react2.default.PropTypes.node,
	truncateText: _react2.default.PropTypes.string,
	wrapper: _react2.default.PropTypes.func
};
TextTruncate.defaultProps = {
	line: 1,
	text: '',
	truncateText: '…'
};
exports.default = TextTruncate;