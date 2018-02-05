'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _menuDropdown = require('../menu-dropdown');

var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

var _event = require('../../utilities/event');

var _event2 = _interopRequireDefault(_event);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * RowActions provide a mechanism for defining a menu to display alongside each row in the DataTable.
 */


// ### Event Helpers


// ### isFunction
var DataTableRowActions = (0, _createReactClass2.default)({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.DATA_TABLE_ROW_ACTIONS,

	// ### Prop Types
	propTypes: {
		/**
   * Description of the menu for screenreaders.
   */
		assistiveText: _propTypes2.default.string,
		/**
   * Class names to be added to the actions menu.
   */
		className: _propTypes2.default.string,
		id: _propTypes2.default.string,
		item: _propTypes2.default.object,
		onAction: _propTypes2.default.func,
		options: _propTypes2.default.array.isRequired
	},

	getDefaultProps: function getDefaultProps() {
		return {
			assistiveText: 'Actions'
		};
	},
	handleClick: function handleClick(e) {
		_event2.default.trap(e);
	},
	handleSelect: function handleSelect(selection) {
		if ((0, _lodash2.default)(this.props.onAction)) {
			this.props.onAction(this.props.item, selection);
		}
	},


	// ### Render
	render: function render() {
		// i18n
		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			_react2.default.createElement(
				'td',
				{
					className: '',
					'data-label': 'Actions',
					onClick: this.handleClick,
					style: { width: '3.25rem' }
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
			)
		);
	}
});

// ## Constants


// ## Children
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// ### React
exports.default = DataTableRowActions;