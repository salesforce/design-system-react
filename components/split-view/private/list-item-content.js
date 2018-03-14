'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DISPLAY_NAME = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var DISPLAY_NAME = exports.DISPLAY_NAME = 'SLDSSplitViewListItemContent';

var propTypes = {
	/**
  * **Item to be displayed**
  * * `label`: The main label displayed on the top left.
  * * `topRightText`: The text displayed on the top right.
  * * `bottomLeftText`: The text displayed on the bottom left.
  * * `bottomRightText`: The text displayed on the bottom right.
  */
	item: _propTypes2.default.shape({
		label: _propTypes2.default.string,
		topRightText: _propTypes2.default.string,
		bottomLeftText: _propTypes2.default.string,
		bottomRightText: _propTypes2.default.string
	})
};

var defaultProps = {};

var SplitViewListItemContent = function SplitViewListItemContent(_ref) {
	var item = _ref.item;
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			{ className: 'slds-grid slds-wrap' },
			_react2.default.createElement(
				'span',
				{
					className: 'slds-truncate slds-text-body_regular slds-text-color_default',
					title: item.label
				},
				item.label
			),
			_react2.default.createElement(
				'span',
				{
					className: 'slds-truncate slds-col_bump-left',
					title: item.topRightText
				},
				item.topRightText
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'slds-grid slds-wrap' },
			_react2.default.createElement(
				'span',
				{ className: 'slds-truncate', title: item.bottomLeftText },
				item.bottomLeftText
			),
			_react2.default.createElement(
				'span',
				{
					className: 'slds-truncate slds-col_bump-left',
					title: item.bottomLeftText
				},
				item.bottomRightText
			)
		)
	);
};

SplitViewListItemContent.displayName = DISPLAY_NAME;
SplitViewListItemContent.propTypes = propTypes;
SplitViewListItemContent.defaultProps = defaultProps;

exports.default = SplitViewListItemContent;