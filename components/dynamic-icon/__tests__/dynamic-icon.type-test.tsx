/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import DynamicIcon from '../index';

export const noTitle = <DynamicIcon variant="eq" />;

export const strength = <DynamicIcon variant="strength" strengthLevel={-2} />;

export const trend = <DynamicIcon variant="trend" trendDirection="up" />;

export const waffle = <DynamicIcon variant="waffle" onClick={() => {}} />;

export const stringStrength = (
	// @ts-expect-error `strengthLevel` is a number from -3 to 3
	<DynamicIcon variant="strength" strengthLevel="2" />
);

export const polarityOnTrend = (
	// @ts-expect-error `scorePolarity` belongs to `score`
	<DynamicIcon variant="trend" scorePolarity="positive" />
);

export const onClickOnEq = (
	// @ts-expect-error only `waffle` renders a button
	<DynamicIcon variant="eq" onClick={() => {}} />
);
