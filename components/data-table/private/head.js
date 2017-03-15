define(['exports', 'react', '../../forms/checkbox', './header-cell', '../../../utilities/constants'], function (exports, _react, _checkbox, _headerCell, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _checkbox2 = _interopRequireDefault(_checkbox);

	var _headerCell2 = _interopRequireDefault(_headerCell);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

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
});