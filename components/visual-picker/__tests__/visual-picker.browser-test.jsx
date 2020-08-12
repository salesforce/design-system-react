import React from 'react';
import PropTypes from 'prop-types';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import {
	createMountNode,
	destroyMountNode,
} from '../../../tests/enzyme-helpers';

import IconSettings from '../../icon-settings';
import Icon from '../../icon';
import VisualPicker from '../../visual-picker';
import Radio from '../../radio';
import Checkbox from '../../checkbox';

chai.use(chaiEnzyme());

/* Re-usable demo component.
 */
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
};

VisualPickerExample.defaultProps = {
	type: 'radio',
	checked: null,
};

/* VisualPicker rendering tests
 */
describe('SLDS Visual Picker', function () {
	let mountNode;
	let wrapper;

	beforeEach(() => {
		mountNode = createMountNode({ context: this });
	});

	afterEach(() => {
		destroyMountNode({ wrapper, mountNode });
	});

	it('radio switching works correctly', () => {
		wrapper = mount(
			<VisualPickerExample label="Select any one" type="radio" checked="1" />,
			{ attachTo: mountNode }
		);
		// Get the radio options
		let radio1 = wrapper.find({ value: '1' }).find('input');
		let radio2 = wrapper.find({ value: '2' }).find('input');
		// Check if the first option alone is selected initially
		expect(radio1).to.have.prop('checked', true);
		expect(radio2).to.have.prop('checked', false);
		// Click on radio 2, and switch the option
		radio2.simulate('change');
		// Get both the radios again after the update
		radio1 = wrapper.find({ value: '1' }).find('input');
		radio2 = wrapper.find({ value: '2' }).find('input');
		// Check if only the second option is selected
		expect(radio1).to.have.prop('checked', false);
		expect(radio2).to.have.prop('checked', true);
	});

	it('checkbox selection works correctly', () => {
		wrapper = mount(
			<VisualPickerExample
				label="Select any one"
				type="checkbox"
				checked={['1']}
			/>,
			{ attachTo: mountNode }
		);
		// Get the checkbox options
		let cb1 = wrapper.find({ value: '1' }).find('input');
		let cb2 = wrapper.find({ value: '2' }).find('input');
		let cb3 = wrapper.find({ value: '3' }).find('input');
		// Check if the first option alone is selected initially
		expect(cb1).to.have.prop('checked', true);
		expect(cb2).to.have.prop('checked', false);
		expect(cb3).to.have.prop('checked', false);
		// Click on each of the checkbox options
		cb1.simulate('change');
		cb2.simulate('change');
		cb3.simulate('change');
		// Get the checkbox options again after the update
		cb1 = wrapper.find({ value: '1' }).find('input');
		cb2 = wrapper.find({ value: '2' }).find('input');
		cb3 = wrapper.find({ value: '3' }).find('input');
		// Check if all options except first option is selected
		expect(cb1).to.have.prop('checked', false);
		expect(cb2).to.have.prop('checked', true);
		expect(cb3).to.have.prop('checked', true);
	});
});
