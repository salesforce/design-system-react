import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import IconSettings from '../../../icon-settings';
import Input from '../../../input';

describe('SLDSInput inline variant', () => {
	const renderInput = (props = {}) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<Input variant="inline-edit" {...props} />
			</IconSettings>
		);
	};

	it('renders input with inline-edit variant', () => {
		const { container } = renderInput();

		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
	});

	it('displays label when provided', () => {
		renderInput({ label: 'Edit Name' });

		expect(screen.getByText('Edit Name')).toBeInTheDocument();
	});

	it('displays value', () => {
		const { container } = renderInput({ value: 'Test Value' });

		const input = container.querySelector('input');
		expect(input).toHaveValue('Test Value');
	});

	it('calls onChange when value changes', async () => {
		const onChange = vi.fn();
		const { container } = renderInput({ onChange });

		const input = container.querySelector('input');
		await userEvent.type(input, 'New Text');

		expect(onChange).toHaveBeenCalled();
	});

	it('displays placeholder', () => {
		const { container } = renderInput({ placeholder: 'Enter text' });

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('placeholder', 'Enter text');
	});

	it('supports disabled state', () => {
		const { container } = renderInput({ disabled: true });

		const input = container.querySelector('input');
		expect(input).toBeDisabled();
	});

	it('supports required attribute', () => {
		const { container } = renderInput({ required: true });

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('required');
	});

	it('displays error state', () => {
		const { container } = renderInput({
			errorText: 'This field is required',
		});

		expect(screen.getByText('This field is required')).toBeInTheDocument();
	});

	it('calls onBlur when input loses focus', async () => {
		const onBlur = vi.fn();
		const { container } = renderInput({ onBlur });

		const input = container.querySelector('input');
		input.focus();
		input.blur();

		expect(onBlur).toHaveBeenCalled();
	});

	it('calls onFocus when input gains focus', async () => {
		const onFocus = vi.fn();
		const { container } = renderInput({ onFocus });

		const input = container.querySelector('input');
		input.focus();

		expect(onFocus).toHaveBeenCalled();
	});

	it('applies custom id', () => {
		const { container } = renderInput({ id: 'custom-input-id' });

		const input = container.querySelector('#custom-input-id');
		expect(input).toBeInTheDocument();
	});

	it('applies custom className', () => {
		const { container } = renderInput({ className: 'custom-class' });

		// Check container or form element has custom class
		const formElement = container.querySelector('.custom-class');
		expect(formElement).toBeInTheDocument();
	});
});
