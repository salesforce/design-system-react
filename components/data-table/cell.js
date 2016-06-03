'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the need for `PropTypes`.
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// ### React
var PropTypes = _react2.default.PropTypes;

/**
 * The default Cell renderer for the DataTable. Pass in any React component with the same `displayName` which takes the same props to provide custom rendering.
 */


// ## Constants

var DataTableCell = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.DATA_TABLE_CELL,

	// ### Prop Types
	propTypes: {
		/**
   * Class names to be added to the cell.
   */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
   * The item from the items which represents this row.
   */
		item: PropTypes.object,
		/**
   * The column label.
   */
		label: PropTypes.string,
		/**
   * The property of this item to display.
   */
		property: PropTypes.string
	},

	// ### Render
	// Should return a `<td></td>`.
	render: function render() {
		return _react2.default.createElement(
			'td',
			{ className: this.props.className, 'data-label': this.props.label },
			this.props.item[this.props.property]
		);
	}
});

module.exports = DataTableCell;