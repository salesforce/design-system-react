import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import Icon from '../../icon';
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

	describe('Setup Assistant Step open state', () => {
		const renderSteps = (assistantProps = {}, stepProps = {}) =>
			render(
				<IconSettings iconPath="/assets/icons">
					<SetupAssistant id="setup-assistant-open" {...assistantProps}>
						<SetupAssistantStep
							heading="Step Heading"
							id="setup-assistant-open-step-1"
							isExpandable
							{...stepProps}
						/>
					</SetupAssistant>
				</IconSettings>
			);
		const toggle = (container) =>
			fireEvent.click(
				container.querySelector(
					'#setup-assistant-open-step-1 .slds-summary-detail > button'
				)
			);
		const detail = (container) =>
			container.querySelector(
				'#setup-assistant-open-step-1 .slds-summary-detail'
			);

		it('toggles an uncontrolled step without a callback', () => {
			const { container } = renderSteps();
			expect(detail(container)).not.toHaveClass('slds-is-open');

			toggle(container);
			expect(detail(container)).toHaveClass('slds-is-open');

			toggle(container);
			expect(detail(container)).not.toHaveClass('slds-is-open');
		});

		it('toggles an uncontrolled step with `onStepToggleIsOpen`, reporting the requested state', () => {
			const onStepToggleIsOpen = vi.fn();
			const { container } = renderSteps({ onStepToggleIsOpen });

			toggle(container);

			expect(detail(container)).toHaveClass('slds-is-open');
			expect(onStepToggleIsOpen).toHaveBeenCalledTimes(1);
			expect(onStepToggleIsOpen.mock.calls[0][1]).toEqual(
				expect.objectContaining({ index: 0, isOpen: true })
			);
		});

		it('toggles an uncontrolled step with its own `onToggleIsOpen`', () => {
			const onToggleIsOpen = vi.fn();
			const { container } = renderSteps({}, { onToggleIsOpen });

			toggle(container);

			expect(detail(container)).toHaveClass('slds-is-open');
			expect(onToggleIsOpen.mock.calls[0][1].isOpen).toBe(true);
		});

		it('starts open with `defaultIsOpen`', () => {
			const { container } = renderSteps({}, { defaultIsOpen: true });
			expect(detail(container)).toHaveClass('slds-is-open');

			toggle(container);
			expect(detail(container)).not.toHaveClass('slds-is-open');
		});

		it('honors controlled `isOpen` until the parent updates it', () => {
			const onStepToggleIsOpen = vi.fn();
			const { container } = renderSteps(
				{ onStepToggleIsOpen },
				{ isOpen: false }
			);

			toggle(container);

			expect(detail(container)).not.toHaveClass('slds-is-open');
			expect(onStepToggleIsOpen.mock.calls[0][1].isOpen).toBe(true);
		});

		it('honors controlled `isOpen` without a callback', () => {
			const { container } = renderSteps({}, { isOpen: true });

			toggle(container);

			expect(detail(container)).toHaveClass('slds-is-open');
		});
	});

	describe('Setup Assistant Step slots', () => {
		afterEach(() => {
			vi.restoreAllMocks();
		});

		const renderStep = (props) =>
			render(
				<IconSettings iconPath="/assets/icons">
					<SetupAssistant id="setup-assistant-slots">
						<SetupAssistantStep
							estimatedTime="4 mins"
							heading="Step Heading"
							id="setup-assistant-slots-step-1"
							isExpandable
							isOpen
							{...props}
						/>
					</SetupAssistant>
				</IconSettings>
			);

		const getIcon = (container) =>
			container.querySelector(
				'.slds-setup-assistant__step-summary .slds-media__figure .slds-icon'
			);

		it('renders the action, content and figure slots', () => {
			const { container, getByRole, getByText } = renderStep({
				action: <button type="button">Add Users</button>,
				content: <p>Step content</p>,
				figure: <Icon category="standard" name="user" size="large" />,
			});

			expect(getByRole('button', { name: 'Add Users' })).toBeInTheDocument();
			expect(container.querySelector('.slds-text-color_weak')).toHaveClass(
				'slds-p-top_medium'
			);
			expect(
				container.querySelector('.slds-setup-assistant__step-detail')
			).toContainElement(getByText('Step content'));
			expect(getIcon(container)).toHaveClass('slds-icon_small');
			expect(getIcon(container)).not.toHaveClass('slds-icon_large');
			expect(
				container.querySelector('.slds-progress-ring')
			).not.toBeInTheDocument();
		});

		it('still renders the deprecated onRenderAction, onRenderContent and onRenderFigure and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			const { container, getByRole, getByText } = renderStep({
				onRenderAction: () => <button type="button">Add Users</button>,
				onRenderContent: () => <p>Step content</p>,
				onRenderFigure: () => (
					<Icon category="standard" name="user" size="large" />
				),
			});

			expect(getByRole('button', { name: 'Add Users' })).toBeInTheDocument();
			expect(container.querySelector('.slds-text-color_weak')).toHaveClass(
				'slds-p-top_medium'
			);
			expect(
				container.querySelector('.slds-setup-assistant__step-detail')
			).toContainElement(getByText('Step content'));
			expect(getIcon(container)).toHaveClass('slds-icon_small');

			const messages = consoleError.mock.calls.map((args) => args.join(' '));
			expect(messages.some((m) => m.includes('`onRenderAction`'))).toBe(true);
			expect(messages.some((m) => m.includes('`onRenderContent`'))).toBe(true);
			expect(messages.some((m) => m.includes('`onRenderFigure`'))).toBe(true);
		});
	});
});
