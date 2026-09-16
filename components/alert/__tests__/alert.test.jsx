import { Component } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Alert from '../';
import AlertContainer from '../container';
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
					<AlertContainer>
						{this.state.isOpen ? (
							<Alert
								style={this.props.style}
								dismissible
								icon={<Icon category="utility" name="user" />}
								labels={{
									heading:
										'Logged in as John Smith (johnsmith@acme.com).',
									headingLink: 'Log out',
								}}
								onClickHeadingLink={this.props.onClickHeadingLink}
								onRequestClose={() => {
									this.setState({ isOpen: false });
								}}
							/>
						) : null}
					</AlertContainer>
				</div>
			</IconSettings>
		);
	}
}

DemoComponent.displayName = 'AlertExample';

describe('SLDSAlert', () => {
	describe('Dismiss alert', () => {
		it('calls onRequestClose handler when close button clicked', () => {
			const { container } = render(<DemoComponent />);
			expect(container.querySelector('.slds-notify')).toBeInTheDocument();

			const closeButton = container.querySelector(
				'button.slds-notify__close'
			);
			fireEvent.click(closeButton);

			expect(container.querySelector('.slds-notify')).not.toBeInTheDocument();
		});

		it('calls onClickHeadingLink handler when link clicked', () => {
			const onClickHeadingLink = vi.fn();
			const { container } = render(
				<DemoComponent onClickHeadingLink={onClickHeadingLink} />
			);

			const link = container.querySelector('a');
			fireEvent.click(link);

			expect(onClickHeadingLink).toHaveBeenCalledTimes(1);
		});
	});

	describe('Basic Alert Props Render', () => {
		it('renders custom styles', () => {
			const { container } = render(
				<DemoComponent style={{ backgroundColor: 'rgb(18, 49, 35)' }} />
			);

			expect(container.querySelector('.slds-notify')).toHaveStyle({
				backgroundColor: 'rgb(18, 49, 35)',
			});
		});
	});
});
