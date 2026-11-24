import { useState } from 'react';
import { render } from '@testing-library/react';
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

import Popover from '../';
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

// Dialog positions itself when Floating UI's `computePosition` promise resolves, which
// sets state outside any act() scope, and waiting inside act() would hold back the very
// update being waited for. Tell React this file is not an act environment so the
// update doesn't log "not wrapped in act" warnings.
let previousActEnvironment;
beforeAll(async () => {
	// A desktop viewport: the default 414px is narrower than the trigger plus a 20rem popover
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

const ID = 'browser-popover';
const getDialog = () => document.getElementById(`${ID}-popover`);
const getTrigger = () => document.getElementById(ID);
const getOutside = () => document.getElementById('outside');

// Until Dialog has positioned the popover it renders with `pointer-events: none`
const waitForPositioned = () =>
	vi.waitFor(() => {
		expect(getDialog()).toBeTruthy();
		expect(getDialog().style.pointerEvents).not.toBe('none');
	});

const waitForClosed = () =>
	vi.waitFor(() => {
		expect(getDialog()).toBeNull();
	});

// The trigger sits well inside the viewport, so the default `right` alignment fits
const renderPopover = (props = {}) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<div style={{ padding: '120px 200px' }}>
				<Popover body="Body" heading="Heading" id={ID} {...props}>
					<Button label="Trigger" />
				</Popover>
				<button
					id="outside"
					style={{ position: 'absolute', bottom: 8, left: 8 }}
					type="button"
				>
					Outside
				</button>
			</div>
		</IconSettings>
	);

const ControlledPopover = ({ onRequestClose, ...props }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<IconSettings iconPath="/assets/icons">
			<div style={{ padding: '120px 200px' }}>
				<Popover
					body="Body"
					heading="Heading"
					id={ID}
					isOpen={isOpen}
					onRequestOpen={() => setIsOpen(true)}
					onRequestClose={(event, data) => {
						onRequestClose(event, data);
						setIsOpen(false);
					}}
					{...props}
				>
					<Button label="Trigger" />
				</Popover>
				<button
					id="outside"
					style={{ position: 'absolute', bottom: 8, left: 8 }}
					type="button"
				>
					Outside
				</button>
			</div>
		</IconSettings>
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
describe('Popover (browser)', () => {
	it('positions a popover that mounts open, so its footer can be clicked', async () => {
		const onClick = vi.fn();
		renderPopover({
			footer: <Button label="Footer action" onClick={onClick} />,
			isOpen: true,
			onRequestClose: () => {},
		});

		await waitForPositioned();

		await userEvent.click(
			document.querySelector('.slds-popover__footer .slds-button')
		);
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('positions a popover that mounts open with `defaultIsOpen`', async () => {
		renderPopover({ defaultIsOpen: true });

		await waitForPositioned();
		expectInViewport(getDialog().getBoundingClientRect());
	});

	it('opens on a trigger click, to the right of the trigger and inside the viewport', async () => {
		renderPopover();
		expect(getDialog()).toBeNull();

		await userEvent.click(getTrigger());
		await waitForPositioned();

		const dialogRect = getDialog().getBoundingClientRect();
		const triggerRect = getTrigger().getBoundingClientRect();
		expectInViewport(dialogRect);
		// `align="right"`: the popover starts past the trigger's right edge (the
		// nubbin margin sits between them) and overlaps it vertically
		expect(dialogRect.left).toBeGreaterThanOrEqual(triggerRect.right);
		expect(dialogRect.left - triggerRect.right).toBeLessThan(32);
		expect(dialogRect.top).toBeLessThan(triggerRect.bottom);
		expect(dialogRect.bottom).toBeGreaterThan(triggerRect.top);
	});

	it('flips to stay inside the viewport when the requested side has no room', async () => {
		render(
			<IconSettings iconPath="/assets/icons">
				<div style={{ position: 'absolute', right: 8, top: 200 }}>
					<Popover align="right" body="Body" heading="Heading" id={ID}>
						<Button label="Trigger" />
					</Popover>
				</div>
			</IconSettings>
		);

		await userEvent.click(getTrigger());
		await waitForPositioned();

		const dialogRect = getDialog().getBoundingClientRect();
		expectInViewport(dialogRect);
		expect(dialogRect.right).toBeLessThanOrEqual(
			getTrigger().getBoundingClientRect().left
		);
	});

	it('closes an uncontrolled popover on an outside click', async () => {
		renderPopover();
		await userEvent.click(getTrigger());
		await waitForPositioned();

		await userEvent.click(getOutside());
		await waitForClosed();
	});

	it('requests a close of a controlled popover on an outside click', async () => {
		const onRequestClose = vi.fn();
		render(<ControlledPopover onRequestClose={onRequestClose} />);
		await userEvent.click(getTrigger());
		await waitForPositioned();

		await userEvent.click(getOutside());
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
		expect(onRequestClose.mock.calls[0][1]).toEqual({
			trigger: 'clickOutside',
		});
	});

	it('does not close on a click inside the popover', async () => {
		renderPopover();
		await userEvent.click(getTrigger());
		await waitForPositioned();

		await userEvent.click(document.querySelector('.slds-popover__body'));
		expect(getDialog()).toBeTruthy();
	});

	it('moves focus into the popover, closes on Escape and returns focus to the trigger', async () => {
		const onRequestClose = vi.fn();
		render(<ControlledPopover onRequestClose={onRequestClose} />);
		await userEvent.click(getTrigger());
		await waitForPositioned();
		expect(getDialog().contains(document.activeElement)).toBe(true);

		await userEvent.keyboard('{Escape}');
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
		expect(onRequestClose.mock.calls[0][1]).toEqual({ trigger: 'cancel' });
		expect(document.activeElement).toBe(getTrigger());
	});

	it('closes an uncontrolled popover on Escape and returns focus to the trigger', async () => {
		renderPopover();
		await userEvent.click(getTrigger());
		await waitForPositioned();

		await userEvent.keyboard('{Escape}');
		await waitForClosed();
		expect(document.activeElement).toBe(getTrigger());
	});

	it('returns focus to the trigger when the close button is clicked', async () => {
		renderPopover();
		await userEvent.click(getTrigger());
		await waitForPositioned();

		await userEvent.click(document.querySelector('.slds-popover__close'));
		await waitForClosed();
		expect(document.activeElement).toBe(getTrigger());
	});

	it('stops positioning once unmounted', async () => {
		const { unmount } = renderPopover({ defaultIsOpen: true });
		await waitForPositioned();
		expect(floating.activeDrivers).toBe(1);

		unmount();
		expect(floating.activeDrivers).toBe(0);
		const callsAtUnmount = floating.computeCalls;

		// Layout changes that `autoUpdate` would react to while it is running
		window.dispatchEvent(new Event('resize'));
		window.dispatchEvent(new Event('scroll'));
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(floating.computeCalls).toBe(callsAtUnmount);
	});

	it('stops positioning once closed', async () => {
		renderPopover();
		await userEvent.click(getTrigger());
		await waitForPositioned();

		await userEvent.keyboard('{Escape}');
		await waitForClosed();
		expect(floating.activeDrivers).toBe(0);
	});
});

describe('Popover in a portal (browser)', () => {
	it('positions the portaled popover, keeps it open on an inside click and closes on an outside click', async () => {
		const onRequestClose = vi.fn();
		renderPopover({ position: 'overflowBoundaryElement', onRequestClose });
		await userEvent.click(getTrigger());
		await waitForPositioned();

		const dialogRect = getDialog().getBoundingClientRect();
		expectInViewport(dialogRect);
		expect(dialogRect.left).toBeGreaterThanOrEqual(
			getTrigger().getBoundingClientRect().right
		);

		await userEvent.click(document.querySelector('.slds-popover__body'));
		expect(getDialog()).toBeTruthy();
		expect(onRequestClose).not.toHaveBeenCalled();

		await userEvent.click(getOutside());
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
	});
});
