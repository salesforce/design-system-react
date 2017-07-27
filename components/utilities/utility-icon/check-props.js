'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _urlExists = require('../../../utilities/warning/url-exists');

var _urlExists2 = _interopRequireDefault(_urlExists);

var _settings = require('../../../components/settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkProps(COMPONENT, props) {
		var modifiedPath = props.path || _settings2.default.getIconsPath();

		// only check if user passes in external path for SLDS sprite
		if (modifiedPath && props.name) {
			(0, _urlExists2.default)(COMPONENT, modifiedPath + '/' + props.category + '-sprite/svg/symbols.svg#' + props.name);
		}
	};
}

exports.default = checkProps;