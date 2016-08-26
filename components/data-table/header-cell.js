define(['exports', 'react', 'classnames', 'lodash.isfunction', '../button', '../../utilities/constants'], function (exports, _react, _classnames, _lodash, _button, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var PropTypes = _react2.default.PropTypes;


	/**
  * Used internally, renders each individual column heading.
  */
	var DataTableHeaderCell = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.DATA_TABLE_HEADER_CELL,

		// ### Prop Types
		propTypes: {
			id: PropTypes.string.isRequired,
			/**
    * The column label.
    */
			label: PropTypes.string,
			/**
    * The function to execute on sort.
    */
			onSort: PropTypes.func,
			/**
    * The property which corresponds to this column.
    */
			property: PropTypes.string,
			/**
    * Whether or not the column is sortable.
    */
			sortable: PropTypes.bool,
			/**
    * The current sort direction.
    */
			sortDirection: PropTypes.oneOf(['desc', 'asc'])
		},

		getInitialState: function getInitialState() {
			return {
				sortDirection: 'asc'
			};
		},
		render: function render() {
			var _props = this.props;
			var label = _props.label;
			var property = _props.property;
			var sortable = _props.sortable;


			var sortDirection = this.props.sortDirection || this.state.sortDirection;

			// i18n
			return _react2.default.createElement(
				'th',
				{
					scope: 'col',
					key: property,
					className: (0, _classnames2.default)({
						'slds-is-sortable': sortable
					}),
					onClick: sortable && this.handleSort
				},
				_react2.default.createElement(
					'div',
					{ className: 'slds-truncate' },
					label,
					sortable ? _react2.default.createElement(_button2.default, {
						assistiveText: sortDirection === 'desc' ? 'Sort Ascending' : 'Sort Descending',
						iconCategory: 'utility',
						iconName: sortDirection === 'desc' ? 'arrowdown' : 'arrowup',
						iconSize: 'small',
						iconVariant: 'bare',
						id: this.props.id + '-Sort',
						variant: 'icon'
					}) : null
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
});