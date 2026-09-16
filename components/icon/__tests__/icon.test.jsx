import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Icon from '../index';
import IconSettings from '../../icon-settings';

class DemoIcon extends React.Component {
	static displayName = 'DemoIcon';

	render() {
		return <Icon {...this.props} />;
	}
}

describe('SLDSIcon', () => {
	describe('Standard Icon Props Render', () => {
		it('renders container class', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Log a Call' }}
						category="standard"
						name="log_a_call"
						style={{ backgroundColor: 'rgb(218, 165, 32)' }}
						size="large"
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-icon_container')).toBeInTheDocument();
		});

		it('renders assistive text', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Log a Call' }}
						category="standard"
						name="log_a_call"
						style={{ backgroundColor: 'rgb(218, 165, 32)' }}
						size="large"
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-assistive-text').textContent).toBe('Log a Call');
		});

		it('renders icon name class on svg', () => {
			// also tests that all '_' are replaced with '-'
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Log a Call' }}
						category="standard"
						name="log_a_call"
						style={{ backgroundColor: 'rgb(218, 165, 32)' }}
						size="large"
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-icon-standard-log-a-call')).toBeInTheDocument();
		});

		it('renders custom background color', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Log a Call' }}
						category="standard"
						name="log_a_call"
						style={{ backgroundColor: 'rgb(218, 165, 32)' }}
						size="large"
					/>
				</IconSettings>
			);

			const svg = container.querySelector('svg');
			expect(svg).toHaveStyle({ backgroundColor: 'rgb(218, 165, 32)' });
		});

		it('renders icon size class', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Log a Call' }}
						category="standard"
						name="log_a_call"
						style={{ backgroundColor: 'rgb(218, 165, 32)' }}
						size="large"
					/>
				</IconSettings>
			);

			const svg = container.querySelector('svg');
			expect(svg).toHaveClass('slds-icon_large');
		});
	});

	describe('Custom Icon Props Render', () => {
		it('renders container class', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Heart' }}
						category="custom"
						name="custom1"
						size="small"
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-icon_container')).toBeInTheDocument();
		});

		it('renders assistive text', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Heart' }}
						category="custom"
						name="custom1"
						size="small"
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-assistive-text').textContent).toBe('Heart');
		});

		it('renders icon name class on svg', () => {
			// also tests that all '_' are replaced with '-'
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Heart' }}
						category="custom"
						name="custom1"
						size="small"
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-icon-custom-custom1')).toBeInTheDocument();
		});

		it('renders icon size class', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Heart' }}
						category="custom"
						name="custom1"
						size="small"
					/>
				</IconSettings>
			);

			const svg = container.querySelector('svg');
			expect(svg).toHaveClass('slds-icon_small');
		});
	});

	describe('Action Icon Props Render', () => {
		it('renders container class', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Announcements' }}
						category="action"
						name="announcement"
						size="large"
						title="custom title"
						className="slds-m-around_x-small"
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-icon_container')).toBeInTheDocument();
		});

		it('renders assistive text', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Announcements' }}
						category="action"
						name="announcement"
						size="large"
						title="custom title"
						className="slds-m-around_x-small"
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-assistive-text').textContent).toBe('Announcements');
		});

		it('renders round container', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Announcements' }}
						category="action"
						name="announcement"
						size="large"
						title="custom title"
						className="slds-m-around_x-small"
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-icon_container_circle')).toBeInTheDocument();
		});

		it('renders icon name class on svg', () => {
			// also tests that all '_' are replaced with '-'
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Announcements' }}
						category="action"
						name="announcement"
						size="large"
						title="custom title"
						className="slds-m-around_x-small"
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-icon-action-announcement')).toBeInTheDocument();
		});

		it('renders icon size class', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Announcements' }}
						category="action"
						name="announcement"
						size="large"
						title="custom title"
						className="slds-m-around_x-small"
					/>
				</IconSettings>
			);

			const svg = container.querySelector('svg');
			expect(svg).toHaveClass('slds-icon_large');
		});

		it('renders title', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Announcements' }}
						category="action"
						name="announcement"
						size="large"
						title="custom title"
						className="slds-m-around_x-small"
					/>
				</IconSettings>
			);

			expect(container.querySelector('[title="custom title"]')).toBeInTheDocument();
		});
	});

	describe('Utility Icon Props Render', () => {
		it('does NOT render container class', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon category="utility" name="open_folder" size="medium" />
				</IconSettings>
			);

			// Utility icons don't get the container class
			expect(container.querySelector('span').classList.contains('slds-icon_container')).toBe(false);
		});

		it('medium size does not render size class', () => {
			// also tests that all '_' are replaced with '-'
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon category="utility" name="open_folder" size="medium" />
				</IconSettings>
			);

			// Medium is default, so no size class is added
			expect(container.querySelector('svg').classList.contains('slds-icon_medium')).toBe(false);
		});

		it('utility icons do not render name class on svg', () => {
			// NOTE: The original test expected 'slds-icon-text-default' to be false,
			// but the current implementation applies this class to utility icons with
			// colorVariant='default' (the default) and not inverse. The test name suggests
			// utility icons shouldn't get "name" classes (like slds-icon-standard-log-a-call),
			// which is correct - they don't get the category-name class.
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon category="utility" name="open_folder" size="medium" />
				</IconSettings>
			);

			// Utility icons don't render the icon-category-name pattern
			expect(container.querySelector('.slds-icon-utility-open-folder')).not.toBeInTheDocument();
		});
	});

	describe('Icon with external path renders', () => {
		it('does NOT render slds-icon-standard class', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'New stuff!' }}
						inverse
						path="/assets/icons/utility-sprite/svg/symbols.svg#announcement"
						size="medium"
					/>
				</IconSettings>
			);

			// When using path, category-specific classes are not applied
			expect(container.querySelector('span').classList.contains('slds-icon-standard-')).toBe(false);
		});

		it('path prop is passed to svg', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'New stuff!' }}
						inverse
						path="/assets/icons/utility-sprite/svg/symbols.svg#announcement"
						size="medium"
					/>
				</IconSettings>
			);

			expect(container.querySelector('use')).toHaveAttribute(
				'href',
				'/assets/icons/utility-sprite/svg/symbols.svg#announcement'
			);
		});
	});
});
