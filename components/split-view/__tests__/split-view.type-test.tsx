/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import SplitViewHeader from '../header';
import SplitViewListbox from '../listbox';

interface Lead {
	id: string;
	label: string;
	topLeftText: string;
	company: string;
}

const leads: Lead[] = [
	{ id: '1', label: 'Riley', topLeftText: 'Riley', company: 'Biotech' },
];

const LeadItem = ({ item }: { item: Lead }) => <span>{item.company}</span>;

export const listbox = (
	<SplitViewListbox
		events={{ onSelect: (_event, { item }) => item?.company }}
		listItem={LeadItem}
		options={leads}
		selection={[leads[0]]}
	/>
);

export const mismatchedItem = (
	<SplitViewListbox
		// @ts-expect-error the item type flows from `options` into `listItem`
		listItem={({ item }: { item: { ranking: number } }) => (
			<span>{item.ranking}</span>
		)}
		options={leads}
	/>
);

export const header = <SplitViewHeader title="Leads" variant="object-home" />;

// @ts-expect-error the header has no index signature
export const headerUnknownProp = <SplitViewHeader title="Leads" unknownProp />;
