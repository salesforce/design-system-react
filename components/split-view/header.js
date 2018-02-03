'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pageHeader = require('../page-header');

var _pageHeader2 = _interopRequireDefault(_pageHeader);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var propTypes = {};

var defaultProps = {};
/**
 * The Split View Header takes the same properties as the [PageHeader](https://react.lightningdesignsystem.com/components/page-headers/) component.
 */
var SplitViewHeader = function SplitViewHeader(_ref) {
	var className = _ref.className,
	    rest = _objectWithoutProperties(_ref, ['className']);

	return _react2.default.createElement(_pageHeader2.default, _extends({
		className: (0, _classnames2.default)('slds-split-view__header slds-has-bottom-magnet', className)
	}, rest));
};

SplitViewHeader.displayName = _constants.SPLIT_VIEW_HEADER;
SplitViewHeader.propTypes = propTypes;
SplitViewHeader.defaultProps = defaultProps;

exports.default = SplitViewHeader;