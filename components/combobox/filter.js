'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash.escaperegexp');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SLDS recommends auto-complete/search inputs menus have a limit of 10 items.
 */
var filter = function filter(_ref) {
	var inputValue = _ref.inputValue,
	    _ref$limit = _ref.limit,
	    limit = _ref$limit === undefined ? 10 : _ref$limit,
	    options = _ref.options,
	    selection = _ref.selection;
	return options.filter(function (option) {
		var searchTermFound = option.label.match(new RegExp((0, _lodash2.default)(inputValue), 'ig'));
		var isSection = option.data && option.data.type === 'section';
		var notAlreadySelected = !selection.includes(option);

		return (!inputValue || isSection || searchTermFound) && notAlreadySelected;
	}).splice(0, limit);
}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
exports.default = filter;