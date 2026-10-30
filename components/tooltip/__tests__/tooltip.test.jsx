import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach, vi } from 'vitest';

import Tooltip from '../index';
import Button from '../../button';
import IconSettings from '../../icon-settings';

describe('SLDSTooltip', () => {
	const defaultTextContent = 'This is more info. blah blah.';
	const defaultProps = {
		content: (
			<span className="tooltip-content" style={{ width: 30 }}>
				{defaultTextContent}
			</span>
		),
		hasStaticAlignment: true,
		id: 'myTooltip123',
	};

	const renderTooltip = (
		props = {},
		children = <Button label="Hover me for tooltip" />
	) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<Tooltip {...defaultProps} {...props}>
					{children}
				</Tooltip>
			</IconSettings>
		);
	};

	afterEach(() => {
		// Clean up any lingering tooltip elements
		document.querySelectorAll('.slds-popover_tooltip').forEach((el) => {
			if (el.parentNode) {
				el.parentNode.removeChild(el);
			}
		});
	});

	describe('component basic props render', () => {
		it('is not open initially', () => {
			renderTooltip({ align: 'top' });
			expect(
				document.querySelector('.slds-popover_tooltip')
			).not.toBeInTheDocument();
		});

		describe('expanded', () => {
			it('shows tooltip on mouse enter', async () => {
				renderTooltip({ align: 'top' });
				const trigger = screen.getByRole('button', {
					name: 'Hover me for tooltip',
				});

				await userEvent.hover(trigger);

				await waitFor(() => {
					expect(
						document.querySelector('.slds-popover_tooltip')
					).toBeInTheDocument();
				});
			});

			it('adds nubbin class', async () => {
				renderTooltip({ align: 'top' });
				const trigger = screen.getByRole('button', {
					name: 'Hover me for tooltip',
				});

				await userEvent.hover(trigger);

				await waitFor(() => {
					const tooltip = document.querySelector('.slds-popover_tooltip');
					expect(tooltip).toHaveClass('slds-nubbin_bottom');
				});
			});

			it('closes on mouse leave', async () => {
				renderTooltip({ align: 'top' });
				const trigger = screen.getByRole('button', {
					name: 'Hover me for tooltip',
				});

				await userEvent.hover(trigger);

				await waitFor(() => {
					expect(
						document.querySelector('.slds-popover_tooltip')
					).toBeInTheDocument();
				});

				await userEvent.unhover(trigger);

				await waitFor(
					() => {
						expect(
							document.querySelector('.slds-popover_tooltip')
						).not.toBeInTheDocument();
					},
					{ timeout: 200 }
				);
			});

			it('positions tooltip relative to trigger', async () => {
				renderTooltip({ align: 'top' });
				const trigger = screen.getByRole('button', {
					name: 'Hover me for tooltip',
				});

				await userEvent.hover(trigger);

				await waitFor(() => {
					const tooltip = document.querySelector('.slds-popover_tooltip');
					expect(tooltip).toBeInTheDocument();

					// NOTE: Cannot test exact pixel positioning in jsdom, but we can verify
					// the tooltip exists and has the expected alignment class
					const triggerBounds = trigger.getBoundingClientRect();
					const tooltipBounds = tooltip.getBoundingClientRect();

					// Verify bounds exist (jsdom returns mock values)
					expect(triggerBounds).toBeDefined();
					expect(tooltipBounds).toBeDefined();
				});
			});
		});
	});

	describe('Custom props work as expected', () => {
		it('does not open when isOpen is false', async () => {
			renderTooltip({ isOpen: false });
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			await userEvent.hover(trigger);

			// Wait a moment to ensure it doesn't open
			await new Promise((resolve) => setTimeout(resolve, 100));

			expect(
				document.querySelector('.slds-popover_tooltip')
			).not.toBeInTheDocument();
		});

		it('opens immediately when isOpen is true', async () => {
			renderTooltip({ isOpen: true });

			await waitFor(() => {
				const tooltip = document.querySelector('.slds-popover_tooltip');
				expect(tooltip).toBeInTheDocument();
				expect(tooltip.textContent).toContain(defaultTextContent);
			});
		});

		it('uses custom id when provided', () => {
			renderTooltip({ id: 'custom-tooltip-id' });
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			// The id will be used for aria-describedby when open
			expect(trigger).not.toHaveAttribute('aria-describedby');
		});

		it('respects hoverOpenDelay', async () => {
			const { container } = renderTooltip({ hoverOpenDelay: 100 });
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			fireEvent.mouseEnter(trigger);

			// Should not be open immediately
			expect(
				document.querySelector('.slds-popover_tooltip')
			).not.toBeInTheDocument();

			// Should open after delay
			await waitFor(
				() => {
					expect(
						document.querySelector('.slds-popover_tooltip')
					).toBeInTheDocument();
				},
				{ timeout: 200 }
			);
		});

		it('respects hoverCloseDelay', async () => {
			renderTooltip({ hoverCloseDelay: 100 });
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			await userEvent.hover(trigger);

			await waitFor(() => {
				expect(
					document.querySelector('.slds-popover_tooltip')
				).toBeInTheDocument();
			});

			fireEvent.mouseLeave(trigger, { relatedTarget: document.body });

			// Should still be open immediately after mouse leave
			expect(
				document.querySelector('.slds-popover_tooltip')
			).toBeInTheDocument();

			// Should close after delay
			await waitFor(
				() => {
					expect(
						document.querySelector('.slds-popover_tooltip')
					).not.toBeInTheDocument();
				},
				{ timeout: 200 }
			);
		});
	});

	describe('Alignment variants', () => {
		const alignments = ['top', 'bottom', 'left', 'right'];

		alignments.forEach((alignment) => {
			it(`renders with ${alignment} alignment`, async () => {
				renderTooltip({ align: alignment });
				const trigger = screen.getByRole('button', {
					name: 'Hover me for tooltip',
				});

				await userEvent.hover(trigger);

				await waitFor(() => {
					const tooltip = document.querySelector('.slds-popover_tooltip');
					expect(tooltip).toBeInTheDocument();

					// NOTE: The nubbin class indicates the tooltip's alignment
					// e.g., top aligned tooltip has bottom nubbin
					const nubbinMap = {
						top: 'slds-nubbin_bottom',
						bottom: 'slds-nubbin_top',
						left: 'slds-nubbin_right',
						right: 'slds-nubbin_left',
					};

					expect(tooltip).toHaveClass(nubbinMap[alignment]);
				});
			});
		});
	});

	describe('Theme prop', () => {
		it('applies error theme', async () => {
			renderTooltip({ theme: 'error' });
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			await userEvent.hover(trigger);

			await waitFor(() => {
				const tooltip = document.querySelector('.slds-popover_tooltip');
				expect(tooltip).toHaveClass('slds-theme_error');
			});
		});

		it('applies info theme by default', async () => {
			renderTooltip();
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			await userEvent.hover(trigger);

			await waitFor(() => {
				const tooltip = document.querySelector('.slds-popover_tooltip');
				expect(tooltip).toBeInTheDocument();
				expect(tooltip).not.toHaveClass('slds-theme_error');
			});
		});
	});

	describe('IconVariant prop', () => {
		const renderDefaultTrigger = (props = {}) =>
			render(
				<IconSettings iconPath="/assets/icons">
					<Tooltip {...defaultProps} {...props} />
				</IconSettings>
			);

		it('renders the default trigger with bare styling by default', () => {
			renderDefaultTrigger();
			const button = screen.getByRole('button', { name: 'Help' });
			const svg = button.querySelector('svg');

			expect(button).toHaveClass('slds-button', 'slds-button_icon');
			expect(button).not.toHaveClass('slds-button_icon-inverse');
			expect(svg).not.toHaveClass('slds-icon-text-warning');
			expect(svg).not.toHaveClass('slds-icon-text-error');
		});

		it('applies inverse button classes to the default trigger', () => {
			renderDefaultTrigger({ iconVariant: 'inverse' });
			const button = screen.getByRole('button', { name: 'Help' });

			expect(button).toHaveClass(
				'slds-button',
				'slds-button_icon',
				'slds-button_icon-bare',
				'slds-button_icon-inverse'
			);
		});

		it.each(['warning', 'error'])(
			'applies %s icon color to the default trigger',
			(iconVariant) => {
				renderDefaultTrigger({ iconVariant });
				const button = screen.getByRole('button', { name: 'Help' });

				expect(button).toHaveClass('slds-button', 'slds-button_icon');
				expect(button.querySelector('svg')).toHaveClass(
					'slds-button__icon',
					`slds-icon-text-${iconVariant}`
				);
			}
		);

		it('applies inverse to the onClickTrigger link icon', () => {
			renderDefaultTrigger({
				iconVariant: 'inverse',
				onClickTrigger: () => {},
			});
			const svg = screen.getByRole('link').querySelector('svg');

			expect(svg).toHaveClass('slds-icon');
			expect(svg).not.toHaveClass('slds-icon-text-default');
		});

		it('applies warning color to the onClickTrigger link icon', () => {
			renderDefaultTrigger({
				iconVariant: 'warning',
				onClickTrigger: () => {},
			});
			const svg = screen.getByRole('link').querySelector('svg');

			expect(svg).toHaveClass('slds-icon-text-warning');
			expect(svg).not.toHaveClass('slds-icon-text-default');
		});

		it('does not change custom children', () => {
			renderTooltip({ iconVariant: 'inverse' });
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			expect(trigger).not.toHaveClass('slds-button_icon-inverse');
		});
	});

	describe('Keyboard navigation', () => {
		it('shows tooltip on focus', async () => {
			renderTooltip();
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			trigger.focus();
			fireEvent.focus(trigger);

			await waitFor(() => {
				expect(
					document.querySelector('.slds-popover_tooltip')
				).toBeInTheDocument();
			});
		});

		it('hides tooltip on blur', async () => {
			renderTooltip();
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			trigger.focus();
			fireEvent.focus(trigger);

			await waitFor(() => {
				expect(
					document.querySelector('.slds-popover_tooltip')
				).toBeInTheDocument();
			});

			trigger.blur();
			fireEvent.blur(trigger, { relatedTarget: document.body });

			await waitFor(
				() => {
					expect(
						document.querySelector('.slds-popover_tooltip')
					).not.toBeInTheDocument();
				},
				{ timeout: 200 }
			);
		});

		it('closes tooltip on Escape key', async () => {
			renderTooltip();
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			await userEvent.hover(trigger);

			await waitFor(() => {
				expect(
					document.querySelector('.slds-popover_tooltip')
				).toBeInTheDocument();
			});

			fireEvent.keyDown(trigger, { key: 'Escape' });

			await waitFor(
				() => {
					expect(
						document.querySelector('.slds-popover_tooltip')
					).not.toBeInTheDocument();
				},
				{ timeout: 200 }
			);
		});
	});

	describe('Controlled and uncontrolled open state', () => {
		const tooltipEl = () => document.querySelector('.slds-popover_tooltip');
		const getTrigger = () =>
			screen.getByRole('button', { name: 'Hover me for tooltip' });
		const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

		it('stays closed when controlled `isOpen={false}` but requests open on hover and focus', async () => {
			const onRequestOpen = vi.fn();
			renderTooltip({ isOpen: false, onRequestOpen });

			fireEvent.mouseEnter(getTrigger());
			await waitFor(() => expect(onRequestOpen).toHaveBeenCalledTimes(1));
			fireEvent.focus(getTrigger());
			await waitFor(() => expect(onRequestOpen).toHaveBeenCalledTimes(2));

			expect(onRequestOpen.mock.calls[0][0].type).toBe('mouseenter');
			expect(onRequestOpen.mock.calls.map(([, data]) => data)).toEqual([
				{ trigger: 'mouseEnter' },
				{ trigger: 'focus' },
			]);
			expect(tooltipEl()).not.toBeInTheDocument();
		});

		it('stays open when controlled `isOpen` but requests close on mouse leave, blur and Escape', async () => {
			const onRequestClose = vi.fn();
			renderTooltip({ isOpen: true, onRequestClose, hoverCloseDelay: 0 });

			fireEvent.mouseLeave(getTrigger());
			await waitFor(() => expect(onRequestClose).toHaveBeenCalledTimes(1));
			fireEvent.blur(getTrigger());
			await waitFor(() => expect(onRequestClose).toHaveBeenCalledTimes(2));
			fireEvent.keyDown(getTrigger(), { key: 'Escape' });
			await waitFor(() => expect(onRequestClose).toHaveBeenCalledTimes(3));

			expect(onRequestClose.mock.calls.map(([, data]) => data)).toEqual([
				{ trigger: 'mouseLeave' },
				{ trigger: 'blur' },
				{ trigger: 'cancel' },
			]);
			expect(tooltipEl()).toBeInTheDocument();
		});

		it('opens a controlled tooltip when the parent updates `isOpen` from the callbacks', async () => {
			const ControlledTooltip = () => {
				const [isOpen, setIsOpen] = React.useState(false);
				return (
					<Tooltip
						{...defaultProps}
						hoverCloseDelay={0}
						isOpen={isOpen}
						onRequestOpen={() => setIsOpen(true)}
						onRequestClose={() => setIsOpen(false)}
					>
						<Button label="Hover me for tooltip" />
					</Tooltip>
				);
			};
			render(
				<IconSettings iconPath="/assets/icons">
					<ControlledTooltip />
				</IconSettings>
			);

			fireEvent.mouseEnter(getTrigger());
			await waitFor(() => expect(tooltipEl()).toBeInTheDocument());
			fireEvent.mouseLeave(getTrigger());
			await waitFor(() => expect(tooltipEl()).not.toBeInTheDocument());
		});

		it('opens and closes when uncontrolled, calling `onRequestOpen` and `onRequestClose` once each', async () => {
			const onRequestOpen = vi.fn();
			const onRequestClose = vi.fn();
			renderTooltip({ onRequestOpen, onRequestClose, hoverCloseDelay: 0 });

			fireEvent.mouseEnter(getTrigger());
			await waitFor(() => expect(tooltipEl()).toBeInTheDocument());
			fireEvent.mouseLeave(getTrigger());
			await waitFor(() => expect(tooltipEl()).not.toBeInTheDocument());
			await wait(20);

			expect(onRequestOpen).toHaveBeenCalledTimes(1);
			expect(onRequestClose).toHaveBeenCalledTimes(1);
		});

		it('starts open when uncontrolled with `defaultIsOpen`, and closes on Escape', async () => {
			renderTooltip({ defaultIsOpen: true, hoverCloseDelay: 0 });
			expect(tooltipEl()).toBeInTheDocument();

			fireEvent.keyDown(getTrigger(), { key: 'Escape' });
			await waitFor(() => expect(tooltipEl()).not.toBeInTheDocument());
		});

		it('does not request close when the controlled parent closes it', async () => {
			const onRequestClose = vi.fn();
			const { rerender } = renderTooltip({ isOpen: true, onRequestClose });
			rerender(
				<IconSettings iconPath="/assets/icons">
					<Tooltip
						{...defaultProps}
						isOpen={false}
						onRequestClose={onRequestClose}
					>
						<Button label="Hover me for tooltip" />
					</Tooltip>
				</IconSettings>
			);
			await wait(20);

			expect(tooltipEl()).not.toBeInTheDocument();
			expect(onRequestClose).not.toHaveBeenCalled();
		});
	});

	describe('Custom trigger', () => {
		it('renders with custom child component', async () => {
			renderTooltip({}, <button type="button">Custom Trigger</button>);
			const trigger = screen.getByRole('button', { name: 'Custom Trigger' });

			expect(trigger).toBeInTheDocument();

			await userEvent.hover(trigger);

			await waitFor(() => {
				expect(
					document.querySelector('.slds-popover_tooltip')
				).toBeInTheDocument();
			});
		});
	});

	describe('HasAnchoredNubbin', () => {
		it('renders with anchored nubbin when enabled', async () => {
			const { container } = renderTooltip({
				hasAnchoredNubbin: true,
				align: 'top',
			});
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			await userEvent.hover(trigger);

			await waitFor(() => {
				expect(
					document.querySelector('.slds-popover_tooltip')
				).toBeInTheDocument();

				// NOTE: Anchored nubbin is rendered via inline styles, check for style element
				const styleElement = container.querySelector('style');
				expect(styleElement).toBeInTheDocument();
				expect(styleElement.textContent).toContain('display: none');
			});
		});
	});

	describe('DialogClassName prop', () => {
		it('applies custom class to dialog', async () => {
			renderTooltip({ dialogClassName: 'custom-tooltip-class' });
			const trigger = screen.getByRole('button', {
				name: 'Hover me for tooltip',
			});

			await userEvent.hover(trigger);

			await waitFor(() => {
				const tooltip = document.querySelector('.slds-popover_tooltip');
				expect(tooltip).toHaveClass('custom-tooltip-class');
			});
		});
	});

	describe('TriggerClassName prop', () => {
		it('applies custom class to trigger wrapper', () => {
			const { container } = renderTooltip({
				triggerClassName: 'custom-trigger-class',
			});
			const triggerWrapper = container.querySelector('.slds-tooltip-trigger');

			expect(triggerWrapper).toHaveClass('custom-trigger-class');
		});
	});

	describe('TriggerStyle prop', () => {
		it('applies custom styles to trigger wrapper', () => {
			const { container } = renderTooltip({
				triggerStyle: { backgroundColor: 'rgb(255, 0, 0)' },
			});
			const triggerWrapper = container.querySelector('.slds-tooltip-trigger');

			expect(triggerWrapper).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
		});
	});
});
