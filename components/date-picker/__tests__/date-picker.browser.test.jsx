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

import Datepicker from '../';
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

// A formatter and parser, as consumers are asked to pass (without them DatePicker warns
// to use a date library instead of its default parser)
const formatter = (date) =>
	date ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : '';
const parser = (text) => {
	const [month, day, year] = text.split('/').map(Number);
	return new Date(year, month - 1, day);
};

const ID = 'browser-date-picker';
const VALUE = new Date(2024, 5, 14);

const getCalendar = () => document.querySelector('.slds-datepicker');
const getInput = () => document.getElementById(ID);
const getIconButton = () => document.querySelector('.slds-input__icon_right');
const getOutside = () => document.getElementById('outside');
// Click the text, clear of the calendar icon at the input's right
const clickInput = () =>
	userEvent.click(getInput(), { position: { x: 10, y: 10 } });

// Until Dialog has positioned the calendar it renders with `pointer-events: none`
const waitForPositioned = () =>
	vi.waitFor(() => {
		expect(getCalendar()).toBeTruthy();
		expect(getCalendar().style.pointerEvents).not.toBe('none');
	});

const waitForClosed = () =>
	vi.waitFor(() => {
		expect(getCalendar()).toBeNull();
	});

const Layout = ({ children }) => (
	<IconSettings iconPath="/assets/icons">
		<div style={{ padding: '40px 300px' }}>
			<div style={{ width: 240 }}>{children}</div>
		</div>
		<button
			id="outside"
			style={{ position: 'absolute', bottom: 8, right: 8 }}
			type="button"
		>
			Outside
		</button>
	</IconSettings>
);

const renderPicker = (props = {}) =>
	render(
		<Layout>
			<Datepicker
				formatter={formatter}
				id={ID}
				labels={{ label: 'Date' }}
				onChange={() => {}}
				parser={parser}
				value={VALUE}
				{...props}
			/>
		</Layout>
	);

const ControlledPicker = ({ onRequestClose, ...props }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Layout>
			<Datepicker
				formatter={formatter}
				id={ID}
				isOpen={isOpen}
				labels={{ label: 'Date' }}
				onChange={() => {}}
				parser={parser}
				onRequestOpen={() => setIsOpen(true)}
				onRequestClose={(event, data) => {
					onRequestClose(event, data);
					setIsOpen(false);
				}}
				value={VALUE}
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
describe('Datepicker (browser)', () => {
	it('positions a calendar that mounts open below the input, inside the viewport', async () => {
		renderPicker({ isOpen: true });

		await waitForPositioned();
		const calendarRect = getCalendar().getBoundingClientRect();
		const inputRect = getInput().getBoundingClientRect();
		expectInViewport(calendarRect);
		// `align="left"`: below the input and left-aligned with it
		expect(calendarRect.top).toBeGreaterThanOrEqual(inputRect.bottom - 1);
		expect(calendarRect.top - inputRect.bottom).toBeLessThan(16);
		expect(Math.abs(calendarRect.left - inputRect.left)).toBeLessThan(2);
	});

	it('positions a calendar that mounts open with `defaultIsOpen`', async () => {
		renderPicker({ defaultIsOpen: true });

		await waitForPositioned();
		expectInViewport(getCalendar().getBoundingClientRect());
	});

	it('right-aligns the calendar with the input for `align="right"`', async () => {
		renderPicker({ align: 'right', isOpen: true });

		await waitForPositioned();
		const calendarRect = getCalendar().getBoundingClientRect();
		expectInViewport(calendarRect);
		expect(
			Math.abs(calendarRect.right - getInput().getBoundingClientRect().right)
		).toBeLessThan(2);
	});

	it('flips above the input when there is no room below it', async () => {
		render(
			<IconSettings iconPath="/assets/icons">
				<div style={{ position: 'absolute', bottom: 8, left: 300, width: 240 }}>
					<Datepicker
						formatter={formatter}
						id={ID}
						isOpen
						labels={{ label: 'Date' }}
						onChange={() => {}}
						parser={parser}
						value={VALUE}
					/>
				</div>
			</IconSettings>
		);

		await waitForPositioned();
		const calendarRect = getCalendar().getBoundingClientRect();
		expectInViewport(calendarRect);
		expect(calendarRect.bottom).toBeLessThanOrEqual(
			getInput().getBoundingClientRect().top + 2
		);
	});

	it('opens on an input click, keeping focus in the input', async () => {
		renderPicker();
		expect(getCalendar()).toBeNull();

		await clickInput();
		await waitForPositioned();
		expect(document.activeElement).toBe(getInput());
	});

	it('opens from the icon and moves focus into the calendar', async () => {
		renderPicker();

		await userEvent.click(getIconButton());
		await waitForPositioned();
		await vi.waitFor(() => {
			expect(getCalendar().contains(document.activeElement)).toBe(true);
		});
	});

	it('closes an uncontrolled calendar on an outside click', async () => {
		renderPicker();
		await clickInput();
		await waitForPositioned();

		await userEvent.click(getOutside());
		await waitForClosed();
	});

	it('requests a close of a controlled calendar on an outside click', async () => {
		const onRequestClose = vi.fn();
		render(<ControlledPicker onRequestClose={onRequestClose} />);
		await clickInput();
		await waitForPositioned();

		await userEvent.click(getOutside());
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
		expect(onRequestClose.mock.calls[0][1]).toEqual({
			trigger: 'click-outside',
		});
	});

	it('does not close on a click inside the calendar', async () => {
		const onRequestClose = vi.fn();
		renderPicker({ onRequestClose });
		await clickInput();
		await waitForPositioned();

		await userEvent.click(document.querySelector('.slds-datepicker__filter'), {
			position: { x: 2, y: 2 },
		});
		expect(getCalendar()).toBeTruthy();
		expect(onRequestClose).not.toHaveBeenCalled();
	});

	it('closes on Escape in the input, keeping focus in the input', async () => {
		const onRequestClose = vi.fn();
		render(<ControlledPicker onRequestClose={onRequestClose} />);
		await clickInput();
		await waitForPositioned();

		await userEvent.keyboard('{Escape}');
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
		expect(onRequestClose.mock.calls[0][1]).toEqual({ trigger: 'escape' });
		expect(document.activeElement).toBe(getInput());
	});

	it('closes on Escape in the calendar and returns focus to the input', async () => {
		const onRequestClose = vi.fn();
		renderPicker({ onRequestClose });
		await userEvent.click(getIconButton());
		await waitForPositioned();
		await vi.waitFor(() => {
			expect(getCalendar().contains(document.activeElement)).toBe(true);
		});

		await userEvent.keyboard('{Escape}');
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
		expect(document.activeElement).toBe(getInput());
	});

	it('returns focus to the input after a date is picked', async () => {
		const onChange = vi.fn();
		renderPicker({ onChange });
		await userEvent.click(getIconButton());
		await waitForPositioned();

		await userEvent.click(
			document.querySelector(
				'.slds-datepicker td:not(.slds-disabled-text) .slds-day'
			)
		);
		await waitForClosed();
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(document.activeElement).toBe(getInput());
	});

	it('stops positioning once unmounted', async () => {
		const { unmount } = renderPicker({ defaultIsOpen: true });
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
		renderPicker();
		await clickInput();
		await waitForPositioned();

		await userEvent.click(getOutside());
		await waitForClosed();
		expect(floating.activeDrivers).toBe(0);
	});
});

describe('Datepicker in a portal (browser)', () => {
	it('positions the portaled calendar below the input and keeps it open on an inside click', async () => {
		const onRequestClose = vi.fn();
		renderPicker({ menuPosition: 'overflowBoundaryElement', onRequestClose });
		await clickInput();
		await waitForPositioned();

		const calendarRect = getCalendar().getBoundingClientRect();
		const inputRect = getInput().getBoundingClientRect();
		expectInViewport(calendarRect);
		expect(calendarRect.top).toBeGreaterThanOrEqual(inputRect.bottom - 1);
		expect(Math.abs(calendarRect.left - inputRect.left)).toBeLessThan(2);

		await userEvent.click(document.querySelector('.slds-datepicker__filter'), {
			position: { x: 2, y: 2 },
		});
		expect(getCalendar()).toBeTruthy();
		expect(onRequestClose).not.toHaveBeenCalled();

		await userEvent.click(getOutside());
		await waitForClosed();
		expect(onRequestClose).toHaveBeenCalledTimes(1);
	});
});
