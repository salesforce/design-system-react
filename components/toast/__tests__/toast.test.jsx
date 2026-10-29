import { Component } from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import Toast from '../';
import ToastContainer from '../container';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

class DemoComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: true,
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<ToastContainer>
						{this.state.isOpen ? (
							<Toast
								dismissible
								icon={<Icon category="utility" name="user" />}
								labels={{
									heading: 'Logged in as John Smith (johnsmith@acme.com).',
									headingLink: 'Log out',
								}}
								onRequestClose={() => {
									this.setState({ isOpen: false });
								}}
								variant="info"
								{...this.props}
							/>
						) : null}
					</ToastContainer>
				</div>
			</IconSettings>
		);
	}
}

DemoComponent.displayName = 'ToastExample';

describe('SLDSToast', () => {
	describe('Dismiss Toast', () => {
		it('calls onRequestClose handler', () => {
			const { container } = render(<DemoComponent />);

			// Toast should be present
			expect(container.querySelector('.slds-notify')).toBeInTheDocument();

			// Click the close button
			const button = container.querySelector('button.slds-notify__close');
			fireEvent.click(button);

			// Toast should be removed
			expect(container.querySelector('.slds-notify')).not.toBeInTheDocument();
		});

		it('calls onClickHeadingLink handler', () => {
			const onClickHeadingLink = vi.fn();
			const { container } = render(
				<DemoComponent onClickHeadingLink={onClickHeadingLink} />
			);

			// Click the link
			const link = container.querySelector('a');
			fireEvent.click(link);

			expect(onClickHeadingLink).toHaveBeenCalledTimes(1);
		});
	});

	describe('Toast with duration auto-closes itself', () => {
		it('it calls onRequestClose after 1ms', async () => {
			const { container } = render(<DemoComponent duration={1} />);

			// Toast should be present initially
			expect(container.querySelector('.slds-notify')).toBeInTheDocument();

			// Wait for the auto-dismiss to happen
			await waitFor(
				() => {
					expect(
						container.querySelector('.slds-notify')
					).not.toBeInTheDocument();
				},
				{ timeout: 50 }
			);
		});
	});

	describe('onRequestClose payload', () => {
		afterEach(() => {
			vi.useRealTimers();
		});

		const renderToast = (props) => (
			<IconSettings iconPath="/assets/icons">
				<Toast labels={{ heading: 'Heading' }} variant="info" {...props} />
			</IconSettings>
		);

		it('passes the click event and trigger "close-button" when the close button is clicked', () => {
			const onRequestClose = vi.fn();
			const { container } = render(renderToast({ onRequestClose }));

			fireEvent.click(container.querySelector('button.slds-notify__close'));

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			const [event, data] = onRequestClose.mock.calls[0];
			expect(event).toEqual(expect.objectContaining({ type: 'click' }));
			expect(data).toEqual({ trigger: 'close-button' });
		});

		it('passes an undefined event and trigger "timeout" when duration elapses', () => {
			vi.useFakeTimers();
			const onRequestClose = vi.fn();
			render(renderToast({ duration: 1000, onRequestClose }));

			act(() => {
				vi.advanceTimersByTime(999);
			});
			expect(onRequestClose).not.toHaveBeenCalled();

			act(() => {
				vi.advanceTimersByTime(1);
			});
			expect(onRequestClose).toHaveBeenCalledTimes(1);
			expect(onRequestClose).toHaveBeenCalledWith(undefined, {
				trigger: 'timeout',
			});
		});

		// Regression: an inline `onRequestClose` (new function each render) used to
		// restart the auto-dismiss timer on every parent render.
		it('does not restart the timer when re-rendered with a new inline callback', () => {
			vi.useFakeTimers();
			const firstCallback = vi.fn();
			const secondCallback = vi.fn();
			const { rerender } = render(
				renderToast({ duration: 1000, onRequestClose: firstCallback })
			);

			act(() => {
				vi.advanceTimersByTime(600);
			});
			rerender(
				renderToast({
					duration: 1000,
					onRequestClose: (...args) => secondCallback(...args),
				})
			);
			act(() => {
				vi.advanceTimersByTime(400);
			});

			expect(firstCallback).not.toHaveBeenCalled();
			expect(secondCallback).toHaveBeenCalledTimes(1);
			expect(secondCallback).toHaveBeenCalledWith(undefined, {
				trigger: 'timeout',
			});
		});
	});

	describe('Basic Toast Props Render', () => {
		it('renders custom styles', () => {
			const { container } = render(
				<DemoComponent style={{ backgroundColor: 'rgb(18, 49, 35)' }} />
			);

			const toast = container.querySelector('.slds-notify');
			expect(toast).toHaveStyle({ backgroundColor: 'rgb(18, 49, 35)' });
		});
	});
});
