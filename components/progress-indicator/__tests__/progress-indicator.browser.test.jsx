import { render, act } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, it, expect } from 'vitest';

import '@salesforce-ux/design-system-2/dist/css/bundled/slds2.lightning-blue.css';

import ProgressIndicator from '../';
import IconSettings from '../../icon-settings';

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
			<IconSettings iconPath="/assets/icons">
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
});
