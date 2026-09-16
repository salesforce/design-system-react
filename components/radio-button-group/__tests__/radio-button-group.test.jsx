import { Component } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import RadioButtonGroup from '../';
import Radio from '../radio';

class RadioButtonGroupExample extends Component {
	constructor(props) {
		super(props);
		this.state = { checked: 'Tue' };
	}

	render() {
		const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
		return (
			<RadioButtonGroup
				labels={this.props.labels}
				onChange={(event) => this.setState({ checked: event.target.value })}
				disabled={this.props.disabled}
				required={this.props.required}
			>
				{days.map((day) => (
					<Radio
						key={day}
						labels={{ label: day }}
						value={day}
						checked={this.state.checked === day}
						variant="button-group"
					/>
				))}
			</RadioButtonGroup>
		);
	}
}

RadioButtonGroupExample.defaultProps = {
	labels: { label: 'Day of week' },
};

describe('RadioButtonGroup', () => {
	it('renders a radio button group', () => {
		const { container } = render(<RadioButtonGroupExample />);

		const radios = container.querySelectorAll('input[type="radio"]');
		expect(radios).toHaveLength(5);

		// Check that the second radio (Tue) is checked
		const tueRadio = container.querySelector('input[value="Tue"]');
		expect(tueRadio).toBeChecked();

		// Check that others are not checked
		const monRadio = container.querySelector('input[value="Mon"]');
		expect(monRadio).not.toBeChecked();

		// Check for the legend
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

	it('triggers a change callback', () => {
		const { container } = render(<RadioButtonGroupExample />);

		// Initially Mon is not checked
		let monRadio = container.querySelector('input[value="Mon"]');
		expect(monRadio).not.toBeChecked();

		// Click Mon radio
		fireEvent.click(monRadio);

		// After click, Mon should be checked
		monRadio = container.querySelector('input[value="Mon"]');
		expect(monRadio).toBeChecked();

		// Tue should no longer be checked
		const tueRadio = container.querySelector('input[value="Tue"]');
		expect(tueRadio).not.toBeChecked();
	});
});
