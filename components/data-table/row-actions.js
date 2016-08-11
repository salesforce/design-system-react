define(['module', 'react', 'lodash.isfunction', '../menu-dropdown', '../../utilities', '../../utilities/constants'], function (module, _react, _lodash, _menuDropdown, _utilities, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var

	// Removes the need for `PropTypes`.
	PropTypes = _react2.default.PropTypes;


	/**
  * RowActions provide a mechanism for defining a menu to display alongside each row in the DataTable.
  */
	var DataTableRowActions = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.DATA_TABLE_ROW_ACTIONS,

		// ### Prop Types
		propTypes: {
			/**
    * Description of the menu for screenreaders.
    */
			assistiveText: PropTypes.string,
			/**
    * Class names to be added to the actions menu.
    */
			className: PropTypes.string,
			id: PropTypes.string,
			item: PropTypes.object,
			onAction: PropTypes.func,
			options: PropTypes.array.isRequired
		},

		getDefaultProps: function getDefaultProps() {
			return {
				assistiveText: 'Actions'
			};
		},
		render: function render() {
			// i18n
			return _react2.default.createElement(
				'td',
				{
					className: 'slds-cell-shrink', 'data-label': 'Actions',
					onClick: this.handleClick
				},
				_react2.default.createElement(_menuDropdown2.default, {
					align: 'right',
					assistiveText: this.props.assistiveText,
					buttonClassName: 'slds-button--icon-x-small',
					buttonVariant: 'icon',
					className: this.props.className,
					options: this.props.options,
					hint: true,
					iconName: 'down',
					iconSize: 'small',
					iconVariant: 'border-filled',
					id: this.props.id,
					onSelect: this.handleSelect
				})
			);
		},
		handleClick: function handleClick(e) {
			_utilities.EventUtil.trap(e);
		},
		handleSelect: function handleSelect(selection) {
			if ((0, _lodash2.default)(this.props.onAction)) {
				this.props.onAction(this.props.item, selection);
			}
		}
	});

	module.exports = DataTableRowActions;
});