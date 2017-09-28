'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _inputIcon = require('../../icon/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _keyCode = require('../../../utilities/key-code');

var _keyCode2 = _interopRequireDefault(_keyCode);

var _event = require('../../../utilities/event');

var _event2 = _interopRequireDefault(_event);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Search Component

// Wraps the input to default to a search style.

// ## Dependencies

// ### React


// ## Children


// ### Event Helpers


// ## Constants


var handleKeyDown = function handleKeyDown(event, onSearch) {
	if (event.keyCode === _keyCode2.default.ENTER) {
		_event2.default.trapImmediate(event);
		onSearch(event);
	}
};

/**
 * A `Search` is an `Input` which renders the search icon by default. It can be cleared, too. All `Input` props not specified as props already may be used with this component and will override defaults.
 */
var Search = function Search(_ref) {
	var assistiveText = _ref.assistiveText,
	    clearable = _ref.clearable,
	    onClear = _ref.onClear,
	    onSearch = _ref.onSearch,
	    placeholder = _ref.placeholder,
	    props = _objectWithoutProperties(_ref, ['assistiveText', 'clearable', 'onClear', 'onSearch', 'placeholder']);

	return _react2.default.createElement(_index2.default, _extends({
		assistiveText: { label: assistiveText },
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
	assistiveText: _propTypes2.default.string,
	/**
  * Adds a clear button to right side of the input
  */
	clearable: _propTypes2.default.bool,
	/**
  * Triggers when the clear button is clicked
  */
	onClear: _propTypes2.default.func,
	/**
  * This event fires when enter is pressed in the `input` or the search button is clicked.
  */
	onSearch: _propTypes2.default.func,
	/**
  * Placeholder for the input
  */
	placeholder: _propTypes2.default.string
};

exports.default = Search;