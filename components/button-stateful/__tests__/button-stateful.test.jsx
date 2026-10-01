import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

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

	describe('Mouse leave does not steal keyboard focus', () => {
		it('keeps the button focused when the mouse leaves', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful {...requiredProps} />
				</IconSettings>
			);

			const button = getButton(container);
			button.focus();
			expect(document.activeElement).toBe(button);

			fireEvent.mouseLeave(button);

			expect(document.activeElement).toBe(button);
		});

		it('still forwards onBlur when the mouse leaves', () => {
			const onBlur = vi.fn();
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful {...requiredProps} onBlur={onBlur} />
				</IconSettings>
			);

			const button = getButton(container);
			fireEvent.mouseLeave(button);

			expect(onBlur).toHaveBeenCalledTimes(1);
		});
	});
});
