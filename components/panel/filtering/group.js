'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _panelFooter = require('./private/panel-footer');

var _panelFooter2 = _interopRequireDefault(_panelFooter);

var _panelHeader = require('./private/panel-header');

var _panelHeader2 = _interopRequireDefault(_panelHeader);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A filtering panel contextual filtering options.
 */
var PanelFilterGroup = function PanelFilterGroup(_ref) {
	var children = _ref.children,
	    errorLabel = _ref.errorLabel,
	    footer = _ref.footer,
	    header = _ref.header,
	    variant = _ref.variant,
	    addFilterLabel = _ref.addFilterLabel,
	    onClickAdd = _ref.onClickAdd,
	    onClickRemoveAll = _ref.onClickRemoveAll,
	    removeAllLabel = _ref.removeAllLabel,
	    assistiveTextCloseFilterPanel = _ref.assistiveTextCloseFilterPanel,
	    cancelLabel = _ref.cancelLabel,
	    heading = _ref.heading,
	    modified = _ref.modified,
	    onRequestCancel = _ref.onRequestCancel,
	    onRequestClose = _ref.onRequestClose,
	    onRequestSave = _ref.onRequestSave,
	    saveLabel = _ref.saveLabel;
	return _react2.default.createElement(
		'div',
		{ className: 'slds-filters' },
		variant === 'panel' ? _react2.default.createElement(_panelHeader2.default, {
			assistiveTextCloseFilterPanel: assistiveTextCloseFilterPanel,
			cancelLabel: cancelLabel,
			heading: heading,
			modified: modified,
			onRequestCancel: onRequestCancel,
			onRequestClose: onRequestClose,
			onRequestSave: onRequestSave,
			saveLabel: saveLabel
		}) : header || null,
		_react2.default.createElement(
			'div',
			{ className: 'slds-filters__body' },
			errorLabel ? _react2.default.createElement(
				'div',
				{
					className: 'slds-text-color--error slds-m-bottom--x-small',
					role: 'alert'
				},
				errorLabel
			) : null,
			children
		),
		variant === 'panel' ? _react2.default.createElement(_panelFooter2.default, {
			addFilterLabel: addFilterLabel,
			onClickAdd: onClickAdd,
			onClickRemoveAll: onClickRemoveAll,
			removeAllLabel: removeAllLabel
		}) : footer || null
	);
};

// ## Constants
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Panel Filter Group

// Implements the Filter part of [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React


PanelFilterGroup.displayName = _constants.PANEL_FILTER_GROUP;

PanelFilterGroup.propTypes = {
	/**
  * Localized description of the "Add Filter" button in the footer
  */
	addFilterLabel: _propTypes2.default.node,
	/**
  * Localized description of the close button for the panel for screen readers
  */
	assistiveTextCloseFilterPanel: _propTypes2.default.node,
	/**
  * Label for button that cancels modified filters
  */
	cancelLabel: _propTypes2.default.string,
	/**
  * Pass in `FilterList`'s of `Filters`:
  *
  * ```
  * <FilterGroup
  *   variant="panel"
  * >
  *   <FilterList>
  *   <Filter
  *     property="Show Me"
  *     predicate="All Wackamoles"
  *   >
  *   {popoverContents}
  *   </Filter>
  *   </FilterList>
  * </FilterGroup>
  * ```
  */
	children: _propTypes2.default.node,
	/**
  * Label for the error message at the top of the panel.
  */
	errorLabel: _propTypes2.default.string,
	/**
  * Allows for customization of footer. This will be added after any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
  */
	footer: _propTypes2.default.node,
	/**
  * Allows for customization of header. This will be added before any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
  */
	header: _propTypes2.default.node,
	/**
  * The heading within the header of the filtering panel
  */
	heading: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
	/**
  * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
  */
	modified: _propTypes2.default.bool,
	/**
  * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
  */
	onClickAdd: _propTypes2.default.func,
	/**
  * Callback triggered when "Remove All" is clicked. Recieves an `event`.
  */
	onClickRemoveAll: _propTypes2.default.func,
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
  * Localized description of the "Remove All" button in the footer
  */
	removeAllLabel: _propTypes2.default.node,
	/**
  * Label for button that saves modified filters
  */
	saveLabel: _propTypes2.default.string,
	/**
  * Adds in default Panel header and footer
  */
	variant: _propTypes2.default.oneOf(['panel'])
};

PanelFilterGroup.defaultProps = {
	addFilterLabel: 'Add Filter',
	cancelLabel: 'Cancel',
	assistiveTextCloseFilterPanel: 'Close Filter Panel',
	heading: 'Filter',
	saveLabel: 'Save',
	removeAllLabel: 'Remove All'
};

exports.default = PanelFilterGroup;