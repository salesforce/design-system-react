import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import ProgressIndicator from '../';
import IconSettings from '../../icon-settings';

const steps = [
	{ id: 0, label: 'tooltip label #1' },
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: 'tooltip label #3' },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
];

const sixSteps = [
	{ id: 0, label: 'custom tooltip #1' },
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: 'tooltip label #3' },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
	{ id: 5, label: 'tooltip label #6' },
];

describe('SLDSProgressIndicator', () => {
	const defaultProps = {
		id: 'sample-progress-indicator',
	};

	const renderProgressIndicator = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<ProgressIndicator {...defaultProps} {...props} />
			</IconSettings>
		);
	};

	describe('Basic Props Render', () => {
		it('has five steps by default', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
			});
			const stepItems = container.querySelectorAll('.slds-progress li');
			expect(stepItems).toHaveLength(5);
		});

		it('has only one active step', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
			});
			const activeItems = container.querySelectorAll(
				'.slds-progress li.slds-is-active'
			);
			expect(activeItems).toHaveLength(1);
		});

		it('does not have an error step', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
			});
			const errorItems = container.querySelectorAll(
				'.slds-progress li.slds-has-error'
			);
			expect(errorItems).toHaveLength(0);
		});

		it('has correct number of completed steps', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
			});
			const completedItems = container.querySelectorAll(
				'.slds-progress li.slds-is-completed'
			);
			expect(completedItems).toHaveLength(2);
		});

		it('has a white background', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
			});
			const shadeProgress = container.querySelector('.slds-progress_shade');
			expect(shadeProgress).not.toBeInTheDocument();
		});
	});

	describe('Within-Modal Props Render (Without Error)', () => {
		it('has 5 steps by default', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
				variant: 'modal',
			});
			const stepItems = container.querySelectorAll('.slds-progress li');
			expect(stepItems).toHaveLength(5);
		});

		it('has no error step', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
				variant: 'modal',
			});
			const errorItems = container.querySelectorAll(
				'.slds-progress li.slds-has-error'
			);
			expect(errorItems).toHaveLength(0);
		});

		it('has 1 active step', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
				variant: 'modal',
			});
			const activeItems = container.querySelectorAll(
				'.slds-progress li.slds-is-active'
			);
			expect(activeItems).toHaveLength(1);
		});

		it('has correct number of completed steps', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
				variant: 'modal',
			});
			const completedItems = container.querySelectorAll(
				'.slds-progress li.slds-is-completed'
			);
			expect(completedItems).toHaveLength(2);
		});

		it('has a gray background', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
				variant: 'modal',
			});
			const shadeProgress = container.querySelector('.slds-progress_shade');
			expect(shadeProgress).toBeInTheDocument();
		});
	});

	describe('Within-Modal Props Render (With Error)', () => {
		it('has 1 error step', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				errorSteps: steps.slice(2, 3),
				completedSteps: steps.slice(0, 2),
				variant: 'modal',
			});
			const errorItems = container.querySelectorAll(
				'.slds-progress li.slds-has-error'
			);
			expect(errorItems).toHaveLength(1);
		});

		it('has no active step', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				errorSteps: steps.slice(2, 3),
				completedSteps: steps.slice(0, 2),
				variant: 'modal',
			});
			const activeItems = container.querySelectorAll(
				'.slds-progress li.slds-is-active'
			);
			expect(activeItems).toHaveLength(0);
		});

		it('has correct number of completed steps', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				errorSteps: steps.slice(2, 3),
				completedSteps: steps.slice(0, 2),
				variant: 'modal',
			});
			const completedItems = container.querySelectorAll(
				'.slds-progress li.slds-is-completed'
			);
			expect(completedItems).toHaveLength(2);
		});
	});

	describe('Tooltip Props Render', () => {
		it('has an error step', () => {
			const { container } = renderProgressIndicator({
				steps: sixSteps,
				selectedStep: sixSteps[2],
				errorSteps: sixSteps.slice(2, 3),
				completedSteps: sixSteps.slice(0, 2),
			});
			const errorItems = container.querySelectorAll(
				'.slds-progress li.slds-has-error'
			);
			expect(errorItems).toHaveLength(1);
		});

		it('has a tooltip attached to every step', () => {
			const { container } = renderProgressIndicator({
				steps: sixSteps,
				selectedStep: sixSteps[2],
				errorSteps: sixSteps.slice(2, 3),
				completedSteps: sixSteps.slice(0, 2),
			});
			const tooltipTriggers = container.querySelectorAll(
				'.slds-progress .slds-tooltip-trigger'
			);
			expect(tooltipTriggers).toHaveLength(6);
		});
	});

	describe('Click Event', () => {
		it('calls onStepClick()', () => {
			const clickHandler = vi.fn();
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
				onStepClick: clickHandler,
			});
			const firstStepButton = container.querySelector(
				'.slds-progress li button'
			);
			fireEvent.click(firstStepButton);
			expect(clickHandler).toHaveBeenCalledTimes(1);
		});
	});

	describe('Click Event for Vertical Orientation', () => {
		it('calls onStepClick()', () => {
			const clickHandler = vi.fn();
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
				onStepClick: clickHandler,
				orientation: 'vertical',
			});
			// In vertical orientation, when onClick is provided, steps render as buttons
			const firstStepButton = container.querySelector(
				'.slds-progress li button'
			);
			fireEvent.click(firstStepButton);
			expect(clickHandler).toHaveBeenCalledTimes(1);
		});
	});

	describe('Assistive Technology', () => {
		it('specifies the role for progress bar', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
			});
			const progressBar = container.querySelector('div[role="progressbar"]');
			expect(progressBar).toBeInTheDocument();
		});

		it('renders assistive text for progress bar', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				completedSteps: steps.slice(0, 2),
			});
			const assistiveText = container.querySelector(
				'.slds-progress-bar .slds-assistive-text'
			);
			expect(assistiveText).toBeInTheDocument();
			expect(assistiveText.textContent).toMatch(/Progress:/);
			expect(assistiveText.textContent).toMatch(/%/);
		});
	});

	describe('Shade variant', () => {
		it('adds slds-progress_shade', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
				variant: 'shade',
			});
			expect(container.querySelector('.slds-progress')).toHaveClass(
				'slds-progress_shade'
			);
		});

		it('does not add slds-progress_shade for the base variant', () => {
			const { container } = renderProgressIndicator({
				steps,
				selectedStep: steps[2],
			});
			expect(container.querySelector('.slds-progress')).not.toHaveClass(
				'slds-progress_shade'
			);
		});
	});

	describe('Path type', () => {
		const pathProps = {
			type: 'path',
			steps,
			selectedStep: steps[2],
			completedSteps: steps.slice(0, 2),
		};

		const getOptions = () => screen.getAllByRole('option');
		// Accessible names are checked in the browser test: jsdom has no CSS, so it
		// joins the inline stage and title spans without a space.
		const getStageAssistiveText = () =>
			getOptions().map(
				(option) =>
					option.querySelector('.slds-path__stage .slds-assistive-text')
						?.textContent
			);

		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('renders SLDS path markup instead of the progress bar', () => {
			const { container } = renderProgressIndicator({
				...pathProps,
				className: 'custom-class',
			});
			const path = container.querySelector('.slds-path');

			expect(path).toHaveAttribute('id', 'sample-progress-indicator');
			expect(path).toHaveClass('custom-class');
			expect(container.querySelector('.slds-progress')).not.toBeInTheDocument();
			expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
			expect(container.querySelectorAll('.slds-tooltip-trigger')).toHaveLength(
				0
			);
			expect(screen.getByRole('listbox')).toHaveAttribute(
				'aria-orientation',
				'horizontal'
			);
			expect(getOptions()).toHaveLength(5);
		});

		it('marks completed, current, and incomplete stages', () => {
			const { container } = renderProgressIndicator(pathProps);
			const items = container.querySelectorAll('.slds-path__item');

			expect(items[0]).toHaveClass('slds-is-complete');
			expect(items[1]).toHaveClass('slds-is-complete');
			expect(items[2]).toHaveClass('slds-is-current', 'slds-is-active');
			expect(items[3]).toHaveClass('slds-is-incomplete');
			expect(items[4]).toHaveClass('slds-is-incomplete');
			expect(container.querySelectorAll('.slds-is-active')).toHaveLength(1);
		});

		it('shows each step label as the stage title', () => {
			const { container } = renderProgressIndicator(pathProps);
			const titles = [...container.querySelectorAll('.slds-path__title')].map(
				(title) => title.textContent
			);

			expect(titles).toEqual(steps.map((step) => step.label));
		});

		it('gives only the current stage the tab stop', () => {
			renderProgressIndicator(pathProps);
			const options = getOptions();

			expect(options.map((option) => option.tabIndex)).toEqual([
				-1, -1, 0, -1, -1,
			]);
			expect(options[2]).toHaveAttribute('aria-selected', 'true');
			expect(options[0]).toHaveAttribute('aria-selected', 'false');
		});

		it('renders assistive text for complete and current stages', () => {
			renderProgressIndicator(pathProps);

			expect(getStageAssistiveText()).toEqual([
				'Stage Complete',
				'Stage Complete',
				'Current Stage:',
				undefined,
				undefined,
			]);
		});

		it('uses step.assistiveText in place of the stage status', () => {
			renderProgressIndicator({
				...pathProps,
				steps: [{ ...steps[0], assistiveText: 'Custom:' }, ...steps.slice(1)],
				completedSteps: [],
			});

			expect(getStageAssistiveText()[0]).toBe('Custom:');
		});

		it('labels the listbox with the current stage name', () => {
			renderProgressIndicator(pathProps);

			expect(screen.getByRole('listbox')).toHaveAccessibleName(
				'Stage: tooltip label #3'
			);
		});

		it('accepts custom labels and assistive text', () => {
			renderProgressIndicator({
				...pathProps,
				assistiveText: { completedStage: 'Done:', currentStage: 'Now:' },
				labels: { stageNameBefore: 'Status:' },
			});

			expect(getStageAssistiveText().slice(0, 3)).toEqual([
				'Done:',
				'Done:',
				'Now:',
			]);
			expect(screen.getByRole('listbox')).toHaveAccessibleName(
				'Status: tooltip label #3'
			);
		});

		it('moves focus and the active stage with the arrow keys', () => {
			const { container } = renderProgressIndicator(pathProps);
			const options = getOptions();
			const items = container.querySelectorAll('.slds-path__item');

			options[2].focus();
			fireEvent.keyDown(options[2], { key: 'ArrowRight' });
			expect(options[3]).toHaveFocus();
			expect(options[3]).toHaveAttribute('tabindex', '0');
			expect(options[3]).toHaveAttribute('aria-selected', 'true');
			expect(options[2]).toHaveAttribute('tabindex', '-1');
			expect(items[3]).toHaveClass('slds-is-active');
			expect(items[2]).toHaveClass('slds-is-current');
			expect(items[2]).not.toHaveClass('slds-is-active');

			fireEvent.keyDown(options[3], { key: 'ArrowUp' });
			fireEvent.keyDown(options[2], { key: 'ArrowLeft' });
			expect(options[1]).toHaveFocus();

			fireEvent.keyDown(options[1], { key: 'ArrowDown' });
			expect(options[2]).toHaveFocus();
		});

		it('stops at the first and last stages', () => {
			renderProgressIndicator({ ...pathProps, selectedStep: steps[0] });
			const options = getOptions();

			options[0].focus();
			fireEvent.keyDown(options[0], { key: 'ArrowLeft' });
			expect(options[0]).toHaveFocus();

			options[4].focus();
			fireEvent.keyDown(options[4], { key: 'ArrowRight' });
			expect(options[4]).toHaveFocus();
		});

		it('moves the tab stop to the new current stage when selectedStep changes', () => {
			const { rerender } = renderProgressIndicator(pathProps);
			const options = getOptions();

			options[2].focus();
			fireEvent.keyDown(options[2], { key: 'ArrowRight' });
			expect(options[3]).toHaveAttribute('tabindex', '0');

			rerender(
				<IconSettings iconPath="/assets/icons">
					<ProgressIndicator
						{...defaultProps}
						{...pathProps}
						selectedStep={steps[1]}
						completedSteps={steps.slice(0, 1)}
					/>
				</IconSettings>
			);
			expect(getOptions().map((option) => option.tabIndex)).toEqual([
				-1, 0, -1, -1, -1,
			]);
		});

		it('calls onStepClick with the step data and prevents navigation', () => {
			const clickHandler = vi.fn();
			renderProgressIndicator({ ...pathProps, onStepClick: clickHandler });

			const event = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			});
			getOptions()[0].dispatchEvent(event);

			expect(event.defaultPrevented).toBe(true);
			expect(clickHandler).toHaveBeenCalledTimes(1);
			expect(clickHandler.mock.calls[0][1]).toEqual({
				isCompleted: true,
				isDisabled: false,
				isError: false,
				isSelected: false,
				step: steps[0],
			});
		});

		it('calls onStepFocus with the step data', () => {
			const focusHandler = vi.fn();
			renderProgressIndicator({ ...pathProps, onStepFocus: focusHandler });

			getOptions()[2].focus();

			expect(focusHandler).toHaveBeenCalledTimes(1);
			expect(focusHandler.mock.calls[0][1]).toMatchObject({
				isSelected: true,
				step: steps[2],
			});
		});

		it('warns in development when given base-only props', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			renderProgressIndicator({
				...pathProps,
				errorSteps: [steps[2]],
				variant: 'shade',
			});

			const messages = consoleError.mock.calls.map(([message]) => message);
			expect(messages).toEqual(
				expect.arrayContaining([
					expect.stringContaining('`errorSteps`'),
					expect.stringContaining('`variant` of value `shade`'),
				])
			);
		});

		it('does not warn for base values of variant and orientation', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			renderProgressIndicator({
				...pathProps,
				orientation: 'horizontal',
				variant: 'base',
			});

			expect(consoleError).not.toHaveBeenCalled();
		});
	});
});
