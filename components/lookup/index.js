define(['exports', 'react-onclickoutside', './menu/default-footer', './menu/default-header', './menu/default-section-divider', './lookup'], function (exports, _reactOnclickoutside, _defaultFooter, _defaultHeader, _defaultSectionDivider, _lookup) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DefaultFooter = exports.DefaultSectionDivider = exports.DefaultHeader = undefined;

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

	exports.default = (0, _reactOnclickoutside2.default)(_lookup2.default, {
		excludeScrollbar: true
	});
	exports.DefaultHeader = _defaultHeader2.default;
	exports.DefaultSectionDivider = _defaultSectionDivider2.default;
	exports.DefaultFooter = _defaultFooter2.default;
});