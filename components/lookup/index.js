define(['module', 'react-onclickoutside', './menu/default-footer', './menu/default-header', './menu/default-section-divider', './lookup'], function (module, _reactOnclickoutside, _defaultFooter, _defaultHeader, _defaultSectionDivider, _lookup) {
	'use strict';

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	var _defaultFooter2 = _interopRequireDefault(_defaultFooter);

	var _defaultHeader2 = _interopRequireDefault(_defaultHeader);

	var _defaultSectionDivider2 = _interopRequireDefault(_defaultSectionDivider);

	var _lookup2 = _interopRequireDefault(_lookup);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	module.exports = (0, _reactOnclickoutside2.default)(_lookup2.default, {
		excludeScrollbar: true
	}); /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// ### onClickOutside
	// Listen for clicks that occur somewhere in the document, outside of the element itself


	module.exports.DefaultHeader = _defaultHeader2.default;
	module.exports.DefaultSectionDivider = _defaultSectionDivider2.default;
	module.exports.DefaultFooter = _defaultFooter2.default;
});