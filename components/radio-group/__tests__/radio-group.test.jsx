import { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import RadioGroup from '../';
import Radio from '../radio';

const values = ['Radio Label One', 'Radio Label Two'];

const RadioGroupExample = ({
	labels = { label: 'Radio Group Label' },
	initialValue = 'Radio Label One',
	onChange,
	...rest
}) => {
	const [value, setValue] = useState(initialValue);
	return (
		<RadioGroup
			labels={labels}
			value={value}
			onChange={(event, data) => {
				onChange?.(event, data);
				setValue(data.value);
			}}
			{...rest}
		>
			{values.map((radioValue) => (
				<Radio
					key={radioValue}
					labels={{ label: radioValue }}
					value={radioValue}
					variant="base"
				/>
			))}
		</RadioGroup>
	);
};

const getRadio = (container, value) =>
	container.querySelector(`input[value="${value}"]`);

describe('RadioGroup', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders a radio group', () => {
		const { container } = render(<RadioGroupExample />);

		const radios = container.querySelectorAll('input[type="radio"]');
		expect(radios).toHaveLength(2);

		expect(getRadio(container, 'Radio Label One')).toBeChecked();
		expect(getRadio(container, 'Radio Label Two')).not.toBeChecked();

		const legend = container.querySelector('legend');
		expect(legend).toBeInTheDocument();
		expect(legend.textContent).toBe('Radio Group Label');
	});

	it('renders a disabled state', () => {
		const { container } = render(<RadioGroupExample disabled />);

		const radios = container.querySelectorAll('input[type="radio"]');
		radios.forEach((radio) => {
			expect(radio).toBeDisabled();
		});
	});

	it('renders a required indicator', () => {
		const { container } = render(<RadioGroupExample required />);

		const abbr = container.querySelector('abbr');
		expect(abbr).toBeInTheDocument();
		expect(abbr.textContent).toContain('Required');
	});

	it('selects the radio the parent stores from onChange', () => {
		const onChange = vi.fn();
		const { container } = render(<RadioGroupExample onChange={onChange} />);

		fireEvent.click(getRadio(container, 'Radio Label Two'));

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][0].target).toBe(
			getRadio(container, 'Radio Label Two')
		);
		expect(onChange.mock.calls[0][1]).toEqual({
			value: 'Radio Label Two',
			checked: true,
		});
		expect(getRadio(container, 'Radio Label Two')).toBeChecked();
		expect(getRadio(container, 'Radio Label One')).not.toBeChecked();
	});

	it('honors value: selection does not change unless the parent updates it', () => {
		const onChange = vi.fn();
		const { container, rerender } = render(
			<RadioGroup value="a" onChange={onChange}>
				<Radio labels={{ label: 'A' }} value="a" />
				<Radio labels={{ label: 'B' }} value="b" />
			</RadioGroup>
		);

		fireEvent.click(getRadio(container, 'b'));
		expect(onChange.mock.calls[0][1]).toEqual({ value: 'b', checked: true });
		expect(getRadio(container, 'a')).toBeChecked();
		expect(getRadio(container, 'b')).not.toBeChecked();

		rerender(
			<RadioGroup value="b" onChange={onChange}>
				<Radio labels={{ label: 'A' }} value="a" />
				<Radio labels={{ label: 'B' }} value="b" />
			</RadioGroup>
		);
		expect(getRadio(container, 'a')).not.toBeChecked();
		expect(getRadio(container, 'b')).toBeChecked();
	});

	it('renders no selection for value null and ignores checked on children', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const { container } = render(
			<RadioGroup value={null} onChange={() => {}}>
				<Radio labels={{ label: 'A' }} value="a" checked />
				<Radio labels={{ label: 'B' }} value="b" />
			</RadioGroup>
		);

		expect(getRadio(container, 'a')).not.toBeChecked();
		expect(getRadio(container, 'b')).not.toBeChecked();
		const messages = consoleError.mock.calls.map((args) => args.join(' '));
		expect(messages.some((m) => m.includes('SLDSRadioGroup'))).toBe(false);
	});

	it('reports value null when a deselectable radio is deselected', () => {
		const onChange = vi.fn();
		const { container } = render(
			<RadioGroup value="a" onChange={onChange}>
				<Radio labels={{ label: 'A' }} value="a" deselectable />
				<Radio labels={{ label: 'B' }} value="b" deselectable />
			</RadioGroup>
		);

		fireEvent.click(getRadio(container, 'a'));
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toEqual({ value: null, checked: false });
		expect(getRadio(container, 'a')).toBeChecked();
	});

	it('still supports checked on each Radio without a group value, and warns', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		const LegacyExample = () => {
			const [checked, setChecked] = useState('a');
			return (
				<RadioGroup onChange={(event) => setChecked(event.target.value)}>
					<Radio labels={{ label: 'A' }} value="a" checked={checked === 'a'} />
					<Radio labels={{ label: 'B' }} value="b" checked={checked === 'b'} />
				</RadioGroup>
			);
		};
		const { container } = render(<LegacyExample />);

		expect(getRadio(container, 'a')).toBeChecked();
		fireEvent.click(getRadio(container, 'b'));
		expect(getRadio(container, 'b')).toBeChecked();
		expect(getRadio(container, 'a')).not.toBeChecked();

		const messages = consoleError.mock.calls.map((args) => args.join(' '));
		const warnings = messages.filter(
			(m) => m.includes('SLDSRadioGroup') && m.includes('`value`')
		);
		expect(warnings).toHaveLength(1);
	});
});
