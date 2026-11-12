import { render, fireEvent, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import IconSettings from '../../../icon-settings';
import Dropdown from '../../../menu-dropdown';

// Count how many times the Dialog asks `@floating-ui/dom` to compute a
// position, while delegating to the real implementation so behavior is
// unchanged. Each `computePosition` walks the reference's ancestor chain (via
// `flip`/`shift`), so redundant calls are the dominant per-open cost on a deep
// page — the jsdom slowness reported against the popper.js -> floating-ui
// migration (menu opens went from sub-ms to seconds) traced back to the Dialog
// recomputing position on every re-render instead of once per open.
let computePositionCalls = 0;
vi.mock('@floating-ui/dom', async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		computePosition: (...args) => {
			computePositionCalls += 1;
			return actual.computePosition(...args);
		},
	};
});

const renderDropdown = () =>
	render(
		<IconSettings iconPath="/assets/icons">
			<Dropdown
				align="left"
				openOn="click"
				iconCategory="utility"
				iconName="settings"
				iconVariant="container"
				assistiveText={{ icon: 'Open menu' }}
				options={[
					{ label: 'Menu Item One', value: 'item1' },
					{ label: 'Menu Item Two', value: 'item2' },
				]}
			/>
		</IconSettings>
	);

describe('Dialog positioning efficiency', () => {
	beforeEach(() => {
		computePositionCalls = 0;
	});

	it('computes the menu position at most twice for a single open (no layout change)', async () => {
		renderDropdown();

		await act(async () => {
			fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
		});
		// Menu actually opened — positioning still works.
		expect(await screen.findByText('Menu Item One')).toBeInTheDocument();

		// Let any microtask/observer-driven re-position settle.
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 50));
		});

		// With `ResizeObserver`/`IntersectionObserver` no-op'd (see vitest.setup),
		// `autoUpdate` fires exactly one initial computation. Anything more means
		// the component is recomputing on its own re-renders again — the
		// regression this test guards against (it was 3+ before the fix).
		expect(computePositionCalls).toBeGreaterThan(0);
		expect(computePositionCalls).toBeLessThanOrEqual(2);
	});
});
