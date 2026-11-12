import { render, act, screen } from '@testing-library/react';
import { page, userEvent } from 'vitest/browser';
import { afterEach, describe, it, expect } from 'vitest';

import '@salesforce-ux/design-system-2/dist/css/bundled/slds2.lightning-blue.css';

import ProgressIndicator from '../';
import IconSettings from '../../icon-settings';

// Served by Vite from node_modules, so the sprite loads instead of 404ing
const iconPath = '/node_modules/@salesforce-ux/design-system/assets/icons';

const steps = [
	{ id: 0, label: 'Contacted' },
	{ id: 1, label: 'Open' },
	{ id: 2, label: 'Unqualified' },
	{ id: 3, label: 'Nurturing' },
	{ id: 4, label: 'Closed' },
];

// Browser-mode tests for `type="path"`: the accessible names depend on SLDS
// laying out the stage and title as blocks, and Tab focus traversal only
// happens in a real browser.
describe('SLDSProgressIndicator path (browser)', () => {
	const renderPath = () =>
		render(
			<IconSettings iconPath={iconPath}>
				<button type="button">Before</button>
				<ProgressIndicator
					id="path-browser"
					type="path"
					steps={steps}
					selectedStep={steps[2]}
					completedSteps={steps.slice(0, 2)}
				/>
				<button type="button">After</button>
			</IconSettings>
		);

	const getOptions = () => [...document.querySelectorAll('[role="option"]')];

	// Focusing a stage updates the roving tab stop (React state); wrap each
	// interaction so it flushes inside act().
	const run = (interaction) =>
		act(async () => {
			await interaction();
		});

	it('names each stage with its status and title', () => {
		renderPath();
		const options = getOptions();

		expect(options[0]).toHaveAccessibleName('Stage Complete Contacted');
		expect(options[2]).toHaveAccessibleName('Current Stage: Unqualified');
		expect(options[3]).toHaveAccessibleName('Nurturing');
	});

	it('is a single tab stop on the current stage', async () => {
		renderPath();
		const options = getOptions();
		const [before, after] = document.querySelectorAll('button');

		await run(() => before.focus());
		await run(() => userEvent.tab());
		expect(options[2]).toHaveFocus();

		await run(() => userEvent.tab());
		expect(after).toHaveFocus();

		await run(() => userEvent.tab({ shift: true }));
		expect(options[2]).toHaveFocus();
	});

	it('moves between stages with the arrow keys and keeps the tab stop there', async () => {
		renderPath();
		const options = getOptions();
		const [before, after] = document.querySelectorAll('button');

		await run(() => options[2].focus());
		await run(() => userEvent.keyboard('{ArrowRight}{ArrowRight}'));
		expect(options[4]).toHaveFocus();

		await run(() => userEvent.keyboard('{ArrowLeft}'));
		expect(options[3]).toHaveFocus();

		await run(() => after.focus());
		await run(() => userEvent.tab({ shift: true }));
		expect(options[3]).toHaveFocus();
		expect(before).not.toHaveFocus();
	});

	it('keeps aria-selected on the stage the user moved to after tabbing away', async () => {
		renderPath();
		const options = getOptions();
		const after = document.querySelectorAll('button')[1];
		const isSelected = () =>
			options.map((option) => option.getAttribute('aria-selected'));

		await run(() => options[2].focus());
		await run(() => userEvent.keyboard('{ArrowRight}{ArrowRight}'));
		await run(() => userEvent.tab());
		expect(after).toHaveFocus();

		// SLDS Path: `aria-selected` follows the stage the user moved to (as in
		// lightning-progress-step), while the current stage stays on the step
		// the app selected.
		expect(isSelected()).toEqual(['false', 'false', 'false', 'false', 'true']);
		expect(options[2].closest('li')).toHaveClass('slds-is-current');
		expect(options[2]).toHaveAccessibleName('Current Stage: Unqualified');
		expect(screen.getByRole('listbox')).toHaveAccessibleName(
			'Stage: Unqualified'
		);

		await run(() => userEvent.tab({ shift: true }));
		expect(options[4]).toHaveFocus();
		expect(isSelected()[4]).toBe('true');
	});

	describe('stage name', () => {
		afterEach(async () => {
			await page.viewport(1280, 720);
		});

		it('shows below the stages, full width, on narrow screens', async () => {
			await page.viewport(400, 600);
			renderPath();
			const nav = document.querySelector('.slds-path__nav');
			const stageName = document.querySelector('.slds-path__stage-name');
			const action = stageName.parentElement;

			expect(action).toHaveClass('slds-path__action');
			expect(stageName).toBeVisible();
			expect(action.getBoundingClientRect().top).toBeGreaterThanOrEqual(
				nav.getBoundingClientRect().bottom
			);
			expect(action.getBoundingClientRect().width).toBe(
				document.querySelector('.slds-path__track').getBoundingClientRect()
					.width
			);
		});

		it('is hidden on wide screens', async () => {
			await page.viewport(1280, 720);
			renderPath();

			expect(
				document.querySelector('.slds-path__stage-name')
			).not.toBeVisible();
		});
	});
});
