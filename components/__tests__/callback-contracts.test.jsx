// Callback contract matrix. For every public callback of the components below
// and every interaction that should trigger it, this asserts that the callback
// is called exactly once, that argument 1 is a real event of an expected type
// (or `undefined` where the types document it), and that argument 2 is the
// documented data object. See "Callback Conventions" in
// docs/codebase-overview.md.
//
// To add a component, add one entry to `components`. Each entry renders the
// component with the callbacks under test, and lists a contract per callback:
//
//   callback     the prop name (`events.onSelect` for Combobox's `events` bag)
//   interactions `{ [name]: { target, key?, setup? } }`: `target` returns the
//                element to click, or to focus and press `key` on; `setup` runs
//                first (open a menu, say), after which the spy is cleared
//   event        'event' (default) or 'undefined' when the types document it
//   eventTypes   allowed `event.type` values, from the callback's declared type
//   data         the expected second argument, or `NO_DATA` for DOM
//                passthrough handlers, which receive only the event
//   never        interactions that must not call the callback
//
// Every `on*` prop in the component's exported props type must have a contract
// or an entry in `exempt` with the reason (checked at the end of this file).

import { render, act, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import path from 'path';
import ts from 'typescript';

import Button from '../button';
import ButtonStateful from '../button-stateful';
import Checkbox from '../checkbox';
import Radio from '../radio';
import Combobox from '../combobox';
import MenuDropdown from '../menu-dropdown';
import Tabs from '../tabs';
import TabsPanel from '../tabs/panel';
import Tree from '../tree';
import DatePicker from '../date-picker';
import Popover from '../popover';
import Modal from '../modal';
import IconSettings from '../icon-settings';

const NO_DATA = Symbol('no data');

const KEYS = {
	enter: '{Enter}',
	space: ' ',
	escape: '{Escape}',
	arrowDown: '{ArrowDown}',
	arrowRight: '{ArrowRight}',
};

// Reasons shared by many exemptions
const DEPRECATED = 'deprecated; covered by its own deprecation test';
const NOT_TRIGGERED =
	'not triggered by click, Enter, Space or Escape; covered by component tests';
const NOT_AN_EVENT = 'not an event callback (getter, render or focus request)';

const $ = (selector) => document.body.querySelector(selector);

const withIcons = (element) => (
	<IconSettings iconPath="/assets/icons">{element}</IconSettings>
);

const comboboxOptions = [
	{ id: '1', label: 'Acme' },
	{ id: '2', label: 'Globex' },
];

const menuOptions = [
	{ label: 'Alpha', value: 'A0' },
	{ label: 'Beta', value: 'B0' },
];

const treeNodes = [
	{ id: 'grains', label: 'Grains', type: 'item' },
	{
		id: 'fruits',
		label: 'Fruits',
		type: 'branch',
		nodes: [{ id: 'apple', label: 'Apple', type: 'item' }],
	},
];

const formatDate = (date) =>
	date ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : '';
const parseDate = (text) => {
	const [month, day, year] = text.split('/').map(Number);
	return new Date(year, month - 1, day);
};

// Opens a component by clicking `selector`, for contracts that start open
const openWith = (selector) => async (user) => {
	await user.click($(selector));
};

// A menu opened by mouse has no focused item until an arrow key moves focus.
const openAndFocusFirst = (selector) => async (user) => {
	await user.click($(selector));
	await user.keyboard(KEYS.arrowDown);
};

const components = [
	{
		name: 'Button',
		source: 'components/button/index.tsx',
		propsType: 'ButtonProps',
		render: (props) => <Button id="button" label="Save" {...props} />,
		contracts: [
			{
				callback: 'onClick',
				interactions: {
					mouse: { target: () => $('#button') },
					enter: { target: () => $('#button') },
					space: { target: () => $('#button') },
				},
				eventTypes: ['click'],
				data: { id: 'button' },
				never: { escape: { target: () => $('#button') } },
			},
			{
				callback: 'onKeyDown',
				interactions: {
					enter: { target: () => $('#button') },
					space: { target: () => $('#button') },
					escape: { target: () => $('#button') },
				},
				eventTypes: ['keydown'],
				data: NO_DATA,
			},
			{
				callback: 'onKeyUp',
				interactions: {
					enter: { target: () => $('#button') },
					space: { target: () => $('#button') },
					escape: { target: () => $('#button') },
				},
				eventTypes: ['keyup'],
				data: NO_DATA,
			},
			{
				callback: 'onMouseDown',
				interactions: { mouse: { target: () => $('#button') } },
				eventTypes: ['mousedown'],
				data: NO_DATA,
			},
			{
				callback: 'onMouseUp',
				interactions: { mouse: { target: () => $('#button') } },
				eventTypes: ['mouseup'],
				data: NO_DATA,
			},
			{
				callback: 'onFocus',
				interactions: { mouse: { target: () => $('#button') } },
				eventTypes: ['focus'],
				data: NO_DATA,
			},
		],
		exempt: {
			onBlur: NOT_TRIGGERED,
			onMouseEnter: NOT_TRIGGERED,
			onMouseLeave: NOT_TRIGGERED,
			onKeyPress: DEPRECATED,
			onRequestFocus: `${NOT_AN_EVENT}; ${DEPRECATED}`,
		},
	},
	{
		name: 'ButtonStateful',
		source: 'components/button-stateful/index.tsx',
		propsType: 'ButtonStatefulProps',
		render: (props) => (
			<ButtonStateful
				id="stateful"
				isActive={false}
				onClick={() => {}}
				{...props}
			/>
		),
		contracts: [
			{
				callback: 'onClick',
				interactions: {
					mouse: { target: () => $('#stateful') },
					enter: { target: () => $('#stateful') },
					space: { target: () => $('#stateful') },
				},
				eventTypes: ['click'],
				data: { isActive: true },
				never: { escape: { target: () => $('#stateful') } },
			},
			{
				callback: 'onKeyDown',
				interactions: {
					enter: { target: () => $('#stateful') },
					space: { target: () => $('#stateful') },
					escape: { target: () => $('#stateful') },
				},
				eventTypes: ['keydown'],
				data: NO_DATA,
			},
			{
				callback: 'onKeyUp',
				interactions: {
					enter: { target: () => $('#stateful') },
					escape: { target: () => $('#stateful') },
				},
				eventTypes: ['keyup'],
				data: NO_DATA,
			},
			{
				callback: 'onMouseDown',
				interactions: { mouse: { target: () => $('#stateful') } },
				eventTypes: ['mousedown'],
				data: NO_DATA,
			},
			{
				callback: 'onFocus',
				interactions: { mouse: { target: () => $('#stateful') } },
				eventTypes: ['focus'],
				data: NO_DATA,
			},
		],
		exempt: {
			onBlur: NOT_TRIGGERED,
			onMouseEnter: NOT_TRIGGERED,
			onKeyPress: DEPRECATED,
		},
	},
	{
		name: 'Checkbox',
		source: 'components/checkbox/index.tsx',
		propsType: 'CheckboxProps',
		render: (props) => (
			<Checkbox
				id="checkbox"
				labels={{ label: 'Option' }}
				checked={false}
				onChange={() => {}}
				{...props}
			/>
		),
		contracts: [
			{
				callback: 'onChange',
				interactions: {
					mouse: { target: () => $('#checkbox') },
					label: { target: () => $('label[for="checkbox"]') },
					space: { target: () => $('#checkbox') },
				},
				eventTypes: ['change'],
				data: { checked: true, indeterminate: false },
				never: {
					enter: { target: () => $('#checkbox') },
					escape: { target: () => $('#checkbox') },
				},
			},
			{
				callback: 'onKeyDown',
				interactions: {
					enter: { target: () => $('#checkbox') },
					space: { target: () => $('#checkbox') },
					escape: { target: () => $('#checkbox') },
				},
				eventTypes: ['keydown'],
				data: NO_DATA,
			},
			{
				callback: 'onKeyUp',
				interactions: { escape: { target: () => $('#checkbox') } },
				eventTypes: ['keyup'],
				data: NO_DATA,
			},
			{
				callback: 'onFocus',
				interactions: { mouse: { target: () => $('#checkbox') } },
				eventTypes: ['focus'],
				data: NO_DATA,
			},
		],
		exempt: {
			onBlur: NOT_TRIGGERED,
			onKeyPress: DEPRECATED,
			onRequestFocus: `${NOT_AN_EVENT}; ${DEPRECATED}`,
			onRenderVisualPicker: NOT_AN_EVENT,
			onRenderVisualPickerSelected: NOT_AN_EVENT,
			onRenderVisualPickerNotSelected: NOT_AN_EVENT,
		},
	},
	{
		name: 'Checkbox (toggle)',
		render: (props) => (
			<Checkbox
				id="toggle"
				variant="toggle"
				labels={{ label: 'Option' }}
				checked={false}
				onChange={() => {}}
				{...props}
			/>
		),
		contracts: [
			{
				callback: 'onChange',
				interactions: {
					mouse: { target: () => $('#toggle') },
					space: { target: () => $('#toggle') },
				},
				eventTypes: ['change'],
				data: { checked: true, indeterminate: false },
				never: { enter: { target: () => $('#toggle') } },
			},
		],
	},
	{
		name: 'Radio',
		source: 'components/radio/index.tsx',
		propsType: 'RadioProps',
		render: (props) => (
			<Radio
				id="radio"
				name="group"
				value="a"
				labels={{ label: 'A' }}
				checked={false}
				onChange={() => {}}
				{...props}
			/>
		),
		contracts: [
			{
				callback: 'onChange',
				interactions: {
					mouse: { target: () => $('#radio') },
					label: { target: () => $('label[for="radio"]') },
					space: { target: () => $('#radio') },
					enter: { target: () => $('#radio') },
				},
				eventTypes: ['change', 'keydown'],
				data: { checked: true },
				never: { escape: { target: () => $('#radio') } },
			},
			{
				callback: 'onFocus',
				interactions: { mouse: { target: () => $('#radio') } },
				eventTypes: ['focus'],
				data: NO_DATA,
			},
		],
		exempt: {
			onRequestFocus: `${NOT_AN_EVENT}; ${DEPRECATED}`,
			onRenderVisualPicker: NOT_AN_EVENT,
			onRenderVisualPickerSelected: NOT_AN_EVENT,
			onRenderVisualPickerNotSelected: NOT_AN_EVENT,
		},
	},
	{
		name: 'Radio (deselectable, checked)',
		render: (props) => (
			<Radio
				id="radio"
				name="group"
				value="a"
				labels={{ label: 'A' }}
				checked
				deselectable
				onChange={() => {}}
				{...props}
			/>
		),
		contracts: [
			{
				callback: 'onChange',
				interactions: {
					mouse: { target: () => $('#radio') },
					space: { target: () => $('#radio') },
					enter: { target: () => $('#radio') },
				},
				eventTypes: ['change', 'click', 'keydown'],
				data: { checked: false },
			},
		],
	},
	{
		name: 'Combobox',
		source: 'components/combobox/combobox.tsx',
		propsType: 'ComboboxProps',
		eventsProp: 'events',
		render: ({ events, ...props }) =>
			withIcons(
				<Combobox
					id="combobox"
					labels={{ label: 'Search' }}
					menuPosition="relative"
					options={comboboxOptions}
					selection={[]}
					value=""
					events={events}
					{...props}
				/>
			),
		contracts: [
			{
				callback: 'onRequestOpen',
				interactions: {
					mouse: { target: () => $('#combobox') },
					enter: { target: () => $('#combobox') },
					arrowDown: { target: () => $('#combobox') },
				},
				eventTypes: ['click', 'keydown'],
				data: {},
			},
			{
				callback: 'onOpen',
				interactions: {
					mouse: { target: () => $('#combobox') },
					enter: { target: () => $('#combobox') },
				},
				event: 'optional',
				eventTypes: ['click', 'keydown'],
				// `Record<string, unknown>`: the rendered listbox is passed as `portal`
				data: { portal: expect.any(HTMLElement) },
			},
			{
				callback: 'onSelect',
				interactions: {
					mouse: {
						setup: openWith('#combobox'),
						target: () => $('#combobox-listbox-option-1'),
					},
					enter: {
						setup: async (user) => {
							await user.click($('#combobox'));
							await user.keyboard('{ArrowDown}');
						},
						target: () => $('#combobox'),
						focus: false,
					},
				},
				eventTypes: ['click', 'keydown'],
				data: { selection: [comboboxOptions[0]] },
			},
			{
				callback: 'onRequestClose',
				interactions: {
					escape: {
						setup: openWith('#combobox'),
						target: () => $('#combobox'),
					},
				},
				eventTypes: ['keydown'],
				data: {},
			},
			{
				callback: 'onClose',
				interactions: {
					escape: {
						setup: openWith('#combobox'),
						target: () => $('#combobox'),
					},
				},
				event: 'optional',
				eventTypes: ['keydown'],
				data: {},
			},
			{
				callback: 'onChange',
				interactions: { space: { target: () => $('#combobox') } },
				eventTypes: ['change'],
				data: { value: ' ' },
			},
			{
				callback: 'onFocus',
				interactions: { mouse: { target: () => $('#combobox') } },
				eventTypes: ['focus'],
				data: {},
			},
		],
		exempt: {
			onRenderMenuItem: `${NOT_AN_EVENT}; ${DEPRECATED}`,
			'events.onBlur': NOT_TRIGGERED,
			'events.onSubmit': 'covered by the Combobox (with text) entry',
			'events.onSelectActionItem':
				'covered by the Combobox (action item) entry',
			'events.onRequestRemoveSelectedOption':
				'covered by the Combobox (multiple) entry',
		},
	},
	{
		name: 'Combobox (with text)',
		eventsProp: 'events',
		render: ({ events, ...props }) =>
			withIcons(
				<Combobox
					id="combobox"
					labels={{ label: 'Search' }}
					menuPosition="relative"
					multiple
					options={comboboxOptions}
					selection={[]}
					value="New"
					events={events}
					{...props}
				/>
			),
		contracts: [
			{
				callback: 'onSubmit',
				interactions: {
					enter: { setup: openWith('#combobox'), target: () => $('#combobox') },
				},
				eventTypes: ['keydown'],
				data: { value: 'New' },
			},
		],
	},
	{
		name: 'Combobox (action item)',
		eventsProp: 'events',
		render: ({ events, ...props }) =>
			withIcons(
				<Combobox
					id="combobox"
					labels={{ label: 'Search' }}
					menuPosition="relative"
					multiple
					options={comboboxOptions}
					optionsAddItem={[{ id: 'add', label: 'New Account' }]}
					selection={[]}
					value="ac"
					events={{ onSelect: () => {}, ...events }}
					{...props}
				/>
			),
		contracts: [
			{
				callback: 'onSelectActionItem',
				interactions: {
					mouse: {
						setup: openWith('#combobox'),
						target: () => $('#combobox-listbox-option-add'),
					},
					enter: {
						setup: async (user) => {
							await user.click($('#combobox'));
							// The add-item row comes after the two options
							await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
						},
						target: () => $('#combobox'),
						focus: false,
					},
				},
				eventTypes: ['click', 'keydown'],
				data: {
					option: { id: 'add', label: 'New Account' },
					value: 'ac',
				},
			},
		],
	},
	{
		name: 'Combobox (multiple)',
		eventsProp: 'events',
		render: ({ events, ...props }) =>
			withIcons(
				<Combobox
					id="combobox"
					labels={{ label: 'Search' }}
					menuPosition="relative"
					multiple
					options={comboboxOptions}
					selection={comboboxOptions}
					value=""
					events={events}
					{...props}
				/>
			),
		contracts: [
			{
				callback: 'onRequestRemoveSelectedOption',
				interactions: {
					mouse: {
						target: () =>
							document.body.querySelectorAll(
								'#combobox-selected-listbox .slds-pill__remove'
							)[0],
					},
				},
				eventTypes: ['click', 'keydown'],
				data: { selection: [comboboxOptions[1]] },
			},
		],
	},
	{
		name: 'MenuDropdown',
		source: 'components/menu-dropdown/menu-dropdown.tsx',
		propsType: 'MenuDropdownProps',
		render: (props) =>
			withIcons(
				<MenuDropdown
					id="menu"
					label="Menu"
					menuPosition="relative"
					options={menuOptions}
					{...props}
				/>
			),
		contracts: [
			{
				callback: 'onRequestOpen',
				interactions: {
					mouse: { target: () => $('#menu button') },
					enter: { target: () => $('#menu button') },
					space: { target: () => $('#menu button') },
					arrowDown: { target: () => $('#menu button') },
				},
				eventTypes: ['click', 'keydown'],
				data: {},
				never: { escape: { target: () => $('#menu button') } },
			},
			{
				callback: 'onOpen',
				interactions: {
					mouse: { target: () => $('#menu button') },
					enter: { target: () => $('#menu button') },
					space: { target: () => $('#menu button') },
				},
				eventTypes: ['click', 'keydown'],
				data: {},
			},
			{
				callback: 'onClick',
				interactions: {
					mouse: { target: () => $('#menu button') },
					enter: { target: () => $('#menu button') },
					space: { target: () => $('#menu button') },
				},
				// `MouseEvent | KeyboardEvent`: the keydown that opens the menu is reported too
				eventTypes: ['click', 'keydown'],
				data: NO_DATA,
			},
			{
				callback: 'onSelect',
				interactions: {
					mouse: {
						setup: openWith('#menu button'),
						target: () => $('#menu-item-0 [role="menuitem"]'),
					},
					enter: {
						setup: openAndFocusFirst('#menu button'),
						target: () => $('#menu-item-0 [role="menuitem"]'),
					},
					space: {
						setup: openAndFocusFirst('#menu button'),
						target: () => $('#menu-item-0 [role="menuitem"]'),
					},
				},
				eventTypes: ['click', 'keydown'],
				data: { option: menuOptions[0], optionIndex: 0, value: 'A0' },
			},
			{
				callback: 'onRequestClose',
				interactions: {
					mouse: {
						setup: openWith('#menu button'),
						target: () => $('#menu button'),
					},
					escape: {
						setup: openWith('#menu button'),
						target: () => $('#menu-item-0 [role="menuitem"]'),
					},
					select: {
						setup: openWith('#menu button'),
						target: () => $('#menu-item-0 [role="menuitem"]'),
					},
				},
				eventTypes: ['click', 'keydown'],
				data: {},
			},
			{
				callback: 'onClose',
				interactions: {
					mouse: {
						setup: openWith('#menu button'),
						target: () => $('#menu button'),
					},
					escape: {
						setup: openWith('#menu button'),
						target: () => $('#menu-item-0 [role="menuitem"]'),
					},
				},
				eventTypes: ['click', 'keydown'],
				data: {},
			},
			{
				callback: 'onKeyDown',
				interactions: {
					enter: { target: () => $('#menu button') },
					space: { target: () => $('#menu button') },
					escape: { target: () => $('#menu button') },
				},
				eventTypes: ['keydown'],
				data: NO_DATA,
			},
			{
				callback: 'onMouseDown',
				interactions: { mouse: { target: () => $('#menu button') } },
				eventTypes: ['mousedown'],
				data: NO_DATA,
			},
			{
				callback: 'onFocus',
				interactions: { mouse: { target: () => $('#menu button') } },
				eventTypes: ['focus'],
				data: NO_DATA,
			},
		],
		exempt: {
			onBlur: NOT_TRIGGERED,
			onMouseEnter: NOT_TRIGGERED,
			onMouseLeave: NOT_TRIGGERED,
			onRequestFocus: NOT_AN_EVENT,
			listItemRenderer: `${NOT_AN_EVENT}; ${DEPRECATED}`,
		},
	},
	{
		name: 'Tabs',
		source: 'components/tabs/index.tsx',
		propsType: 'TabsProps',
		render: (props) => (
			<Tabs id="tabs" value="a" onSelect={() => {}} {...props}>
				<TabsPanel label="A" value="a">
					A
				</TabsPanel>
				<TabsPanel label="B" value="b">
					B
				</TabsPanel>
			</Tabs>
		),
		contracts: [
			{
				callback: 'onSelect',
				interactions: {
					mouse: { target: () => $('#tabs-slds-tabs_tab-1 [role="tab"]') },
					arrowRight: { target: () => $('#tabs-slds-tabs_tab-0 [role="tab"]') },
				},
				eventTypes: ['click', 'keydown'],
				data: {
					value: 'b',
					previousValue: 'a',
					selectedIndex: 1,
					previousIndex: 0,
				},
				never: {
					// The selected tab: selecting it again is not a change
					enter: { target: () => $('#tabs-slds-tabs_tab-0 [role="tab"]') },
					space: { target: () => $('#tabs-slds-tabs_tab-0 [role="tab"]') },
					escape: { target: () => $('#tabs-slds-tabs_tab-0 [role="tab"]') },
				},
			},
		],
	},
	{
		name: 'Tree',
		source: 'components/tree/tree.tsx',
		propsType: 'TreeProps',
		render: (props) => (
			<Tree
				id="tree"
				labels={{ heading: 'Foods' }}
				nodes={treeNodes}
				selectedIds={[]}
				onSelect={() => {}}
				{...props}
			/>
		),
		contracts: [
			{
				callback: 'onSelect',
				interactions: {
					mouse: { target: () => $('#tree-grains .slds-tree__item') },
					enter: { target: () => $('#tree-grains') },
				},
				eventTypes: ['click', 'keydown'],
				data: {
					node: treeNodes[0],
					isSelected: true,
					selectedIds: ['grains'],
				},
				never: { escape: { target: () => $('#tree-grains') } },
			},
			{
				callback: 'onRequestToggle',
				interactions: {
					mouse: { target: () => $('#tree-fruits .slds-button') },
					arrowRight: { target: () => $('#tree-fruits') },
				},
				eventTypes: ['click', 'keydown'],
				data: {
					node: treeNodes[1],
					isExpanded: true,
					expandedIds: ['fruits'],
				},
			},
			{
				callback: 'onScroll',
				interactions: { scroll: { target: () => $('.slds-tree') } },
				eventTypes: ['scroll'],
				data: { ratio: expect.any(Number), percentage: expect.any(Number) },
			},
		],
		exempt: {
			onClick: DEPRECATED,
			onExpandClick: DEPRECATED,
		},
	},
	{
		name: 'DatePicker',
		source: 'components/date-picker/date-picker.tsx',
		propsType: 'DatePickerProps',
		render: (props) =>
			withIcons(
				<DatePicker
					id="date-picker"
					formatter={formatDate}
					parser={parseDate}
					menuPosition="relative"
					value={new Date(2007, 0, 6)}
					onChange={() => {}}
					{...props}
				/>
			),
		contracts: [
			{
				callback: 'onRequestOpen',
				interactions: {
					mouse: { target: () => $('#date-picker') },
					icon: { target: () => $('button.slds-input__icon') },
					arrowDown: { target: () => $('#date-picker') },
				},
				eventTypes: ['click', 'keydown'],
				data: {
					trigger: expect.toBeOneOf(['input-click', 'icon-click', 'keyboard']),
				},
			},
			{
				callback: 'onOpen',
				interactions: {
					mouse: { target: () => $('#date-picker') },
					arrowDown: { target: () => $('#date-picker') },
				},
				event: 'optional',
				eventTypes: ['click', 'keydown'],
				data: { portal: expect.anything() },
			},
			{
				callback: 'onChange',
				interactions: {
					mouse: {
						setup: openWith('button.slds-input__icon'),
						target: () => $('td[aria-selected="true"]'),
					},
					enter: {
						setup: openWith('button.slds-input__icon'),
						target: () => $('td[aria-selected="true"]'),
					},
					space: {
						setup: openWith('button.slds-input__icon'),
						target: () => $('td[aria-selected="true"]'),
					},
				},
				eventTypes: ['click', 'keydown'],
				data: {
					date: expect.any(Date),
					formattedDate: '1/6/2007',
					timezoneOffset: expect.any(Number),
				},
			},
			{
				callback: 'onRequestClose',
				interactions: {
					escape: {
						setup: openWith('#date-picker'),
						target: () => $('#date-picker'),
					},
					enter: {
						setup: openWith('#date-picker'),
						target: () => $('#date-picker'),
					},
					calendarEscape: {
						setup: openWith('button.slds-input__icon'),
						target: () => $('td[aria-selected="true"]'),
						key: KEYS.escape,
					},
					select: {
						setup: openWith('button.slds-input__icon'),
						target: () => $('td[aria-selected="true"]'),
					},
				},
				eventTypes: ['click', 'keydown'],
				data: {
					trigger: expect.toBeOneOf(['escape', 'enter', 'date-select']),
				},
				never: {
					// Already closed
					closedEscape: { target: () => $('#date-picker'), key: KEYS.escape },
				},
			},
			{
				callback: 'onClose',
				interactions: {
					escape: {
						setup: openWith('#date-picker'),
						target: () => $('#date-picker'),
					},
				},
				event: 'undefined',
				data: { componentWillUnmount: true },
			},
		],
		exempt: {
			// check-props warns for these; pass them on your own `input` instead
			onBlur: DEPRECATED,
			onFocus: DEPRECATED,
			onKeyDown: DEPRECATED,
			onCalendarFocus:
				'triggered by arrow keys in the calendar; covered by component tests',
		},
	},
	{
		name: 'Popover',
		source: 'components/popover/popover.tsx',
		propsType: 'PopoverProps',
		render: (props) =>
			withIcons(
				<Popover id="popover" body="Body" heading="Heading" {...props}>
					<Button label="Trigger" />
				</Popover>
			),
		contracts: [
			{
				callback: 'onRequestOpen',
				interactions: {
					mouse: { target: () => $('#popover') },
					enter: { target: () => $('#popover') },
					space: { target: () => $('#popover') },
				},
				eventTypes: ['click'],
				data: { trigger: 'triggerClick' },
			},
			{
				callback: 'onOpen',
				interactions: {
					mouse: { target: () => $('#popover') },
					enter: { target: () => $('#popover') },
				},
				event: 'undefined',
				data: { portal: expect.anything() },
			},
			{
				callback: 'onRequestClose',
				interactions: {
					mouse: { setup: openWith('#popover'), target: () => $('#popover') },
					closeButton: {
						setup: openWith('#popover'),
						target: () => $('.slds-popover__close'),
					},
					escape: {
						setup: openWith('#popover'),
						target: () => $('.slds-popover__close'),
					},
				},
				eventTypes: ['click', 'keydown'],
				data: { trigger: expect.toBeOneOf(['triggerClick', 'cancel']) },
			},
			{
				callback: 'onClose',
				interactions: {
					escape: {
						setup: openWith('#popover'),
						target: () => $('.slds-popover__close'),
					},
				},
				event: 'undefined',
				data: { componentWillUnmount: expect.any(Boolean) },
			},
			{
				callback: 'onClick',
				interactions: {
					mouse: { target: () => $('#popover') },
					enter: { target: () => $('#popover') },
				},
				eventTypes: ['click'],
				data: NO_DATA,
			},
			{
				callback: 'onKeyDown',
				interactions: {
					escape: {
						setup: openWith('#popover'),
						target: () => $('.slds-popover__close'),
					},
				},
				eventTypes: ['keydown'],
				data: NO_DATA,
			},
			{
				callback: 'onMouseDown',
				interactions: { mouse: { target: () => $('#popover') } },
				eventTypes: ['mousedown'],
				data: NO_DATA,
			},
		],
		exempt: {
			onFocus: NOT_TRIGGERED,
			onMouseEnter: NOT_TRIGGERED,
			onMouseLeave: NOT_TRIGGERED,
			onRequestTargetElement: NOT_AN_EVENT,
		},
	},
	{
		name: 'Modal',
		source: 'components/modal/index.tsx',
		propsType: 'ModalProps',
		render: (props) =>
			withIcons(
				<Modal ariaHideApp={false} heading="Heading" isOpen {...props}>
					<div>Content</div>
				</Modal>
			),
		contracts: [
			{
				callback: 'onRequestClose',
				interactions: {
					mouse: { target: () => $('.slds-modal__close') },
					enter: { target: () => $('.slds-modal__close') },
					space: { target: () => $('.slds-modal__close') },
					escape: { target: () => $('.slds-modal__close') },
					outside: { target: () => $('.slds-modal') },
				},
				eventTypes: ['click', 'keydown'],
				data: {
					trigger: expect.toBeOneOf([
						'close-button',
						'escape',
						'click-outside',
					]),
				},
			},
		],
	},
];

const isEvent = (value) =>
	value instanceof Event || value?.nativeEvent instanceof Event;

const perform = async (user, interaction, name, spy) => {
	if (interaction.setup) {
		await interaction.setup(user);
	}
	const target = interaction.target();
	expect(target, `${name} target`).toBeTruthy();
	const key = interaction.key ?? KEYS[name];
	if (name === 'scroll') {
		spy.mockClear();
		fireEvent.scroll(target);
		return;
	}
	if (key) {
		if (interaction.focus !== false) {
			act(() => target.focus());
		}
		spy.mockClear();
		await user.keyboard(key);
		return;
	}
	spy.mockClear();
	await user.click(target);
};

const propsFor = (entry, callback, spy) =>
	entry.eventsProp
		? { [entry.eventsProp]: { [callback]: spy } }
		: { [callback]: spy };

describe.each(components)('$name callback contracts', (entry) => {
	const cases = entry.contracts.flatMap((contract) => [
		...Object.entries(contract.interactions).map(([name, interaction]) => ({
			contract,
			name,
			interaction,
			expected: 1,
		})),
		...Object.entries(contract.never ?? {}).map(([name, interaction]) => ({
			contract,
			name,
			interaction,
			expected: 0,
		})),
	]);

	it.each(cases.map((c) => [c.contract.callback, c.name, c.expected, c]))(
		'%s on %s is called %i time(s)',
		async (callback, name, expected, { contract, interaction }) => {
			const user = userEvent.setup();
			const spy = vi.fn();
			render(entry.render(propsFor(entry, callback, spy)));

			await perform(user, interaction, name, spy);

			expect(spy).toHaveBeenCalledTimes(expected);
			if (expected === 0) {
				return;
			}

			const [event, data, ...extra] = spy.mock.calls[0];
			const eventMode = contract.event ?? 'event';
			if (eventMode === 'undefined') {
				expect(event).toBeUndefined();
			} else if (eventMode === 'event' || event !== undefined) {
				expect(isEvent(event), 'argument 1 is a real event').toBe(true);
				if (contract.eventTypes) {
					expect(contract.eventTypes).toContain(event.type);
				}
			}

			if (contract.data === NO_DATA) {
				expect(data).toBeUndefined();
			} else {
				expect(data).toEqual(contract.data);
			}
			expect(extra).toEqual([]);

			cleanup();
		}
	);
});

// Every `on*` prop in each component's exported props type must have a
// contract above or an exemption with its reason.
describe('callback contract coverage', () => {
	const root = path.resolve(__dirname, '../..');
	const typed = components.filter((entry) => entry.source);
	const program = ts.createProgram(
		typed.map((entry) => path.join(root, entry.source)),
		{
			jsx: ts.JsxEmit.ReactJSX,
			module: ts.ModuleKind.ESNext,
			moduleResolution: ts.ModuleResolutionKind.Bundler,
			target: ts.ScriptTarget.ES2022,
			strict: true,
			skipLibCheck: true,
			noEmit: true,
			allowJs: true,
			esModuleInterop: true,
			resolveJsonModule: true,
		}
	);
	const checker = program.getTypeChecker();

	const isOwnDeclaration = (symbol) =>
		(symbol.declarations ?? []).some(
			(declaration) =>
				!declaration.getSourceFile().fileName.includes('node_modules')
		);

	// Property names across all members of unions and intersections
	const callbackNames = (type, prefix = '') => {
		const members = type.isUnion() ? type.types : [type];
		const names = new Set();
		members.forEach((member) => {
			checker.getPropertiesOfType(member).forEach((symbol) => {
				if (!isOwnDeclaration(symbol)) return;
				const name = symbol.getName();
				if (/^on[A-Z]/.test(name) || name === 'listItemRenderer') {
					names.add(`${prefix}${name}`);
				}
			});
		});
		return names;
	};

	it.each(typed.map((entry) => [entry.name, entry]))(
		'%s: every callback has a contract or an exemption',
		(name, entry) => {
			const sourceFile = program.getSourceFile(path.join(root, entry.source));
			const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
			const propsSymbol = checker
				.getExportsOfModule(moduleSymbol)
				.find((symbol) => symbol.getName() === entry.propsType);
			expect(propsSymbol, `${entry.propsType} is exported`).toBeTruthy();
			const propsType = checker.getDeclaredTypeOfSymbol(propsSymbol);

			const names = callbackNames(propsType);
			if (entry.eventsProp) {
				const eventsSymbol = checker.getPropertyOfType(
					propsType.isUnion() ? propsType.types[0] : propsType,
					entry.eventsProp
				);
				const eventsType = checker.getNonNullableType(
					checker.getTypeOfSymbol(eventsSymbol)
				);
				callbackNames(eventsType, `${entry.eventsProp}.`).forEach((n) =>
					names.add(n)
				);
			}

			const covered = new Set(
				components
					.filter((other) => other.name.startsWith(entry.name))
					.flatMap((other) =>
						other.contracts.map((contract) =>
							other.eventsProp
								? `${other.eventsProp}.${contract.callback}`
								: contract.callback
						)
					)
			);
			const exempt = new Set(Object.keys(entry.exempt ?? {}));
			const missing = [...names].filter(
				(n) => !covered.has(n) && !exempt.has(n)
			);
			const stale = [...exempt].filter((n) => !names.has(n));

			expect(missing, 'callbacks without a contract or exemption').toEqual([]);
			expect(stale, 'exemptions for callbacks that do not exist').toEqual([]);
		}
	);
});
