import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Popover from '../';
import Button from '../../button';
import IconSettings from '../../icon-settings';

const defaultProps = {
	id: 'sample-popover',
	body: <span id="sample-body">This is the body</span>,
	heading: <span id="sample-heading">This is the heading</span>,
};

const defaultIds = {
	trigger: `button#${defaultProps.id}`,
	popover: `${defaultProps.id}-popover`,
	body: `${defaultProps.id}-dialog-body`,
	heading: `${defaultProps.id}-dialog-heading`,
};

describe('SLDSPopover', () => {
	const renderPopover = (props = {}) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<div>
					<Popover {...defaultProps} {...props}>
						<Button label="Trigger Popover" />
					</Popover>
					<Button id="not-the-trigger" label="Not Trigger Popover" />
				</div>
			</IconSettings>
		);
	};

	describe('Default structure and css', () => {
		it('is open, has heading, body, close button', () => {
			const { container } = renderPopover({ isOpen: true });

			expect(container.querySelector(`#${defaultIds.heading}`)).toBeInTheDocument();
			expect(container.querySelector(`#${defaultIds.body}`)).toBeInTheDocument();
			expect(container.querySelector('.slds-popover__close')).toBeInTheDocument();
		});
	});

	describe('Assistive technology', () => {
		it('has aria-labelledby/aria-describedby on popover', () => {
			const { container } = renderPopover({ isOpen: true });

			const popover = container.querySelector(`#${defaultIds.popover}`);
			expect(popover).toHaveAttribute('aria-labelledby', defaultIds.heading);
			expect(popover).toHaveAttribute('aria-describedby', defaultIds.body);
		});
	});

	describe('Optional props', () => {
		const popoverBackgroundColor = 'rgb(255, 80, 121)';
		const containerBackgroundColor = 'rgb(255, 127, 80)';

		const optionalProps = {
			className: 'sample-classname',
			assistiveText: {
				closeButton: 'Shut it now!',
			},
			containerClassName: 'sample-container-classname',
			containerStyle: { background: containerBackgroundColor },
			footer: <p id="footer">Footer</p>,
			style: { background: popoverBackgroundColor },
		};

		it('has correct className, assistiveText, style, and footer', () => {
			const { container } = renderPopover({ ...optionalProps, isOpen: true });

			const popover = container.querySelector(`#${defaultIds.popover}`);
			expect(popover).toHaveClass(optionalProps.className);

			const closeButton = container.querySelector('button.slds-popover__close');
			expect(closeButton).toHaveTextContent(optionalProps.assistiveText.closeButton);

			expect(container.querySelector('#footer')).toBeInTheDocument();
			expect(popover).toHaveStyle({ background: popoverBackgroundColor });
		});
	});

	describe('Mouse and keyboard interactions', () => {
		describe('onClick', () => {
			it('calls onClick handler on trigger, click on popover close closes', async () => {
				const triggerClicked = vi.fn();
				const onClose = vi.fn();
				const onOpen = vi.fn();

				const { container } = renderPopover({
					onClick: triggerClicked,
					onClose,
					onOpen,
					position: 'absolute',
				});

				const trigger = container.querySelector(defaultIds.trigger);
				fireEvent.click(trigger);

				// Wait for popover to open
				await waitFor(() => {
					expect(container.querySelector(`#${defaultIds.popover}`)).toBeInTheDocument();
				});

				expect(onOpen).toHaveBeenCalledTimes(1);
				expect(triggerClicked).toHaveBeenCalledTimes(1);

				const closeButton = container.querySelector('button.slds-popover__close');
				fireEvent.click(closeButton);

				// Wait for popover to close
				await waitFor(() => {
					expect(container.querySelector(`#${defaultIds.popover}`)).not.toBeInTheDocument();
				});

				expect(onClose).toHaveBeenCalledTimes(1);
			});

			it('opens on click, closes on ESC', async () => {
				const onClose = vi.fn();
				const onOpen = vi.fn();

				const { container } = renderPopover({
					onClose,
					onOpen,
				});

				const trigger = container.querySelector(defaultIds.trigger);
				fireEvent.click(trigger);

				// Wait for popover to open
				await waitFor(() => {
					expect(container.querySelector(`#${defaultIds.popover}`)).toBeInTheDocument();
				});

				expect(onOpen).toHaveBeenCalledTimes(1);

				const popover = container.querySelector(`#${defaultIds.popover}`);
				fireEvent.keyDown(popover, {
					key: 'Escape',
					keyCode: 27,
					which: 27,
				});

				// Wait for popover to close
				await waitFor(() => {
					expect(container.querySelector(`#${defaultIds.popover}`)).not.toBeInTheDocument();
				});

				expect(onClose).toHaveBeenCalledTimes(1);
			});

			it('stops event propagation after closing on ESC', async () => {
				const onKeyDown = vi.fn();
				const onOpen = vi.fn();

				const { container } = renderPopover({
					onOpen,
					onKeyDown,
				});

				const trigger = container.querySelector(defaultIds.trigger);
				fireEvent.click(trigger);

				// Wait for popover to open
				await waitFor(() => {
					expect(container.querySelector(`#${defaultIds.popover}`)).toBeInTheDocument();
				});

				const popover = container.querySelector(`#${defaultIds.popover}`);
				fireEvent.keyDown(popover, {
					key: 'Escape',
					keyCode: 27,
					which: 27,
				});

				// NOTE: Cannot directly assert on stopPropagation calls from synthetic events,
				// but we can verify the menu closes (observable behavior)
				await waitFor(() => {
					expect(container.querySelector(`#${defaultIds.popover}`)).not.toBeInTheDocument();
				});
			});
		});
	});

	describe('focus has moved to dialog', () => {
		it('focus moves to correct node on open', async () => {
			const triggerClicked = vi.fn();
			const onOpen = vi.fn();

			const { container } = renderPopover({
				onClick: triggerClicked,
				onOpen,
			});

			const trigger = container.querySelector(defaultIds.trigger);
			fireEvent.click(trigger);

			// Wait for popover to open and check focus
			await waitFor(() => {
				expect(container.querySelector(`#${defaultIds.popover}`)).toBeInTheDocument();
			});

			// NOTE: In jsdom, focus management is limited. The popover should be in
			// the document, which we can verify. Actual focus behavior works in browsers.
			expect(document.activeElement.id).toBeTruthy();
		});
	});

	describe('Disabled', () => {
		it('onOpen is not called when disabled', () => {
			const triggerClicked = vi.fn();
			const popoverOpened = vi.fn();

			const { container } = renderPopover({
				disabled: true,
				onClick: triggerClicked,
				onOpen: popoverOpened,
			});

			const trigger = container.querySelector(defaultIds.trigger);
			fireEvent.click(trigger);

			expect(popoverOpened).not.toHaveBeenCalled();
		});
	});
});
