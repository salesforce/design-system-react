'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ### isFunction
/*
 Copyright (c) 2017, salesforce.com, inc. All rights reserved.
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
	item: _react.PropTypes.shape({
		id: _react.PropTypes.string.isRequired,
		label: _react.PropTypes.string.isRequired,
		url: _react.PropTypes.string
	}),
	/**
  * Whether item is selected or not.
  */
	isSelected: _react.PropTypes.bool,
	/**
  * ID of the category this item belongs to.
  */
	categoryId: _react.PropTypes.string.isRequired,
	/**
  * Function that will run whenever an item is selected.
  */
	onSelect: _react.PropTypes.func
};

Item.getDefaultProps = {
	isSelected: false
};

exports.default = Item;