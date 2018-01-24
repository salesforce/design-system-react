define(['exports', 'react', 'prop-types', 'classnames', '../../button'], function (exports, _react, _propTypes, _classnames, _button) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TOGGLE_BUTTON_WIDTH = exports.DISPLAY_NAME = undefined;

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	var DISPLAY_NAME = exports.DISPLAY_NAME = 'SLDSSplitViewToggleButton';
	var TOGGLE_BUTTON_WIDTH = exports.TOGGLE_BUTTON_WIDTH = '0.75rem';

	var propsTypes = {
		/**
   * **Assistive text for accessibility**
   * * `toggleButtonOpen`: The button used to open the split view.
   * * `toggleButtonClose`: The button used to close the split view.
   */
		assistiveText: _propTypes2.default.shape({
			toggleButtonOpen: _propTypes2.default.string.isRequired,
			toggleButtonClose: _propTypes2.default.string.isRequired
		}),
		/**
   * Unique html id placed on the button for aria-controls
   */
		ariaControls: _propTypes2.default.string.isRequired,
		/**
   * Determines if the panel is open
   */
		isOpen: _propTypes2.default.bool.isRequired,
		/**
   * **Event Callbacks**
   * * `onClick`: Called when the button is clicked.
   */
		events: _propTypes2.default.shape({
			onClick: _propTypes2.default.func.isRequired
		})
	};

	var defaultProps = {};

	var SplitViewToggleButton = function SplitViewToggleButton(_ref) {
		var isOpen = _ref.isOpen,
		    assistiveText = _ref.assistiveText,
		    ariaControls = _ref.ariaControls,
		    events = _ref.events;

		var toggleAssistiveText = isOpen ? assistiveText.toggleButtonOpen : assistiveText.toggleButtonClose;

		return _react2.default.createElement(_button2.default, {
			className: (0, _classnames2.default)('slds-button slds-button_icon slds-split-view__toggle-button', { 'slds-is-open': isOpen }),
			'aria-expanded': isOpen,
			'aria-controls': ariaControls,
			title: toggleAssistiveText,
			variant: 'base',
			iconName: 'left',
			iconCategory: 'utility',
			iconSize: 'x-small',
			onClick: events.onClick,
			assistiveText: toggleAssistiveText
		});
	};

	SplitViewToggleButton.displayName = DISPLAY_NAME;
	SplitViewToggleButton.propTypes = propsTypes;
	SplitViewToggleButton.defaultProps = defaultProps;

	exports.default = SplitViewToggleButton;
});