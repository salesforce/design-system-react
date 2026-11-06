/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import ButtonStateful from '../index';

export const controlled = (
	<ButtonStateful
		isActive={false}
		onClick={(event, data) => {
			const next: boolean = data.isActive;
			return [event.target, next];
		}}
	/>
);

// @ts-expect-error `onClick` is required unless `disabled` is set
export const missingOnClick = <ButtonStateful isActive={false} />;

export const disabledWithoutOnClick = (
	<ButtonStateful disabled isActive={false} />
);

export const nativeAttributes = (
	<ButtonStateful
		isActive={false}
		onClick={() => {}}
		name="follow"
		tabIndex={0}
	/>
);

export const stringTabIndex = (
	// @ts-expect-error `tabIndex` is a number
	<ButtonStateful isActive={false} onClick={() => {}} tabIndex="0" />
);
