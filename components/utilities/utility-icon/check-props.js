define(['exports', '../../../utilities/warning/url-exists'], function (exports, _urlExists) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _urlExists2 = _interopRequireDefault(_urlExists);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var checkProps = function checkProps() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
	/* eslint-disable import/no-mutable-exports */

	if (process.env.NODE_ENV !== 'production') {
		checkProps = function checkProps(COMPONENT, props) {
			if (!props.context[props.category + 'Sprite']) {
				var modifiedPath = props.path || props.context.iconPath;
				(0, _urlExists2.default)(COMPONENT, modifiedPath + '/' + props.category + '-sprite/svg/symbols.svg#' + props.name);
			}
		};
	}

	exports.default = checkProps;
});