/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// The snippets in docs/migration-v11.md, checked by `npm run typecheck`. Each
// "after" snippet must compile, and each "before" snippet that v11 rejects sits
// under an `@ts-expect-error`, which fails the build if it starts compiling.
// Keep the two files in step: change a snippet here and in the guide together.

import { useRef, useState } from 'react';
import {
	Button,
	Checkbox,
	ExpandableSection,
	Icon,
	Input,
	MenuDropdown,
	Modal,
	PageHeader,
	PageHeaderControl,
	Popover,
	Radio,
	RadioGroup,
	SimpleDataTable,
	SimpleDataTableColumn,
	Spinner,
	Tabs,
	TabsPanel,
	Toast,
	Tooltip,
	Tree,
} from '../../components';
import GroupRadio from '../../components/radio-group/radio';
import type { TreeNode } from '../../components/tree';

const items = [{ id: '1', name: 'Acme' }];
const options = [{ label: 'Edit', value: 'edit' }];
const nodes: TreeNode[] = [{ id: 'a', label: 'A', type: 'item' }];

// ## Platform: DataTable is SimpleDataTable

export function DataTableAfter() {
	const [selection, setSelection] = useState<{ id: string }[]>([]);
	return (
		<SimpleDataTable
			items={items}
			selectRows="checkbox"
			selection={selection}
			onRowChange={(event, data) => setSelection(data.selection)}
		>
			<SimpleDataTableColumn label="Name" property="name" />
		</SimpleDataTable>
	);
}

export const dataTableBefore = (
	<SimpleDataTable
		items={items}
		selectRows="checkbox"
		selection={[]}
		onRowChange={() => {}}
		// @ts-expect-error onChange(selection, event) was removed; use onRowChange
		onChange={(selection: { id: string }[]) => selection}
	/>
);

// ## Callbacks are (event, data)

export function TabsAfter() {
	const [value, setValue] = useState('details');
	return (
		<Tabs value={value} onSelect={(event, data) => setValue(data.value)}>
			<TabsPanel label="Details" value="details">
				Details
			</TabsPanel>
			<TabsPanel label="Related" value="related">
				Related
			</TabsPanel>
		</Tabs>
	);
}

export const tabsBefore = (
	<Tabs
		value="details"
		// @ts-expect-error 0.10.x called onSelect(selectedIndex, lastIndex)
		onSelect={(selectedIndex: number, lastIndex: number) => [
			selectedIndex,
			lastIndex,
		]}
	>
		<TabsPanel label="Details">Details</TabsPanel>
	</Tabs>
);

export const menuDropdownAfter = (
	<MenuDropdown
		label="Actions"
		options={options}
		onSelect={(event, { option }) => option.label}
	/>
);

export const menuDropdownBefore = (
	<MenuDropdown
		label="Actions"
		options={options}
		// @ts-expect-error 0.10.x passed the option first
		onSelect={(option: { label: string }) => option.label}
	/>
);

// ## className, style and ref land on the root

export const popoverAfter = (
	<Popover
		body="Body"
		className="my-trigger-wrapper"
		classNameDialog="my-dialog"
		styleDialog={{ width: '20rem' }}
	>
		<Button label="Open" />
	</Popover>
);

export function FocusAfter() {
	const ref = useRef<HTMLButtonElement>(null);
	return <Button ref={ref} label="Save" onClick={() => ref.current?.focus()} />;
}

// ## Text goes in labels and assistiveText

export const spinnerAfter = <Spinner assistiveText={{ label: 'Loading' }} />;

// @ts-expect-error string assistiveText was removed
export const spinnerBefore = <Spinner assistiveText="Loading" />;

export const radioAfter = (
	<Radio checked onChange={() => {}} labels={{ label: 'Email' }} />
);

// @ts-expect-error Radio `label` was removed; use labels.label
export const radioBefore = <Radio checked onChange={() => {}} label="Email" />;

export const modalAfter = (
	<Modal
		isOpen
		heading="Delete record"
		assistiveText={{ closeButton: 'Close' }}
	>
		Are you sure?
	</Modal>
);

export const modalBefore = (
	// @ts-expect-error Modal `title` was removed; use heading
	<Modal isOpen title="Delete record">
		Are you sure?
	</Modal>
);

// ## Data is controlled

export function CheckboxAfter() {
	const [checked, setChecked] = useState(false);
	return (
		<Checkbox
			checked={checked}
			labels={{ label: 'Subscribe' }}
			onChange={(event, data) => setChecked(data.checked)}
		/>
	);
}

// @ts-expect-error defaultChecked was removed; pass checked and onChange
export const checkboxBefore = <Checkbox defaultChecked />;

// @ts-expect-error defaultValue was removed; pass value and onChange
export const inputBefore = <Input defaultValue="Acme" />;

export function RadioGroupAfter() {
	const [value, setValue] = useState<string | null>('email');
	return (
		<RadioGroup
			labels={{ label: 'Contact by' }}
			value={value}
			onChange={(event, data) => setValue(data.value)}
		>
			<GroupRadio labels={{ label: 'Email' }} value="email" />
			<GroupRadio labels={{ label: 'Phone' }} value="phone" />
		</RadioGroup>
	);
}

export function TreeAfter() {
	const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
	return (
		<Tree
			id="tree"
			labels={{ heading: 'Files' }}
			nodes={nodes}
			selectedIds={selectedIds}
			onSelect={(event, data) => setSelectedIds(data.selectedIds)}
		/>
	);
}

// ## Ephemeral UI state may be uncontrolled

export const sectionUncontrolled = (
	<ExpandableSection title="Details" defaultIsOpen={false}>
		Body
	</ExpandableSection>
);

export function SectionControlled() {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<ExpandableSection
			title="Details"
			isOpen={isOpen}
			onToggleOpen={(event, data) => setIsOpen(data.isOpen)}
		>
			Body
		</ExpandableSection>
	);
}

export const tooltipDisabled = (
	<Tooltip content="Help" isDisabled trigger={<Button label="Save" />} />
);

// ## Slots instead of render functions

export const pageHeaderAfter = (
	<PageHeader
		variant="object-home"
		title="Accounts"
		actions={
			<PageHeaderControl>
				<Button label="New" />
			</PageHeaderControl>
		}
	/>
);

// ## Unions reject ignored props

export const buttonIconAfter = (
	<Button
		variant="icon"
		iconCategory="utility"
		iconName="settings"
		iconVariant="border"
		assistiveText={{ icon: 'Settings' }}
	/>
);

export const buttonIconBefore = (
	// @ts-expect-error iconVariant needs variant="icon"
	<Button iconName="settings" iconVariant="border" label="Settings" />
);

export const buttonTooltipAfter = (
	<Tooltip content="Saves the record" trigger={<Button label="Save" />} />
);

// @ts-expect-error Button `tooltip` was removed; wrap the button in a Tooltip
export const buttonTooltipBefore = <Button label="Save" tooltip="Saves" />;

export const toastAfter = (
	<Toast
		dismissible
		labels={{ heading: 'Saved' }}
		onRequestClose={(event, data) => data.trigger}
	/>
);
