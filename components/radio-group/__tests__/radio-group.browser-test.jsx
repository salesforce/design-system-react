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

import RadioGroup from '../../radio-group';
import Radio from '../../radio-group/radio';

chai.use(chaiEnzyme());

/* Re-usable demo component.
 */
class RadioGroupExample extends React.Component {
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

RadioGroupExample.propTypes = {
	labels: PropTypes.shape({
		error: PropTypes.string,
		label: PropTypes.string,
	}),
	disabled: PropTypes.bool,
	required: PropTypes.bool,
};

RadioGroupExample.defaultProps = {
	labels: { label: 'Radio Group Label' },
};

/* RadioGroup rendering tests
 */
describe('RadioGroup', function () {
	let mountNode;
	let wrapper;

	beforeEach(() => {
		mountNode = createMountNode({ context: this });
	});

	afterEach(() => {
		destroyMountNode({ wrapper, mountNode });
	});

	it('renders a radio group', () => {
		wrapper = mount(<RadioGroupExample />, { attachTo: mountNode });
		const radios = wrapper.find(Radio);
		expect(radios).to.have.lengthOf(2, 'there are 2 radio inputs');
		radios.forEach((radioWrapper, index) => {
			const radio = radios.get(index);
			expect(radio.props.checked).to.equal(
				radio.props.labels.label === 'Radio Label One',
				'the second radio input is checked'
			);
		});

		const legend = wrapper.find('legend');
		expect(legend.text()).to.equal('Radio Group Label', 'there is a label');
	});

	it('renders a disabled state', () => {
		wrapper = mount(<RadioGroupExample disabled />, { attachTo: mountNode });
		const radios = wrapper.find(Radio);
		radios.forEach((radioWrapper, index) => {
			const radio = radios.get(index);
			expect(radio.props.disabled, 'all radio inputs are disabled').to.be.true;
		});
	});

	it('renders a required indicator', () => {
		wrapper = mount(<RadioGroupExample required />, { attachTo: mountNode });
		const abbr = wrapper.find('abbr');
		expect(abbr.text()).to.equal('*Required ', 'there is a required indicator');
	});

	it('triggers a change callback', () => {
		wrapper = mount(<RadioGroupExample />, { attachTo: mountNode });
		let radio = wrapper.find({ value: 'Radio Label Two' }).find('input');
		expect(radio).to.have.prop('checked', false);
		radio.simulate('change', { event: { target: 'Radio Label Two' } });
		radio = wrapper.find({ value: 'Radio Label Two' }).find('input');
		expect(radio).to.have.prop('checked', true);
	});
});
