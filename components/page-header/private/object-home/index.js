'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mediaObject = require('../../../media-object');

var _mediaObject2 = _interopRequireDefault(_mediaObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var displayName = 'PageHeaderObjectHome'; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var propTypes = {
	/**
  * Content to appear on the right hand side of the page header
  */
	contentRight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
	/**
  * Icon node passed by PageHeader
  */
	icon: _propTypes2.default.node,
	/**
  * Info node passed by PageHeader
  */
	info: _propTypes2.default.node,
	/**
  * Heading above title
  */
	label: _propTypes2.default.node,
	/**
  * Nav content which appears in the upper right hand corner.
  */
	navRight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
	/**
  * Title node passed by PageHeader
  */
	title: _propTypes2.default.node
};

var ObjectHome = function ObjectHome(props) {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			{ className: 'slds-grid' },
			_react2.default.createElement(
				'div',
				{ className: 'slds-col slds-has-flexi-truncate' },
				_react2.default.createElement(_mediaObject2.default, {
					body: _react2.default.createElement(
						'div',
						null,
						props.label,
						props.title
					),
					className: 'slds-no-space slds-grow',
					figure: props.icon
				})
			),
			_react2.default.createElement(
				'div',
				{ className: 'slds-col slds-no-flex slds-grid slds-align-top slds-p-bottom--xx-small' },
				props.navRight
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'slds-grid' },
			_react2.default.createElement(
				'div',
				{ className: 'slds-col slds-align-bottom' },
				props.info
			),
			_react2.default.createElement(
				'div',
				{ className: 'slds-col slds-no-flex slds-grid slds-align-bottom' },
				props.contentRight
			)
		)
	);
};

ObjectHome.displayName = displayName;
ObjectHome.propTypes = propTypes;

exports.default = ObjectHome;