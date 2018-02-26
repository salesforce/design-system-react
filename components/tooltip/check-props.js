'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _deprecatedProperty = require('../../utilities/warning/deprecated-property');

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _isTriggerTabbable = require('../../utilities/warning/is-trigger-tabbable');

var _isTriggerTabbable2 = _interopRequireDefault(_isTriggerTabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkProps(COMPONENT, props) {
		(0, _isTriggerTabbable2.default)(COMPONENT, props.children, '');

		// Deprecated and changed to another property
		(0, _deprecatedProperty2.default)(COMPONENT, props.openByDefault, 'openByDefault', 'isOpen');
		(0, _deprecatedProperty2.default)(COMPONENT, props.target, 'target', undefined, 'A new positioning library is being implmented under the hood. Please trigger tooltips to appear on their triggers with `isOpen` and not on other DOM elements.' // eslint-disable-line max-len
		);

		(0, _deprecatedProperty2.default)(COMPONENT, props.isInline, 'isInline', 'position="relative"');
	};
}

exports.default = checkProps;