define(['exports', 'react', 'prop-types', '../../utilities/constants'], function (exports, _react, _propTypes, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Use breadcrumbs to note the path of a record and help the user to navigate back to the parent.Breadcrumb based on SLDS 2.1.0-dev
  */
	var Breadcrumb = function Breadcrumb(props) {
		var assistiveText = props.assistiveText,
		    trail = props.trail;


		return _react2.default.createElement(
			'nav',
			{ role: 'navigation', 'aria-label': assistiveText },
			_react2.default.createElement(
				'ol',
				{ className: 'slds-breadcrumb slds-list--horizontal' },
				trail.map(function (crumb, index) {
					return (
						/* eslint-disable react/no-array-index-key */
						_react2.default.createElement(
							'li',
							{
								key: index // There isn't any better reasonable way to identity these
								, className: 'slds-breadcrumb__item slds-text-title--caps'
							},
							crumb
						)
					);
				})
			)
		);
	};

	// ## Constants
	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// # Breadcrumbs

	// Implements the [Breadcrumbs design pattern](https://www.lightningdesignsystem.com/components/breadcrumbs) in React.
	// Based on SLDS v2.1.0-rc.2

	// ## Dependencies

	// ### React


	Breadcrumb.displayName = _constants.BREADCRUMB;

	Breadcrumb.propTypes = {
		/**
   * The assistive text for the breadcrumb trail
   */
		assistiveText: _propTypes2.default.string,
		/**
   * An array of react elements presumably anchor elements.
   */
		trail: _propTypes2.default.array
	};

	Breadcrumb.defaultProps = {
		assistiveText: 'Breadcrumbs'
	};

	exports.default = Breadcrumb;
});