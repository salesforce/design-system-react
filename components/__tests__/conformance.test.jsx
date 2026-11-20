/*
 * Component conformance.
 *
 * Every component exported from `components/index` is rendered with minimal
 * required props (taken from its stories, `__examples__` and tests) and checked
 * against the DOM Node & Ref Conventions in docs/codebase-overview.md:
 *
 *  (a) `data-*` and `aria-*` props reach the DOM;
 *  (b) `className` and `style` land on the outermost rendered element;
 *  (c) the forwarded `ref` resolves to that same element;
 *  (d) where the component handles clicks itself, a consumer `onClick` and
 *      the internal behavior both fire.
 *
 * Every export is listed in `fixtures`, and a test fails if `components/index`
 * gains an export that isn't, so new components are covered by default. A
 * component that does not meet a check is listed in `exemptions` with the
 * reason; an exemption that starts passing fails too, so the list stays
 * accurate.
 */
import { createRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

import * as library from '../index';
import IconSettings from '../icon-settings';
import Settings from '../settings';

const noop = () => {};

/*
 * One entry per module (aliases share it; see `aliasesOf`).
 *
 * - `render(props)` returns the element under test with `props` spread on it.
 * - `root(container)` returns the element the conventions call the root.
 *   Defaults to `container.firstElementChild`. Portal-rendered components
 *   query `document.body` instead.
 * - `click` describes (d): `target(container)` is the node the user clicks, and
 *   `internal(container)` asserts the component's own behavior happened.
 * - `kind: 'utility'` marks exports that are not components (context
 *   providers, settings objects, functions); they are listed so the coverage
 *   check knows about them, but none of the checks apply.
 */
const fixtures = {
	Accordion: {
		render: (props) => (
			<library.Accordion {...props}>
				<library.AccordionPanel
					expanded={false}
					id="panel-1"
					onTogglePanel={noop}
					summary="Panel"
				>
					Content
				</library.AccordionPanel>
			</library.Accordion>
		),
	},
	AccordionPanel: {
		render: (props) => (
			<library.Accordion>
				<library.AccordionPanel
					expanded={false}
					id="panel-1"
					onTogglePanel={noop}
					summary="Panel"
					{...props}
				>
					Content
				</library.AccordionPanel>
			</library.Accordion>
		),
		root: (container) => container.querySelector('.slds-accordion__list-item'),
	},
	Alert: {
		render: (props) => (
			<library.Alert labels={{ heading: 'Alert' }} {...props} />
		),
	},
	AlertContainer: {
		render: (props) => (
			<library.AlertContainer {...props}>
				<library.Alert labels={{ heading: 'Alert' }} />
			</library.AlertContainer>
		),
	},
	Avatar: { render: (props) => <library.Avatar {...props} /> },
	Badge: { render: (props) => <library.Badge content="Badge" {...props} /> },
	Breadcrumb: {
		render: (props) => (
			<library.Breadcrumb
				trail={[
					<a href="/one" key="one">
						One
					</a>,
				]}
				{...props}
			/>
		),
	},
	BuilderHeader: {
		render: (props) => <library.BuilderHeader {...props} />,
	},
	BuilderHeaderMisc: {
		render: (props) => (
			<library.BuilderHeaderMisc {...props}>Misc</library.BuilderHeaderMisc>
		),
	},
	BuilderHeaderNav: {
		render: (props) => (
			<library.BuilderHeaderNav {...props}>
				<library.BuilderHeaderNavLink label="Link" />
			</library.BuilderHeaderNav>
		),
	},
	BuilderHeaderNavDropdown: {
		render: (props) => (
			<library.BuilderHeaderNavDropdown
				label="Dropdown"
				options={[{ label: 'One', value: '1' }]}
				{...props}
			/>
		),
	},
	BuilderHeaderNavLink: {
		render: (props) => <library.BuilderHeaderNavLink label="Link" {...props} />,
		click: {
			target: (container) => container.querySelector('a'),
		},
	},
	BuilderHeaderToolbar: {
		render: (props) => <library.BuilderHeaderToolbar {...props} />,
	},
	BuilderHeaderUtilities: {
		render: (props) => (
			<library.BuilderHeaderUtilities {...props}>
				<library.BuilderHeaderNavLink label="Link" />
			</library.BuilderHeaderUtilities>
		),
	},
	Button: {
		render: (props) => <library.Button label="Button" {...props} />,
		click: { target: (container) => container.querySelector('button') },
	},
	ButtonGroup: {
		render: (props) => (
			<library.ButtonGroup labels={{ label: 'Group' }} {...props}>
				<library.Button label="One" />
			</library.ButtonGroup>
		),
	},
	ButtonIcon: {
		render: (props) => <library.ButtonIcon name="close" {...props} />,
	},
	ButtonStateful: {
		render: (props) => (
			<library.ButtonStateful isActive={false} onClick={noop} {...props} />
		),
		click: {
			target: (container) => container.querySelector('button'),
			// The internal handler reports the requested state to `onClick` as
			// the second argument.
			consumerCalledWith: [expect.anything(), { isActive: true }],
		},
	},
	Card: {
		render: (props) => (
			<library.Card heading="Card" {...props}>
				Body
			</library.Card>
		),
	},
	CardEmpty: {
		render: (props) => <library.CardEmpty heading="Empty" {...props} />,
	},
	CardFilter: {
		render: (props) => <library.CardFilter {...props} />,
	},
	Carousel: {
		render: (props) => (
			<library.Carousel
				items={[{ id: '1', heading: 'One', imageAssistiveText: 'One' }]}
				{...props}
			/>
		),
	},
	Checkbox: {
		render: (props) => (
			<library.Checkbox
				labels={{ label: 'Check' }}
				onChange={noop}
				{...props}
			/>
		),
	},
	ColorPicker: {
		render: (props) => (
			<library.ColorPicker
				events={{ onChange: noop }}
				value="#000000"
				{...props}
			/>
		),
	},
	Combobox: {
		render: (props) => (
			<library.Combobox
				id="combobox"
				labels={{ label: 'Combobox' }}
				options={[{ id: '1', label: 'One' }]}
				selection={[]}
				{...props}
			/>
		),
	},
	DatePicker: {
		render: (props) => (
			<library.DatePicker
				onChange={noop}
				value={new Date(2020, 0, 1)}
				{...props}
			/>
		),
	},
	DockedComposer: {
		render: (props) => <library.DockedComposer isOpen {...props} />,
	},
	DynamicIcon: {
		render: (props) => <library.DynamicIcon variant="ellie" {...props} />,
	},
	EditDialog: {
		render: (props) => <library.EditDialog body="Body" {...props} />,
	},
	ExpandableSection: {
		render: (props) => (
			<library.ExpandableSection title="Section" {...props}>
				Content
			</library.ExpandableSection>
		),
	},
	File: {
		render: (props) => <library.File labels={{ title: 'File' }} {...props} />,
	},
	Files: {
		render: (props) => (
			<library.Files {...props}>
				<library.File labels={{ title: 'File' }} />
			</library.Files>
		),
	},
	FilesMoreFiles: {
		render: (props) => <library.FilesMoreFiles count="+2" {...props} />,
	},
	Filter: {
		render: (props) => (
			// Without a popover body (`children` or `popover`) the trigger is
			// disabled, so there's no click handling to check.
			<library.Filter property="Owner" predicate="Me" {...props}>
				Filter form
			</library.Filter>
		),
		click: {
			target: (container) => container.querySelector('button'),
			internal: () =>
				expect(document.querySelector('.slds-popover')).toBeInTheDocument(),
		},
	},
	Icon: {
		render: (props) => (
			<library.Icon
				category="utility"
				name="close"
				assistiveText={{ label: 'Close' }}
				{...props}
			/>
		),
	},
	IconSettings: { kind: 'utility' },
	Input: {
		render: (props) => <library.Input label="Input" {...props} />,
		click: { target: (container) => container.querySelector('input') },
	},
	InputIcon: {
		render: (props) => (
			<library.InputIcon category="utility" name="search" {...props} />
		),
	},
	InputSearch: {
		render: (props) => (
			<library.InputSearch assistiveText={{ label: 'Search' }} {...props} />
		),
	},
	MediaObject: {
		render: (props) => <library.MediaObject body="Body" {...props} />,
	},
	MenuDropdown: {
		render: (props) => (
			<library.MenuDropdown
				label="Menu"
				options={[{ label: 'One', value: '1' }]}
				{...props}
			/>
		),
		click: {
			target: (container) => container.querySelector('button'),
			internal: () => expect(screen.getByRole('menu')).toBeInTheDocument(),
		},
	},
	MenuDropdownButtonTrigger: {
		render: (props) => (
			<library.MenuDropdownButtonTrigger {...props}>
				<library.Button label="Trigger" />
			</library.MenuDropdownButtonTrigger>
		),
	},
	Modal: {
		render: (props) => (
			<library.Modal isOpen heading="Modal" {...props}>
				Content
			</library.Modal>
		),
		portal: true,
		root: () => document.body.querySelector('section.slds-modal'),
	},
	PageHeader: {
		render: (props) => <library.PageHeader title="Page" {...props} />,
	},
	PageHeaderControl: {
		render: (props) => (
			<library.PageHeaderControl {...props}>Control</library.PageHeaderControl>
		),
	},
	Panel: {
		render: (props) => <library.Panel {...props}>Content</library.Panel>,
	},
	PanelFilterGroup: {
		render: (props) => (
			<library.PanelFilterGroup {...props}>Filters</library.PanelFilterGroup>
		),
	},
	PanelFilterList: {
		render: (props) => (
			<library.PanelFilterList {...props}>
				<library.Filter property="Owner" predicate="Me" />
			</library.PanelFilterList>
		),
	},
	PanelFilterListHeading: {
		render: (props) => (
			<library.PanelFilterListHeading label="Heading" {...props} />
		),
	},
	Pill: {
		render: (props) => (
			<library.Pill
				labels={{ label: 'Pill' }}
				href="#pill"
				onRemove={noop}
				{...props}
			/>
		),
		click: { target: (container) => container.querySelector('a') },
	},
	PillContainer: {
		render: (props) => (
			<library.PillContainer
				options={[{ id: '1', label: 'One' }]}
				onRequestRemove={noop}
				{...props}
			/>
		),
	},
	Popover: {
		render: (props) => (
			<library.Popover body="Body" {...props}>
				<library.Button label="Open" />
			</library.Popover>
		),
		click: {
			target: (container) => container.querySelector('button'),
			internal: () => expect(screen.getByRole('dialog')).toBeInTheDocument(),
		},
	},
	PortalSettings: { kind: 'utility' },
	ProgressBar: {
		render: (props) => <library.ProgressBar value={50} {...props} />,
	},
	ProgressIndicator: {
		render: (props) => (
			<library.ProgressIndicator
				steps={[
					{ id: 0, label: 'One' },
					{ id: 1, label: 'Two' },
				]}
				selectedStep={{ id: 0, label: 'One' }}
				{...props}
			/>
		),
	},
	ProgressRing: {
		render: (props) => <library.ProgressRing value={50} {...props} />,
	},
	Radio: {
		render: (props) => (
			<library.Radio
				labels={{ label: 'Radio' }}
				checked={false}
				onChange={noop}
				{...props}
			/>
		),
	},
	RadioButtonGroup: {
		render: (props) => (
			<library.RadioButtonGroup
				labels={{ label: 'Group' }}
				value="a"
				onChange={noop}
				{...props}
			>
				<library.Radio
					labels={{ label: 'A' }}
					value="a"
					variant="button-group"
				/>
			</library.RadioButtonGroup>
		),
	},
	RadioGroup: {
		render: (props) => (
			<library.RadioGroup
				labels={{ label: 'Group' }}
				value="a"
				onChange={noop}
				{...props}
			>
				<library.Radio labels={{ label: 'A' }} value="a" />
			</library.RadioGroup>
		),
	},
	ScopedNotification: {
		render: (props) => (
			<library.ScopedNotification {...props}>Notice</library.ScopedNotification>
		),
	},
	Settings: { kind: 'utility' },
	SetupAssistant: {
		render: (props) => (
			<library.SetupAssistant {...props}>
				<library.SetupAssistantStep heading="Step" />
			</library.SetupAssistant>
		),
	},
	SetupAssistantStep: {
		render: (props) => (
			<library.SetupAssistant>
				<library.SetupAssistantStep heading="Step" {...props} />
			</library.SetupAssistant>
		),
		root: (container) => container.querySelector('.slds-setup-assistant__item'),
	},
	SimpleDataTable: {
		render: (props) => (
			<library.SimpleDataTable
				id="table"
				items={[{ id: '1', name: 'One' }]}
				{...props}
			>
				<library.SimpleDataTableColumn label="Name" property="name" />
			</library.SimpleDataTable>
		),
	},
	SimpleDataTableCell: {
		render: (props) => (
			<table>
				<tbody>
					<tr>
						<library.SimpleDataTableCell
							item={{ id: '1', name: 'One' }}
							property="name"
							{...props}
						/>
					</tr>
				</tbody>
			</table>
		),
		root: (container) => container.querySelector('td'),
	},
	SimpleDataTableColumn: { kind: 'utility' },
	SimpleDataTableHighlightCell: {
		render: (props) => (
			<table>
				<tbody>
					<tr>
						<library.SimpleDataTableHighlightCell
							item={{ id: '1', name: 'One' }}
							property="name"
							search="O"
							{...props}
						>
							One
						</library.SimpleDataTableHighlightCell>
					</tr>
				</tbody>
			</table>
		),
		root: (container) => container.querySelector('td'),
	},
	SimpleDataTableInteractiveElement: { kind: 'utility' },
	SimpleDataTableInteractiveLink: {
		render: (props) => (
			<library.SimpleDataTableInteractiveLink href="#link" {...props}>
				Link
			</library.SimpleDataTableInteractiveLink>
		),
	},
	SimpleDataTableRowActions: {
		render: (props) => (
			<table>
				<tbody>
					<tr>
						<library.SimpleDataTableRowActions
							item={{ id: '1' }}
							options={[{ label: 'Edit', value: 'edit' }]}
							{...props}
						/>
					</tr>
				</tbody>
			</table>
		),
		root: (container) => container.querySelector('td'),
	},
	Slider: {
		render: (props) => (
			<library.Slider
				labels={{ label: 'Slider' }}
				value={5}
				onChange={noop}
				{...props}
			/>
		),
	},
	Spinner: { render: (props) => <library.Spinner {...props} /> },
	SplitView: {
		render: (props) => (
			<library.SplitView
				master={<div>Master</div>}
				detail={<div>Detail</div>}
				{...props}
			/>
		),
	},
	SplitViewHeader: {
		render: (props) => <library.SplitViewHeader title="Header" {...props} />,
	},
	SplitViewListbox: {
		render: (props) => (
			<library.SplitViewListbox
				options={[{ id: '1', label: 'One' }]}
				selection={[]}
				{...props}
			/>
		),
	},
	Tabs: {
		render: (props) => (
			<library.Tabs onSelect={noop} value="one" {...props}>
				<library.TabsPanel label="One" value="one">
					Content
				</library.TabsPanel>
			</library.Tabs>
		),
	},
	TabsPanel: {
		render: (props) => (
			<library.Tabs onSelect={noop} value="one">
				<library.TabsPanel label="One" value="one" {...props}>
					Content
				</library.TabsPanel>
			</library.Tabs>
		),
		root: (container) => container.querySelector('[role="tabpanel"]'),
	},
	Textarea: {
		render: (props) => (
			<library.Textarea
				labels={{ label: 'Text' }}
				value=""
				onChange={noop}
				{...props}
			/>
		),
		click: { target: (container) => container.querySelector('textarea') },
	},
	Toast: {
		render: (props) => (
			<library.Toast labels={{ heading: 'Toast' }} {...props} />
		),
	},
	ToastContainer: {
		render: (props) => (
			<library.ToastContainer {...props}>
				<library.Toast labels={{ heading: 'Toast' }} />
			</library.ToastContainer>
		),
	},
	Tooltip: {
		render: (props) => (
			<library.Tooltip
				content="Tip"
				id="tip"
				trigger={<library.Button label="Trigger" />}
				{...props}
			/>
		),
	},
	Tree: {
		render: (props) => (
			<library.Tree
				id="tree"
				labels={{ heading: 'Tree' }}
				nodes={[{ id: '1', label: 'One' }]}
				selectedIds={[]}
				onSelect={noop}
				{...props}
			/>
		),
	},
	TrialBar: {
		render: (props) => <library.TrialBar {...props} />,
	},
	TrialBarButton: {
		render: (props) => <library.TrialBarButton label="Button" {...props} />,
		click: { target: (container) => container.querySelector('button') },
	},
	TrialBarDropdown: {
		render: (props) => (
			<library.TrialBarDropdown
				label="Dropdown"
				options={[{ label: 'One', value: '1' }]}
				{...props}
			/>
		),
	},
	UNSAFE_DirectionSettings: { kind: 'utility' },
	UtilityIcon: {
		render: (props) => (
			<library.UtilityIcon category="utility" name="close" {...props} />
		),
	},
	VerticalNavigation: {
		render: (props) => (
			<library.VerticalNavigation
				categories={[
					{ id: 'c', label: 'Category', items: [{ id: 'i', label: 'Item' }] },
				]}
				selectedId="i"
				onSelect={noop}
				{...props}
			/>
		),
	},
	VisualPicker: {
		render: (props) => (
			<library.VisualPicker label="Picker" {...props}>
				<library.Checkbox labels={{ label: 'One' }} onChange={noop} />
			</library.VisualPicker>
		),
	},
	VisualPickerLink: {
		render: (props) => (
			<library.VisualPickerLink href="#link" title="Link" {...props} />
		),
	},
	WelcomeMat: {
		render: (props) => (
			<library.WelcomeMat
				labels={{ title: 'Welcome' }}
				variant="splash"
				{...props}
			/>
		),
		// Always rendered in a Modal; the root is the welcome mat inside it.
		portal: true,
		root: () => document.body.querySelector('.slds-welcome-mat'),
	},
	WelcomeMatInfoBadge: {
		render: (props) => (
			<library.WelcomeMatInfoBadge image="/img.png" {...props}>
				Badge
			</library.WelcomeMatInfoBadge>
		),
	},
	WelcomeMatTile: {
		render: (props) => (
			<library.WelcomeMatTile title="Tile" href="#tile" {...props} />
		),
	},
	comboboxAddSubheadings: { kind: 'utility' },
	comboboxFilterAndLimit: { kind: 'utility' },
	log: { kind: 'utility' },
};

/*
 * Shared exemption reasons. The additive ones (a prop or `forwardRef` the
 * component doesn't have yet) are ROADMAP "P2 — Additive hardening (safe
 * after GA)". Moving an existing `className`, `style` or `ref` to another
 * element is breaking and was deferred with root-and-refs (#3301, closed).
 */
const NO_REST =
	'does not spread `...rest`, so arbitrary `data-*`/`aria-*` props are dropped (additive, ROADMAP P2)';
const ARIA_ONLY =
	'forwards `aria-*` to the form control, but drops `data-*` (no `...rest`; additive, ROADMAP P2)';
const NAMED_ARIA_ONLY =
	'accepts only the `aria-*` props it lists, and no `data-*` (no `...rest`; additive, ROADMAP P2)';
const NO_CLASSNAME = 'has no `className` prop (additive, ROADMAP P2)';
const NO_STYLE = 'has no `style` prop (additive, ROADMAP P2)';
const NO_FORWARD_REF =
	'function component without `forwardRef`, so `ref` is dropped (additive, ROADMAP P2)';
const CLASS_COMPONENT =
	'class component: `ref` resolves to the instance, not a DOM node (ROADMAP: convert to a function component)';
const LANGUAGE_DIRECTION =
	'wrapped in the `LanguageDirection` class HOC, so `ref` resolves to the HOC instance';
const TEXTAREA_TARGET =
	'`className`, `style` and `ref` all target the `<textarea>`, as `className` did in 0.10.x; the `.slds-form-element` wrapper takes `classNameContainer`. Moving them is breaking (#3301)';

/*
 * Components that don't meet a check yet. Keyed by check, then by fixture
 * name, with the reason. An exempted check is run and expected to fail; if it
 * passes, the test fails so the exemption is removed.
 */
const exemptions = {
	attributes: {
		Accordion: NO_REST,
		AccordionPanel: NO_REST,
		Alert: NO_REST,
		AlertContainer: NO_REST,
		Avatar: NO_REST,
		Badge: NO_REST,
		Breadcrumb: NO_REST,
		BuilderHeader: NO_REST,
		BuilderHeaderMisc: NO_REST,
		BuilderHeaderNav: NO_REST,
		BuilderHeaderNavDropdown: NO_REST,
		BuilderHeaderNavLink: NO_REST,
		BuilderHeaderToolbar: NO_REST,
		BuilderHeaderUtilities: NO_REST,
		ButtonGroup: NO_REST,
		ButtonIcon: NO_REST,
		CardEmpty: NO_REST,
		CardFilter: NAMED_ARIA_ONLY,
		Carousel: NO_REST,
		Checkbox: ARIA_ONLY,
		ColorPicker: NO_REST,
		Combobox: NAMED_ARIA_ONLY,
		DatePicker: NO_REST,
		DockedComposer: NO_REST,
		DynamicIcon: NO_REST,
		EditDialog: NO_REST,
		ExpandableSection: NO_REST,
		File: NO_REST,
		Files: NO_REST,
		FilesMoreFiles: NO_REST,
		Filter: NO_REST,
		Icon: NO_REST,
		Input: NAMED_ARIA_ONLY,
		InputSearch: NAMED_ARIA_ONLY,
		MediaObject: NO_REST,
		MenuDropdown: NO_REST,
		MenuDropdownButtonTrigger: NO_REST,
		Modal: NO_REST,
		PageHeader: NO_REST,
		PageHeaderControl: NO_REST,
		Panel: NO_REST,
		PanelFilterGroup: NO_REST,
		PanelFilterList: NO_REST,
		PanelFilterListHeading: NO_REST,
		Pill: NO_REST,
		PillContainer: NO_REST,
		Popover: NO_REST,
		ProgressBar: NO_REST,
		ProgressIndicator: NO_REST,
		ProgressRing: NO_REST,
		RadioButtonGroup: NO_REST,
		RadioGroup: NO_REST,
		ScopedNotification: NO_REST,
		SetupAssistant: NO_REST,
		SetupAssistantStep: NO_REST,
		SimpleDataTable: NO_REST,
		SimpleDataTableCell: NO_REST,
		SimpleDataTableHighlightCell: NO_REST,
		SimpleDataTableRowActions: NO_REST,
		Slider: ARIA_ONLY,
		Spinner: NO_REST,
		SplitView: NO_REST,
		SplitViewHeader: NO_REST,
		SplitViewListbox: NO_REST,
		Tabs: NO_REST,
		TabsPanel: NO_REST,
		Textarea: ARIA_ONLY,
		Toast: NO_REST,
		ToastContainer: NO_REST,
		Tooltip: NO_REST,
		Tree: NO_REST,
		TrialBar: NO_REST,
		TrialBarDropdown: NO_REST,
		VerticalNavigation: NO_REST,
		VisualPicker: NO_REST,
		VisualPickerLink: NO_REST,
		WelcomeMat: NO_REST,
		WelcomeMatInfoBadge: NO_REST,
		WelcomeMatTile: NO_REST,
	},
	className: {
		AccordionPanel: NO_CLASSNAME,
		Avatar: NO_CLASSNAME,
		Breadcrumb: NO_CLASSNAME,
		BuilderHeader:
			'documented on `.slds-builder-header_container`, inside a fixed-height wrapper `div` (as in 0.10.x); moving it is breaking (root-and-refs, #3301 closed)',
		BuilderHeaderMisc: NO_CLASSNAME,
		BuilderHeaderNav: NO_CLASSNAME,
		BuilderHeaderNavDropdown:
			'passed to MenuDropdown, where `className` is the dropdown menu',
		BuilderHeaderNavLink: NO_CLASSNAME,
		BuilderHeaderToolbar: NO_CLASSNAME,
		BuilderHeaderUtilities: NO_CLASSNAME,
		ButtonGroup:
			'documented on the `.slds-button-group` node; with `labels.label` it is wrapped in a `fieldset` that takes `classNameContainer`',
		CardEmpty: NO_CLASSNAME,
		Combobox:
			'documented on the `.slds-combobox` container; the outer `.slds-form-element` takes `classNameContainer`. Moving it is breaking (root-and-refs, #3301 closed)',
		DatePicker:
			'documented on the calendar dropdown (as in 0.10.x); placement is open in ROADMAP (root-and-refs, #3301 closed)',
		DockedComposer: NO_CLASSNAME,
		Icon: 'documented on the `<svg>`; the `.slds-icon_container` root takes `containerClassName`',
		MenuDropdown:
			'documented on the dropdown menu (as in 0.10.x); the trigger takes `buttonClassName`/`triggerClassName`',
		MenuDropdownButtonTrigger:
			'documented on the trigger button; `ref` is the wrapper',
		PanelFilterGroup: NO_CLASSNAME,
		PanelFilterList: NO_CLASSNAME,
		PanelFilterListHeading: NO_CLASSNAME,
		ProgressBar:
			'documented on `.slds-progress-bar` (as in 0.10.x); `style` is on the outer wrapper',
		RadioButtonGroup:
			'on `.slds-form-element__control` inside the `fieldset` (as in 0.10.x); moving it is breaking (root-and-refs, #3301 closed)',
		RadioGroup:
			'on `.slds-form-element__control` inside the `fieldset` (as in 0.10.x); moving it is breaking (root-and-refs, #3301 closed)',
		SimpleDataTableRowActions:
			'documented on the actions menu; the `td` is internal',
		TabsPanel: NO_CLASSNAME,
		Textarea: TEXTAREA_TARGET,
		Tooltip: NO_CLASSNAME,
		TrialBarDropdown:
			'passed to MenuDropdown, where `className` is the dropdown menu',
	},
	style: {
		Accordion: NO_STYLE,
		AccordionPanel: NO_STYLE,
		AlertContainer: NO_STYLE,
		Avatar: NO_STYLE,
		Breadcrumb: NO_STYLE,
		BuilderHeader:
			'documented on `.slds-builder-header_container`, with `className` (as in 0.10.x)',
		BuilderHeaderMisc: NO_STYLE,
		BuilderHeaderNav: NO_STYLE,
		BuilderHeaderNavDropdown:
			'passed to MenuDropdown, where `style` is the trigger button',
		BuilderHeaderNavLink: NO_STYLE,
		BuilderHeaderToolbar: NO_STYLE,
		BuilderHeaderUtilities: NO_STYLE,
		ButtonGroup: NO_STYLE,
		ButtonIcon: NO_STYLE,
		CardEmpty: NO_STYLE,
		CardFilter: NO_STYLE,
		Carousel: NO_STYLE,
		Checkbox: NO_STYLE,
		ColorPicker: NO_STYLE,
		Combobox: NO_STYLE,
		DatePicker: NO_STYLE,
		DockedComposer: NO_STYLE,
		DynamicIcon:
			'only the `waffle` variant (a `<button>`) takes `style`; the other variants have no `style` prop',
		ExpandableSection: NO_STYLE,
		File: NO_STYLE,
		Files: NO_STYLE,
		FilesMoreFiles: NO_STYLE,
		Filter: NO_STYLE,
		Icon: 'documented on the `<svg>`; the root takes `containerStyle`',
		Input: NO_STYLE,
		InputSearch: NO_STYLE,
		MediaObject: NO_STYLE,
		MenuDropdown: 'documented on the trigger button',
		MenuDropdownButtonTrigger: 'documented on the trigger button',
		Modal: NO_STYLE,
		PageHeader: NO_STYLE,
		PageHeaderControl: NO_STYLE,
		Panel: NO_STYLE,
		PanelFilterGroup: NO_STYLE,
		PanelFilterList: NO_STYLE,
		PanelFilterListHeading: NO_STYLE,
		Pill: NO_STYLE,
		ProgressIndicator: NO_STYLE,
		ProgressRing: NO_STYLE,
		Radio: 'only the swatch variant takes `style`, for the swatch',
		RadioButtonGroup:
			'documented on the `.slds-radio_button-group` wrapper (as in 0.10.x), inside the `fieldset`',
		RadioGroup: 'the base variant has no wrapper to style (`style?: never`)',
		ScopedNotification: NO_STYLE,
		SetupAssistant: NO_STYLE,
		SetupAssistantStep: NO_STYLE,
		SimpleDataTableCell: NO_STYLE,
		SimpleDataTableHighlightCell: NO_STYLE,
		SimpleDataTableRowActions: NO_STYLE,
		Slider: NO_STYLE,
		SplitView: NO_STYLE,
		SplitViewHeader: NO_STYLE,
		SplitViewListbox: NO_STYLE,
		Tabs: NO_STYLE,
		TabsPanel: NO_STYLE,
		Textarea: TEXTAREA_TARGET,
		ToastContainer: NO_STYLE,
		Tooltip: NO_STYLE,
		Tree: NO_STYLE,
		TrialBarDropdown:
			'passed to MenuDropdown, where `style` is the trigger button',
		VerticalNavigation: NO_STYLE,
		VisualPicker: NO_STYLE,
		VisualPickerLink: NO_STYLE,
		WelcomeMat: NO_STYLE,
		WelcomeMatInfoBadge: NO_STYLE,
		WelcomeMatTile: NO_STYLE,
	},
	ref: {
		Accordion: NO_FORWARD_REF,
		AccordionPanel: NO_FORWARD_REF,
		Alert: NO_FORWARD_REF,
		AlertContainer: CLASS_COMPONENT,
		Avatar: NO_FORWARD_REF,
		Badge: NO_FORWARD_REF,
		Breadcrumb: NO_FORWARD_REF,
		BuilderHeader: NO_FORWARD_REF,
		BuilderHeaderMisc: NO_FORWARD_REF,
		BuilderHeaderNav: NO_FORWARD_REF,
		BuilderHeaderNavDropdown: NO_FORWARD_REF,
		BuilderHeaderNavLink: NO_FORWARD_REF,
		BuilderHeaderToolbar: NO_FORWARD_REF,
		BuilderHeaderUtilities: NO_FORWARD_REF,
		ButtonGroup: NO_FORWARD_REF,
		ButtonIcon: NO_FORWARD_REF,
		Card: NO_FORWARD_REF,
		CardEmpty: NO_FORWARD_REF,
		Carousel: NO_FORWARD_REF,
		Checkbox:
			'forwarded to the `<input>` by design (documented on the `ref` type and the deprecated focus props)',
		ColorPicker: NO_FORWARD_REF,
		Combobox: LANGUAGE_DIRECTION,
		DockedComposer: NO_FORWARD_REF,
		DynamicIcon: NO_FORWARD_REF,
		EditDialog: CLASS_COMPONENT,
		ExpandableSection: NO_FORWARD_REF,
		File: CLASS_COMPONENT,
		Files: NO_FORWARD_REF,
		FilesMoreFiles: CLASS_COMPONENT,
		Filter: NO_FORWARD_REF,
		Icon: NO_FORWARD_REF,
		InputIcon: LANGUAGE_DIRECTION,
		MediaObject: NO_FORWARD_REF,
		MenuDropdown: NO_FORWARD_REF,
		PageHeader: NO_FORWARD_REF,
		PageHeaderControl: NO_FORWARD_REF,
		Panel: NO_FORWARD_REF,
		PanelFilterGroup: NO_FORWARD_REF,
		PanelFilterList: CLASS_COMPONENT,
		PanelFilterListHeading: NO_FORWARD_REF,
		Pill: 'a documented imperative handle (`PillRef`), not a DOM node',
		PillContainer: NO_FORWARD_REF,
		ProgressBar: NO_FORWARD_REF,
		ProgressIndicator: NO_FORWARD_REF,
		ProgressRing: NO_FORWARD_REF,
		Radio: NO_FORWARD_REF,
		RadioButtonGroup: NO_FORWARD_REF,
		RadioGroup: NO_FORWARD_REF,
		ScopedNotification: NO_FORWARD_REF,
		SetupAssistant: NO_FORWARD_REF,
		SetupAssistantStep: CLASS_COMPONENT,
		SimpleDataTable: CLASS_COMPONENT,
		SimpleDataTableCell: NO_FORWARD_REF,
		SimpleDataTableHighlightCell: NO_FORWARD_REF,
		SimpleDataTableInteractiveLink: CLASS_COMPONENT,
		SimpleDataTableRowActions: NO_FORWARD_REF,
		SplitView: NO_FORWARD_REF,
		SplitViewHeader: NO_FORWARD_REF,
		SplitViewListbox: CLASS_COMPONENT,
		Tabs: NO_FORWARD_REF,
		TabsPanel: NO_FORWARD_REF,
		Textarea: TEXTAREA_TARGET,
		Toast: NO_FORWARD_REF,
		ToastContainer: CLASS_COMPONENT,
		Tooltip: NO_FORWARD_REF,
		TrialBar: NO_FORWARD_REF,
		TrialBarDropdown: NO_FORWARD_REF,
		UtilityIcon: LANGUAGE_DIRECTION,
		VisualPicker: NO_FORWARD_REF,
		VisualPickerLink: CLASS_COMPONENT,
		WelcomeMatInfoBadge: CLASS_COMPONENT,
		WelcomeMatTile: CLASS_COMPONENT,
	},
};

// Group `components/index` exports by the component they alias.
const aliasesOf = () => {
	const groups = new Map();
	Object.entries(library).forEach(([name, value]) => {
		if (!groups.has(value)) groups.set(value, []);
		groups.get(value).push(name);
	});
	return groups;
};

const fixtureFor = (names) => names.find((name) => fixtures[name]);

const renderWithSettings = (element) =>
	render(<IconSettings iconPath="/assets/icons">{element}</IconSettings>);

const defaultRoot = (container) => container.firstElementChild;

const describeNode = (node) => {
	if (node === null) return 'null';
	if (node instanceof Element) {
		return `<${node.tagName.toLowerCase()} class="${node.getAttribute('class') || ''}">`;
	}
	return `an instance of ${node.constructor?.name || typeof node}`;
};

// Where to look for forwarded attributes: the render container, or the whole
// document for portal-rendered components.
const getScopeFor = (fixture) => (container) =>
	fixture.portal ? document.body : container;

const runCheck = (check, name, assertion) => {
	const reason = exemptions[check][name];
	if (!reason) {
		assertion();
		return;
	}
	expect(assertion, `remove the "${check}" exemption for ${name}`).toThrow();
};

describe('Component conformance', () => {
	let appNode;

	beforeAll(() => {
		appNode = document.createElement('div');
		appNode.id = 'app';
		document.body.appendChild(appNode);
		Settings.setAppElement('#app');
	});

	afterAll(() => {
		appNode.remove();
	});

	it('has a fixture for every export from components/index', () => {
		const missing = [...aliasesOf().values()]
			.filter((names) => !fixtureFor(names))
			.map((names) => names.join(' / '));
		expect(missing).toEqual([]);
	});

	it('has no fixtures or exemptions for names that are not exported', () => {
		const exported = Object.keys(library);
		const stale = [
			...Object.keys(fixtures),
			...Object.values(exemptions).flatMap(Object.keys),
		].filter((name) => !exported.includes(name));
		expect(stale).toEqual([]);
	});

	Object.entries(fixtures)
		.filter(([, fixture]) => fixture.kind !== 'utility')
		.forEach(([name, fixture]) => {
			const getRoot = fixture.root || defaultRoot;
			const getScope = getScopeFor(fixture);

			describe(name, () => {
				it('forwards data-* and aria-* props', () => {
					const { container } = renderWithSettings(
						fixture.render({
							'data-conformance': 'data',
							'aria-description': 'aria',
						})
					);
					// `aria-*` often belongs on an inner control (an input's
					// `aria-describedby`), so these only need to reach the DOM.
					runCheck('attributes', name, () => {
						const scope = getScope(container);
						expect(
							scope.querySelector('[data-conformance="data"]')
						).not.toBeNull();
						expect(
							scope.querySelector('[aria-description="aria"]')
						).not.toBeNull();
					});
				});

				it('puts className on the outermost element', () => {
					const { container } = renderWithSettings(
						fixture.render({ className: 'conformance-class' })
					);
					runCheck('className', name, () => {
						expect(getRoot(container)).toHaveClass('conformance-class');
					});
				});

				it('puts style on the outermost element', () => {
					const { container } = renderWithSettings(
						fixture.render({ style: { outlineColor: 'rgb(1, 2, 3)' } })
					);
					runCheck('style', name, () => {
						expect(getRoot(container).style.outlineColor).toBe('rgb(1, 2, 3)');
					});
				});

				it('forwards ref to the outermost element', () => {
					const ref = createRef();
					const { container } = renderWithSettings(fixture.render({ ref }));
					runCheck('ref', name, () => {
						// Compare by identity: diffing DOM nodes that React rendered
						// reads their props' `key`, which logs a React warning.
						expect(
							ref.current === getRoot(container),
							`ref.current is ${describeNode(ref.current)}`
						).toBe(true);
					});
				});

				if (fixture.click) {
					it('calls the consumer onClick and its own click handling', () => {
						const onClick = vi.fn();
						const { container } = renderWithSettings(
							fixture.render({ onClick })
						);
						fireEvent.click(fixture.click.target(container));
						expect(onClick).toHaveBeenCalledTimes(1);
						if (fixture.click.consumerCalledWith) {
							expect(onClick).toHaveBeenCalledWith(
								...fixture.click.consumerCalledWith
							);
						}
						fixture.click.internal?.(container);
					});
				}
			});
		});
});
