import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import Tooltip from '../index';
import Button from '../../button';
import IconSettings from '../../icon-settings';

const defaultProps = {
	content: 'More info',
	hasStaticAlignment: true,
	id: 'trigger-tooltip',
};

const renderTooltip = (props, children) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<Tooltip {...defaultProps} {...props}>
				{children}
			</Tooltip>
		</IconSettings>
	);

const tooltipIsOpen = () =>
	waitFor(() => {
		expect(document.querySelector('.slds-popover_tooltip')).toBeInTheDocument();
	});

describe('Tooltip trigger', () => {
	afterEach(() => {
		vi.restoreAllMocks();
		document
			.querySelectorAll('.slds-popover_tooltip')
			.forEach((el) => el.remove());
	});

	it('opens from an element trigger, keeping its handlers and aria-describedby', async () => {
		const onMouseEnter = vi.fn();
		renderTooltip({
			trigger: (
				<Button
					label="Hover"
					aria-describedby="own-help"
					onMouseEnter={onMouseEnter}
				/>
			),
		});
		const trigger = screen.getByRole('button', { name: 'Hover' });

		fireEvent.mouseEnter(trigger);
		expect(onMouseEnter).toHaveBeenCalledTimes(1);
		await tooltipIsOpen();
		expect(trigger).toHaveAttribute(
			'aria-describedby',
			`${defaultProps.id} own-help`
		);
	});

	it('passes the trigger props to a function trigger', async () => {
		const trigger = vi.fn((props) => (
			<button type="button" {...props}>
				Hover
			</button>
		));
		renderTooltip({ trigger });
		expect(trigger).toHaveBeenCalledWith(
			expect.objectContaining({
				onFocus: expect.any(Function),
				onMouseEnter: expect.any(Function),
			})
		);

		fireEvent.mouseEnter(screen.getByRole('button', { name: 'Hover' }));
		await tooltipIsOpen();
	});

	it('keeps children as a deprecated trigger, with a warning', async () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const onFocus = vi.fn();
		renderTooltip({}, <Button label="Legacy" onFocus={onFocus} />);
		const trigger = screen.getByRole('button', { name: 'Legacy' });

		trigger.focus();
		expect(onFocus).toHaveBeenCalled();
		await tooltipIsOpen();
		expect(
			consoleError.mock.calls.some(([message]) =>
				String(message).includes('Passing the trigger of')
			)
		).toBe(true);
	});
});
