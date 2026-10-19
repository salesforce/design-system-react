import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Badge from '../../badge';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

describe('SLDSBadge', () => {
	const getBadge = (container) => container.querySelector('.slds-badge');

	describe('Default badge renders properly', () => {
		it('renders content', () => {
			const { container } = render(<Badge content="Badge Label" />);
			expect(getBadge(container)).toBeInTheDocument();
			expect(screen.getByText('Badge Label')).toBeInTheDocument();
		});

		it('renders default classes when no color is passed', () => {
			const { container } = render(<Badge content="Default" />);
			const badge = getBadge(container);
			expect(badge).toHaveClass('slds-badge');
			expect(badge).not.toHaveClass('slds-badge_inverse');
			expect(badge).not.toHaveClass('slds-theme_info');
		});
	});

	describe('Color variants', () => {
		it.each([
			['inverse', 'slds-badge_inverse'],
			['light', 'slds-badge_lightest'],
			['info', 'slds-theme_info'],
			['success', 'slds-theme_success'],
			['warning', 'slds-theme_warning'],
			['error', 'slds-theme_error'],
		])('applies color="%s" with class %s', (color, className) => {
			const { container } = render(<Badge content={color} color={color} />);
			expect(getBadge(container)).toHaveClass(className);
		});
	});

	describe('Icon alignment', () => {
		const renderWithIcon = (iconAlignment) =>
			render(
				<IconSettings iconPath="/assets/icons">
					<Badge
						content="With Icon"
						iconAlignment={iconAlignment}
						icon={<Icon category="utility" name="moneybag" size="xx-small" />}
					/>
				</IconSettings>
			);

		it('renders icon on the left by default', () => {
			const { container } = renderWithIcon();
			const iconWrapper = container.querySelector('.slds-badge__icon');
			expect(iconWrapper).toHaveClass('slds-badge__icon_left');
		});

		it('renders icon on the right when iconAlignment is right', () => {
			const { container } = renderWithIcon('right');
			const iconWrapper = container.querySelector('.slds-badge__icon');
			expect(iconWrapper).toHaveClass('slds-badge__icon_right');
		});
	});

	describe('Custom props', () => {
		it('forwards id and className', () => {
			const { container } = render(
				<Badge id="custom-badge" className="custom-class" content="Custom" />
			);
			const badge = getBadge(container);
			expect(badge).toHaveAttribute('id', 'custom-badge');
			expect(badge).toHaveClass('custom-class');
		});
	});
});
