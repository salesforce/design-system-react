import { render, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, it, expect } from 'vitest';
import IconSettings from '../../icon-settings';

import AppLauncherTile from '../tile';

// Browser-mode counterparts of the AppLauncherTile tests jsdom cannot run. The
// description renders through `Truncate`, which measures text with the Canvas
// API + `getBoundingClientRect` (both no-ops in jsdom); the "More" link and its
// tooltip only appear once the text is measured to overflow. These run in real
// Chromium (see vitest.config.ts `browser` project).
describe('SLDS APP LAUNCHER TILE (browser)', () => {
	const longDescription =
		'The key to call center and contact center management is more simple than you think with this amazing application!';

	// Render inside a narrow container so a two-line clamp actually overflows and
	// the Truncate "more" affordance engages.
	const renderTile = (props) =>
		render(
			<IconSettings iconPath="/assets/icons">
				<div style={{ width: '150px' }}>
					<AppLauncherTile title="Call Center" {...props} />
				</div>
			</IconSettings>
		);

	it('renders the app description', () => {
		const { container } = renderTile({ description: 'Fluffy support' });

		const body = container.querySelector('.slds-app-launcher__tile-body');
		expect(body.textContent).toContain('Fluffy support');
	});

	it('highlights the search term within the description', () => {
		const { container } = renderTile({
			search: 'Fluffy',
			description: 'Fluffy support',
		});

		const body = container.querySelector('.slds-app-launcher__tile-body');
		const mark = body.querySelector('mark');
		expect(mark).toBeInTheDocument();
		expect(mark.textContent).toBe('Fluffy');
	});

	it('renders the "more" link when the description overflows', async () => {
		const { container } = renderTile({
			description: longDescription,
			moreLabel: 'MORE!',
		});

		await waitFor(() => {
			const moreButton = container.querySelector(
				'.slds-app-launcher__tile-body button.slds-button_reset'
			);
			expect(moreButton).toBeInTheDocument();
		});
	});

	it('renders a custom "more" label', async () => {
		const { container } = renderTile({
			description: longDescription,
			moreLabel: 'MORE!',
		});

		await waitFor(() => {
			const moreButton = container.querySelector(
				'.slds-app-launcher__tile-body button.slds-button_reset'
			);
			expect(moreButton).toBeInTheDocument();
			expect(moreButton.textContent).toContain('MORE!');
		});
	});

	it('shows a Tooltip on hover of the "more" link', async () => {
		const { container } = renderTile({
			description: longDescription,
			moreLabel: 'MORE!',
		});

		const moreButton = await waitFor(() => {
			const btn = container.querySelector(
				'.slds-app-launcher__tile-body button.slds-button_reset'
			);
			expect(btn).toBeInTheDocument();
			return btn;
		});

		await userEvent.hover(moreButton);

		await waitFor(() => {
			expect(
				document.querySelector('.slds-popover_tooltip')
			).toBeInTheDocument();
		});
	});

	it('highlights the search term inside the tooltip content', async () => {
		const { container } = renderTile({
			search: 'call',
			description: longDescription,
			moreLabel: 'MORE!',
			isOpenTooltip: true,
		});

		// isOpenTooltip forces the tooltip open, but the tooltip only exists once
		// Truncate engages, so wait for the "more" affordance first.
		await waitFor(() => {
			expect(
				container.querySelector(
					'.slds-app-launcher__tile-body button.slds-button_reset'
				)
			).toBeInTheDocument();
		});

		await waitFor(() => {
			const tooltip = document.querySelector('.slds-popover_tooltip');
			expect(tooltip).toBeInTheDocument();
			expect(tooltip.querySelector('mark')).toBeInTheDocument();
		});
	});
});
