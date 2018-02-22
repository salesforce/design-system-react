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

var _button = require('../../button');

var _button2 = _interopRequireDefault(_button);

var _highlighter = require('../../utilities/highlighter');

var _highlighter2 = _interopRequireDefault(_highlighter);

var _event = require('../../../utilities/event');

var _event2 = _interopRequireDefault(_event);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ### Event Helpers


// ### classNames
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tree Item Component

// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/tree/) in React.

// ## Dependencies

// ### React
var handleClick = function handleClick(event, props) {
	_event2.default.trap(event);

	if ((0, _lodash2.default)(props.onClick)) {
		props.onClick(event, {
			node: props.node,
			select: !props.node.selected,
			treeIndex: props.treeIndex
		});
	}
};

/**
 * A Tree Item is a non-branching node in a hierarchical list.
 */


// ## Constants


// ### isFunction
var Item = function Item(props) {
	var isSelected = props.node.selected;

	// TODO: Remove tabbing from anchor tag / add tabIndex={-1} when keyboard navigation is present.
	return _react2.default.createElement(
		'li',
		{
			id: props.treeId + '-' + props.node.id,
			role: 'treeitem',
			'aria-level': props.level
		},
		_react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-tree__item', {
					'slds-is-selected': isSelected
				}),
				'aria-selected': isSelected ? 'true' : 'false',
				onClick: function onClick(event) {
					handleClick(event, props);
				}
			},
			_react2.default.createElement(_button2.default, {
				assistiveText: '',
				iconName: 'chevronright',
				iconSize: 'small',
				variant: 'icon',
				className: 'slds-m-right--small slds-is-disabled',
				disabled: true
			}),
			_react2.default.createElement(
				'a',
				{
					href: 'javascript:void(0)'
					// eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
					, role: 'presentation',
					className: 'slds-truncate'
				},
				_react2.default.createElement(
					_highlighter2.default,
					{ search: props.searchTerm },
					props.label
				)
			)
		)
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Item.displayName = _constants.TREE_ITEM;

// ### Prop Types
Item.propTypes = {
	/**
  * HTML `id` of the wrapping container element joined with the `id` of the node. This will recursively increase as the tree depth increases.
  */
	htmlId: _propTypes2.default.string.isRequired,
	/**
  * The text of the tree item.
  */
	label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]).isRequired,
	/**
  * The number of nestings. Determines the ARIA level and style alignment.
  */
	level: _propTypes2.default.number.isRequired,
	/**
  * The current node that is being rendered.
  */
	node: _propTypes2.default.object.isRequired,
	/**
  * Function that will run whenever an item or branch is clicked.
  */
	onClick: _propTypes2.default.func,
	/**
  * Highlights term if found in node label
  */
	searchTerm: _propTypes2.default.string,
	/**
  * Unique id used for a prefix of all tree nodes
  */
	treeId: _propTypes2.default.string,
	/**
  * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
  */
	treeIndex: _propTypes2.default.string
};

Item.defaultProps = {
	selected: false
};

exports.default = Item;