define(['module', 'react', './index', '../../icon/input-icon', '../../../utilities', '../../../utilities/constants'], function (module, _react, _index, _inputIcon, _utilities, _constants) {
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

	var handleKeyDown = function handleKeyDown(event, onSearch) {
		if (event.keyCode === _utilities.KEYS.ENTER) {
			_utilities.EventUtil.trapImmediate(event);
			onSearch(event);
		}
	};

	/**
  * A `Search` is an `Input` which renders the search icon by default. It can be cleared, too. All `Input` props not specified as props already may be used with this component and will override defaults.
  */
	var Search = function Search(_ref) {
		var assistiveText = _ref.assistiveText;
		var clearable = _ref.clearable;
		var onClear = _ref.onClear;
		var onSearch = _ref.onSearch;
		var placeholder = _ref.placeholder;

		var props = _objectWithoutProperties(_ref, ['assistiveText', 'clearable', 'onClear', 'onSearch', 'placeholder']);

		return _react2.default.createElement(_index2.default, _extends({
			assistiveText: assistiveText,
			iconLeft: _react2.default.createElement(_inputIcon2.default, {
				assistiveText: 'Search',
				category: 'utility',
				name: 'search',
				onClick: onSearch
			}),
			iconRight: clearable ? _react2.default.createElement(_inputIcon2.default, {
				assistiveText: 'Clear',
				category: 'utility',
				name: 'clear',
				onClick: onClear
			}) : null,
			onKeyDown: onSearch ? function (event) {
				return handleKeyDown(event, onSearch);
			} : null,
			placeholder: placeholder
		}, props));
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
   * This event fires when enter is pressed in the `input` or the search button is clicked.
   */
		onSearch: _react2.default.PropTypes.func,
		/**
   * Placeholder for the input
   */
		placeholder: _react.PropTypes.string
	};

	module.exports = Search;
});