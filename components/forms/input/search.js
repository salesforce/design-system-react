'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

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