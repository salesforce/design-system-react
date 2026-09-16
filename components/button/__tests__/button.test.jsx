import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../index';
import IconSettings from '../../icon-settings';

describe('SLDSButton', () => {
	const defaultProps = {
		label: 'Neutral',
		onClick: vi.fn(),
		variant: 'neutral',
	};

	const renderButton = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<Button {...defaultProps} {...props} />
			</IconSettings>
		);
	};

	describe('Basic Button Props Render', () => {
		it('renders correct label', () => {
			renderButton({ id: 'custom-id', style: { background: 'rgb(18, 49, 35)' } });
			const btn = screen.getByRole('button', { name: /Neutral/i });
			expect(btn).toBeInTheDocument();
			expect(btn).toHaveClass('slds-button_neutral');
			expect(btn).toHaveAttribute('id', 'custom-id');
			expect(btn).toHaveStyle({ backgroundColor: 'rgb(18, 49, 35)' });
		});
	});

	describe('Form Props Render', () => {
		it('renders formAction prop', () => {
			const formAction = 'http://localhost/some/url';
			renderButton({ formAction });
			const btn = screen.getByRole('button');
			expect(btn).toHaveAttribute('formaction', formAction);
		});
	});

	describe('Data Props Render', () => {
		it('renders data attributes', () => {
			renderButton({ 'data-some-attribute': 'some value' });
			const btn = screen.getByRole('button');
			expect(btn).toHaveAttribute('data-some-attribute', 'some value');
		});
	});

	describe('Icon with Label Button Props Render', () => {
		it('renders label and icon class', () => {
			const { container } = renderButton({
				label: 'Neutral with Icon',
				iconName: 'download',
				iconCategory: 'action',
				iconPosition: 'right',
				variant: 'neutral',
			});
			
			const btn = screen.getByRole('button', { name: 'Neutral with Icon' });
			expect(btn).toBeInTheDocument();
			
			// Check for icon existence and class
			// Note: Icon implementation might render an <svg> or use <use>
			const icon = container.querySelector('.slds-button__icon');
			expect(icon).toBeInTheDocument();
			expect(icon).toHaveClass('slds-button__icon_right');
		});
	});

	describe('Icon Button Props render', () => {
		it('renders assistive text and icon styles', () => {
			const { container } = renderButton({
				assistiveText: { icon: 'my settings' },
				variant: 'icon',
				iconCategory: 'utility',
				iconName: 'settings',
				iconSize: 'small',
				iconVariant: 'bare',
			});

			// Assistive text is visually hidden but accessible
			// We can find by label text which should be the assistive text for icon-only buttons
			const btn = screen.getByRole('button', { name: 'my settings' });
			expect(btn).toBeInTheDocument();

			const svg = container.querySelector('svg');
			expect(svg).toHaveClass('slds-button__icon');
		});
	});

	describe('(icon path) Icon Button renders assistive text', () => {
		it('renders label from assistive text', () => {
			renderButton({
				assistiveText: { icon: 'News' },
				iconSize: 'large',
				iconPath: '/assets/icons/utility-sprite/svg/symbols.svg#announcement',
				title: 'announcement',
			});
            
            const btn = screen.getByRole('button', { name: 'News' });
			expect(btn).toBeInTheDocument();
		});
	});

	describe('External Path Icon Button renders', () => {
		it('renders svg with use href', () => {
			const iconPath = '/assets/icons/utility-sprite/svg/symbols.svg#announcement';
			const { container } = renderButton({
				assistiveText: { icon: 'announcement' },
				variant: 'icon',
				iconPath: iconPath,
				iconSize: 'large',
				iconVariant: 'bare',
			});

			const use = container.querySelector('use');
			expect(use).toHaveAttribute('href', iconPath);
		});
	});

	describe('Button Clickable', () => {
		it('can be clicked', () => {
			const onClick = vi.fn();
			renderButton({ onClick });
			const btn = screen.getByRole('button');
			
			fireEvent.click(btn);
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});
});

