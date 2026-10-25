import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Badge from '../';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

describe('Badge', () => {
	const renderBadge = (props) =>
		render(
			<IconSettings iconPath="/assets/icons">
				<Badge content="Badge" {...props} />
			</IconSettings>
		).container;

	const icon = <Icon category="utility" name="moneybag" size="xx-small" />;

	describe('style', () => {
		it('applies `style` to the badge when there is no icon', () => {
			const container = renderBadge({ style: { color: 'rgb(255, 0, 0)' } });

			expect(container.querySelector('.slds-badge')).toHaveStyle({
				color: 'rgb(255, 0, 0)',
			});
		});

		it('applies `style` to the badge, not the icon container', () => {
			const container = renderBadge({
				icon,
				style: { color: 'rgb(255, 0, 0)' },
			});

			expect(container.querySelector('.slds-badge')).toHaveStyle({
				color: 'rgb(255, 0, 0)',
			});
			expect(container.querySelector('.slds-badge__icon')).not.toHaveAttribute(
				'style'
			);
		});

		it('applies `styleIcon` to the icon container', () => {
			const container = renderBadge({
				icon,
				styleIcon: { color: 'rgb(0, 0, 255)' },
			});

			expect(container.querySelector('.slds-badge__icon')).toHaveStyle({
				color: 'rgb(0, 0, 255)',
			});
			expect(container.querySelector('.slds-badge')).not.toHaveAttribute(
				'style'
			);
		});
	});
});
