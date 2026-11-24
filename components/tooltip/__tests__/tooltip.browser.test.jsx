import { useState } from 'react';
import { render, waitFor } from '@testing-library/react';
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

import Tooltip from '../';
import Button from '../../button';
import IconSettings from '../../icon-settings';

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

// Dialog positions itself when Floating UI's `computePosition` promise resolves, and
// the hover delays are real timers, so state is set outside any act() scope. Tell React
// this file is not an act environment so those updates don't log act() warnings.
let previousActEnvironment;
beforeAll(async () => {
	await page.viewport(1024, 768);
	previousActEnvironment = globalThis.IS_REACT_ACT_ENVIRONMENT;
	globalThis.IS_REACT_ACT_ENVIRONMENT = false;
});
afterAll(() => {
	globalThis.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
});

beforeEach(async () => {
	floating.computeCalls = 0;
	floating.activeDrivers = 0;
	// Park the pointer away from where the next test renders its trigger
	await userEvent.unhover(document.body);
});

const ID = 'browser-tooltip';
const getTooltip = () => document.getElementById(ID);
const getTrigger = () => document.getElementById('trigger');
const getOutside = () => document.getElementById('outside');

// Until Dialog has positioned the tooltip it renders with `pointer-events: none`
const waitForPositioned = () =>
	vi.waitFor(() => {
		expect(getTooltip()).toBeTruthy();
		expect(getTooltip().style.pointerEvents).not.toBe('none');
	});

const waitForClosed = () =>
	vi.waitFor(() => {
		expect(getTooltip()).toBeNull();
	});

const sleep = (ms) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

const Layout = ({ children }) => (
	<IconSettings iconPath="/assets/icons">
		<div style={{ padding: '200px 300px' }}>{children}</div>
		<button
			id="outside"
			style={{ position: 'absolute', bottom: 8, left: 8 }}
			type="button"
		>
			Outside
		</button>
	</IconSettings>
);

const renderTooltip = (props = {}) =>
	render(
		<Layout>
			<Tooltip
				content="Tooltip content"
				id={ID}
				trigger={<Button id="trigger" label="Trigger" />}
				{...props}
			/>
		</Layout>
	);

const ControlledTooltip = ({
	initialIsOpen = false,
	onRequestClose,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(initialIsOpen);
	return (
		<Layout>
			<Tooltip
				content="Tooltip content"
				id={ID}
				isOpen={isOpen}
				onRequestOpen={() => setIsOpen(true)}
				onRequestClose={(event, data) => {
					onRequestClose(event, data);
					setIsOpen(false);
				}}
				trigger={<Button id="trigger" label="Trigger" />}
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

// Browser-mode tests for opening, positioning, closing, focus and the hover delays.
// They need real layout, real timers and the real SLDS stylesheet.
describe('Tooltip (browser)', () => {
	it('positions a tooltip that mounts open above its trigger, inside the viewport', async () => {
		renderTooltip({ isOpen: true });

		await waitForPositioned();
		const tooltipRect = getTooltip().getBoundingClientRect();
		const triggerRect = getTrigger().getBoundingClientRect();
		expectInViewport(tooltipRect);
		// `align="top"`: above the trigger (the nubbin margin sits between them) and
		// centered on it
		expect(tooltipRect.bottom).toBeLessThanOrEqual(triggerRect.top);
		expect(triggerRect.top - tooltipRect.bottom).toBeLessThan(32);
		const tooltipCenter = tooltipRect.left + tooltipRect.width / 2;
		const triggerCenter = triggerRect.left + triggerRect.width / 2;
		expect(Math.abs(tooltipCenter - triggerCenter)).toBeLessThan(2);
	});

	it('positions a tooltip that mounts open with `defaultIsOpen`', async () => {
		renderTooltip({ defaultIsOpen: true });

		await waitForPositioned();
		expectInViewport(getTooltip().getBoundingClientRect());
	});

	it('flips below the trigger when there is no room above it', async () => {
		render(
			<IconSettings iconPath="/assets/icons">
				<div style={{ position: 'absolute', left: 300, top: 0 }}>
					<Tooltip
						content="Tooltip content"
						id={ID}
						isOpen
						trigger={<Button id="trigger" label="Trigger" />}
					/>
				</div>
			</IconSettings>
		);

		await waitForPositioned();
		const tooltipRect = getTooltip().getBoundingClientRect();
		expectInViewport(tooltipRect);
		expect(tooltipRect.top).toBeGreaterThanOrEqual(
			getTrigger().getBoundingClientRect().bottom
		);
	});

	it('places the anchored nubbin from the trigger size on the first open', async () => {
		renderTooltip({ align: 'bottom', hasAnchoredNubbin: true });

		await userEvent.hover(getTrigger());
		await waitForPositioned();

		const triggerRect = document
			.querySelector('.slds-tooltip-trigger')
			.getBoundingClientRect();
		const nubbinContainer = document.querySelector(
			'.slds-tooltip-trigger > div[style*="height: 0"]'
		);
		expect(nubbinContainer).toBeTruthy();
		expect(parseFloat(nubbinContainer.style.left)).toBeCloseTo(
			triggerRect.width / 2,
			0
		);
		expect(parseFloat(nubbinContainer.style.top)).toBeCloseTo(
			triggerRect.height,
			0
		);
	});

	it('opens on hover and closes when the pointer leaves', async () => {
		renderTooltip();
		expect(getTooltip()).toBeNull();

		await userEvent.hover(getTrigger());
		await waitForPositioned();

		await userEvent.hover(getOutside());
		await waitForClosed();
	});

	it('waits `hoverOpenDelay` before opening and `hoverCloseDelay` before closing', async () => {
		renderTooltip({ hoverOpenDelay: 400, hoverCloseDelay: 400 });

		await userEvent.hover(getTrigger());
		await sleep(200);
		expect(getTooltip()).toBeNull();
		await sleep(400);
		expect(getTooltip()).toBeTruthy();
		await waitForPositioned();

		await userEvent.unhover(getTrigger());
		await sleep(200);
		expect(getTooltip()).toBeTruthy();
		await sleep(400);
		expect(getTooltip()).toBeNull();
	});

	it('does not open when the pointer leaves before `hoverOpenDelay`', async () => {
		renderTooltip({ hoverOpenDelay: 300 });

		await userEvent.hover(getTrigger());
		await sleep(100);
		await userEvent.hover(getOutside());
		await sleep(400);
		expect(getTooltip()).toBeNull();
	});

	it('opens on focus and closes on Escape, leaving focus on the trigger', async () => {
		const onRequestClose = vi.fn();
		render(<ControlledTooltip onRequestClose={onRequestClose} />);

		getTrigger().focus();
		await waitForPositioned();
		expect(getTrigger()).toHaveAttribute('aria-describedby', ID);

		await userEvent.keyboard('{Escape}');
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
		expect(onRequestClose.mock.calls[0][1]).toEqual({ trigger: 'cancel' });
		expect(document.activeElement).toBe(getTrigger());
	});

	it('closes an uncontrolled tooltip on Escape, leaving focus on the trigger', async () => {
		renderTooltip();

		getTrigger().focus();
		await waitForPositioned();

		await userEvent.keyboard('{Escape}');
		await waitForClosed();
		expect(document.activeElement).toBe(getTrigger());
	});

	it('closes an uncontrolled tooltip on an outside click', async () => {
		renderTooltip({ defaultIsOpen: true });
		await waitForPositioned();

		await userEvent.click(getOutside());
		await waitForClosed();
	});

	it('requests a close of a controlled tooltip on an outside click', async () => {
		const onRequestClose = vi.fn();
		// Opened by the parent, without focus or hover, so only the click can close it
		render(<ControlledTooltip initialIsOpen onRequestClose={onRequestClose} />);
		await waitForPositioned();

		await userEvent.click(getOutside());
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
		expect(onRequestClose.mock.calls[0][1]).toEqual({
			trigger: 'clickOutside',
		});
	});

	it('does not request a close on a click inside the tooltip', async () => {
		const onRequestClose = vi.fn();
		renderTooltip({ isOpen: true, onRequestClose });
		await waitForPositioned();

		await userEvent.click(getTooltip());
		expect(onRequestClose).not.toHaveBeenCalled();
	});

	it('stops positioning once unmounted', async () => {
		const { unmount } = renderTooltip({ isOpen: true });
		await waitForPositioned();
		expect(floating.activeDrivers).toBe(1);

		unmount();
		expect(floating.activeDrivers).toBe(0);
		const callsAtUnmount = floating.computeCalls;

		window.dispatchEvent(new Event('resize'));
		window.dispatchEvent(new Event('scroll'));
		await sleep(100);
		expect(floating.computeCalls).toBe(callsAtUnmount);
	});

	it('does not open or log after unmounting with a pending open delay', async () => {
		const onRequestOpen = vi.fn();
		const { unmount } = renderTooltip({ hoverOpenDelay: 200, onRequestOpen });

		await userEvent.hover(getTrigger());
		unmount();
		await sleep(300);
		expect(onRequestOpen).not.toHaveBeenCalled();
		expect(floating.computeCalls).toBe(0);
	});
});

describe('Tooltip in a portal (browser)', () => {
	it('positions the portaled tooltip and keeps it open on an inside click', async () => {
		const onRequestClose = vi.fn();
		renderTooltip({
			defaultIsOpen: true,
			onRequestClose,
			position: 'overflowBoundaryElement',
		});
		await waitForPositioned();

		const tooltipRect = getTooltip().getBoundingClientRect();
		expectInViewport(tooltipRect);
		expect(tooltipRect.bottom).toBeLessThanOrEqual(
			getTrigger().getBoundingClientRect().top
		);

		await userEvent.click(getTooltip());
		expect(onRequestClose).not.toHaveBeenCalled();

		// Leaving the tooltip closes it
		await userEvent.hover(getOutside());
		await waitForClosed();
		expect(onRequestClose.mock.calls.map(([, data]) => data)).toEqual([
			{ trigger: 'mouseLeave' },
		]);
	});

	it('closes the portaled tooltip on an outside click', async () => {
		const onRequestClose = vi.fn();
		renderTooltip({
			defaultIsOpen: true,
			onRequestClose,
			position: 'overflowBoundaryElement',
		});
		await waitForPositioned();

		await userEvent.click(getOutside());
		await waitForClosed();
		expect(onRequestClose.mock.calls.map(([, data]) => data)).toEqual([
			{ trigger: 'clickOutside' },
		]);
	});
});

// Browser-mode tests for `hasAnchoredNubbin`: they check positioning and
// pseudo-elements against the real SLDS 2 stylesheet
// (vitest.setup.browser.ts), which jsdom doesn't lay out or apply.
const openTooltip = async (props) => {
	const { unmount } = render(
		<IconSettings iconPath="/assets/icons">
			<div style={{ padding: '120px' }}>
				<Tooltip
					id="anchored-tooltip"
					align="top"
					content="Tooltip text"
					isOpen
					trigger={<button type="button">Trigger</button>}
					{...props}
				/>
			</div>
		</IconSettings>
	);
	const tooltip = await waitFor(() => {
		const el = document.querySelector('.slds-popover_tooltip');
		expect(el).not.toBeNull();
		expect(el.style.top).not.toBe('');
		return el;
	});
	const rect = tooltip.getBoundingClientRect();
	const before = getComputedStyle(tooltip, '::before');
	const result = {
		rect,
		beforeContent: before.content,
		className: tooltip.className,
	};
	unmount();
	return result;
};

describe('Tooltip hasAnchoredNubbin (browser)', () => {
	it("doesn't draw the dialog's own nubbin", async () => {
		const plain = await openTooltip({});
		expect(plain.className).toMatch(/slds-nubbin_bottom/);
		expect(plain.beforeContent).not.toBe('none');

		const anchored = await openTooltip({ hasAnchoredNubbin: true });
		expect(anchored.className).not.toMatch(/slds-nubbin/);
		expect(anchored.beforeContent).toBe('none');
	});

	it('keeps the tooltip where it sits with the dialog nubbin', async () => {
		const plain = await openTooltip({});
		const anchored = await openTooltip({ hasAnchoredNubbin: true });
		expect(anchored.rect.top).toBeCloseTo(plain.rect.top, 0);
		expect(anchored.rect.left).toBeCloseTo(plain.rect.left, 0);
	});
});
