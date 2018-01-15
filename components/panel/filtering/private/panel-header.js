'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _button = require('../../../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Header for a Filter Group within a Panel.
 */
var PanelFilterHeader = function PanelFilterHeader(_ref) {
	var assistiveTextCloseFilterPanel = _ref.assistiveTextCloseFilterPanel,
	    cancelLabel = _ref.cancelLabel,
	    heading = _ref.heading,
	    modified = _ref.modified,
	    onRequestCancel = _ref.onRequestCancel,
	    onRequestClose = _ref.onRequestClose,
	    onRequestSave = _ref.onRequestSave,
	    saveLabel = _ref.saveLabel;
	return modified ? _react2.default.createElement(
		'div',
		{ className: 'slds-filters__header slds-grid slds-has-divider--bottom-space slds-grid--align-spread' },
		_react2.default.createElement(_button2.default, { label: cancelLabel, onClick: onRequestCancel, variant: 'neutral' }),
		_react2.default.createElement(_button2.default, { label: saveLabel, onClick: onRequestSave, variant: 'brand' })
	) : _react2.default.createElement(
		'div',
		{ className: 'slds-filters__header slds-grid slds-has-divider--bottom-space' },
		_react2.default.createElement(
			'h2',
			{ className: 'slds-align-middle slds-text-heading--small' },
			heading
		),
		_react2.default.createElement(_button2.default, {
			className: 'slds-col--bump-left',
			assistiveText: assistiveTextCloseFilterPanel,
			iconCategory: 'utility',
			iconName: 'forward',
			iconVariant: 'bare',
			iconSize: 'small',
			onClick: onRequestClose,
			title: assistiveTextCloseFilterPanel,
			variant: 'icon'
		})
	);
}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Panel Filter Group Header

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React


PanelFilterHeader.displayName = 'SLDSPanelFilterHeader';

PanelFilterHeader.propTypes = {
	/**
  * Localized description of the close button for the panel for screen readers
  */
	assistiveTextCloseFilterPanel: _propTypes2.default.node,
	/**
  * Label for button that cancels modified filters
  */
	cancelLabel: _propTypes2.default.string,
	/**
  * The heading of the filtering panel
  */
	heading: _propTypes2.default.node,
	/**
  * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
  */
	modified: _propTypes2.default.bool,
	/**
  * When the panel's cancel button is clicked in order to reset filter panel to previous state.
  */
	onRequestCancel: _propTypes2.default.func,
	/**
  * When the panel's close button is clicked. Please place Panel within another element to control position and visibility.
  */
	onRequestClose: _propTypes2.default.func,
	/**
  * When the panel's save button is clicked in order to confirm filter panel state.
  */
	onRequestSave: _propTypes2.default.func,
	/**
  * Label for button that saves modified filters
  */
	saveLabel: _propTypes2.default.string
};

exports.default = PanelFilterHeader;