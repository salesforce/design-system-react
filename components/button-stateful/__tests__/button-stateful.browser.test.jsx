import { render, act } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, it, expect } from 'vitest';

import ButtonStateful from '../';
import IconSettings from '../../icon-settings';

// Browser-mode tests for the mouseleave blur. They need real `:focus-visible`
// (mouse vs. keyboard focus) and the SLDS stylesheet that shows
// `slds-text-selected-focus` on `.slds-is-selected:focus`, neither of which
// jsdom provides.
describe('ButtonStateful mouseleave (browser)', () => {
	const renderButton = () => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<ButtonStateful />
			</IconSettings>
		);
		return container.querySelector('.slds-button');
	};

	it('blurs after a mouse click so "Unfollow" does not stay shown', async () => {
		const button = renderButton();

		// Toggling `active` is a React state update; wrap it so it flushes inside act().
		await act(async () => {
			await userEvent.click(button);
		});
		expect(button).toHaveClass('slds-is-selected');
		expect(document.activeElement).toBe(button);

		await userEvent.unhover(button);

		expect(document.activeElement).not.toBe(button);
		expect(button.querySelector('.slds-text-selected')).toBeVisible();
		expect(button.querySelector('.slds-text-selected-focus')).not.toBeVisible();
	});

	it('keeps keyboard focus when the mouse leaves', async () => {
		const button = renderButton();

		await userEvent.tab();
		expect(document.activeElement).toBe(button);
		await act(async () => {
			await userEvent.keyboard('{Enter}');
		});
		expect(button).toHaveClass('slds-is-selected');

		await userEvent.hover(button);
		await userEvent.unhover(button);

		expect(document.activeElement).toBe(button);
		expect(button.querySelector('.slds-text-selected-focus')).toBeVisible();
	});
});
