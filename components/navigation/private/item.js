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

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ### isFunction
var handleClick = function handleClick(event, props) {
	if ((0, _lodash2.default)(props.onSelect)) {
		props.onSelect(event, {
			item: props.item
		});
	}
};

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var Item = function Item(props) {
	return _react2.default.createElement(
		'li',
		{ className: (0, _classnames2.default)({ 'slds-is-active': props.isSelected }) },
		_react2.default.createElement(
			'a',
			{
				'data-id': props.item.id,
				href: props.item.url || 'javascript:void(0);' // eslint-disable-line no-script-url
				, className: 'slds-navigation-list--vertical__action slds-text-link--reset',
				'aria-describedby': props.categoryId,
				onClick: function onClick(event) {
					handleClick(event, props);
				}
			},
			props.item.label
		)
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Item.displayName = _constants.NAVIGATION_ITEM;

// ### Prop Types
Item.propTypes = {
	/**
  * Item to be rendered.
  */
	item: _propTypes2.default.shape({
		id: _propTypes2.default.string.isRequired,
		label: _propTypes2.default.string.isRequired,
		url: _propTypes2.default.string
	}),
	/**
  * Whether item is selected or not.
  */
	isSelected: _propTypes2.default.bool,
	/**
  * ID of the category this item belongs to.
  */
	categoryId: _propTypes2.default.string.isRequired,
	/**
  * Function that will run whenever an item is selected.
  */
	onSelect: _propTypes2.default.func
};

Item.defaultProps = {
	isSelected: false
};

exports.default = Item;