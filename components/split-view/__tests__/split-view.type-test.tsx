/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import SplitView from '../index';
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

const onSelect = () => {};

export const listbox = (
	<SplitViewListbox
		events={{
			onSelect: (_event, { item, selection }) =>
				`${item?.company}${selection.join()}`,
		}}
		options={leads}
		renderListItem={({ item }) => <span>{item.company}</span>}
		selection={[leads[0].id]}
		unread={['1']}
	/>
);

// Deprecated, still accepted: item objects in `selection` and `unread`
export const objectSelection = (
	<SplitViewListbox
		events={{ onSelect }}
		options={leads}
		selection={[leads[0]]}
		unread={[leads[0]]}
	/>
);

export const noSelection = (
	// @ts-expect-error selection is controlled data: `selection` is required
	<SplitViewListbox events={{ onSelect }} options={leads} />
);

// @ts-expect-error `events.onSelect` is required
export const noEvents = <SplitViewListbox options={leads} selection={[]} />;

export const noItemIds = (
	<SplitViewListbox
		events={{ onSelect }}
		// @ts-expect-error items need an `id` to be matched against `selection`
		options={[{ label: 'Riley' }]}
		selection={[]}
	/>
);

export const mismatchedRenderItem = (
	<SplitViewListbox
		events={{ onSelect }}
		options={leads}
		// @ts-expect-error the item type flows from `options` into `renderListItem`
		renderListItem={({ item }) => <span>{item.ranking}</span>}
		selection={[]}
	/>
);

export const deprecatedListItem = (
	<SplitViewListbox
		events={{ onSelect }}
		listItem={LeadItem}
		options={leads}
		selection={[]}
	/>
);

export const mismatchedItem = (
	<SplitViewListbox
		events={{ onSelect }}
		// @ts-expect-error the item type flows from `options` into `listItem`
		listItem={({ item }: { item: { ranking: number } }) => (
			<span>{item.ranking}</span>
		)}
		options={leads}
		selection={[]}
	/>
);

export const splitViewUncontrolled = (
	<SplitView defaultIsOpen={false} master={null} detail={null} />
);

export const splitViewControlled = (
	<SplitView
		isOpen
		events={{ onToggle: (_event, { isOpen }) => !isOpen }}
		master={null}
		detail={null}
	/>
);

export const header = <SplitViewHeader title="Leads" variant="object-home" />;

// @ts-expect-error the header has no index signature
export const headerUnknownProp = <SplitViewHeader title="Leads" unknownProp />;
