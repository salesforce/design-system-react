define(['module', 'react', '../forms/checkbox', './header-cell', '../../utilities/constants'], function (module, _react, _checkbox, _headerCell, _constants) {
	'use strict';

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
			allSelected: PropTypes.bool.isRequired,
			canSelectRows: PropTypes.bool.isRequired,
			columns: PropTypes.arrayOf(PropTypes.shape({
				Cell: PropTypes.func,
				props: PropTypes.object
			})),
			id: PropTypes.string.isRequired,
			onToggleAll: PropTypes.func.isRequired,
			onSort: PropTypes.func,
			showRowActions: PropTypes.bool.isRequired
		},

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
						{ className: 'slds-cell-shrink', scope: 'col' },
						_react2.default.createElement(_checkbox2.default, {
							assistiveText: 'Select All',
							checked: this.props.allSelected,
							id: this.props.id + '-SelectAll',
							name: 'SelectAll',
							onChange: this.props.onToggleAll
						})
					) : null,
					this.props.columns.map(function (column, index) {
						return _react2.default.createElement(_headerCell2.default, _extends({
							id: _this.props.id + '-' + _constants.DATA_TABLE_HEADER_CELL + '-' + index,
							key: index,
							onSort: _this.props.onSort
						}, column.props));
					}),
					this.props.showRowActions ? _react2.default.createElement('th', { className: 'slds-cell-shrink' }) : null
				)
			);
		}
	});

	module.exports = DataTableHead;
});