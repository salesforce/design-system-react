import { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

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

		it('if no isActive prop, is not active', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful {...requiredProps} />
				</IconSettings>
			);

			const button = getButton(container);
			expect(button).toHaveClass('slds-not-selected');
		});
	});

	describe('Controlled isActive', () => {
		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('renders isActive prop', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful {...requiredProps} isActive />
				</IconSettings>
			);

			const button = getButton(container);
			expect(button).toHaveClass('slds-is-selected');
		});

		it('honors isActive: clicking does not change state unless the parent updates it', () => {
			const onClick = vi.fn();
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonStateful isActive={false} onClick={onClick} />
				</IconSettings>
			);

			const button = getButton(container);
			fireEvent.click(button);
			fireEvent.click(button);
			expect(button).toHaveClass('slds-not-selected');
			expect(button).not.toHaveClass('slds-is-selected');
			expect(onClick).toHaveBeenCalledTimes(2);
		});

		it('passes the event and the requested next value to onClick', () => {
			const onClick = vi.fn();
			const { container, rerender } = render(
				<ButtonStateful isActive={false} onClick={onClick} />
			);

			fireEvent.click(getButton(container));
			expect(onClick.mock.calls[0][0].type).toBe('click');
			expect(onClick.mock.calls[0][1]).toEqual({ isActive: true });

			rerender(<ButtonStateful isActive onClick={onClick} />);
			fireEvent.click(getButton(container));
			expect(onClick.mock.calls[1][1]).toEqual({ isActive: false });
		});

		it('toggles when the parent stores the requested value', () => {
			const Wrapper = () => {
				const [isActive, setIsActive] = useState(false);
				return (
					<ButtonStateful
						isActive={isActive}
						onClick={(event, data) => setIsActive(data.isActive)}
					/>
				);
			};
			const { container } = render(<Wrapper />);
			const button = getButton(container);

			fireEvent.click(button);
			expect(button).toHaveClass('slds-is-selected');
			fireEvent.click(button);
			expect(button).toHaveClass('slds-not-selected');
		});

		it('still accepts the deprecated active prop and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const onClick = vi.fn();
			const { container } = render(
				<ButtonStateful active onClick={onClick} />
			);

			const button = getButton(container);
			expect(button).toHaveClass('slds-is-selected');
			fireEvent.click(button);
			expect(onClick.mock.calls[0][1]).toEqual({ isActive: false });

			const messages = consoleError.mock.calls.map((args) => args.join(' '));
			expect(
				messages.some(
					(m) => m.includes('`active`') && m.includes('`isActive`')
				)
			).toBe(true);
		});

		it('prefers isActive over the deprecated active prop', () => {
			vi.spyOn(console, 'error').mockImplementation(() => {});
			const { container } = render(
				<ButtonStateful isActive={false} active />
			);

			expect(getButton(container)).toHaveClass('slds-not-selected');
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
