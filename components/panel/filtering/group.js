'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _panelFooter = require('./private/panel-footer');

var _panelFooter2 = _interopRequireDefault(_panelFooter);

var _panelHeader = require('./private/panel-header');

var _panelHeader2 = _interopRequireDefault(_panelHeader);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A filtering panel contextual filtering options.
 */
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Panel Filter Group

// Implements the Filter part of [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
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
				{ className: 'slds-text-color--error slds-m-bottom--x-small', role: 'alert' },
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


PanelFilterGroup.displayName = _constants.PANEL_FILTER_GROUP;

PanelFilterGroup.propTypes = {
	/**
  * Localized description of the "Add Filter" button in the footer
  */
	addFilterLabel: _react.PropTypes.node,
	/**
  * Localized description of the close button for the panel for screen readers
  */
	assistiveTextCloseFilterPanel: _react.PropTypes.node,
	/**
  * Label for button that cancels modified filters
  */
	cancelLabel: _react.PropTypes.string,
	/**
  * Pass in `FilterList`'s of `Filters`:
  *
  * ```
  * <FilterGroup
  *   variant="panel"
  * >
  *   <FilterList>
  *     <Filter
  *       property="Show Me"
  *       predicate="All Wackamoles"
  *     >
  *     {popoverContents}
  *     </Filter>
  *   </FilterList>
  * </FilterGroup>
  * ```
  */
	children: _react.PropTypes.node,
	/**
  * Label for the error message at the top of the panel.
  */
	errorLabel: _react.PropTypes.string,
	/**
  * Allows for customization of footer. This will be added after any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
  */
	footer: _react.PropTypes.node,
	/**
  * Allows for customization of header. This will be added before any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
  */
	header: _react.PropTypes.node,
	/**
  * The heading within the header of the filtering panel
  */
	heading: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string]),
	/**
  * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
  */
	modified: _react.PropTypes.bool,
	/**
  * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
  */
	onClickAdd: _react.PropTypes.func,
	/**
  * Callback triggered when "Remove All" is clicked. Recieves an `event`.
  */
	onClickRemoveAll: _react.PropTypes.func,
	/**
  * When the panel's cancel button is clicked in order to reset filter panel to previous state.
  */
	onRequestCancel: _react.PropTypes.func,
	/**
  * When the panel's close button is clicked. Please place Panel within another element to control position and visibility.
  */
	onRequestClose: _react.PropTypes.func,
	/**
  * When the panel's save button is clicked in order to confirm filter panel state.
  */
	onRequestSave: _react.PropTypes.func,
	/**
  * Localized description of the "Remove All" button in the footer
  */
	removeAllLabel: _react.PropTypes.node,
	/**
  * Label for button that saves modified filters
  */
	saveLabel: _react.PropTypes.string,
	/**
  * Adds in default Panel header and footer
  */
	variant: _react2.default.PropTypes.oneOf(['panel'])
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