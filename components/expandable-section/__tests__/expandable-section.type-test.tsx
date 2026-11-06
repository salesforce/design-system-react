/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import ExpandableSection from '../index';

export const collapsed = <ExpandableSection isOpen={false} title="Details" />;

export const uncontrolledClosed = (
	<ExpandableSection defaultIsOpen={false} title="Details" />
);

export const nonCollapsible = (
	<ExpandableSection nonCollapsible title="Details" />
);

export const closedNonCollapsible = (
	// @ts-expect-error a non-collapsible section is always open
	<ExpandableSection title="Details" nonCollapsible isOpen={false} />
);

export const closedByDefaultNonCollapsible = (
	// @ts-expect-error a non-collapsible section is always open
	<ExpandableSection title="Details" nonCollapsible defaultIsOpen={false} />
);
