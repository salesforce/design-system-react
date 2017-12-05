define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/button', '../../../../components/card', '../../../../components/card/empty', '../../../../components/card/filter', '../../../../components/data-table', '../../../../components/data-table/column', '../../../../components/icon'], function (exports, _react, _createReactClass, _iconSettings, _button, _card, _empty, _filter, _dataTable, _column, _icon) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _button2 = _interopRequireDefault(_button);

	var _card2 = _interopRequireDefault(_card);

	var _empty2 = _interopRequireDefault(_empty);

	var _filter2 = _interopRequireDefault(_filter);

	var _dataTable2 = _interopRequireDefault(_dataTable);

	var _column2 = _interopRequireDefault(_column);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime
	var sampleItems = [{ name: 'Cloudhub' }, { name: 'Cloudhub + Anypoint Connectors' }, { name: 'Cloud City' }];

	var Example = (0, _createReactClass2.default)({
		displayName: 'CardExample',

		getInitialState: function getInitialState() {
			return {
				items: sampleItems,
				isFiltering: false
			};
		},
		render: function render() {
			var isEmpty = this.state.items.length === 0;

			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					'div',
					{ className: 'slds-grid slds-grid--vertical' },
					_react2.default.createElement(
						_card2.default,
						{
							id: 'ExampleCard',
							filter: (!isEmpty || this.state.isFiltering) && _react2.default.createElement(_filter2.default, { onChange: this.handleFilterChange }),
							headerActions: !isEmpty && _react2.default.createElement(_button2.default, { label: 'Delete All Items', onClick: this.handleDeleteAllItems }),
							heading: 'Releated Items',
							icon: _react2.default.createElement(_icon2.default, { category: 'standard', name: 'document', size: 'small' }),
							empty: isEmpty ? _react2.default.createElement(
								_empty2.default,
								{ heading: 'No Related Items' },
								_react2.default.createElement(_button2.default, { label: 'Add Item', onClick: this.handleAddItem })
							) : null
						},
						_react2.default.createElement(
							_dataTable2.default,
							{ items: this.state.items, id: 'DataTableExample-1', bordered: true },
							_react2.default.createElement(_column2.default, {
								label: 'Opportunity Name',
								property: 'name',
								truncate: true
							})
						)
					)
				)
			);
		},
		handleFilterChange: function handleFilterChange(event) {
			var filteredItems = sampleItems.filter(function (item) {
				return RegExp(event.target.value, 'i').test(item.name);
			});
			this.setState({ isFiltering: true, items: filteredItems });
		},
		handleDeleteAllItems: function handleDeleteAllItems() {
			this.setState({ isFiltering: false, items: [] });
		},
		handleAddItem: function handleAddItem() {
			this.setState({ items: sampleItems });
		}
	});

	exports.default = Example;
});