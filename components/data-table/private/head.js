'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                  Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                  */

// ### React


// ## Children


// ## Constants


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _checkbox = require('../../forms/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _headerCell = require('./header-cell');

var _headerCell2 = _interopRequireDefault(_headerCell);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the need for `PropTypes`.
var PropTypes = _react2.default.PropTypes;

/**
 * Used internally, provides header row rendering to the DataTable.
 */

var DataTableHead = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.DATA_TABLE_HEAD,

	// ### Prop Types
	propTypes: {
		/**
   * Text for heading of actions column
   */
		assistiveTextForActionsHeader: PropTypes.string,
		/**
   * Text for sort action on table column header
   */
		assistiveTextForColumnSort: PropTypes.string,
		/**
   * Text for select all checkbox within the table header
   */
		assistiveTextForSelectAllRows: PropTypes.string,
		allSelected: PropTypes.bool,
		indeterminateSelected: PropTypes.bool,
		canSelectRows: PropTypes.bool,
		columns: PropTypes.arrayOf(PropTypes.shape({
			Cell: PropTypes.func,
			props: PropTypes.object
		})),
		id: PropTypes.string,
		onToggleAll: PropTypes.func,
		onSort: PropTypes.func,
		showRowActions: PropTypes.bool
	},

	componentWillMount: function componentWillMount() {},


	// ### Render
	render: function render() {
		var _this = this;

		return _react2.default.createElement(
			'thead',
			null,
			_react2.default.createElement(
				'tr',
				{ className: 'slds-text-title--caps' },
				this.props.canSelectRows ? _react2.default.createElement(
					'th',
					{ className: 'slds-text-align--right', scope: 'col', style: { width: '3.25rem' } },
					_react2.default.createElement(
						'div',
						{ className: 'slds-th__action slds-th__action--form' },
						_react2.default.createElement(_checkbox2.default, {
							assistiveText: this.props.assistiveTextForSelectAllRows,
							checked: this.props.allSelected,
							indeterminate: this.props.indeterminateSelected,
							id: this.props.id + '-SelectAll',
							name: 'SelectAll',
							onChange: this.props.onToggleAll
						})
					)
				) : null,
				this.props.columns.map(function (column) {
					return _react2.default.createElement(_headerCell2.default, _extends({
						assistiveTextForColumnSort: _this.props.assistiveTextForColumnSort,
						id: _this.props.id + '-' + column.props.property,
						key: _this.props.id + '-' + column.props.property,
						onSort: _this.props.onSort
					}, column.props));
				}),
				this.props.showRowActions ? _react2.default.createElement(
					'th',
					{ scope: 'col', style: { width: '3.25rem' } },
					_react2.default.createElement(
						'div',
						{ className: 'slds-th__action' },
						_react2.default.createElement(
							'span',
							{ className: 'slds-assistive-text' },
							this.props.assistiveTextForActionsHeader
						)
					)
				) : null
			)
		);
	}
});

exports.default = DataTableHead;