import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import IconSettings from '../../icon-settings';
import SetupAssistant from '../';
import SetupAssistantStep from '../step';

describe('SLDS Setup Assistant', () => {
	describe('Setup Assistant & Setup Assistant Step events', () => {
		it('renders setup assistant', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<SetupAssistant id="setup-assistant-event-test-1">
						<SetupAssistantStep
							heading="Setup Assistant Step Heading"
							id="setup-assistant-event-test-1-step-1"
							isExpandable
							isOpen
						/>
					</SetupAssistant>
				</IconSettings>
			);

			expect(container.querySelector('#setup-assistant-event-test-1')).toBeInTheDocument();
			expect(container.querySelector('.slds-setup-assistant')).toBeInTheDocument();
		});

		it('handles onStepToggleIsOpen correctly', () => {
			const onStepToggleIsOpen = vi.fn();

			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<SetupAssistant
						id="setup-assistant-event-test-1"
						onStepToggleIsOpen={onStepToggleIsOpen}
					>
						<SetupAssistantStep
							heading="Setup Assistant Step Heading"
							id="setup-assistant-event-test-1-step-1"
							isExpandable
							isOpen
						/>
						<SetupAssistantStep
							heading="Setup Assistant Step Heading"
							id="setup-assistant-event-test-1-step-2"
							isExpandable
							isOpen
						/>
					</SetupAssistant>
				</IconSettings>
			);

			const expandButton = container.querySelector(
				'#setup-assistant-event-test-1-step-1 .slds-setup-assistant__step-summary-title button'
			);

			fireEvent.click(expandButton);

			expect(onStepToggleIsOpen).toHaveBeenCalledTimes(1);
			const call = onStepToggleIsOpen.mock.calls[0];
			const [event, data] = call;

			expect(event).toBeTruthy();
			expect(typeof data).toBe('object');
			expect(data.index).toBe(0);
			expect(data.isOpen).toBe(true);
			expect(typeof data.step).toBe('object');
		});

		it('handles onToggleIsOpen correctly', () => {
			const onToggleIsOpen = vi.fn();

			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<SetupAssistant id="setup-assistant-event-test-1">
						<SetupAssistantStep
							heading="Setup Assistant Step Heading"
							id="setup-assistant-event-test-1-step-1"
							isExpandable
							isOpen
						/>
						<SetupAssistantStep
							heading="Setup Assistant Step Heading"
							id="setup-assistant-event-test-1-step-2"
							isExpandable
							isOpen
							onToggleIsOpen={onToggleIsOpen}
						/>
					</SetupAssistant>
				</IconSettings>
			);

			const expandButton = container.querySelector(
				'#setup-assistant-event-test-1-step-2 .slds-setup-assistant__step-summary-title button'
			);

			fireEvent.click(expandButton);

			expect(onToggleIsOpen).toHaveBeenCalledTimes(1);
			const call = onToggleIsOpen.mock.calls[0];
			const [event, data] = call;

			expect(event).toBeTruthy();
			expect(typeof data).toBe('object');
			expect(data.index).toBe(1);
			expect(data.isOpen).toBe(true);
			expect(typeof data.step).toBe('object');
		});
	});
});
