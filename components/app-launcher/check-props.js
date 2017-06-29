define(['exports', '../../utilities/warning/one-of-component'], function (exports, _oneOfComponent) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _oneOfComponent2 = _interopRequireDefault(_oneOfComponent);

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
			if (props.modalHeaderButton !== undefined) {
				(0, _oneOfComponent2.default)(COMPONENT, props, 'modalHeaderButton', ['SLDSButton']);
			}
		};
	}

	exports.default = checkProps;
});