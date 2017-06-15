'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _branch = require('./private/branch');

var _branch2 = _interopRequireDefault(_branch);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed. This is a controlled component, since visual state is present in the `nodes` data.
 */


// Similar to React's PropTypes check. When in development mode, it issues errors in the console about properties.


// Child components
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tree Component (PROTOTYPE)

// THIS IS A PROTOTYPE and does NOT meet accessibility standards. It implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/trees/) in React.

// ## Dependencies

// ### React
var Tree = function Tree(props) {
	// TODO: This may need to be cleaned up to alert a developer when they do both that the heading is hidden.
	(0, _checkProps2.default)(_constants.TREE, props);

	var assistiveText = props.assistiveText,
	    className = props.className,
	    heading = props.heading,
	    id = props.id,
	    listClassName = props.listClassName,
	    nodes = props.nodes,
	    onClick = props.onClick,
	    onExpandClick = props.onExpandClick,
	    onScroll = props.onScroll,
	    searchTerm = props.searchTerm,
	    listStyle = props.listStyle;

	// One of these is required to pass accessibility tests

	var headingText = assistiveText || heading;

	// Start the zero level branch--that is the tree root. There is no label for
	// the tree root, but is required by all other nodes
	return _react2.default.createElement(
		'div',
		{ id: id, className: (0, _classnames2.default)('slds-tree_container', className) /* role="application" */ },
		_react2.default.createElement(
			'h4',
			{
				className: (0, _classnames2.default)('slds-text-title--caps', { 'slds-assistive-text': assistiveText }),
				id: id + '__heading'
			},
			headingText
		),
		_react2.default.createElement(_branch2.default, {
			getNodes: props.getNodes,
			initalClassName: listClassName,
			htmlId: id,
			initialStyle: listStyle,
			level: 0,
			node: { nodes: nodes },
			onClick: onClick,
			onExpandClick: onExpandClick,
			onScroll: onScroll,
			searchTerm: searchTerm,
			treeId: id
		})
	);
};

// ## Constants


// ### classNames


Tree.defaultProps = {
	getNodes: function getNodes(node) {
		return node.nodes;
	}
};

// ### Display Name
// Always use the canonical component name as the React display name.
Tree.displayName = _constants.TREE;

// ### Prop Types
Tree.propTypes = {
	/**
  * For users of assistive technology, if set the heading will be hidden. One of `heading` or `assistiveText` must be set in order to label the tree.
  */
	assistiveText: _propTypes2.default.string,
	/**
  * Class names to be added to the container element which has the heading and the `ul.slds-tree` element as children.
  */
	className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * Class names to be added to the top-level `ul` element of the tree.
  */
	listClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * A function that will be called by every branch to receive its child nodes. The parent `node` object with the branch data is passed into this function: `getNodes(node)`. If your state engine is Flux or Redux, then your tree data structure will probably be flattened or normalized within the store. This will allow you to build out your tree without transversing an actual tree of data and may be more performant.
  */
	getNodes: _propTypes2.default.func,
	/**
  * This is the tree's heading and describes its contents. It can be hidden, see `assistiveText`.
  * */
	heading: _propTypes2.default.string,
	/**
  * HTML `id` of primary element that has `.slds-tree` on it. This component has a wrapping container element outside of `.slds-tree`.
  */
	id: _propTypes2.default.string.isRequired,
	/**
  * Array of items starting at the top of the tree. The required shape is: `{expanded: string, id: string, label: string, selected: string, type: string, nodes: array}`, but only `id` and `label` are required. Use `type: 'branch'` for folder and categories.
  */
	nodes: _propTypes2.default.array,
	/**
  * Function that will run whenever an item or branch is clicked.
  */
	onClick: _propTypes2.default.func.isRequired,
	/**
  * This function triggers when the expand or collapse icon is clicked.
  */
	onExpandClick: _propTypes2.default.func.isRequired,
	/**
  * This function triggers when the top-level `ul` element scrolls. This can be used to implement an "infinite scroll" pattern and update the `nodes` prop accordingly.
  */
	onScroll: _propTypes2.default.func,
	/**
  * Highlights term if found in node label. This does not auto-expand branches.
  */
	searchTerm: _propTypes2.default.string,
	/*
  * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
  */
	listStyle: _propTypes2.default.object
};

module.exports = Tree;