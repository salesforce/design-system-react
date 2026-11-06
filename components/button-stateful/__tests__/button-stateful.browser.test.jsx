import { useState } from 'react';
import { render, act } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, it, expect } from 'vitest';

import ButtonStateful from '../';
import IconSettings from '../../icon-settings';

// Browser-mode tests for focus on mouse leave. They need real mouse and
// keyboard focus, which jsdom does not provide. The button must never drop
// focus on its own: blurring sends focus to <body>, so the next Tab starts
// over from the top of the page.
const StatefulButton = () => {
	const [isActive, setIsActive] = useState(false);
	return (
		<ButtonStateful
			isActive={isActive}
			onClick={(event, data) => setIsActive(data.isActive)}
		/>
	);
};

describe('ButtonStateful focus (browser)', () => {
	const renderButton = () => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<StatefulButton />
			</IconSettings>
		);
		return container.querySelector('.slds-button');
	};

	it('keeps focus after a mouse click when the mouse leaves', async () => {
		const button = renderButton();

		// Toggling `isActive` is a React state update; wrap it so it flushes inside act().
		await act(async () => {
			await userEvent.click(button);
		});
		expect(button).toHaveClass('slds-is-selected');
		expect(document.activeElement).toBe(button);

		await userEvent.unhover(button);

		expect(document.activeElement).toBe(button);
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
