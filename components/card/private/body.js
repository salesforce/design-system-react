define(['exports', 'react', 'prop-types', '../../../utilities/constants', 'classnames'], function (exports, _react, _propTypes, _constants, _classnames) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// ### React
	var CardBody = function CardBody(props) {
		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)('slds-card__body', props.className), id: props.id },
			props.children
		);
	};

	// ### classNames
	// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
	// This project uses `classnames`, "a simple javascript utility for conditionally joining classNames together."


	CardBody.displayName = _constants.CARD_BODY;

	CardBody.propTypes = {
		/**
   * Elements to place in the body.
   */
		children: _propTypes2.default.node,
		/**
   * CSS classes to be added to the card.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Set the HTML `id` of the body.
   */
		id: _propTypes2.default.string
	};

	exports.default = CardBody;
});