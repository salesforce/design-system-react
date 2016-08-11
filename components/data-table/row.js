define(['module', 'react', 'classnames', 'lodash.find', '../forms/checkbox', '../../utilities/constants'], function (module, _react, _classnames, _lodash, _checkbox, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _checkbox2 = _interopRequireDefault(_checkbox);

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

	var

	// Removes the need for `PropTypes`.
	PropTypes = _react2.default.PropTypes;


	/**
  * Used internally, provides row rendering to the DataTable.
  */
	var DataTableRow = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.DATA_TABLE_ROW,

		// ### Prop Types
		propTypes: {
			canSelectRows: PropTypes.bool.isRequired,
			columns: PropTypes.arrayOf(PropTypes.shape({
				Cell: PropTypes.func,
				props: PropTypes.object
			})),
			id: PropTypes.string.isRequired,
			item: _react2.default.PropTypes.object.isRequired,
			onToggle: PropTypes.func.isRequired,
			rowActions: PropTypes.element,
			selection: PropTypes.array.isRequired
		},

		render: function render() {
			var _this = this;

			var isSelected = this.isSelected();

			// i18n
			return _react2.default.createElement(
				'tr',
				{
					className: (0, _classnames2.default)({ 'slds-hint-parent': this.props.rowActions, 'slds-is-selected': isSelected })
				},
				this.props.canSelectRows ? _react2.default.createElement(
					'td',
					{ className: 'slds-cell-shrink', 'data-label': 'Select Row' },
					_react2.default.createElement(_checkbox2.default, {
						assistiveText: 'Select Row',
						checked: isSelected,
						id: this.props.id + '-SelectRow',
						name: 'SelectRow',
						onChange: this.handleToggle
					})
				) : null,
				this.props.columns.map(function (column, index) {
					var Cell = column.Cell;

					return _react2.default.createElement(
						Cell,
						_extends({}, column.props, {
							className: column.props.truncate ? 'slds-truncate' : null,
							id: _this.props.id + '-' + _constants.DATA_TABLE_CELL + '-' + index,
							item: _this.props.item,
							key: column.props.property
						}),
						_this.props.item[column.props.property]
					);
				}),
				this.props.rowActions ? _react2.default.cloneElement(this.props.rowActions, {
					id: this.props.id + '-' + _constants.DATA_TABLE_ROW_ACTIONS,
					item: this.props.item
				}) : null
			);
		},
		isSelected: function isSelected() {
			return !!(0, _lodash2.default)(this.props.selection, this.props.item);
		},
		handleToggle: function handleToggle(selected, e) {
			return this.props.onToggle(this.props.item, selected, e);
		}
	});

	module.exports = DataTableRow;
});