/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

const canUseDOM = !!(
	typeof window !== 'undefined' &&
	window.document &&
	window.document.createElement
);

const ExecutionEnvironment = {
	canUseDOM,
	canUseWorkers: typeof Worker !== 'undefined',
	canUseEventListeners:
		canUseDOM && !!(window.addEventListener || window.attachEvent),
	canUseViewport: canUseDOM && !!window.screen,
};

export default ExecutionEnvironment;
