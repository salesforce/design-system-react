define(['exports', 'react', 'create-react-class', '../../../../components/data-table', '../../../../components/data-table/column', '../../../../components/data-table/cell', '../../../../components/data-table/row-actions', '../../../../components/icon-settings'], function (exports, _react, _createReactClass, _dataTable, _column, _cell, _rowActions, _iconSettings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _dataTable2 = _interopRequireDefault(_dataTable);

	var _column2 = _interopRequireDefault(_column);

	var _cell2 = _interopRequireDefault(_cell);

	var _rowActions2 = _interopRequireDefault(_rowActions);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}

			return arr2;
		} else {
			return Array.from(arr);
		}
	}

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
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

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	var CustomDataTableCell = function CustomDataTableCell(_ref) {
		var children = _ref.children,
		    props = _objectWithoutProperties(_ref, ['children']);

		return _react2.default.createElement(
			_cell2.default,
			_extends({ title: children }, props),
			_react2.default.createElement(
				'a',
				{
					href: 'javascript:void(0);',
					onClick: function onClick(event) {
						event.preventDefault();
					}
				},
				children
			)
		);
	};
	CustomDataTableCell.displayName = _cell2.default.displayName;

	var Example = (0, _createReactClass2.default)({
		displayName: 'DataTableExample',

		getInitialState: function getInitialState() {
			return {
				sortColumn: 'opportunityName',
				sortColumnDirection: {
					opportunityName: 'asc'
				},
				items: [{
					id: '8IKZHZZV80',
					opportunityName: 'Acme - 1,200 Widgets',
					accountName: 'Acme',
					closeDate: '4/10/15',
					stage: 'Value Proposition',
					confidence: '70%',
					amount: '$25,000,000',
					contact: 'jrogers@acme.com'
				}, {
					id: '5GJOOOPWU7',
					opportunityName: 'Acme - 200 Widgets',
					accountName: 'Acme',
					closeDate: '1/31/15',
					stage: 'Prospecting',
					confidence: '30%',
					amount: '$5,000,000',
					contact: 'bob@acme.com'
				}, {
					id: '8IKZHZZV81',
					opportunityName: 'salesforce.com - 1,000 Widgets',
					accountName: 'salesforce.com',
					closeDate: '1/31/15 3:45PM',
					stage: 'Id. Decision Makers',
					confidence: '60%',
					amount: '$25,000',
					contact: 'nathan@salesforce.com'
				}],
				selection: [{
					id: '8IKZHZZV81',
					opportunityName: 'salesforce.com - 1,000 Widgets',
					accountName: 'salesforce.com',
					closeDate: '1/31/15 3:45PM',
					stage: 'Id. Decision Makers',
					confidence: '60%',
					amount: '$25,000',
					contact: 'nathan@salesforce.com'
				}]
			};
		},
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_iconSettings2.default,
					{ iconPath: '/assets/icons' },
					_react2.default.createElement(
						_dataTable2.default,
						{
							fixedLayout: true,
							items: this.state.items,
							id: 'DataTableExample-2',
							onChange: this.handleChanged,
							onSort: this.handleSort,
							selection: this.state.selection,
							selectRows: true
						},
						_react2.default.createElement(
							_column2.default,
							{
								isSorted: this.state.sortColumn === 'opportunityName',
								label: 'Name',
								primaryColumn: true,
								property: 'opportunityName',
								sortable: true,
								sortDirection: this.state.sortColumnDirection.opportunityName,
								width: '10rem'
							},
							_react2.default.createElement(CustomDataTableCell, null)
						),
						_react2.default.createElement(_column2.default, {
							label: 'Account Name',
							property: 'accountName',
							width: '8rem'
						}),
						_react2.default.createElement(_column2.default, {
							label: 'Close Date',
							property: 'closeDate'
						}),
						_react2.default.createElement(_column2.default, {
							label: 'Stage',
							property: 'stage'
						}),
						_react2.default.createElement(_column2.default, {
							isSorted: this.state.sortColumn === 'confidence',
							label: 'Confidence',
							property: 'confidence',
							sortable: true,
							sortDirection: this.state.sortColumnDirection.confidence
						}),
						_react2.default.createElement(_column2.default, {
							label: 'Amount',
							property: 'amount'
						}),
						_react2.default.createElement(
							_column2.default,
							{
								label: 'Contact',
								property: 'contact'
							},
							_react2.default.createElement(CustomDataTableCell, null)
						),
						_react2.default.createElement(_rowActions2.default, {
							options: [{
								id: 0,
								label: 'Add to Group',
								value: '1'
							}, {
								id: 1,
								label: 'Publish',
								value: '2'
							}],
							onAction: this.handleRowAction
						})
					)
				)
			);
		},
		handleChanged: function handleChanged(selection) {
			this.setState({ selection: selection });
		},
		handleRowAction: function handleRowAction(item, action) {
			console.log(item, action);
		},
		handleSort: function handleSort(sortColumn) {
			if (this.props.log) {
				for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					rest[_key - 1] = arguments[_key];
				}

				this.props.log('sort').apply(undefined, [sortColumn].concat(rest));
			}

			var sortProperty = sortColumn.property;
			var sortDirection = sortColumn.sortDirection;
			var newState = {
				sortColumn: sortProperty,
				sortColumnDirection: _defineProperty({}, sortProperty, sortDirection),
				items: [].concat(_toConsumableArray(this.state.items))
			};

			// needs to work in both directions
			newState.items = newState.items.sort(function (a, b) {
				var val = 0;

				if (a[sortProperty] > b[sortProperty]) {
					val = 1;
				}
				if (a[sortProperty] < b[sortProperty]) {
					val = -1;
				}

				if (sortDirection === 'desc') {
					val *= -1;
				}

				return val;
			});

			this.setState(newState);
		}
	});

	exports.default = Example;
});