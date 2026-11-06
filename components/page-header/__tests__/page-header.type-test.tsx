/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import PageHeader from '../index';

export const base = <PageHeader title="Accounts" info="10 items" />;

export const recordHome = (
	<PageHeader
		variant="record-home"
		title="Acme"
		details={[
			{ id: 'phone', label: 'Phone', content: '555', flavor: '1-of-4' },
		]}
	/>
);

export const objectHome = (
	<PageHeader
		variant="object-home"
		title="Accounts"
		trail={['Setup']}
		nameSwitcherDropdown={<span />}
	/>
);

export const baseWithTrail = (
	// @ts-expect-error `trail` is not used by the base variant
	<PageHeader title="Accounts" trail={['Setup']} />
);

export const baseWithDetails = (
	// @ts-expect-error `details` belongs to `record-home`
	<PageHeader variant="base" details={[]} />
);

export const objectHomeWithDetails = (
	// @ts-expect-error `details` belongs to `record-home`
	<PageHeader variant="object-home" details={[]} />
);

export const relatedListWithIcon = (
	// @ts-expect-error the related list has no icon
	<PageHeader variant="related-list" icon={<span />} />
);

export const badFlavor = (
	<PageHeader
		variant="record-home"
		// @ts-expect-error `flavor` is an `n-of-m` width
		details={[{ flavor: 'wide' }]}
	/>
);
