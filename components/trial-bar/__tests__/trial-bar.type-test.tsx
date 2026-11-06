/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import TrialBarDropdown from '../dropdown';

export const dropdown = <TrialBarDropdown label="Actions" options={[]} />;

export const inverseIgnored = (
	// @ts-expect-error the dropdown is always inverse
	<TrialBarDropdown label="Actions" inverse={false} options={[]} />
);

export const triggerIgnored = (
	// @ts-expect-error the dropdown renders its own trigger
	<TrialBarDropdown label="Actions" trigger={<button />} options={[]} />
);
