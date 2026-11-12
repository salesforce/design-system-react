import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import IconSettings from '../../icon-settings';
import SplitView from '../';

const renderSplitView = (props = {}) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<SplitView
				id="split-view-test"
				master={<div className="master-content">Master</div>}
				detail={<div className="detail-content">Detail</div>}
				{...props}
			/>
		</IconSettings>
	);

const getToggleButton = (container) =>
	container.querySelector('.slds-split-view__toggle-button');

const getContainer = (container) =>
	container.querySelector('.slds-split-view_container');

describe('SplitView', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('events.onToggle', () => {
		it('reports the requested open state in uncontrolled mode', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const onToggle = vi.fn();
			const { container } = renderSplitView({ events: { onToggle } });

			expect(
				consoleError.mock.calls.some((call) =>
					call.join(' ').includes('will be removed')
				)
			).toBe(false);
			expect(getContainer(container)).toHaveClass('slds-is-open');

			fireEvent.click(getToggleButton(container));
			expect(onToggle).toHaveBeenCalledTimes(1);
			expect(onToggle).toHaveBeenLastCalledWith(
				expect.objectContaining({ type: 'click' }),
				{ isOpen: false }
			);
			expect(getContainer(container)).toHaveClass('slds-is-closed');

			fireEvent.click(getToggleButton(container));
			expect(onToggle).toHaveBeenCalledTimes(2);
			expect(onToggle).toHaveBeenLastCalledWith(
				expect.objectContaining({ type: 'click' }),
				{ isOpen: true }
			);
			expect(getContainer(container)).toHaveClass('slds-is-open');
		});

		it('reports the requested open state in controlled mode and lets the parent decide', () => {
			const onToggle = vi.fn();
			const { container, rerender } = renderSplitView({
				events: { onToggle },
				isOpen: false,
			});

			fireEvent.click(getToggleButton(container));
			expect(onToggle).toHaveBeenCalledWith(
				expect.objectContaining({ type: 'click' }),
				{ isOpen: true }
			);
			// Controlled: stays closed until the parent passes the new value
			expect(getContainer(container)).toHaveClass('slds-is-closed');

			rerender(
				<IconSettings iconPath="/assets/icons">
					<SplitView
						id="split-view-test"
						master={<div className="master-content">Master</div>}
						detail={<div className="detail-content">Detail</div>}
						events={{ onToggle }}
						isOpen
					/>
				</IconSettings>
			);
			expect(getContainer(container)).toHaveClass('slds-is-open');

			fireEvent.click(getToggleButton(container));
			expect(onToggle).toHaveBeenLastCalledWith(
				expect.objectContaining({ type: 'click' }),
				{ isOpen: false }
			);
		});
	});

	describe('open state', () => {
		it('starts open by default', () => {
			const { container } = renderSplitView();
			expect(getContainer(container)).toHaveClass('slds-is-open');
		});

		it('starts from defaultIsOpen and toggles itself without a callback', () => {
			const { container } = renderSplitView({ defaultIsOpen: false });
			expect(getContainer(container)).toHaveClass('slds-is-closed');

			fireEvent.click(getToggleButton(container));
			expect(getContainer(container)).toHaveClass('slds-is-open');
		});

		it('starts from defaultIsOpen and reports the requested state', () => {
			const onToggle = vi.fn();
			const { container } = renderSplitView({
				defaultIsOpen: false,
				events: { onToggle },
			});

			fireEvent.click(getToggleButton(container));
			expect(onToggle).toHaveBeenCalledWith(
				expect.objectContaining({ type: 'click' }),
				{ isOpen: true }
			);
			expect(getContainer(container)).toHaveClass('slds-is-open');
		});

		it('ignores defaultIsOpen and does not toggle itself when isOpen is passed', () => {
			const { container } = renderSplitView({
				defaultIsOpen: true,
				isOpen: false,
			});
			expect(getContainer(container)).toHaveClass('slds-is-closed');

			fireEvent.click(getToggleButton(container));
			expect(getContainer(container)).toHaveClass('slds-is-closed');
		});
	});

	describe('deprecated events.onOpen / events.onClose', () => {
		// The deprecation warning is emitted once per module lifetime, so this
		// must be the first test in the file to pass the deprecated keys.
		it('are still called with the event only, and warn', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const onOpen = vi.fn();
			const onClose = vi.fn();
			const { container } = renderSplitView({ events: { onOpen, onClose } });

			const messages = consoleError.mock.calls.map((call) => call.join(' '));
			expect(
				messages.some(
					(m) =>
						m.includes('`events.onOpen` will be removed') &&
						m.includes('`events.onToggle`')
				)
			).toBe(true);
			expect(
				messages.some(
					(m) =>
						m.includes('`events.onClose` will be removed') &&
						m.includes('`events.onToggle`')
				)
			).toBe(true);

			fireEvent.click(getToggleButton(container));
			expect(onClose).toHaveBeenCalledTimes(1);
			expect(onClose.mock.calls[0]).toHaveLength(1);
			expect(onClose.mock.calls[0][0]).toEqual(
				expect.objectContaining({ type: 'click' })
			);
			expect(onOpen).not.toHaveBeenCalled();

			fireEvent.click(getToggleButton(container));
			expect(onOpen).toHaveBeenCalledTimes(1);
			expect(onOpen.mock.calls[0]).toHaveLength(1);
			expect(onOpen.mock.calls[0][0]).toEqual(
				expect.objectContaining({ type: 'click' })
			);
			expect(onClose).toHaveBeenCalledTimes(1);
		});

		it('are not called when events.onToggle is provided', () => {
			vi.spyOn(console, 'error').mockImplementation(() => {});
			const onToggle = vi.fn();
			const onOpen = vi.fn();
			const onClose = vi.fn();
			const { container } = renderSplitView({
				events: { onToggle, onOpen, onClose },
			});

			fireEvent.click(getToggleButton(container));
			fireEvent.click(getToggleButton(container));

			expect(onToggle).toHaveBeenCalledTimes(2);
			expect(onOpen).not.toHaveBeenCalled();
			expect(onClose).not.toHaveBeenCalled();
		});
	});

	describe('assistiveText', () => {
		it('labels the toggle with closeToggle while open and openToggle while closed', () => {
			const { container } = renderSplitView({
				assistiveText: { closeToggle: 'Hide list', openToggle: 'Show list' },
			});

			const toggle = getToggleButton(container);
			expect(toggle).toHaveAttribute('aria-expanded', 'true');
			expect(toggle).toHaveAttribute('title', 'Hide list');

			fireEvent.click(toggle);

			expect(toggle).toHaveAttribute('aria-expanded', 'false');
			expect(toggle).toHaveAttribute('title', 'Show list');
		});

		it('uses English defaults', () => {
			const { container } = renderSplitView();

			const toggle = getToggleButton(container);
			expect(toggle).toHaveAttribute('title', 'Close split view');
			fireEvent.click(toggle);
			expect(toggle).toHaveAttribute('title', 'Open split view');
		});

		it('maps the deprecated inverted keys to the new keys and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			const { container } = renderSplitView({
				assistiveText: {
					toggleButtonOpen: 'Hide list',
					toggleButtonClose: 'Show list',
				},
			});

			const toggle = getToggleButton(container);
			expect(toggle).toHaveAttribute('title', 'Hide list');
			fireEvent.click(toggle);
			expect(toggle).toHaveAttribute('title', 'Show list');

			const messages = consoleError.mock.calls.map((args) => args.join(' '));
			expect(
				messages.some((m) => m.includes('assistiveText.toggleButtonOpen'))
			).toBe(true);
			expect(
				messages.some((m) => m.includes('assistiveText.toggleButtonClose'))
			).toBe(true);
		});

		it('prefers the new keys over the deprecated ones', () => {
			vi.spyOn(console, 'error').mockImplementation(() => {});

			const { container } = renderSplitView({
				assistiveText: {
					closeToggle: 'New close',
					toggleButtonOpen: 'Old close',
				},
			});

			const toggle = getToggleButton(container);
			expect(toggle).toHaveAttribute('title', 'New close');
		});
	});
});
