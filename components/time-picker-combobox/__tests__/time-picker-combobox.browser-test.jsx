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

import TimepickerCombobox from '..';
import IconSettings from '../../../components/icon-settings';

chai.use(chaiEnzyme());

const propTypes = {
	formatter: PropTypes.func,
	initialDate: PropTypes.instanceOf(Date),
	stepInMinutes: PropTypes.number,
};

class DemoComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selection: [] };
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<TimepickerCombobox
					{...this.props}
					id="test-timepicker"
					isOpen
					events={{
						onSelect: (event, data) => {
							console.log('onSelect ', data);
							this.setState({
								selection: data.selection,
							});
						},
					}}
				/>
			</IconSettings>
		);
	}
}

DemoComponent.displayName = 'DemoComponent';
DemoComponent.propTypes = propTypes;

const customFormatter = (date) => {
	if (date) {
		return date.toLocaleTimeString('en', {
			hour: 'numeric',
			minute: 'numeric',
		});
	}
	return null;
};

const getCustomOptions = () => {
	const options = [];
	const baseDate = new Date();
	baseDate.setHours(0);
	baseDate.setMinutes(0);
	baseDate.setSeconds(0);
	baseDate.setMilliseconds(0);

	const curDate = new Date(baseDate);
	let index = 0;

	while (baseDate.getDate() === curDate.getDate()) {
		const formatted = customFormatter(curDate);

		options.push({
			id: index.toString(),
			label: formatted,
			value: curDate,
		});

		curDate.setMinutes(curDate.getMinutes() + Math.random() * 59 + 1);
		index += 1;
	}
	return options;
};

const resetTime = (date) => {
	date.setHours(1);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date;
};

describe('Timepicker Combobox: ', function describeFunction() {
	let mountNode;
	let wrapper;
	describe('Default', () => {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
			wrapper = mount(<DemoComponent />, { attachTo: mountNode });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('renders a timepicker', () => {
			const timepicker = wrapper.find(TimepickerCombobox);
			expect(timepicker).to.be.present;
		});

		it('generates default number of options', () => {
			const listElements = wrapper.find('.slds-listbox__option');
			expect(listElements).to.have.lengthOf(48);
		});
	});

	describe('Optional Props', () => {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('changes the number of options when pass stepInMinutes', () => {
			wrapper = mount(<DemoComponent stepInMinutes={60} />, {
				attachTo: mountNode,
			});
			const listElements = wrapper.find('.slds-listbox__option');
			expect(listElements).to.have.lengthOf(24);
		});

		it('changes the format of options when pass formatter', () => {
			wrapper = mount(<DemoComponent formatter={customFormatter} />, {
				attachTo: mountNode,
			});
			const baseDate = resetTime(new Date());
			const formattedDate = customFormatter(baseDate);
			wrapper.find('#test-timepicker-listbox-option-2').simulate('click');
			const selectedLabel = wrapper.state('selection')[0].label;
			expect(selectedLabel).to.equal(formattedDate);
		});

		it('changes the day when pass initialDate', () => {
			const futureDate = resetTime(
				new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
			);
			wrapper = mount(<DemoComponent initialDate={futureDate} />, {
				attachTo: mountNode,
			});
			wrapper.find('#test-timepicker-listbox-option-2').simulate('click');
			const selectedTime = wrapper.state('selection')[0].value.getTime();
			expect(selectedTime).to.equal(futureDate.getTime());
		});

		it('uses custom options when pass options', () => {
			const customOptions = getCustomOptions();
			wrapper = mount(<DemoComponent options={customOptions} />, {
				attachTo: mountNode,
			});
			wrapper.find('#test-timepicker-listbox-option-2').simulate('click');
			const selectedTime = wrapper.state('selection')[0].value.getTime();
			expect(selectedTime).to.equal(customOptions[2].value.getTime());
		});
	});
});
