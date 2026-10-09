import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ButtonStateful from '../';
import IconSettings from '../../icon-settings';

describe('Button Stateful', () => {
	// Base defaults
	const requiredPropsNoVariant = {
		assistiveText: { icon: 'like' },
		iconName: 'like',
		iconSize: 'large',
	};
	const requiredProps = {
		...requiredPropsNoVariant,
		variant: 'icon',
	};

	const getButton = (container) => container.querySelector('.slds-button');

	describe('Default Structure', () => {
		it('button exists - is not undefined', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful {...requiredProps} />
				</IconSettings>
			);

			const button = getButton(container);
			expect(button).toBeInTheDocument();
		});

		it('if no active prop, is not active', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful {...requiredProps} />
				</IconSettings>
			);

			const button = getButton(container);
			expect(button).toHaveClass('slds-not-selected');
		});
	});

	describe('External active props works', () => {
		it('renders active prop', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful {...requiredProps} active={true} />
				</IconSettings>
			);

			const button = getButton(container);
			expect(button).toHaveClass('slds-is-selected');
		});
	});

	describe('Aria-* is supported', () => {
		it('honors aria override', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful
						{...requiredProps}
						aria-pressed={true}
						aria-label="abc"
						aria-live={null}
					/>
				</IconSettings>
			);

			const button = getButton(container);
			expect(button).toHaveAttribute('aria-pressed', 'true');
			expect(button).toHaveAttribute('aria-label', 'abc');
			expect(button.getAttribute('aria-live')).toBeNull();
		});
	});

	describe('Aria default for icon button', () => {
		it('gives correct aria default for buttons with icon', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful {...requiredPropsNoVariant} variant="icon" />
				</IconSettings>
			);

			const button = getButton(container);
			expect(button).toHaveAttribute('aria-live', 'polite');
		});
	});

	describe('Aria default for icon-filled button', () => {
		it('gives correct aria default for buttons with icon-filled', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful {...requiredPropsNoVariant} variant="icon-filled" />
				</IconSettings>
			);

			const button = getButton(container);
			expect(button).toHaveAttribute('aria-live', 'polite');
		});
	});

	describe('Aria default for non-icon button', () => {
		it('gives correct aria default for non-icon buttons', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful {...requiredPropsNoVariant} variant="base" />
				</IconSettings>
			);

			const button = getButton(container);
			expect(button).toHaveAttribute('aria-live', 'assertive');
		});
	});

	describe('Variant classes', () => {
		const renderVariant = (variant) =>
			getButton(
				render(
					<IconSettings iconPath="/assets/icons">
						<ButtonStateful variant={variant} />
					</IconSettings>
				).container
			);

		it('defaults to neutral', () => {
			expect(renderVariant(undefined)).toHaveClass('slds-button_neutral');
		});

		it('applies success class without neutral', () => {
			const button = renderVariant('success');
			expect(button).toHaveClass(
				'slds-button',
				'slds-button_stateful',
				'slds-button_success'
			);
			expect(button).not.toHaveClass('slds-button_neutral');
			expect(button).toHaveAttribute('aria-live', 'assertive');
		});

		it('applies no variant modifier for text', () => {
			const button = renderVariant('text');
			expect(button).toHaveClass('slds-button', 'slds-button_stateful');
			expect(button).not.toHaveClass('slds-button_neutral');
			expect(button).toHaveAttribute('aria-live', 'assertive');
			expect(button.querySelector('.slds-text-not-selected')).toHaveTextContent(
				'Follow'
			);
		});
	});
});
