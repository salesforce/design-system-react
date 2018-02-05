define(['exports', 'react', 'prop-types', 'classnames', '../../icon', '../../../utilities/constants'], function (exports, _react, _propTypes, _classnames, _icon, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * A filtering panel contextual filtering options.
  */
	var PanelFilterListHeading = function PanelFilterListHeading(_ref) {
		var heading = _ref.heading,
		    isLocked = _ref.isLocked,
		    lockedHeading = _ref.lockedHeading;
		return _react2.default.createElement(
			'h3',
			{
				className: (0, _classnames2.default)('slds-text-body--small', 'slds-m-vertical--x-small', {
					'slds-grid': isLocked
				})
			},
			isLocked ? lockedHeading : heading,
			isLocked ? _react2.default.createElement(_icon2.default, {
				className: 'slds-m-left--x-small',
				assistiveText: 'locked',
				category: 'utility',
				name: 'lock',
				size: 'x-small'
			}) : null
		);
	};

	// ## Constants


	// ### classNames
	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// # FIlter List Heading

	// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
	// Based on SLDS v2.2.0-rc.1

	// ## Dependencies

	// ### React


	PanelFilterListHeading.displayName = _constants.PANEL_FILTER_LIST_HEADING;

	PanelFilterListHeading.propTypes = {
		/**
   * Heading for following PanelFilterList
   */
		heading: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
		/**
   * Displayed a heading for a locked list of filters
   */
		isLocked: _propTypes2.default.bool,
		/**
   * Heading for a group of filters that are locked
   */
		lockedHeading: _propTypes2.default.string
	};

	PanelFilterListHeading.defaultProps = {
		heading: 'Matching all these filters',
		lockedLabel: 'Locked filters'
	};

	exports.default = PanelFilterListHeading;
});