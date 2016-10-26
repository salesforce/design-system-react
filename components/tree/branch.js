define(['module', 'react', '../button', './item', '../utilities/highlighter', 'lodash.isarray', 'lodash.isfunction', '../../utilities', 'classnames', 'shortid', '../../utilities/constants'], function (module, _react, _button, _item, _highlighter, _lodash, _lodash3, _utilities, _classnames, _shortid, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _button2 = _interopRequireDefault(_button);

	var _item2 = _interopRequireDefault(_item);

	var _highlighter2 = _interopRequireDefault(_highlighter);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _lodash4 = _interopRequireDefault(_lodash3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _shortid2 = _interopRequireDefault(_shortid);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// ### shortid


	// ### Event Helpers


	// ### isArray


	// Child components
	/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	// # Tree Branch Component

	// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/tree/) in React.

	// ## Dependencies

	// ### React
	var handleExpandClick = function handleExpandClick(event, props) {
		_utilities.EventUtil.trap(event);

		if ((0, _lodash4.default)(props.onExpandClick)) {
			props.onExpandClick(event, {
				node: props.node,
				expand: !props.node.expanded,
				treeIndex: props.treeIndex
			});
		}
	};

	// ## Constants


	// ### classNames


	// ### isFunction


	var handleClick = function handleClick(event, props) {
		_utilities.EventUtil.trap(event);
		if ((0, _lodash4.default)(props.onClick)) {
			props.onClick(event, {
				node: props.node,
				select: !props.node.selected,
				treeIndex: props.treeIndex
			});
		}
	};

	var handleScroll = function handleScroll(event, props) {
		var percentage = event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) * 100;

		if ((0, _lodash4.default)(props.onScroll)) {
			props.onScroll(event, {
				percentage: percentage
			});
		}
	};

	var renderInitialNode = function renderInitialNode(children, props) {
		return (
			// id intentionally not rendered here, and is present on container that includes the header
			_react2.default.createElement(
				'ul',
				{
					'aria-labelledby': props.htmlId + '__heading'
					// TODO
					// aria-activedescendant=""
					, className: (0, _classnames2.default)('slds-tree', props.initalClassName),
					onScroll: function onScroll(event) {
						handleScroll(event, props);
					},
					role: 'tree',
					style: props.initialStyle
					// tabIndex="0"
				},
				children
			)
		);
	};

	renderInitialNode.displayName = 'InitialNode';

	renderInitialNode.propTypes = {
		/**
   * HTML `id` of the wrapping container element.
   */
		htmlId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]).isRequired,
		/*
   * Class names to be added to the top-level `ul` element.
   */
		initalClassName: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/*
   * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
   */
		initialStyle: _react.PropTypes.object
	};

	// Most of these props come from the nodes array, not from the Tree props
	var renderBranch = function renderBranch(children, props) {
		var isExpanded = props.node.expanded;
		var isSelected = props.node.selected;
		var isLoading = props.node.loading;

		var loader = _react2.default.createElement(
			'div',
			{
				style: {
					display: 'block',
					paddingLeft: 1.5 * props.level + 1.5 + 'rem',
					marginTop: '.5rem' }
			},
			_react2.default.createElement('div', {
				style: {
					borderRadius: '15rem',
					display: 'block',
					marginBottom: '.75rem',
					height: '.5rem',
					backgroundColor: 'rgb(224, 229, 238)',
					width: '40%' }
			}),
			_react2.default.createElement('div', {
				style: {
					borderRadius: '15rem',
					display: 'block',
					marginBottom: '.75rem',
					height: '.5rem',
					backgroundColor: 'rgb(224, 229, 238)',
					width: '80%' }
			}),
			_react2.default.createElement('div', {
				style: {
					borderRadius: '15rem',
					display: 'block',
					marginBottom: '.75rem',
					height: '.5rem',
					backgroundColor: 'rgb(224, 229, 238)',
					width: '60%' }
			})
		);

		// TODO: Remove tabbing from anchor tag AND button / add tabIndex={-1} when keyboard navigation is present.
		return _react2.default.createElement(
			'li',
			{
				id: props.htmlId,
				role: 'treeitem',
				'aria-level': props.level,
				'aria-expanded': isExpanded ? 'true' : 'false'
			},
			_react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-tree__item', { 'slds-is-selected': isSelected }),
					onClick: function onClick(event) {
						handleClick(event, props);
					}
				},
				_react2.default.createElement(_button2.default, {
					assistiveText: 'Toggle',
					iconName: 'chevronright',
					iconSize: 'small',
					variant: 'icon',
					className: 'slds-m-right--small',
					'aria-controls': props.htmlId,
					onClick: function onClick(event) {
						handleExpandClick(event, props);
					}
				}),
				_react2.default.createElement(
					'a',
					{
						id: props.htmlId + '__label',
						href: '#',
						role: 'presentation',
						className: 'slds-truncate'
					},
					_react2.default.createElement(
						_highlighter2.default,
						{ search: props.searchTerm },
						props.label
					)
				)
			),
			isLoading ? loader : null,
			_react2.default.createElement(
				'ul',
				{
					className: (0, _classnames2.default)({
						'slds-is-expanded': isExpanded,
						'slds-is-collapsed': !isExpanded
					}),
					role: 'group',
					'aria-labelledby': props.htmlId + '__label'
				},
				isExpanded && !isLoading ? children : null
			)
		);
	};

	renderBranch.displayName = 'Branch';

	renderBranch.propTypes = {
		/**
   * HTML `id` of primary element that has `.slds-tree` on it. This component has a wrapping container element outside of `.slds-tree`.
   */
		htmlId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]).isRequired,
		/**
   * The text of the tree item.
   */
		label: _react.PropTypes.string,
		/**
   * The number of nestings. Determines the ARIA level and style alignment.
   */
		level: _react.PropTypes.number.isRequired,
		/**
   * The current node that is being rendered.
   */
		node: _react.PropTypes.object.isRequired,
		/**
   * Function that will run whenever an item or branch is clicked.
   */
		onClick: _react.PropTypes.func,
		/**
   * This function triggers when the expand or collapse icon is clicked.
   */
		onExpandClick: _react.PropTypes.func.isRequired,
		/**
   * Highlights term if found in node label
   */
		searchTerm: _react.PropTypes.string,
		/**
   * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
   */
		treeIndex: _react.PropTypes.string
	};

	/**
  * A Tree Item is a non-branching node in a hierarchical list.
  */
	var Branch = function Branch(props) {
		var treeIndex = '';
		var children = void 0;

		var treeId = props.treeId;
		var level = props.level;
		var onExpandClick = props.onExpandClick;
		var searchTerm = props.searchTerm;


		if ((0, _lodash2.default)(props.getNodes(props.node))) {
			children = props.node.nodes.map(function (node, index) {
				var child = void 0;
				var htmlId = props.treeId + '-' + node.id;
				treeIndex = '' + index;
				if (props.treeIndex) {
					treeIndex = props.treeIndex + '-' + treeIndex;
				}

				if (node.type === 'branch') {
					child = _react2.default.createElement(Branch, {
						getNodes: props.getNodes,
						htmlId: htmlId,
						key: _shortid2.default.generate(),
						label: node.label,
						level: level + 1,
						node: node,
						nodes: node.nodes,
						onClick: props.onClick,
						onExpandClick: onExpandClick,
						searchTerm: searchTerm,
						treeId: treeId,
						treeIndex: treeIndex
					});
				} else {
					child = _react2.default.createElement(_item2.default, {
						label: node.label,
						htmlId: htmlId,
						key: _shortid2.default.generate(),
						level: level + 1,
						node: node,
						onClick: props.onClick,
						searchTerm: searchTerm,
						treeIndex: treeIndex,
						treeId: treeId
					});
				}
				return child;
			});
		}

		var branch = props.level === 0 ? renderInitialNode(children, props) : renderBranch(children, props);
		return branch;
	};

	// ### Display Name
	// Always use the canonical component name as the React display name.
	Branch.displayName = _constants.TREE_BRANCH;

	// ### Prop Types
	Branch.propTypes = {
		/**
   * A function that will be called by every branch to receive its child nodes. The parent `node` object with the branch data is passed into this function: `getNodes(node)`. If your state engine is Flux or Redux, then your tree data structure will probably be flattened or normalized within the store. This will allow you to build out your tree without transversing an actual tree of data and may be more performant.
   */
		getNodes: _react.PropTypes.func,
		/**
   * HTML `id` of the wrapping container element joined with the `id` of the node. This will recursively increase as the tree depth increases.
   */
		htmlId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]).isRequired,
		/**
   * All tree nodes must have a unique HTML `id` for users of assistive technology. If no `id` key is present in the  is provided, one will be generated.
   */
		index: _react.PropTypes.number,
		/**
   * Determines if nodes in the top-level of the tree.
   */
		initial: _react.PropTypes.bool,
		/*
   * Class names to be added to the top-level `ul` element.
   */
		initalClassName: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		initialStyle: _react.PropTypes.object,
		/**
   * The text of the tree item.
   */
		label: _react.PropTypes.string,
		/**
   * The number of nestings. Determines the ARIA level and style alignment.
   */
		level: _react.PropTypes.number.isRequired,
		/**
   * The current node that is being rendered.
   */
		node: _react.PropTypes.object.isRequired,
		/**
   * Function that will run whenever an item or branch is clicked.
   */
		onClick: _react.PropTypes.func,
		/**
   * This function triggers when the expand or collapse icon is clicked.
   */
		onExpandClick: _react.PropTypes.func.isRequired,
		/**
   * Highlights term if found in node label
   */
		searchTerm: _react.PropTypes.string,
		/**
   * Unique id used for a prefix of all tree nodes. This is the prefix for subsequent `htmlId` props.
   */
		treeId: _react.PropTypes.string,
		/**
   * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
   */
		treeIndex: _react.PropTypes.string
	};

	Branch.getDefaultProps = {
		level: 0,
		label: '',
		treeIndex: ''
	};

	module.exports = Branch;
});