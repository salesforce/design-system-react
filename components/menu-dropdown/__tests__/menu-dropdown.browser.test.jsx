import { useState } from 'react';
import {
	render,
	screen,
	waitFor,
	within,
	fireEvent,
} from '@testing-library/react';
import { page, userEvent } from 'vitest/browser';
import {
	describe,
	it,
	expect,
	vi,
	beforeAll,
	afterAll,
	beforeEach,
} from 'vitest';

import MenuDropdown from '../';
import IconSettings from '../../icon-settings';
import Tooltip from '../../tooltip';
import { expectNoAxeViolations, notActEnvironment } from '../../__tests__/axe';

// Count Floating UI's position computations and the `autoUpdate` drivers still
// running, delegating to the real implementation so positioning is unchanged.
const floating = vi.hoisted(() => ({ computeCalls: 0, activeDrivers: 0 }));
vi.mock('@floating-ui/dom', async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		computePosition: (...args) => {
			floating.computeCalls += 1;
			return actual.computePosition(...args);
		},
		autoUpdate: (...args) => {
			floating.activeDrivers += 1;
			const cleanup = actual.autoUpdate(...args);
			return () => {
				floating.activeDrivers -= 1;
				cleanup();
			};
		},
	};
});

// Dialog positions itself when Floating UI's `computePosition` promise resolves, which
// sets state outside any act() scope. Tell React this file is not an act environment so
// the update doesn't log "not wrapped in act" warnings.
let previousActEnvironment;
beforeAll(async () => {
	await page.viewport(1024, 768);
	previousActEnvironment = globalThis.IS_REACT_ACT_ENVIRONMENT;
	globalThis.IS_REACT_ACT_ENVIRONMENT = false;
});
afterAll(() => {
	globalThis.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
});

beforeEach(() => {
	floating.computeCalls = 0;
	floating.activeDrivers = 0;
});

const ID = 'browser-menu';
const OPTIONS = [
	{ label: 'Menu Item One', value: 'one' },
	{ label: 'Menu Item Two', value: 'two' },
	{ label: 'Menu Item Three', value: 'three' },
];

const getMenu = () => document.querySelector('.slds-dropdown');
const getTrigger = () => document.querySelector(`#${ID} > button`);
const getOutside = () => document.getElementById('outside');

// Until Dialog has positioned the menu it renders with `pointer-events: none`
const waitForPositioned = () =>
	vi.waitFor(() => {
		expect(getMenu()).toBeTruthy();
		expect(getMenu().style.pointerEvents).not.toBe('none');
	});

const waitForClosed = () =>
	vi.waitFor(() => {
		expect(getMenu()).toBeNull();
	});

const Layout = ({ children, style }) => (
	<IconSettings iconPath="/assets/icons">
		<div style={{ padding: '120px 300px', ...style }}>{children}</div>
		<button
			id="outside"
			style={{ position: 'absolute', bottom: 8, right: 8 }}
			type="button"
		>
			Outside
		</button>
	</IconSettings>
);

const renderMenu = (props = {}) =>
	render(
		<Layout>
			<MenuDropdown id={ID} label="Menu" options={OPTIONS} {...props} />
		</Layout>
	);

const ControlledMenu = ({
	initialIsOpen = false,
	onRequestClose,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(initialIsOpen);
	return (
		<Layout>
			<MenuDropdown
				id={ID}
				isOpen={isOpen}
				label="Menu"
				onRequestOpen={() => setIsOpen(true)}
				onRequestClose={(event, data) => {
					onRequestClose(event, data);
					setIsOpen(false);
				}}
				options={OPTIONS}
				{...props}
			/>
		</Layout>
	);
};

const expectInViewport = (rect) => {
	expect(rect.width).toBeGreaterThan(0);
	expect(rect.height).toBeGreaterThan(0);
	expect(rect.left).toBeGreaterThanOrEqual(0);
	expect(rect.top).toBeGreaterThanOrEqual(0);
	expect(rect.right).toBeLessThanOrEqual(window.innerWidth);
	expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight);
};

// Browser-mode tests for opening, positioning, closing and focus. They need real
// layout and the real SLDS stylesheet, which jsdom does not provide.
describe('MenuDropdown (browser)', () => {
	it('positions a menu that mounts open below its trigger, inside the viewport', async () => {
		renderMenu({ isOpen: true });

		await waitForPositioned();
		const menuRect = getMenu().getBoundingClientRect();
		const triggerRect = getTrigger().getBoundingClientRect();
		expectInViewport(menuRect);
		// `align="left"`: below the trigger and left-aligned with it
		expect(menuRect.top).toBeGreaterThanOrEqual(triggerRect.bottom - 1);
		expect(menuRect.top - triggerRect.bottom).toBeLessThan(16);
		expect(Math.abs(menuRect.left - triggerRect.left)).toBeLessThan(2);
	});

	it('positions a menu that mounts open with `defaultIsOpen`', async () => {
		renderMenu({ defaultIsOpen: true });

		await waitForPositioned();
		expectInViewport(getMenu().getBoundingClientRect());
	});

	it('right-aligns the menu with the trigger for `align="right"`', async () => {
		renderMenu({ align: 'right' });

		await userEvent.click(getTrigger());
		await waitForPositioned();

		const menuRect = getMenu().getBoundingClientRect();
		expectInViewport(menuRect);
		expect(
			Math.abs(menuRect.right - getTrigger().getBoundingClientRect().right)
		).toBeLessThan(2);
	});

	it('flips above the trigger when there is no room below it', async () => {
		render(
			<IconSettings iconPath="/assets/icons">
				<div style={{ position: 'absolute', bottom: 8, left: 300 }}>
					<MenuDropdown id={ID} label="Menu" options={OPTIONS} />
				</div>
			</IconSettings>
		);

		await userEvent.click(getTrigger());
		await waitForPositioned();

		const menuRect = getMenu().getBoundingClientRect();
		expectInViewport(menuRect);
		// The 2px also absorbs subpixel rounding between the two rects
		expect(Math.round(menuRect.bottom)).toBeLessThanOrEqual(
			Math.round(getTrigger().getBoundingClientRect().top) + 2
		);
	});

	it('opens on a trigger click and keeps focus on the trigger', async () => {
		renderMenu();
		expect(getMenu()).toBeNull();

		await userEvent.click(getTrigger());
		await waitForPositioned();
		expect(document.activeElement).toBe(getTrigger());
	});

	it('closes an uncontrolled menu on an outside click', async () => {
		renderMenu();
		await userEvent.click(getTrigger());
		await waitForPositioned();

		await userEvent.click(getOutside());
		await waitForClosed();
	});

	it('requests a close of a controlled menu on an outside click', async () => {
		const onRequestClose = vi.fn();
		render(<ControlledMenu onRequestClose={onRequestClose} />);
		await userEvent.click(getTrigger());
		await waitForPositioned();

		await userEvent.click(getOutside());
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
	});

	it('does not close on a click inside the menu outside an option', async () => {
		renderMenu();
		await userEvent.click(getTrigger());
		await waitForPositioned();

		await userEvent.click(getMenu(), { position: { x: 2, y: 2 } });
		expect(getMenu()).toBeTruthy();
	});

	it('moves focus into the menu with the keyboard, closes on Escape and returns focus to the trigger', async () => {
		const onRequestClose = vi.fn();
		render(<ControlledMenu onRequestClose={onRequestClose} />);
		getTrigger().focus();

		await userEvent.keyboard('{ArrowDown}');
		await waitForPositioned();
		await vi.waitFor(() => {
			expect(getMenu().contains(document.activeElement)).toBe(true);
		});

		await userEvent.keyboard('{Escape}');
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
		expect(document.activeElement).toBe(getTrigger());
	});

	it('closes an uncontrolled menu on Escape and returns focus to the trigger', async () => {
		renderMenu();
		getTrigger().focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForPositioned();

		await userEvent.keyboard('{Escape}');
		await waitForClosed();
		expect(document.activeElement).toBe(getTrigger());
	});

	it('returns focus to the trigger after a mouse selection', async () => {
		const onClick = vi.fn();
		const onRequestClose = vi.fn();
		const onSelect = vi.fn();
		renderMenu({ onClick, onRequestClose, onSelect });
		await userEvent.click(getTrigger());
		await waitForPositioned();
		onClick.mockClear();

		await userEvent.click(document.querySelector('.slds-dropdown__item a'));
		await waitForClosed();
		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(onRequestClose).toHaveBeenCalledTimes(1);
		expect(onClick).not.toHaveBeenCalled();
		expect(document.activeElement).toBe(getTrigger());
	});

	it('stops positioning once unmounted', async () => {
		const { unmount } = renderMenu({ defaultIsOpen: true });
		await waitForPositioned();
		expect(floating.activeDrivers).toBe(1);

		unmount();
		expect(floating.activeDrivers).toBe(0);
		const callsAtUnmount = floating.computeCalls;

		window.dispatchEvent(new Event('resize'));
		window.dispatchEvent(new Event('scroll'));
		await new Promise((resolve) => {
			setTimeout(resolve, 100);
		});
		expect(floating.computeCalls).toBe(callsAtUnmount);
	});

	it('stops positioning once closed', async () => {
		renderMenu();
		await userEvent.click(getTrigger());
		await waitForPositioned();

		await userEvent.click(getOutside());
		await waitForClosed();
		expect(floating.activeDrivers).toBe(0);
	});
});

describe('MenuDropdown clicks inside the menu (browser)', () => {
	it('does not close on a click on a header', async () => {
		const onClick = vi.fn();
		const onRequestClose = vi.fn();
		renderMenu({
			onClick,
			onRequestClose,
			options: [{ label: 'Header', type: 'header' }, ...OPTIONS],
		});
		await userEvent.click(getTrigger());
		await waitForPositioned();
		onClick.mockClear();

		await userEvent.click(document.querySelector('.slds-dropdown__header'));
		expect(getMenu()).toBeTruthy();
		expect(onRequestClose).not.toHaveBeenCalled();
		expect(onClick).not.toHaveBeenCalled();
	});

	it('requests one close when a link option is selected', async () => {
		const onRequestClose = vi.fn();
		const onSelect = vi.fn();
		renderMenu({
			onRequestClose,
			onSelect,
			options: [{ label: 'Link', value: 'link', type: 'link', href: '#top' }],
		});
		await userEvent.click(getTrigger());
		await waitForPositioned();

		await userEvent.click(document.querySelector('.slds-dropdown__item a'));
		await waitForClosed();
		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(onRequestClose).toHaveBeenCalledTimes(1);
	});
});

describe('MenuDropdown in a portal (browser)', () => {
	it('positions the portaled menu, keeps it open on an inside click and closes on an outside click', async () => {
		const onRequestClose = vi.fn();
		renderMenu({
			menuPosition: 'overflowBoundaryElement',
			onRequestClose,
			options: [{ label: 'Header', type: 'header' }, ...OPTIONS],
		});
		await userEvent.click(getTrigger());
		await waitForPositioned();

		const menuRect = getMenu().getBoundingClientRect();
		const triggerRect = getTrigger().getBoundingClientRect();
		expectInViewport(menuRect);
		expect(menuRect.top).toBeGreaterThanOrEqual(triggerRect.bottom - 1);
		expect(Math.abs(menuRect.left - triggerRect.left)).toBeLessThan(2);

		await userEvent.click(document.querySelector('.slds-dropdown__header'));
		expect(getMenu()).toBeTruthy();
		expect(onRequestClose).not.toHaveBeenCalled();

		await userEvent.click(getOutside());
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
	});
});

// Browser-mode tests for `tooltipMenuItem`: they check the item's styles and
// the tooltip's position against the real SLDS 2 stylesheet
// (vitest.setup.browser.ts), which jsdom doesn't apply or lay out.
const renderTooltipMenu = () =>
	render(
		<IconSettings iconPath="/assets/icons">
			<div style={{ padding: '120px' }}>
				<MenuDropdown
					id="tooltip-menu"
					isOpen
					label="Menu"
					menuPosition="relative"
					options={[
						{ label: 'Menu Item One', value: 'A0' },
						{
							label: 'Menu Item Two',
							value: 'B0',
							tooltipContent: 'Just a friendly tooltip',
						},
					]}
					tooltipMenuItem={<Tooltip align="top" />}
				/>
			</div>
		</IconSettings>
	);

const getLink = (container, index) =>
	within(container.querySelector(`#tooltip-menu-item-${index}`)).getByRole(
		'menuitem'
	);

describe('MenuDropdown tooltipMenuItem (browser)', () => {
	it('styles a tooltip item like the items next to it', () => {
		const { container } = renderTooltipMenu();
		const plain = getComputedStyle(getLink(container, 0));
		const withTooltip = getComputedStyle(getLink(container, 1));
		[
			'display',
			'paddingTop',
			'paddingLeft',
			'color',
			'whiteSpace',
			'cursor',
		].forEach((property) => {
			expect(withTooltip[property]).toBe(plain[property]);
		});
		expect(withTooltip.display).toBe('flex');
	});

	it('puts the tooltip next to the link it describes', async () => {
		const { container } = renderTooltipMenu();
		const link = getLink(container, 1);
		fireEvent.mouseEnter(link);
		const tooltip = await waitFor(() => {
			const el = document.querySelector('#tooltip-menu-item-1-tooltip');
			expect(el).not.toBeNull();
			expect(el.style.left).not.toBe('');
			return el;
		});
		const linkRect = link.getBoundingClientRect();
		const tooltipRect = tooltip.getBoundingClientRect();
		// `align="top"`: just above the link, overlapping it horizontally
		expect(tooltipRect.bottom).toBeLessThanOrEqual(linkRect.top);
		expect(linkRect.top - tooltipRect.bottom).toBeLessThan(24);
		expect(tooltipRect.right).toBeGreaterThan(linkRect.left);
		expect(tooltipRect.left).toBeLessThan(linkRect.right);
	});

	// The tooltip sizes against its trigger wrapper; a 0-width wrapper wrapped
	// "Just a friendly tooltip" onto three lines.
	it('fits short tooltip content on one line', async () => {
		const { container } = renderTooltipMenu();
		fireEvent.mouseEnter(getLink(container, 1));
		const body = await waitFor(() => {
			const el = document.querySelector(
				'#tooltip-menu-item-1-tooltip .slds-popover__body'
			);
			expect(el).not.toBeNull();
			return el;
		});
		const style = getComputedStyle(body);
		const contentHeight =
			body.getBoundingClientRect().height -
			parseFloat(style.paddingTop) -
			parseFloat(style.paddingBottom);
		expect(contentHeight).toBeLessThan(parseFloat(style.lineHeight) * 1.5);
	});
});

const options = [
	{ type: 'header', label: 'Actions' },
	{ label: 'Edit', value: 'edit' },
	{ label: 'Archive', value: 'archive', disabled: true },
	{ type: 'divider' },
	{ label: 'Delete', value: 'delete' },
];

// axe on the open menu, with real SLDS CSS. A closed menu isn't rendered.
describe('MenuDropdown accessibility (browser)', () => {
	notActEnvironment();

	it.each([
		['label button', { label: 'Actions' }],
		[
			'icon button',
			{
				assistiveText: { icon: 'More actions' },
				buttonVariant: 'icon',
				iconCategory: 'utility',
				iconName: 'down',
				iconVariant: 'border-filled',
			},
		],
		['checkmark', { label: 'Sort', checkmark: true, value: 'edit' }],
	])('%s: has no axe violations while open', async (name, props) => {
		render(
			<IconSettings iconPath="/assets/icons">
				<MenuDropdown
					id="menu"
					isOpen
					onSelect={() => {}}
					options={options}
					{...props}
				/>
			</IconSettings>
		);
		expect(screen.getByRole('menu')).toBeInTheDocument();
		await expectNoAxeViolations();
	});
});
