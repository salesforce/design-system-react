'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// ### React


// ## Constants


// extends is used below so that react-docgen can detect the component

/**
 * Columns define the structure of the data displayed in the DataTable.
 */
var DataTableColumn = function (_React$Component) {
	_inherits(DataTableColumn, _React$Component);

	function DataTableColumn() {
		_classCallCheck(this, DataTableColumn);

		return _possibleConstructorReturn(this, (DataTableColumn.__proto__ || Object.getPrototypeOf(DataTableColumn)).apply(this, arguments));
	}

	return DataTableColumn;
}(_react2.default.Component);

// ### Display Name
// Always use the canonical component name as the React display name.


DataTableColumn.displayName = _constants.DATA_TABLE_COLUMN;

// ### Prop Types
DataTableColumn.propTypes = {
	/**
  * Use a _higher-order component_ to customize a data table cell that will override the default cell rendering. `CustomDataTableCell` must have the same `displayName` as `DataTableCell` or it will be ignored. If you want complete control of the HTML, including the wrapping `td`, you don't have to use `DataTableCell`.
  * ```
  * import DataTableCell from 'design-system-react/data-table/cell';
  * const CustomDataTableCell = ({ children, ...props }) => (
  *   <DataTableCell {...props} >
  *     <a href="javascript:void(0);">{children}</a>
  *   </DataTableCell>
  * );
  * CustomDataTableCell.displayName = DataTableCell.displayName;
  *
  * <DataTable>
  *   <DataTableColumn />
  *   <DataTableColumn>
  *     <DataTableCustomCell />
  *   </DataTableColumn>
  *   <DataTableRowActions />
  * </DataTable>
  * ```
  */
	children: _react2.default.PropTypes.element,
	/**
  * The column label. If a `string` is not passed in, no `title` attribute will be rendered.
  */
	label: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
	/**
  * The primary column for a row. This is almost always the first column.
  */
	primaryColumn: _react.PropTypes.bool,
	/**
  * The property which corresponds to this column.
  */
	property: _react.PropTypes.string,
	/**
  * Whether or not the column is sortable.
  */
	sortable: _react.PropTypes.bool,
	/**
  * The current sort direction. If left out the component will track this internally.
  */
	sortDirection: _react.PropTypes.oneOf(['desc', 'asc']),
	/**
  * Title used for truncation div within the cell.
  */
	title: _react.PropTypes.string,
	/**
  * Adds truncate to cell node.
  */
	truncate: _react.PropTypes.bool,
	/**
  * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
  */
	width: _react.PropTypes.string
};

module.exports = DataTableColumn;