'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tree Component (PROTOTYPE)

// THIS IS A PROTOTYPE and does NOT meet accessibility standards. It implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/trees/) in React.

// ## Dependencies

// ### React


// Child components


// ### classNames


// Similar to React's PropTypes check. When in development mode, it issues errors in the console about properties.


// ## Constants


/**
 * A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed. This is a controlled component, since visual state is present in the `nodes` data.
 */
var Tree = function (_React$Component) {
	_inherits(Tree, _React$Component);

	function Tree() {
		_classCallCheck(this, Tree);

		return _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).apply(this, arguments));
	}

	_createClass(Tree, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			(0, _checkProps2.default)(_constants.TREE, this.props);
		}
	}, {
		key: 'render',
		value: function render() {
			// One of these is required to pass accessibility tests
			var headingText = this.props.assistiveText || this.props.heading;

			// Start the zero level branch--that is the tree root. There is no label for
			// the tree root, but is required by all other nodes
			return _react2.default.createElement(
				'div',
				{
					id: this.props.id,
					className: (0, _classnames2.default)('slds-tree_container', this.props.className) /* role="application" */
				},
				_react2.default.createElement(
					'h4',
					{
						className: (0, _classnames2.default)('slds-text-title--caps', {
							'slds-assistive-text': this.props.assistiveText
						}),
						id: this.props.id + '__heading'
					},
					headingText
				),
				_react2.default.createElement(_branch2.default, {
					getNodes: this.props.getNodes,
					initalClassName: this.props.listClassName,
					htmlId: this.props.id,
					initialStyle: this.props.listStyle,
					level: 0,
					node: { nodes: this.props.nodes },
					onClick: this.props.onClick,
					onExpandClick: this.props.onExpandClick,
					onScroll: this.props.onScroll,
					searchTerm: this.props.searchTerm,
					treeId: this.props.id
				})
			);
		}
	}]);

	return Tree;
}(_react2.default.Component);

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

exports.default = Tree;