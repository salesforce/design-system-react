define(['exports', 'react', 'prop-types', '../../../media-object'], function (exports, _react, _propTypes, _mediaObject) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _mediaObject2 = _interopRequireDefault(_mediaObject);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var displayName = 'PageHeaderBase'; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	var propTypes = {
		/**
   * Icon node passed by PageHeader
   */
		icon: _propTypes2.default.node,
		/**
   * Title node passed by PageHeader
   */
		title: _propTypes2.default.node,
		/**
   * Info node passed by PageHeader
   */
		info: _propTypes2.default.node
	};

	var Base = function Base(props) {
		return _react2.default.createElement(_mediaObject2.default, {
			body: _react2.default.createElement(
				'div',
				null,
				props.title,
				props.info
			),
			figure: props.icon,
			verticalCenter: true
		});
	};

	Base.displayName = displayName;
	Base.propTypes = propTypes;

	exports.default = Base;
});