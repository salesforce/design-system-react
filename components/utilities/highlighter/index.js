define(['module', 'react', 'react-highlighter', '../../../utilities/constants'], function (module, _react, _reactHighlighter, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _reactHighlighter2 = _interopRequireDefault(_reactHighlighter);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var PropTypes = _react2.default.PropTypes;


	/**
  * A utility component that highlights occurrences of a particular pattern in its contents.
  */
	var Highlighter = function Highlighter(props) {
		if (props.search) {
			return _react2.default.createElement(
				_reactHighlighter2.default,
				{ className: props.className, matchClass: null, matchElement: 'mark', search: props.search },
				props.children
			);
		}

		return _react2.default.createElement(
			'span',
			{ className: props.className },
			props.children
		);
	};

	// ### Display Name
	Highlighter.displayName = _constants.HIGHLIGHTER;

	// ### Prop Types
	Highlighter.propTypes = {
		/**
   * The full string to display.
   */
		children: PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool]),
		className: PropTypes.string,
		/**
   * The string of text (or Regular Expression) to highlight.
   */
		search: PropTypes.any
	};

	module.exports = Highlighter;
});