'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                              Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                              Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                              Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                              Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                              Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                              THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                              */

// ### React


// ### classNames


// ## Constants


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The default Cell renderer for the DataTable. Pass in any React component with the same `displayName` which takes the same props to provide custom rendering.
 */
var DataTableCell = function DataTableCell(props) {
	var childText = _typeof(props.children) === 'object' ? props.children.props.children : props.children;
	var contents = _react2.default.createElement(
		'div',
		{
			className: (0, _classnames2.default)({
				'slds-truncate': props.fixedLayout
			}),
			title: props.title || childText
		},
		props.children
	);

	var cell = _react2.default.createElement(
		'td',
		{
			className: props.className,
			role: props.fixedLayout ? 'gridcell' : null,
			style: props.width ? { width: props.width } : null
		},
		contents
	);

	if (props.primaryColumn) {
		cell = _react2.default.createElement(
			'th',
			{
				className: props.className,
				role: props.fixedLayout ? 'gridcell' : null,
				style: props.width ? { width: props.width } : null
			},
			contents
		);
	}

	return cell;
};

// ### Display Name
// Always use the canonical component name as the React display name.
DataTableCell.displayName = _constants.DATA_TABLE_CELL;

// ### Prop Types
DataTableCell.propTypes = {
	/**
  * The contents of the cell. This can be simple text or DOM nodes. Equivalent to `props.item[props.property]`
  */
	children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string]),
	/**
  * Class names to be added to the cell.
  */
	className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
	/**
  * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
  */
	fixedLayout: _react.PropTypes.bool,
	/**
  * The item from the items which represents this row.
  */
	item: _react.PropTypes.object,
	/**
  * The primary column for a row. This is almost always the first column.
  */
	primaryColumn: _react.PropTypes.bool,
	/**
  * The property of this item to display.
  */
	property: _react.PropTypes.string,
	/**
  * Shows on hover. Useful for truncated cells.
  */
	title: _react.PropTypes.string,
	/**
  * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
  */
	width: _react.PropTypes.string
};

module.exports = DataTableCell;