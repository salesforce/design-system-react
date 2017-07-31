'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utilityIcon = require('../../../components/utilities/utility-icon');

var _utilityIcon2 = _interopRequireDefault(_utilityIcon);

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _airbnbPropTypes = require('airbnb-prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	/**
  * **Assistive text for accessibility**
  * This object is merged with the default props object on every render.
  * * `pressDeleteOrBackspace`: Informs user of keyboard keys to press in order to remove a pill
  */
	assistiveText: (0, _airbnbPropTypes.shape)({
		pressDeleteOrBackspace: _propTypes2.default.string
	}),
	/*
  * Pills are often used for selection of a type of entity such as days in a daypicker. This prop allows you to pass in data that will be passed back to the event handler.
  */
	eventData: _propTypes2.default.object,
	/*
  * Pill Label
  */
	labels: (0, _airbnbPropTypes.shape)({
		label: _propTypes2.default.string,
		remove: _propTypes2.default.string,
		title: _propTypes2.default.string
	}),
	/*
  * Pill Title
  */
	title: _propTypes2.default.string,
	/*
  * Callback called when pill is clicked, delete is pressed, or backspace is pressed.
  */
	events: (0, _airbnbPropTypes.shape)({
		onRequestRemove: _propTypes2.default.func
	})
}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var defaultProps = {
	assistiveText: /* eslint-disable jsx-a11y/no-static-element-interactions */(0, _airbnbPropTypes.shape)({
		pressDeleteOrBackspace: 'Press delete or backspace to remove'
	}),
	labels: {
		remove: 'Remove'
	},
	events: {}
};

var Pill = function Pill(props) {
	var assistiveText = (0, _lodash2.default)({}, defaultProps.assistiveText, props.assistiveText);
	var labels = (0, _lodash2.default)({}, defaultProps.labels, props.labels);

	return _react2.default.createElement(
		'span',
		{
			className: 'slds-pill',
			role: 'option',
			tabIndex: 0,
			'aria-selected': 'true'
		},
		_react2.default.createElement(
			'span',
			{ className: 'slds-pill__label', title: labels.title },
			labels.label
		),
		props.events.onRequestRemove ? _react2.default.createElement(
			'span',
			{
				className: 'slds-icon_container slds-pill__remove',
				title: labels.remove,
				onClick: function onClick(event) {
					props.events.onRequestRemove(event, {
						events: props.events,
						eventData: props.eventData
					});
				}
			},
			_react2.default.createElement(_utilityIcon2.default, {
				'aria-hidden': 'true',
				category: 'utility',
				className: 'slds-icon slds-icon--x-small slds-icon-text-default',
				name: 'close'
			}),
			_react2.default.createElement(
				'span',
				{ className: 'slds-assistive-text' },
				assistiveText.pressDeleteOrBackspace
			)
		) : null
	);
};

Pill.displayName = 'Pill';
Pill.propTypes = propTypes;
Pill.defaultProps = defaultProps;

exports.default = Pill;