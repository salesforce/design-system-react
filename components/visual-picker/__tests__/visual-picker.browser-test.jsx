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
// import Checkbox from '../../checkbox';

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
					size={this.props.size}
					coverable={this.props.coverable}
					vertical={this.props.vertical}
					id="visual-picker-coverable-radio"
				>
					<Radio
						labels={{
							label: 'Connected App',
						}}
						id="visual-picker-coverable-radio-1"
						value="1"
						checked={this.state.checked === '1'}
						onChange={() => this.setState({ checked: '1' })}
						onRenderVisualPickerSelected={
							<Icon
								assistiveText={{ label: 'selected-icon' }}
								category="utility"
								name="check"
								colorVariant="base"
								size="large"
							/>
						}
						onRenderVisualPickerNotSelected={
							<Icon
								assistiveText={{ label: 'connected_apps-icon' }}
								category="utility"
								name="connected_apps"
								size="large"
							/>
						}
					/>
					<Radio
						labels={{
							label: 'Custom App',
						}}
						id="visual-picker-coverable-radio-2"
						value="2"
						checked={this.state.checked === '2'}
						onChange={() => this.setState({ checked: '2' })}
						onRenderVisualPickerSelected={
							<Icon
								assistiveText={{ label: 'selected-icon' }}
								category="utility"
								name="check"
								colorVariant="base"
								size="large"
							/>
						}
						onRenderVisualPickerNotSelected={
							<Icon
								assistiveText={{ label: 'custom_apps-icon' }}
								category="utility"
								name="custom_apps"
								size="large"
							/>
						}
					/>
				</VisualPicker>
			</IconSettings>
		);
	}
}

VisualPickerExample.propTypes = {
	label: PropTypes.string,
	checked: PropTypes.string,
	coverable: PropTypes.bool,
	vertical: PropTypes.bool,
	size: PropTypes.oneOf(['medium', 'large']),
};

VisualPickerExample.defaultProps = {
	size: 'medium',
	checked: null,
};

/* VisualPicker rendering tests
 */
describe('SLDS Visual Picker', function() {
	let mountNode;
	let wrapper;

	beforeEach(() => {
		mountNode = createMountNode({ context: this });
	});

	afterEach(() => {
		destroyMountNode({ wrapper, mountNode });
	});

	it('renders coverable visual picker radio variant', () => {
		wrapper = mount(
			<VisualPickerExample label="Select any one" coverable checked="1" />,
			{ attachTo: mountNode }
		);
		const radios = wrapper.find(Radio);
		expect(radios).to.have.lengthOf(2, 'there are two radio inputs');
		const legend = wrapper.find('legend');
		const div = wrapper.find({ value: '1' }).find('label div');
		expect(div.props().className).to.equal(
			'slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center'
		);
		expect(legend.text()).to.equal('Select any one', 'there is a label');
	});

	it('radio option switching works correctly', () => {
		wrapper = mount(
			<VisualPickerExample label="Select any one" coverable checked="1" />,
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
});
