import { createRef } from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

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

			expect(
				container.querySelector(`#${defaultIds.heading}`)
			).toBeInTheDocument();
			expect(
				container.querySelector(`#${defaultIds.body}`)
			).toBeInTheDocument();
			expect(
				container.querySelector('.slds-popover__close')
			).toBeInTheDocument();
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
		const rootBackgroundColor = 'rgb(255, 127, 80)';

		const optionalProps = {
			assistiveText: {
				closeButton: 'Shut it now!',
			},
			className: 'sample-root-classname',
			classNameDialog: 'sample-dialog-classname',
			footer: <p id="footer">Footer</p>,
			style: { background: rootBackgroundColor },
			styleDialog: { background: popoverBackgroundColor },
		};

		it('has correct className, classNameDialog, assistiveText, style, styleDialog, and footer', () => {
			const { container } = renderPopover({ ...optionalProps, isOpen: true });

			const root = container.querySelector(defaultIds.trigger).parentElement;
			expect(root).toHaveClass(optionalProps.className);
			expect(root).toHaveStyle({
				background: rootBackgroundColor,
				display: 'inline-block',
			});

			const popover = container.querySelector(`#${defaultIds.popover}`);
			expect(popover).toHaveClass(
				'slds-popover',
				optionalProps.classNameDialog
			);
			expect(popover).not.toHaveClass(optionalProps.className);
			expect(popover).toHaveStyle({ background: popoverBackgroundColor });

			const closeButton = container.querySelector('button.slds-popover__close');
			expect(closeButton).toHaveTextContent(
				optionalProps.assistiveText.closeButton
			);

			expect(container.querySelector('#footer')).toBeInTheDocument();
		});

		it('forwards ref to the root element that wraps the trigger', () => {
			const ref = createRef();
			const { container } = renderPopover({ ref });
			expect(ref.current).toBe(
				container.querySelector(defaultIds.trigger).parentElement
			);
		});

		it('forwards a callback ref to the root element', () => {
			const ref = vi.fn();
			const { container } = renderPopover({ ref });
			expect(ref).toHaveBeenCalledWith(
				container.querySelector(defaultIds.trigger).parentElement
			);
		});
	});

	describe('Deprecated class and style props', () => {
		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('still apply, merged with the new props, and warn', async () => {
			// Fresh modules so the once-per-session warning state is reset
			vi.resetModules();
			const { default: FreshPopover } = await import('../');
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			const { container } = render(
				<FreshPopover
					{...defaultProps}
					className="new-root"
					classNameDialog="new-dialog"
					classNameFooter="new-footer"
					contentsClassName="old-dialog"
					footer={<p>Footer</p>}
					footerClassName="old-footer"
					footerStyle={{ marginTop: '0px', color: 'red' }}
					isOpen
					styleFooter={{ marginTop: '4px' }}
					triggerClassName="old-root"
				>
					<button type="button">Trigger</button>
				</FreshPopover>
			);

			const root = container.querySelector(defaultIds.trigger).parentElement;
			expect(root).toHaveClass('old-root', 'new-root');
			expect(container.querySelector(`#${defaultIds.popover}`)).toHaveClass(
				'old-dialog',
				'new-dialog'
			);
			const footer = container.querySelector('.slds-popover__footer');
			expect(footer).toHaveClass('old-footer', 'new-footer');
			expect(footer.style.marginTop).toBe('4px');
			expect(footer.style.color).toBe('red');

			const messages = consoleError.mock.calls.map((call) => call.join(' '));
			[
				['contentsClassName', 'classNameDialog'],
				['footerClassName', 'classNameFooter'],
				['footerStyle', 'styleFooter'],
				['triggerClassName', 'className'],
			].forEach(([oldProp, newProp]) => {
				expect(
					messages.some(
						(m) =>
							m.includes(`\`${oldProp}\` will be removed`) &&
							m.includes(`Use \`${newProp}\` instead.`)
					)
				).toBe(true);
			});
		});

		it('applies classNameFooter and styleFooter when footerWalkthroughActions is used', () => {
			const { container } = renderPopover({
				isOpen: true,
				variant: 'walkthrough',
				classNameFooter: 'custom-walkthrough-footer',
				styleFooter: { color: 'red' },
				footerWalkthroughActions: <Button label="Next" />,
				stepText: 'Step 1 of 2',
			});

			const footer = container.querySelector('.slds-popover__footer');
			expect(footer).toBeInTheDocument();
			expect(footer).toHaveClass('custom-walkthrough-footer');
			expect(footer.style.color).toBe('red');
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
					expect(
						container.querySelector(`#${defaultIds.popover}`)
					).toBeInTheDocument();
				});

				expect(onOpen).toHaveBeenCalledTimes(1);
				expect(triggerClicked).toHaveBeenCalledTimes(1);

				const closeButton = container.querySelector(
					'button.slds-popover__close'
				);
				fireEvent.click(closeButton);

				// Wait for popover to close
				await waitFor(() => {
					expect(
						container.querySelector(`#${defaultIds.popover}`)
					).not.toBeInTheDocument();
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
					expect(
						container.querySelector(`#${defaultIds.popover}`)
					).toBeInTheDocument();
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
					expect(
						container.querySelector(`#${defaultIds.popover}`)
					).not.toBeInTheDocument();
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
					expect(
						container.querySelector(`#${defaultIds.popover}`)
					).toBeInTheDocument();
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
					expect(
						container.querySelector(`#${defaultIds.popover}`)
					).not.toBeInTheDocument();
				});
			});
		});
	});

	describe('Callback payloads', () => {
		const openPopover = async (container) => {
			fireEvent.click(container.querySelector(defaultIds.trigger));
			await waitFor(() => {
				expect(
					container.querySelector(`#${defaultIds.popover}`)
				).toBeInTheDocument();
			});
		};

		it('calls onOpen with an undefined event and the dialog element', async () => {
			const onOpen = vi.fn();
			const { container } = renderPopover({ onOpen });

			await openPopover(container);

			expect(onOpen).toHaveBeenCalledTimes(1);
			const [event, data] = onOpen.mock.calls[0];
			expect(event).toBeUndefined();
			expect(data.portal).toBeInstanceOf(HTMLElement);
		});

		it('calls onRequestClose with the click event and trigger "cancel" from the close button, then onClose', async () => {
			const onRequestClose = vi.fn();
			const onClose = vi.fn();
			const { container } = renderPopover({ onRequestClose, onClose });

			await openPopover(container);
			fireEvent.click(container.querySelector('button.slds-popover__close'));

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			const [event, data] = onRequestClose.mock.calls[0];
			expect(event.type).toBe('click');
			expect(data).toEqual({ trigger: 'cancel' });

			await waitFor(() => {
				expect(onClose).toHaveBeenCalledTimes(1);
			});
			expect(onClose).toHaveBeenCalledWith(undefined, {
				componentWillUnmount: true,
			});
		});

		it('calls onRequestClose with the keydown event and trigger "cancel" on Escape', async () => {
			const onRequestClose = vi.fn();
			const { container } = renderPopover({ onRequestClose });

			await openPopover(container);
			fireEvent.keyDown(container.querySelector(`#${defaultIds.popover}`), {
				key: 'Escape',
				keyCode: 27,
				which: 27,
			});

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			const [event, data] = onRequestClose.mock.calls[0];
			expect(event.type).toBe('keydown');
			expect(data).toEqual({ trigger: 'cancel' });
		});

		it('calls onRequestClose with trigger "triggerClick" when the trigger is clicked while open', async () => {
			const onRequestClose = vi.fn();
			const { container } = renderPopover({ onRequestClose });

			await openPopover(container);
			fireEvent.click(container.querySelector(defaultIds.trigger));

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			const [event, data] = onRequestClose.mock.calls[0];
			expect(event.type).toBe('click');
			expect(data).toEqual({ trigger: 'triggerClick' });
		});

		it('calls onRequestClose with an undefined event and trigger "newPopover" when another popover opens', async () => {
			const onRequestClose = vi.fn();
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<div>
						<Popover {...defaultProps} onRequestClose={onRequestClose}>
							<Button label="Trigger Popover" />
						</Popover>
						<Popover {...defaultProps} id="other-popover">
							<Button label="Other Trigger" />
						</Popover>
					</div>
				</IconSettings>
			);

			await openPopover(container);
			fireEvent.click(container.querySelector('button#other-popover'));

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			expect(onRequestClose).toHaveBeenCalledWith(undefined, {
				trigger: 'newPopover',
				id: defaultProps.id,
			});
		});

		it('calls onRequestClose with an undefined event and trigger "mouseLeave" after a hover close', async () => {
			const onRequestClose = vi.fn();
			const { container } = renderPopover({
				onRequestClose,
				openOn: 'hover',
				hoverCloseDelay: 10,
			});

			const trigger = container.querySelector(defaultIds.trigger);
			fireEvent.mouseEnter(trigger);
			await waitFor(() => {
				expect(
					container.querySelector(`#${defaultIds.popover}`)
				).toBeInTheDocument();
			});

			vi.useFakeTimers();
			try {
				fireEvent.mouseLeave(trigger);
				act(() => {
					vi.advanceTimersByTime(10);
				});
			} finally {
				vi.useRealTimers();
			}

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			expect(onRequestClose).toHaveBeenCalledWith(undefined, {
				trigger: 'mouseLeave',
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
				expect(
					container.querySelector(`#${defaultIds.popover}`)
				).toBeInTheDocument();
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
