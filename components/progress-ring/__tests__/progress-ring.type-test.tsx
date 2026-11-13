/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import ProgressRing from '../index';

export const plain = <ProgressRing value={50} />;

export const themeIcon = <ProgressRing value={50} theme="warning" hasIcon />;

export const customIcon = <ProgressRing value={50} hasIcon icon={<b>!</b>} />;

export const iconWithoutHasIcon = (
	// @ts-expect-error `icon` is only honored with `hasIcon`
	<ProgressRing value={50} icon={<b>!</b>} />
);
