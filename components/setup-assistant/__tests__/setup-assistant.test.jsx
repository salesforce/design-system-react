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

			expect(
				container.querySelector('#setup-assistant-event-test-1')
			).toBeInTheDocument();
			expect(
				container.querySelector('.slds-setup-assistant')
			).toBeInTheDocument();
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

			expect(event.type).toBe('click');
			expect(data.index).toBe(0);
			// Step is open, so the requested state is closed
			expect(data.isOpen).toBe(false);
			expect(data.step).toEqual(
				expect.objectContaining({
					id: 'setup-assistant-event-test-1-step-1',
					index: 0,
					isOpen: true,
				})
			);
		});

		it('reports the requested open state when a closed step is toggled', () => {
			const onStepToggleIsOpen = vi.fn();

			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<SetupAssistant
						id="setup-assistant-event-test-2"
						onStepToggleIsOpen={onStepToggleIsOpen}
					>
						<SetupAssistantStep
							heading="Setup Assistant Step Heading"
							id="setup-assistant-event-test-2-step-1"
							isExpandable
							isOpen={false}
						/>
					</SetupAssistant>
				</IconSettings>
			);

			fireEvent.click(
				container.querySelector(
					'#setup-assistant-event-test-2-step-1 .slds-summary-detail > button'
				)
			);

			expect(onStepToggleIsOpen).toHaveBeenCalledTimes(1);
			const [event, data] = onStepToggleIsOpen.mock.calls[0];
			expect(event.type).toBe('click');
			expect(data.index).toBe(0);
			expect(data.isOpen).toBe(true);
			expect(data.step.id).toBe('setup-assistant-event-test-2-step-1');
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

			expect(event.type).toBe('click');
			expect(data.index).toBe(1);
			// Step is open, so the requested state is closed
			expect(data.isOpen).toBe(false);
			expect(data.step).toEqual(
				expect.objectContaining({
					id: 'setup-assistant-event-test-1-step-2',
					index: 1,
				})
			);
		});
	});
});
