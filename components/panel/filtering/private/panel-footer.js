define(['exports', 'react', 'prop-types', '../../../button'], function (exports, _react, _propTypes, _button) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * A filtering panel contextual filtering options.
  */
	var PanelFilterFooter = function PanelFilterFooter(_ref) {
		var addFilterLabel = _ref.addFilterLabel,
		    onClickAdd = _ref.onClickAdd,
		    onClickRemoveAll = _ref.onClickRemoveAll,
		    removeAllLabel = _ref.removeAllLabel;
		return _react2.default.createElement(
			'div',
			{ className: 'slds-filters__footer slds-grid slds-shrink-none' },
			_react2.default.createElement(_button2.default, { label: addFilterLabel, onClick: onClickAdd, variant: 'link' }),
			_react2.default.createElement(_button2.default, {
				className: 'slds-col--bump-left',
				label: removeAllLabel,
				onClick: onClickRemoveAll,
				variant: 'link'
			})
		);
	}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// # Panel Filter Group Footer

	// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
	// Based on SLDS v2.2.0-rc.1

	// ## Dependencies

	// ### React


	PanelFilterFooter.displayName = 'SLDSPanelFilterFooter';

	PanelFilterFooter.propTypes = {
		/**
   * Localized description of the "Add Filter" button in the footer
   */
		addFilterLabel: _propTypes2.default.node.isRequired,
		/**
   * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
   */
		onClickAdd: _propTypes2.default.func.isRequired,
		/**
   * Callback triggered when "Remove All" is clicked. Recieves an `event`.
   */
		onClickRemoveAll: _propTypes2.default.func.isRequired,
		/**
   * Localized description of the "Remove All" button in the footer
   */
		removeAllLabel: _propTypes2.default.node.isRequired
	};

	exports.default = PanelFilterFooter;
});