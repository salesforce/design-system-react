'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _deprecatedProperty = require('../../utilities/warning/deprecated-property');

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _sunsetProperty = require('../../utilities/warning/sunset-property');

var _sunsetProperty2 = _interopRequireDefault(_sunsetProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkProps(COMPONENT, props) {
		/* eslint-disable max-len */
		// Deprecated and changed to another property
		(0, _deprecatedProperty2.default)(COMPONENT, props.collection, 'collection', 'items');
		(0, _deprecatedProperty2.default)(COMPONENT, props.onSelect, 'onSelect', 'onChange');
		(0, _deprecatedProperty2.default)(COMPONENT, props.onDeselect, 'onDeselect', 'onChange');
		(0, _sunsetProperty2.default)(COMPONENT, props.sortable, 'sortable', 'The table is sortable if one or more of its columns are sortable.');

		// Deprecated and moved to a child
		(0, _sunsetProperty2.default)(COMPONENT, props.columns, 'columns', 'Please provide one or more children of the type <Column /> instead.');

		(0, _sunsetProperty2.default)(COMPONENT, props.bordered, 'bordered', 'All SLDS DataTables have row borders by default now. If you do not want row borders, please use `unborderedRow`');
		/* eslint-enable max-len */
	};
}

exports.default = checkProps;