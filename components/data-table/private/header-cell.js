'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React


// ### classNames


// ### isFunction


// ## Children


// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


// ## Constants


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _icon = require('../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _columnCheckProps = require('../column-check-props');

var _columnCheckProps2 = _interopRequireDefault(_columnCheckProps);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Used internally, renders each individual column heading.
 */
var DataTableHeaderCell = (0, _createReactClass2.default)({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.DATA_TABLE_HEADER_CELL,

	// ### Prop Types
	propTypes: {
		/**
   * Text for sort action on table column header
   *
   */
		assistiveTextForColumnSort: _propTypes2.default.string,
		/**
   * Text announced once a column is sorted in ascending order
   */
		assistiveTextForColumnSortedAscending: _propTypes2.default.string,
		/**
   * Text announced once a column is sorted in descending order
   */
		assistiveTextForColumnSortedDescending: _propTypes2.default.string,
		id: _propTypes2.default.string.isRequired,
		/**
   * Indicates if column is sorted.
   */
		isSorted: _propTypes2.default.bool,
		/**
   * The column label.
   */
		label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
		/**
   * The function to execute on sort.
   */
		onSort: _propTypes2.default.func,
		/**
   * The property which corresponds to this column.
   */
		property: _propTypes2.default.string,
		/**
   * Whether or not the column is sortable.
   */
		sortable: _propTypes2.default.bool,
		/**
   * The current sort direction.
   */
		sortDirection: _propTypes2.default.oneOf(['desc', 'asc']),
		/**
   * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
   */
		width: _propTypes2.default.string
	},

	getInitialState: function getInitialState() {
		return {
			sortDirection: null
		};
	},
	componentDidMount: function componentDidMount() {
		(0, _columnCheckProps2.default)(_constants.DATA_TABLE_COLUMN, this.props);
	},
	componentDidUpdate: function componentDidUpdate(prevProps) {
		// reset sort state when another column is sorted
		if (prevProps.isSorted === true && this.props.isSorted === false) {
			this.setState({ sortDirection: null }); // eslint-disable-line react/no-did-update-set-state
		}
	},


	// ### Render
	// Should return a `<th></th>`.
	render: function render() {
		var _classNames;

		var _props = this.props,
		    isSorted = _props.isSorted,
		    label = _props.label,
		    sortable = _props.sortable,
		    width = _props.width;


		var labelType = typeof label === 'undefined' ? 'undefined' : _typeof(label);
		var sortDirection = this.props.sortDirection || this.state.sortDirection;
		var expandedSortDirection = sortDirection === 'desc' ? 'descending' : 'ascending';
		var ariaSort = isSorted ? expandedSortDirection : null;

		return _react2.default.createElement(
			'th',
			{
				'aria-sort': ariaSort,
				className: (0, _classnames2.default)((_classNames = {
					'slds-is-sortable': sortable,
					'slds-is-sorted': isSorted
				}, _defineProperty(_classNames, 'slds-is-sorted--' + sortDirection, sortDirection), _defineProperty(_classNames, 'slds-is-sorted--asc', isSorted && !sortDirection), _classNames)),
				focusable: sortable ? true : null,
				scope: 'col',
				style: width ? { width: width } : null
			},
			sortable ? _react2.default.createElement(
				'a',
				{
					href: 'javascript:void(0)' // eslint-disable-line no-script-url
					, className: 'slds-th__action slds-text-link--reset',
					onClick: this.handleSort,
					tabIndex: '0'
				},
				_react2.default.createElement(
					'span',
					{ className: 'slds-assistive-text' },
					this.props.assistiveTextForColumnSort,
					' '
				),
				_react2.default.createElement(
					'span',
					{
						className: 'slds-truncate',
						title: labelType === 'string' ? label : undefined
					},
					label
				),
				_react2.default.createElement(_icon2.default, {
					className: 'slds-is-sortable__icon',
					category: 'utility',
					name: sortDirection === 'desc' ? 'arrowdown' : 'arrowup',
					size: 'x-small'
				}),
				sortDirection ? _react2.default.createElement(
					'span',
					{
						className: 'slds-assistive-text',
						'aria-live': 'assertive',
						'aria-atomic': 'true'
					},
					sortDirection === 'asc' ? this.props.assistiveTextForColumnSortedAscending : this.props.assistiveTextForColumnSortedDescending
				) : null
			) : _react2.default.createElement(
				'div',
				{ className: 'slds-truncate' },
				label
			)
		);
	},
	handleSort: function handleSort(e) {
		var oldSortDirection = this.props.sortDirection || this.state.sortDirection;
		var sortDirection = oldSortDirection === 'asc' ? 'desc' : 'asc';
		var data = {
			property: this.props.property,
			sortDirection: sortDirection
		};

		this.setState({
			sortDirection: sortDirection
		});

		if ((0, _lodash2.default)(this.props.onSort)) {
			this.props.onSort(data, e);
		}
	}
});

exports.default = DataTableHeaderCell;