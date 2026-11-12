import { Component } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Alert from '../';
import AlertContainer from '../container';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';
import DOMElementFocus from '../../../utilities/dom-element-focus';

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
									heading: 'Logged in as John Smith (johnsmith@acme.com).',
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

			const closeButton = container.querySelector('button.slds-notify__close');
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

	describe('Focus restore on unmount', () => {
		const addButton = () => {
			const button = document.createElement('button');
			document.body.appendChild(button);
			return button;
		};

		it('does not take focus stored by another component when not dismissible', () => {
			const opener = addButton();
			const current = addButton();
			// Simulate another component (e.g. an open Popover) storing its opener.
			opener.focus();
			DOMElementFocus.storeActiveElement();
			current.focus();

			const { unmount } = render(
				<IconSettings iconPath="/assets/icons">
					<Alert labels={{ heading: 'Heading' }} variant="info" />
				</IconSettings>
			);
			unmount();

			expect(document.activeElement).toBe(current);

			// Clear the shared stored element so it does not leak into other tests.
			DOMElementFocus.returnFocusToStoredElement();
			opener.remove();
			current.remove();
		});

		it('returns focus to the previously focused element when dismissible', () => {
			const opener = addButton();
			opener.focus();

			const { container, unmount } = render(
				<IconSettings iconPath="/assets/icons">
					<Alert dismissible labels={{ heading: 'Heading' }} variant="info" />
				</IconSettings>
			);
			expect(document.activeElement).toBe(
				container.querySelector('.slds-notify__close')
			);
			unmount();

			expect(document.activeElement).toBe(opener);
			opener.remove();
		});
	});
});
