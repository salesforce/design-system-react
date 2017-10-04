'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	/*
  * Assistive Text to use instead of a visible label
  */
	assistiveText: _propTypes2.default.object,
	/*
  * Id of the input associated with this label
  */
	htmlFor: _propTypes2.default.string,
	/*
  * Input Label
  */
	label: _propTypes2.default.string,
	/*
  * Applies label styling for a required form element
  */
	required: _propTypes2.default.bool,
	/**
  * Changes markup of label.
  */
	variant: _propTypes2.default.oneOf(['base', 'static'])
}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var defaultProps = {
	variant: 'base'
};

/*
 * Form label. This returns null if there is no label text (hidden or shown)
 */
var Label = function Label(props) {
	var labelText = props.label || props.assistiveText && props.assistiveText.label; // One of these is required to pass accessibility tests

	var subRenders = {
		base: _react2.default.createElement(
			'label',
			{
				className: (0, _classnames2.default)('slds-form-element__label', {
					'slds-assistive-text': props.assistiveText && !props.label
				}),
				htmlFor: props.htmlFor
			},
			props.required && _react2.default.createElement(
				'abbr',
				{ className: 'slds-required', title: 'required' },
				'*'
			),
			labelText
		),
		static: _react2.default.createElement(
			'span',
			{ className: 'slds-form-element__label' },
			labelText
		)
	};

	return labelText ? subRenders[props.variant] : null;
};

Label.displayName = 'Label';
Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

exports.default = Label;