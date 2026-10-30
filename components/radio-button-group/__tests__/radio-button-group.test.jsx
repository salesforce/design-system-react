import { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import RadioButtonGroup from '../';
import Radio from '../radio';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const RadioButtonGroupExample = ({
	labels = { label: 'Day of week' },
	onChange,
	...rest
}) => {
	const [value, setValue] = useState('Tue');
	return (
		<RadioButtonGroup
			labels={labels}
			value={value}
			onChange={(event, data) => {
				onChange?.(event, data);
				setValue(data.value);
			}}
			{...rest}
		>
			{days.map((day) => (
				<Radio
					key={day}
					labels={{ label: day }}
					value={day}
					variant="button-group"
				/>
			))}
		</RadioButtonGroup>
	);
};

const getRadio = (container, value) =>
	container.querySelector(`input[value="${value}"]`);

describe('RadioButtonGroup', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders a radio button group', () => {
		const { container } = render(<RadioButtonGroupExample />);

		const radios = container.querySelectorAll('input[type="radio"]');
		expect(radios).toHaveLength(5);

		expect(getRadio(container, 'Tue')).toBeChecked();
		expect(getRadio(container, 'Mon')).not.toBeChecked();

		const legend = container.querySelector('legend');
		expect(legend).toBeInTheDocument();
		expect(legend.textContent).toBe('Day of week');
	});

	it('renders a disabled state', () => {
		const { container } = render(<RadioButtonGroupExample disabled />);

		const radios = container.querySelectorAll('input[type="radio"]');
		radios.forEach((radio) => {
			expect(radio).toBeDisabled();
		});
	});

	it('renders a required indicator', () => {
		const { container } = render(<RadioButtonGroupExample required />);

		const abbr = container.querySelector('abbr');
		expect(abbr).toBeInTheDocument();
		expect(abbr.textContent).toContain('Required');
	});

	it('triggers a change callback with the requested value', () => {
		const onChange = vi.fn();
		const { container } = render(
			<RadioButtonGroupExample onChange={onChange} />
		);

		fireEvent.click(getRadio(container, 'Mon'));

		expect(onChange.mock.calls[0][1]).toEqual({ value: 'Mon', checked: true });
		expect(getRadio(container, 'Mon')).toBeChecked();
		expect(getRadio(container, 'Tue')).not.toBeChecked();
	});

	it('honors value: selection does not change unless the parent updates it', () => {
		const onChange = vi.fn();
		const { container } = render(
			<RadioButtonGroup value="Tue" onChange={onChange}>
				{days.map((day) => (
					<Radio
						key={day}
						labels={{ label: day }}
						value={day}
						variant="button-group"
					/>
				))}
			</RadioButtonGroup>
		);

		fireEvent.click(getRadio(container, 'Mon'));
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(getRadio(container, 'Tue')).toBeChecked();
		expect(getRadio(container, 'Mon')).not.toBeChecked();
	});

	it('still supports checked on each Radio without a group value, and warns', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		const LegacyExample = () => {
			const [checked, setChecked] = useState('Tue');
			return (
				<RadioButtonGroup onChange={(event) => setChecked(event.target.value)}>
					{days.map((day) => (
						<Radio
							key={day}
							labels={{ label: day }}
							value={day}
							checked={checked === day}
							variant="button-group"
						/>
					))}
				</RadioButtonGroup>
			);
		};
		const { container } = render(<LegacyExample />);

		fireEvent.click(getRadio(container, 'Mon'));
		expect(getRadio(container, 'Mon')).toBeChecked();
		expect(getRadio(container, 'Tue')).not.toBeChecked();

		const messages = consoleError.mock.calls.map((args) => args.join(' '));
		expect(
			messages.some((m) => m.includes('`checked`') && m.includes('`value`'))
		).toBe(true);
	});
});
