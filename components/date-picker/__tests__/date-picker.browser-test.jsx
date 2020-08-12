// Import your external dependencies
import React from 'react';

import PropTypes from 'prop-types';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import moment from 'moment';
import { mount } from 'enzyme';
import IconSettings from '../../icon-settings';

// Import your internal dependencies (for example):
import Datepicker from '../../date-picker';
import Input from '../../input';
import KEYS from '../../../utilities/key-code';

// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

const makeRtl = (component) => (
	// eslint-disable-next-line
	<UNSAFE_DirectionSettings.Provider value="rtl">
		<div dir="rtl">{component}</div>
	</UNSAFE_DirectionSettings.Provider>
);

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const defaultProps = {
	id: 'sample-datepicker',
	value: new Date(2007, 0, 6),
};

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
class DemoComponent extends React.Component {
	static displayName = 'DatepickerDemoComponent';

	static propTypes = {
		isOpen: PropTypes.bool,
		isRtl: PropTypes.bool,
	};

	static defaultProps = defaultProps;

	state = {};

	// event handlers

	render() {
		const component = (
			<IconSettings iconPath="/assets/icons">
				<Datepicker
					formatter={(date) => {
						return date ? moment(date).format('M/D/YYYY') : '';
					}}
					parser={(dateString) => {
						return moment(dateString, 'MM-DD-YYYY').toDate();
					}}
					{...this.props}
				/>
			</IconSettings>
		);

		return this.props.isRtl ? makeRtl(component) : component;
	}
}

/* All tests for component being tested should be wrapped in a root `describe`,
 * which should be named after the component being tested.
 * When read aloud, the cumulative `describe` and `it` names should form a coherent
 * sentence, eg "Date Picker default structure and css is present with expected
 * attributes set". If you are having trouble constructing a cumulative short
 * sentence, this may be an indicator that your test is poorly structured.
 * String provided as first parameter names the `describe` section. Limit to nouns
 * as much as possible/appropriate.`
 */
describe('SLDSDatepicker', function describeFunction() {
	let wrapper;

	const triggerClassSelector = 'button.slds-input__icon';

	describe('Assistive technology', () => {
		afterEach(() => wrapper.unmount());

		it('has aria-haspopup, correct aria-expanded on input trigger.', function () {
			wrapper = mount(<DemoComponent isOpen />);

			const inputTrigger = wrapper.find(triggerClassSelector);
			expect(inputTrigger).to.have.attr('aria-haspopup', 'true');

			const ariaExpanded = inputTrigger.find('button');
			expect(ariaExpanded).to.have.attr('aria-expanded', 'true');
		});
	});

	// PROPS AND CHILDREN

	describe('Optional props', () => {
		const customPlaceholder = 'With custom Input';
		const optionalProps = {
			input: <Input placeholder={customPlaceholder} />,
		};

		afterEach(() => wrapper.unmount());

		it('has custom input with custom placeholder', function () {
			wrapper = mount(<DemoComponent {...optionalProps} />);

			expect(wrapper.find('input')).to.have.attr(
				'placeholder',
				customPlaceholder
			);
		});
	});

	// EVENTS

	describe('onClose, onRequestClose, onOpen callbacks are set', function describeFunction2() {
		afterEach(() => wrapper.unmount());

		it('onOpen is executed when trigger is clicked, onClose is executed when date is selected', function (done) {
			wrapper = mount(
				<DemoComponent
					menuPosition="relative"
					onClose={() => {
						setTimeout(() => {
							const month = wrapper.find('.datepicker__month');
							expect(month).to.not.be.present;
							done();
						}, 0);
					}}
					onRequestClose={() => {
						const month = wrapper.find('.datepicker__month');
						expect(month).to.be.present;
					}}
					onOpen={() => {
						setTimeout(() => {
							const firstDayOfMonth = wrapper
								.find('.datepicker__month [aria-disabled=false]')
								.first();
							expect(firstDayOfMonth).to.be.present;
							firstDayOfMonth.simulate('click', {});
						}, 0);
					}}
				/>
			);

			const trigger = wrapper.find(triggerClassSelector);
			trigger.simulate('click', {});
		});

		it('onChange is triggered when date is selected', function (done) {
			wrapper = mount(
				<DemoComponent
					menuPosition="relative"
					onChange={(event, data) => {
						setTimeout(() => {
							// test callback parameters
							expect(data.date.getTime()).to.equal(
								new Date('1/1/2007').getTime()
							);
							expect(data.formattedDate).to.equal('1/1/2007');

							done();
						}, 0);
					}}
					onOpen={() => {
						setTimeout(() => {
							const firstDayOfMonth = wrapper
								.find('.datepicker__month [aria-disabled=false]')
								.first();
							expect(firstDayOfMonth).to.exist;
							firstDayOfMonth.simulate('click', {});
						});
					}}
				/>
			);

			const trigger = wrapper.find(triggerClassSelector);
			trigger.simulate('click', {});
		});
	});

	describe('keyboard interactions', () => {
		/* Test event callback functions using Simulate. For more information, view
		 * https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/simulate.md
		 */
		describe('Esc when menu is open', function () {
			afterEach(() => wrapper.unmount());

			it('opens on trigger click, closes on ESC', function (done) {
				wrapper = mount(
					<DemoComponent
						menuPosition="relative"
						onClose={() => {
							setTimeout(() => {
								const month = wrapper.find('.datepicker__month');
								expect(month).to.not.be.present;
								done();
							}, 0);
						}}
						onOpen={() => {
							setTimeout(() => {
								const firstDayOfMonth = wrapper
									.find('.datepicker__month [aria-disabled=false]')
									.first();
								firstDayOfMonth.simulate('keyDown', {
									key: 'Esc',
									keyCode: KEYS.ESCAPE,
									which: KEYS.ESCAPE,
								});
							}, 0);
						}}
					/>
				);

				const trigger = wrapper.find(triggerClassSelector);
				trigger.simulate('click', {});
			});

			it('navigates to next week', function (done) {
				wrapper = mount(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={(event, data) => {
							expect(data.date.getTime()).to.equal(
								new Date(2007, 0, 13).getTime()
							);
							done();
						}}
					/>
				);

				const selectedDay = wrapper.find(
					'.datepicker__month [aria-selected=true]'
				);
				selectedDay.simulate('keyDown', {
					key: 'Down',
					keyCode: KEYS.DOWN,
					which: KEYS.DOWN,
				});
			});

			it('navigates to next day', function (done) {
				wrapper = mount(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={(event, data) => {
							expect(data.date.getTime()).to.equal(
								new Date(2007, 0, 7).getTime()
							);
							done();
						}}
					/>
				);

				const selectedDay = wrapper.find(
					'.datepicker__month [aria-selected=true]'
				);
				selectedDay.simulate('keyDown', {
					key: 'Right',
					keyCode: KEYS.RIGHT,
					which: KEYS.RIGHT,
				});
			});

			it('navigates to next day with the opposite button for RTL', function (done) {
				wrapper = mount(
					<DemoComponent
						isRtl
						isOpen
						menuPosition="relative"
						onCalendarFocus={(event, data) => {
							expect(data.date.getTime()).to.equal(
								new Date(2007, 0, 7).getTime()
							);
							done();
						}}
					/>
				);

				const selectedDay = wrapper.find(
					'.datepicker__month [aria-selected=true]'
				);
				selectedDay.simulate('keyDown', {
					key: 'Left',
					keyCode: KEYS.LEFT,
					which: KEYS.LEFT,
				});
			});

			it('navigates to previous week (that is of a previous month)', function (done) {
				wrapper = mount(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={(event, data) => {
							expect(data.date.getTime()).to.equal(
								new Date(2006, 11, 30).getTime()
							);
							done();
						}}
					/>
				);

				const selectedDay = wrapper.find(
					'.datepicker__month [aria-selected=true]'
				);
				selectedDay.simulate('keyDown', {
					key: 'Up',
					keyCode: KEYS.UP,
					which: KEYS.UP,
				});
			});

			it('navigates to previous day', function (done) {
				wrapper = mount(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={(event, data) => {
							expect(data.date.getTime()).to.equal(
								new Date(2007, 0, 5).getTime()
							);
							done();
						}}
					/>
				);

				const selectedDay = wrapper.find(
					'.datepicker__month [aria-selected=true]'
				);
				selectedDay.simulate('keyDown', {
					key: 'Left',
					keyCode: KEYS.LEFT,
					which: KEYS.LEFT,
				});
			});

			it('navigates to previous day with the opposite button for RTL', function (done) {
				wrapper = mount(
					<DemoComponent
						isRtl
						isOpen
						menuPosition="relative"
						onCalendarFocus={(event, data) => {
							expect(data.date.getTime()).to.equal(
								new Date(2007, 0, 5).getTime()
							);
							done();
						}}
					/>
				);

				const selectedDay = wrapper.find(
					'.datepicker__month [aria-selected=true]'
				);
				selectedDay.simulate('keyDown', {
					key: 'Right',
					keyCode: KEYS.RIGHT,
					which: KEYS.RIGHT,
				});
			});

			it('calendar blur, focus on previous month button', function (done) {
				wrapper = mount(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={(event, data) => {
							expect(data.ref.textContent).to.equal('Previous month');
							done();
						}}
					/>
				);

				const selectedDay = wrapper.find(
					'.datepicker__month [aria-selected=true]'
				);
				selectedDay.simulate('keyDown', {
					key: 'Tab',
					keyCode: KEYS.TAB,
					which: KEYS.TAB,
				});
			});

			it('calendar blur, focus on today', function (done) {
				wrapper = mount(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={(event, data) => {
							expect(data.ref.textContent).to.equal('Today');
							done();
						}}
					/>
				);

				const selectedDay = wrapper.find(
					'.datepicker__month [aria-selected=true]'
				);
				selectedDay.simulate('keyDown', {
					key: 'Tab',
					keyCode: KEYS.TAB,
					shiftKey: true,
					which: KEYS.TAB,
				});
			});

			it('typing in input closes calendar', function () {
				wrapper = mount(<DemoComponent menuPosition="relative" />);

				// Calendar is closed
				expect(wrapper.find('.slds-datepicker').length).to.equal(0);

				// Click on input to open the calendar
				const trigger = wrapper.find(triggerClassSelector);
				trigger.simulate('click', {});
				expect(wrapper.find('.slds-datepicker').length).to.equal(1);

				// Changing input value closes the calendar
				const input = wrapper.find('input#sample-datepicker');
				input.simulate('change', { target: { value: '1/1/2020' } });
				expect(wrapper.find('.slds-datepicker').length).to.equal(0);
			});
		});
	});

	describe('Disabled', function describeFunction2() {
		const triggerClicked = sinon.spy();
		const dialogOpened = sinon.spy();

		afterEach(() => wrapper.unmount());

		it('onOpen is not called when disabled', function () {
			wrapper = mount(
				<DemoComponent
					disabled
					menuPosition="relative"
					onClick={triggerClicked}
					onOpen={dialogOpened}
				/>
			);

			wrapper.simulate('click', {});

			expect(dialogOpened.callCount).to.equal(0);
		});
	});

	describe('Disable dates', () => {
		afterEach(() => wrapper.unmount());

		it('disable weekends', (done) => {
			// this only tests if onChange fires
			const handleChangeSpy = sinon.spy();
			wrapper = mount(
				<DemoComponent
					isOpen
					menuPosition="relative"
					value={new Date(2007, 0, 5)}
					dateDisabled={({ date }) => date.getDay() > 5 || date.getDay() < 1}
					onChange={handleChangeSpy}
				/>
			);

			const input = wrapper.find('input').first();
			expect(input).to.have.value('1/5/2007');

			const disabledDay = wrapper
				.find('.datepicker__month [aria-disabled=true]')
				.first();
			disabledDay.simulate('click', {});

			expect(handleChangeSpy.calledOnce).to.equal(false);

			const day = wrapper
				.find('.datepicker__month [aria-disabled=false]')
				.first();
			day.simulate('click', {});

			expect(handleChangeSpy.calledOnce).to.equal(true);
			done();

			const trigger = wrapper.find(triggerClassSelector);
			trigger.simulate('click', {});
		});
	});
});
