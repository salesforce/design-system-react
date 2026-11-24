import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { composeStories } from '@storybook/react-vite';

import * as library from '../index';
import IconSettings from '../icon-settings';
import Settings from '../settings';
import Filter from '../filter';
import PanelFilterGroup from '../panel/filtering/group';
import PanelFilterList from '../panel/filtering/list';
import PanelFilterListHeading from '../panel/filtering/list-heading';

// Rendering a component, or re-rendering its parent, must never move focus.
// A `componentDidUpdate(prev)` translated to `useEffect` also runs on mount,
// which is how Accordion came to steal page focus on render (#3276). Every
// story is a fixture here: focus starts on an input outside the story, the
// story mounts, its parent re-renders three times, and focus must still be on
// that input. Real focus needs a real browser, so this is in the browser
// project.

const storyModules = import.meta.glob('../**/__docs__/*.stories.{jsx,tsx}', {
	eager: true,
});

const componentName = (filePath) => {
	const match = filePath.match(/\/([^/]+)\.stories\.[jt]sx$/);
	return match ? match[1] : filePath;
};

// Stories that take focus on mount by design, keyed `<stories file> > <story
// export>`. Each still has to keep focus where it put it while its parent
// re-renders. Add an entry only for a component that documents or is built to
// take focus when it appears, never to silence a bug.
const dialogOpenOnMount =
	'A dialog rendered open takes focus, like Modal, so keyboard and screen reader users land in it (0.10.x did the same).';
const takesFocusOnMount = {
	'Alert > Dismissible':
		'A dismissible Alert focuses its close button when it mounts and returns focus when it unmounts (0.10.x did the same; #3255 kept it).',
	'Alert > DismissibleInteractive':
		'A dismissible Alert focuses its close button when it mounts and returns focus when it unmounts (0.10.x did the same; #3255 kept it).',
	'ColorPicker > MenuOpen': `\`isOpen\` popover. ${dialogOpenOnMount}`,
	'DockedComposer > Interactive': `Mounts open. ${dialogOpenOnMount} See the focus comment in docked-composer/index.tsx (#3284).`,
	'DockedComposer > Open': `Mounts open. ${dialogOpenOnMount} See the focus comment in docked-composer/index.tsx (#3284).`,
	'Modal > AlwaysOpen': `Modal. ${dialogOpenOnMount}`,
	'Popover > WalkthroughOnAnchor': `\`isOpen\` popover. ${dialogOpenOnMount}`,
	...Object.fromEntries(
		[
			'AllVariants',
			'Error',
			'ErrorWithDetails',
			'Info',
			'Success',
			'Warning',
			'WithCloseCallback',
			'WithDuration',
			'WithHeadingLink',
		].map((story) => [
			`Toast > ${story}`,
			'Toast focuses itself when it mounts so assistive tech announces it, and returns focus when it unmounts (0.10.x did the same).',
		])
	),
	...Object.fromEntries(
		[
			'Default2',
			'InfoOnly2',
			'Splash2',
			'StepsComplete2',
			'Trailhead',
			'TrailheadComplete',
		].map((story) => [
			`WelcomeMat > ${story}`,
			`WelcomeMat is a Modal rendered open. ${dialogOpenOnMount}`,
		])
	),
};

// Stories that demonstrate a deprecated API on purpose, and the warning each
// is expected to print.
const expectedWarnings = {
	'Combobox > InlineMultiple': /`inline-listbox`, for prop `variant`/,
	'Combobox > InlineMultipleLoading': /`inline-listbox`, for prop `variant`/,
};

// Exported components no story renders, with a fixture for each.
const extraFixtures = {
	PanelFilterGroup: () => (
		<PanelFilterGroup variant="panel">
			<PanelFilterListHeading heading="Matching all these filters" />
			<PanelFilterList>
				<Filter property="Name" predicate="equals Acme" />
			</PanelFilterList>
		</PanelFilterGroup>
	),
	PanelFilterList: () => (
		<PanelFilterList>
			<Filter property="Name" predicate="equals Acme" />
		</PanelFilterList>
	),
	PanelFilterListHeading: () => (
		<PanelFilterListHeading heading="Matching all these filters" />
	),
};

// Exports that are not a story's `component` but that stories render as part
// of another component (a sub-component, a trigger, a wrapper), or that are
// not components at all. A new export fails the coverage test below until it
// is added here, to a story, or to `extraFixtures`.
const renderedByStories = [
	'AccordionPanel',
	'AlertContainer',
	'BuilderHeaderMisc',
	'BuilderHeaderNav',
	'BuilderHeaderNavDropdown',
	'BuilderHeaderNavLink',
	'BuilderHeaderToolbar',
	'BuilderHeaderUtilities',
	'ButtonIcon',
	'CardEmpty',
	'CardFilter',
	'DropdownTrigger',
	'EditDialog',
	'File',
	'FilesFile',
	'FilesMoreFiles',
	'Icon',
	'IconSettings',
	'InputIcon',
	'MediaObject',
	'MenuDropdownButtonTrigger',
	'MoreFiles',
	'PageHeaderControl',
	'PortalSettings',
	'RadioButtonGroup',
	'SetupAssistantStep',
	'SimpleDataTableCell',
	'SimpleDataTableColumn',
	'SimpleDataTableHighlightCell',
	'SimpleDataTableInteractiveElement',
	'SimpleDataTableInteractiveLink',
	'SimpleDataTableRowActions',
	'SplitViewHeader',
	'SplitViewListbox',
	'TabsPanel',
	'ToastContainer',
	'TrialBar',
	'TrialBarButton',
	'TrialBarDropdown',
	'UtilityIcon',
	'VisualPickerLink',
	'WelcomeMat',
	'WelcomeMatInfoBadge',
	'WelcomeMatTile',
];
const notComponents = [
	'Settings',
	'UNSAFE_DirectionSettings',
	'comboboxAddSubheadings',
	'comboboxFilterAndLimit',
	'log',
];

const fixtures = [];
const storyComponents = new Set();
for (const [filePath, storyModule] of Object.entries(storyModules)) {
	storyComponents.add(storyModule.default?.component);
	const name = componentName(filePath);
	for (const [storyName, Story] of Object.entries(
		composeStories(storyModule)
	)) {
		fixtures.push({ group: name, key: `${name} > ${storyName}`, Story });
	}
}
for (const [name, Fixture] of Object.entries(extraFixtures)) {
	fixtures.push({
		group: 'Extra fixtures',
		key: name,
		Story: () => (
			<IconSettings iconPath="/assets/icons">
				<Fixture />
			</IconSettings>
		),
	});
}

// Lets a story's effects, timers and Floating UI positioning settle.
const settle = () =>
	new Promise((resolve) => {
		requestAnimationFrame(() => setTimeout(resolve, 0));
	});

const Parent = ({ children }) => <div>{children}</div>;

// Dialog positioning and react-modal set state outside act(); this is not an
// act environment, like the other browser tests that open overlays.
let previousActEnvironment;
let appNode;
beforeAll(() => {
	previousActEnvironment = globalThis.IS_REACT_ACT_ENVIRONMENT;
	globalThis.IS_REACT_ACT_ENVIRONMENT = false;
	appNode = document.createElement('div');
	appNode.id = 'focus-on-render-app';
	document.body.appendChild(appNode);
	Settings.setAppElement(appNode);
});
afterAll(() => {
	globalThis.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
	appNode.remove();
});

describe('Rendering never moves focus (browser)', () => {
	const groups = Map.groupBy(fixtures, ({ group }) => group);
	for (const [group, groupFixtures] of groups) {
		describe(group, () => {
			for (const { key, Story } of groupFixtures) {
				it(key.slice(group.length + 3) || key, async () => {
					const warning = expectedWarnings[key];
					const consoleError = warning
						? vi.spyOn(console, 'error').mockImplementation(() => {})
						: undefined;
					const outside = document.createElement('input');
					outside.setAttribute('aria-label', 'Outside the story');
					appNode.appendChild(outside);
					outside.focus();

					try {
						const { rerender } = render(
							<Parent>
								<Story />
							</Parent>,
							{ container: appNode.appendChild(document.createElement('div')) }
						);
						await settle();

						let expected = outside;
						if (takesFocusOnMount[key]) {
							expect(document.activeElement).not.toBe(document.body);
							expected = document.activeElement;
						} else {
							expect(document.activeElement, 'after mount').toBe(outside);
						}

						for (let i = 1; i <= 3; i += 1) {
							rerender(
								<Parent renderCount={i}>
									<Story />
								</Parent>
							);
							// eslint-disable-next-line no-await-in-loop
							await settle();
							expect(document.activeElement, `after re-render ${i}`).toBe(
								expected
							);
						}

						if (warning) {
							expect(consoleError).toHaveBeenCalledWith(
								expect.stringMatching(warning)
							);
						}
					} finally {
						consoleError?.mockRestore();
						outside.remove();
					}
				});
			}
		});
	}

	it('covers every exported component', () => {
		const classified = new Set([
			...renderedByStories,
			...notComponents,
			...Object.keys(extraFixtures),
		]);
		const unclassified = Object.entries(library)
			.filter(
				([name, value]) =>
					!name.startsWith('SLDS') &&
					!storyComponents.has(value) &&
					!classified.has(name)
			)
			.map(([name]) => name);
		expect(unclassified).toEqual([]);
	});

	it('only exempts stories that still exist', () => {
		const keys = new Set(fixtures.map(({ key }) => key));
		const stale = [
			...Object.keys(takesFocusOnMount),
			...Object.keys(expectedWarnings),
		].filter((key) => !keys.has(key));
		expect(stale).toEqual([]);
	});
});
