define(['module', 'react', './index', '../../icon/input-icon', '../../../utilities/constants'], function (module, _react, _index, _inputIcon, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _index2 = _interopRequireDefault(_index);

	var _inputIcon2 = _interopRequireDefault(_inputIcon);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	/**
  * A `Search` is is an `Input` which renders the search icon by default. It can be cleared, too.
  */
	var Search = function Search(props) {
		var assistiveText = props.assistiveText;
		var clearable = props.clearable;
		var onClear = props.onClear;
		var placeholder = props.placeholder;

		var rest = _objectWithoutProperties(props, ['assistiveText', 'clearable', 'onClear', 'placeholder']);

		return _react2.default.createElement(_index2.default, _extends({
			assistiveText: assistiveText,
			iconLeft: _react2.default.createElement(_inputIcon2.default, {
				assistiveText: 'Search',
				category: 'utility',
				name: 'search'
			}),
			iconRight: clearable ? _react2.default.createElement(_inputIcon2.default, {
				assistiveText: 'Clear',
				category: 'utility',
				name: 'clear',
				onClick: onClear
			}) : null,
			placeholder: placeholder
		}, rest));
	};

	Search.displayName = _constants.FORMS_SEARCH;

	Search.propTypes = {
		/**
   * Assistive text to search input
   */
		assistiveText: _react.PropTypes.string,
		/**
   * Adds a clear button to right side of the input
   */
		clearable: _react.PropTypes.bool,
		/**
   * Triggers when the clear button is clicked
   */
		onClear: _react.PropTypes.func,
		/**
   * Placeholder for the input
   */
		placeholder: _react.PropTypes.string
	};

	module.exports = Search;
});