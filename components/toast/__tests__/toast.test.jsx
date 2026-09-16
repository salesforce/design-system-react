import { Component } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

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
					expect(container.querySelector('.slds-notify')).not.toBeInTheDocument();
				},
				{ timeout: 50 }
			);
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
