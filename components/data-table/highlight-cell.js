'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

var _highlighter = require('../utilities/highlighter');

var _highlighter2 = _interopRequireDefault(_highlighter);

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
 * A Cell renderer for the DataTable that automatically highlights search text.
 */


// ## Constants


// ## Children

var DataTableHighlightCell = function DataTableHighlightCell(props) {
	return _react2.default.createElement(
		_cell2.default,
		props,
		_react2.default.createElement(
			_highlighter2.default,
			{ search: props.search },
			props.children
		)
	);
};

// ### Display Name
// The DataTable looks for components with this name to determine what it should use to render a given column's cells.
DataTableHighlightCell.displayName = _constants.DATA_TABLE_CELL;

// ### Prop Types
DataTableHighlightCell.propTypes = {
	/**
  * The contents of the cell. Equivalent to `props.item[props.property]`
  */
	children: PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool]),
	/**
  * The string of text (or Regular Expression) to highlight.
  */
	search: PropTypes.any
};

module.exports = DataTableHighlightCell;