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

import RadioButtonGroup from '../../radio-button-group';
import Radio from '../../radio-button-group/radio';

chai.use(chaiEnzyme());

/* Re-usable demo component.
 */
class RadioButtonGroupExample extends React.Component {
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

RadioButtonGroupExample.propTypes = {
	labels: PropTypes.shape({
		error: PropTypes.string,
		label: PropTypes.string,
	}),
	disabled: PropTypes.bool,
	required: PropTypes.bool,
};

RadioButtonGroupExample.defaultProps = {
	labels: { label: 'Day of week' },
};

/* RadioButtonGroup rendering tests
 */
describe('RadioButtonGroup', function () {
	let mountNode;
	let wrapper;

	beforeEach(() => {
		mountNode = createMountNode({ context: this });
	});

	afterEach(() => {
		destroyMountNode({ wrapper, mountNode });
	});

	it('renders a radio button group', () => {
		wrapper = mount(<RadioButtonGroupExample />, { attachTo: mountNode });
		const radios = wrapper.find(Radio);
		expect(radios).to.have.lengthOf(5, 'there are five radio inputs');
		radios.forEach((radioWrapper, index) => {
			const radio = radios.get(index);
			expect(radio.props.checked).to.equal(
				radio.props.labels.label === 'Tue',
				'the second radio input is checked'
			);
		});
		const legend = wrapper.find('legend');
		expect(legend.text()).to.equal('Day of week', 'there is a label');
	});

	it('renders a disabled state', () => {
		wrapper = mount(<RadioButtonGroupExample disabled />, {
			attachTo: mountNode,
		});
		const radios = wrapper.find(Radio);
		radios.forEach((radioWrapper, index) => {
			const radio = radios.get(index);
			expect(radio.props.disabled, 'all radio inputs are disabled').to.be.true;
		});
	});

	it('renders a required indicator', () => {
		wrapper = mount(<RadioButtonGroupExample required />, {
			attachTo: mountNode,
		});
		const abbr = wrapper.find('abbr');
		expect(abbr.text()).to.equal('*Required ', 'there is a required indicator');
	});

	it('triggers a change callback', () => {
		wrapper = mount(<RadioButtonGroupExample />, { attachTo: mountNode });
		let radio = wrapper.find({ value: 'Mon' }).find('input');
		expect(radio.props().checked).to.be.false;
		radio.simulate('change', { event: { target: 'Mon' } });
		radio = wrapper.find({ value: 'Mon' }).find('input');
		expect(radio).to.have.prop('checked', true);
	});
});
