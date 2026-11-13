/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import SetupAssistant from '../index';

export const list = <SetupAssistant />;

export const card = <SetupAssistant isCard progressBar={<div />} />;

export const cardWithoutProgressBar = <SetupAssistant isCard />;

export const progressBarWithoutCard = (
	// @ts-expect-error `progressBar` is only shown with `isCard`
	<SetupAssistant progressBar={<div />} />
);
