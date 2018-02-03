'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _input = require('../forms/input');

var _input2 = _interopRequireDefault(_input);

var _inputIcon = require('../icon/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React


/**
 * A default filter or search input for Cards that contain items.
 */
var Filter = function Filter(props) {
	var id = props.id,
	    placeholder = props.placeholder,
	    onChange = props.onChange,
	    rest = _objectWithoutProperties(props, ['id', 'placeholder', 'onChange']);

	return _react2.default.createElement(_input2.default, _extends({}, rest, {
		assistiveText: { label: placeholder },
		iconLeft: _react2.default.createElement(_inputIcon2.default, { name: 'search', category: 'utility' }),
		id: id,
		onChange: onChange,
		placeholder: placeholder
	}));
};

// ### Display Name
// Always use the canonical component name as the React display name.
Filter.displayName = _constants.CARD_FILTER;

// ### Prop Types
Filter.propTypes = {
	/**
  * The HTML `id` from the card with a suffixe.
  */
	id: _propTypes2.default.string,
	/**
  * This callback fires when the input changes.
  */
	onChange: _propTypes2.default.func,
	/**
  * Text present in input until the user enters text. This text will also be used for a visually hidden label on the filter `input` element for accessibility.
  */
	placeholder: _propTypes2.default.string.isRequired
};

Filter.defaultProps = {
	placeholder: 'Find in List'
};

exports.default = Filter;