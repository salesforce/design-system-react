/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Tabs from '../index';
import TabsPanel from '../panel';

const panels = [
	<TabsPanel key="a" label="A" value="a">
		A
	</TabsPanel>,
	<TabsPanel key="b" label="B">
		B
	</TabsPanel>,
];

export const byValue = (
	<Tabs
		onSelect={(event, { value, previousValue }) => [value, previousValue]}
		value="a"
	>
		{panels}
	</Tabs>
);

// The deprecated index prop still type-checks on its own
export const byIndex = (
	<Tabs onSelect={() => {}} selectedIndex={1}>
		{panels}
	</Tabs>
);

// @ts-expect-error Tabs is controlled: `value` (or `selectedIndex`) is required
export const uncontrolled = <Tabs onSelect={() => {}}>{panels}</Tabs>;

export const defaultIndex = (
	// @ts-expect-error `defaultSelectedIndex` was removed
	<Tabs defaultSelectedIndex={1} onSelect={() => {}} value="a">
		{panels}
	</Tabs>
);

export const both = (
	// @ts-expect-error pass `value` or `selectedIndex`, not both
	<Tabs onSelect={() => {}} selectedIndex={1} value="a">
		{panels}
	</Tabs>
);
