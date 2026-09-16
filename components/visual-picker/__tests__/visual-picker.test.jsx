import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import IconSettings from '../../icon-settings';
import Icon from '../../icon';
import VisualPicker from '../../visual-picker';
import Radio from '../../radio';
import Checkbox from '../../checkbox';

class VisualPickerExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = { checked: this.props.checked };
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<VisualPicker
					label={this.props.label}
					id={this.props.id}
					size="medium"
					coverable
				>
					{this.props.type === 'radio' ? (
						<React.Fragment>
							<Radio
								labels={{
									label: 'Connected App',
								}}
								id={`${this.props.id}-1`}
								value="1"
								checked={this.state.checked === '1'}
								onChange={() => this.setState({ checked: '1' })}
								onRenderVisualPickerSelected={() => (
									<Icon
										assistiveText={{ label: 'selected-icon' }}
										category="utility"
										name="check"
										colorVariant="base"
										size="large"
									/>
								)}
								onRenderVisualPickerNotSelected={() => (
									<Icon
										assistiveText={{ label: 'connected_apps-icon' }}
										category="utility"
										name="connected_apps"
										size="large"
									/>
								)}
							/>
							<Radio
								labels={{
									label: 'Custom App',
								}}
								id={`${this.props.id}-2`}
								value="2"
								checked={this.state.checked === '2'}
								onChange={() => this.setState({ checked: '2' })}
								onRenderVisualPickerSelected={() => (
									<Icon
										assistiveText={{ label: 'selected-icon' }}
										category="utility"
										name="check"
										colorVariant="base"
										size="large"
									/>
								)}
								onRenderVisualPickerNotSelected={() => (
									<Icon
										assistiveText={{ label: 'custom_apps-icon' }}
										category="utility"
										name="custom_apps"
										size="large"
									/>
								)}
							/>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Checkbox
								labels={{
									label: 'Account',
								}}
								value="1"
								checked={this.state.checked.includes('1')}
								onChange={() => {
									if (this.state.checked.includes('1'))
										this.setState({
											checked: this.state.checked.filter(
												(item) => item !== '1'
											),
										});
									else this.setState({ checked: [...this.state.checked, '1'] });
								}}
								id="visual-picker-coverable-checkbox-1"
								onRenderVisualPickerSelected={() => (
									<Icon
										assistiveText={this.props.assistiveText}
										category="utility"
										name="check"
										colorVariant="base"
										size="large"
									/>
								)}
								onRenderVisualPickerNotSelected={() => (
									<Icon
										assistiveText={this.props.assistiveText}
										category="standard"
										name="account"
										size="large"
									/>
								)}
							/>
							<Checkbox
								labels={{
									label: 'Lead',
								}}
								value="2"
								checked={this.state.checked.includes('2')}
								onChange={() => {
									if (this.state.checked.includes('2'))
										this.setState({
											checked: this.state.checked.filter(
												(item) => item !== '2'
											),
										});
									else this.setState({ checked: [...this.state.checked, '2'] });
								}}
								id="visual-picker-coverable-checkbox-2"
								onRenderVisualPickerSelected={() => (
									<Icon
										assistiveText={this.props.assistiveText}
										category="utility"
										name="check"
										colorVariant="base"
										size="large"
									/>
								)}
								onRenderVisualPickerNotSelected={() => (
									<Icon
										assistiveText={this.props.assistiveText}
										category="standard"
										name="lead"
										size="large"
									/>
								)}
							/>
							<Checkbox
								labels={{
									label: 'Orders',
								}}
								value="3"
								checked={this.state.checked.includes('3')}
								onChange={() => {
									if (this.state.checked.includes('3'))
										this.setState({
											checked: this.state.checked.filter(
												(item) => item !== '3'
											),
										});
									else {
										this.setState({ checked: [...this.state.checked, '3'] });
									}
								}}
								id="visual-picker-coverable-checkbox-3"
								onRenderVisualPickerSelected={() => (
									<Icon
										assistiveText={this.props.assistiveText}
										category="utility"
										name="check"
										colorVariant="base"
										size="large"
									/>
								)}
								onRenderVisualPickerNotSelected={() => (
									<Icon
										assistiveText={this.props.assistiveText}
										category="standard"
										name="orders"
										size="large"
									/>
								)}
							/>
						</React.Fragment>
					)}
				</VisualPicker>
			</IconSettings>
		);
	}
}

VisualPickerExample.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	checked: PropTypes.any,
	type: PropTypes.oneOf(['radio', 'checkbox']),
	assistiveText: PropTypes.object,
};

VisualPickerExample.defaultProps = {
	type: 'radio',
	checked: null,
};

describe('SLDS Visual Picker', () => {
	it('radio switching works correctly', () => {
		const { container } = render(
			<VisualPickerExample label="Select any one" type="radio" checked="1" id="vp-test" />
		);

		// Get the radio inputs
		const radio1 = container.querySelector('input[value="1"]');
		const radio2 = container.querySelector('input[value="2"]');

		// Check if the first option alone is selected initially
		expect(radio1).toBeChecked();
		expect(radio2).not.toBeChecked();

		// Click on radio 2, and switch the option
		fireEvent.click(radio2);

		// Check if only the second option is selected
		expect(radio1).not.toBeChecked();
		expect(radio2).toBeChecked();
	});

	it('checkbox selection works correctly', () => {
		const { container } = render(
			<VisualPickerExample
				label="Select any one"
				type="checkbox"
				checked={['1']}
				id="vp-test"
			/>
		);

		// Get the checkbox inputs
		const cb1 = container.querySelector('#visual-picker-coverable-checkbox-1');
		const cb2 = container.querySelector('#visual-picker-coverable-checkbox-2');
		const cb3 = container.querySelector('#visual-picker-coverable-checkbox-3');

		// Check if the first option alone is selected initially
		expect(cb1).toBeChecked();
		expect(cb2).not.toBeChecked();
		expect(cb3).not.toBeChecked();

		// Click on each of the checkbox options
		fireEvent.click(cb1);
		fireEvent.click(cb2);
		fireEvent.click(cb3);

		// Check if all options except first option is selected
		expect(cb1).not.toBeChecked();
		expect(cb2).toBeChecked();
		expect(cb3).toBeChecked();
	});
});
