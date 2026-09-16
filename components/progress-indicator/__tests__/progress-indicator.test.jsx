import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

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
});
