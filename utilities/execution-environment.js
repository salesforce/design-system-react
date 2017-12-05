'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var ExecutionEnvironment = {
	canUseDOM: canUseDOM,
	canUseWorkers: typeof Worker !== 'undefined',
	canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
	canUseViewport: canUseDOM && !!window.screen
};

exports.default = ExecutionEnvironment;