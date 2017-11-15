'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DefaultFooter = exports.DefaultSectionDivider = exports.DefaultHeader = undefined;

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _defaultFooter = require('./menu/default-footer');

var _defaultFooter2 = _interopRequireDefault(_defaultFooter);

var _defaultHeader = require('./menu/default-header');

var _defaultHeader2 = _interopRequireDefault(_defaultHeader);

var _defaultSectionDivider = require('./menu/default-section-divider');

var _defaultSectionDivider2 = _interopRequireDefault(_defaultSectionDivider);

var _lookup = require('./lookup');

var _lookup2 = _interopRequireDefault(_lookup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactOnclickoutside2.default)(_lookup2.default, {
	excludeScrollbar: true
}); /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### onClickOutside
// Listen for clicks that occur somewhere in the document, outside of the element itself

exports.DefaultHeader = _defaultHeader2.default;
exports.DefaultSectionDivider = _defaultSectionDivider2.default;
exports.DefaultFooter = _defaultFooter2.default;