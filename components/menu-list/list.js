'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                  Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                  */

// # List Component

// ## Dependencies

// ### React


// ### classNames


// ## Children


// ## Constants


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _listItem = require('./list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the need for `PropTypes`.
var PropTypes = _react2.default.PropTypes;

/**
 * Component description.
 */

var List = _react2.default.createClass({
	displayName: _constants.LIST,

	propTypes: {
		/**
   * Determines whether or not to show a checkmark for selected items.
   */
		checkmark: PropTypes.bool,
		/**
   * CSS classes to be added to `<ul />`.
   */
		className: PropTypes.string,
		/**
   * Used internally to determine the id that will be used for list items.
   */
		getListItemId: PropTypes.func,
		/**
   * Used internally to pass references to the individual menu items back up for focusing / scrolling.
   */
		itemRefs: PropTypes.func,
		/**
   * If provided, this function will be used to render the contents of each menu item.
   */
		itemRenderer: PropTypes.func,
		/**
   * Sets the height of the list based on the numeber of items.
   */
		length: PropTypes.oneOf([null, '5', '7', '10']),
		/**
   * Triggered when a list item is selected (via mouse or keyboard).
   */
		onSelect: PropTypes.func,
		/**
   * An array of items to render in the list.
   */
		options: PropTypes.array,
		/**
   * The index of the currently selected item in the list.
   */
		selectedIndex: PropTypes.number,
		/**
   * The id of the element which triggered this list (in a menu context).
   */
		triggerId: PropTypes.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			length: '5',
			options: [],
			selectedIndex: -1
		};
	},
	getItems: function getItems() {
		var _this = this;

		return this.props.options.map(function (option, index) {
			var id = _this.props.getListItemId(index);

			return _react2.default.createElement(_listItem2.default, _extends({}, option, {
				checkmark: _this.props.checkmark,
				data: option,
				id: id,
				index: index,
				isSelected: index === _this.props.selectedIndex,
				key: id + '-' + option.value,
				labelRenderer: _this.props.itemRenderer,
				onSelect: _this.props.onSelect,
				ref: function ref(listItem) {
					return _this.props.itemRefs(listItem, index);
				}
			}));
		});
	},
	render: function render() {
		var lengthClassName = void 0;
		if (this.props.length) {
			lengthClassName = 'slds-dropdown--length-' + this.props.length;
		}

		return _react2.default.createElement(
			'ul',
			{
				'aria-labelledby': this.props.triggerId,
				className: (0, _classnames2.default)('dropdown__list', lengthClassName, this.props.className),
				role: 'menu'
			},
			this.getItems()
		);
	}
});

module.exports = List;