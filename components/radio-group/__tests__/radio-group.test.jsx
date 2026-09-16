import { Component } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import RadioGroup from '../';
import Radio from '../radio';

class RadioGroupExample extends Component {
	constructor(props) {
		super(props);
		this.state = { checked: 'Radio Label One' };
	}

	render() {
		const values = ['Radio Label One', 'Radio Label Two'];
		return (
			<RadioGroup
				labels={this.props.labels}
				onChange={(event) => this.setState({ checked: event.target.value })}
				disabled={this.props.disabled}
				required={this.props.required}
			>
				{values.map((value) => (
					<Radio
						key={value}
						labels={{ label: value }}
						value={value}
						checked={this.state.checked === value}
						variant="base"
					/>
				))}
			</RadioGroup>
		);
	}
}

RadioGroupExample.defaultProps = {
	labels: { label: 'Radio Group Label' },
};

describe('RadioGroup', () => {
	it('renders a radio group', () => {
		const { container } = render(<RadioGroupExample />);

		const radios = container.querySelectorAll('input[type="radio"]');
		expect(radios).toHaveLength(2);

		// Check that the first radio is checked
		const radio1 = container.querySelector('input[value="Radio Label One"]');
		expect(radio1).toBeChecked();

		// Check that the second radio is not checked
		const radio2 = container.querySelector('input[value="Radio Label Two"]');
		expect(radio2).not.toBeChecked();

		// Check for the legend
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

	it('triggers a change callback', () => {
		const { container } = render(<RadioGroupExample />);

		// Initially Radio Label Two is not checked
		let radio2 = container.querySelector('input[value="Radio Label Two"]');
		expect(radio2).not.toBeChecked();

		// Click Radio Label Two
		fireEvent.click(radio2);

		// After click, Radio Label Two should be checked
		radio2 = container.querySelector('input[value="Radio Label Two"]');
		expect(radio2).toBeChecked();

		// Radio Label One should no longer be checked
		const radio1 = container.querySelector('input[value="Radio Label One"]');
		expect(radio1).not.toBeChecked();
	});
});
