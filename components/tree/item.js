define(['module', 'react', '../button', 'classnames', '../utilities/highlighter', 'lodash.isfunction', '../../utilities', '../../utilities/constants'], function (module, _react, _button, _classnames, _highlighter, _lodash, _utilities, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _button2 = _interopRequireDefault(_button);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _highlighter2 = _interopRequireDefault(_highlighter);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// ### Event Helpers
	var handleClick = function handleClick(event, props) {
		_utilities.EventUtil.trap(event);

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


	// ### classNames
	/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	// # Tree Item Component

	// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/tree/) in React.

	// ## Dependencies

	// ### React
	var Item = function Item(props) {
		var isSelected = props.node.selected;

		// TODO: Remove tabbing from anchor tag / add tabIndex={-1} when keyboard navigation is present.
		return _react2.default.createElement(
			'li',
			{ id: props.treeId + '-' + props.node.id, role: 'treeitem', 'aria-level': props.level },
			_react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-tree__item', { 'slds-is-selected': isSelected }),
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
					{ href: '#', role: 'presentation', className: 'slds-truncate' },
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
		htmlId: _react.PropTypes.string.isRequired,
		/**
   * The text of the tree item.
   */
		label: _react.PropTypes.string.isRequired,
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
   * Highlights term if found in node label
   */
		searchTerm: _react.PropTypes.string,
		/**
   * Unique id used for a prefix of all tree nodes
   */
		treeId: _react.PropTypes.string,
		/**
   * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
   */
		treeIndex: _react.PropTypes.string
	};

	Item.getDefaultProps = {
		selected: false
	};

	module.exports = Item;
});