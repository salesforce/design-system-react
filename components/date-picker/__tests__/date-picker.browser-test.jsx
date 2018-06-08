// Import your external dependencies
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import IconSettings from '../../icon-settings';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import {
	createMountNode,
	destroyMountNode,
} from '../../../tests/enzyme-helpers';

// Import your internal dependencies (for example):
import Datepicker from '../../date-picker';
import Input from '../../input';
import KEYS from '../../../utilities/key-code';

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
const DemoComponent = createReactClass({
	displayName: 'DatepickerDemoComponent',
	propTypes: {
		isOpen: PropTypes.bool,
	},

	getDefaultProps () {
		return defaultProps;
	},

	getInitialState () {
		return {};
	},

	// event handlers

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Datepicker {...this.props} />
			</IconSettings>
		);
	},
});

/* All tests for component being tested should be wrapped in a root `describe`,
 * which should be named after the component being tested.
 * When read aloud, the cumulative `describe` and `it` names should form a coherent
 * sentence, eg "Date Picker default structure and css is present with expected
 * attributes set". If you are having trouble constructing a cumulative short
 * sentence, this may be an indicator that your test is poorly structured.
 * String provided as first parameter names the `describe` section. Limit to nouns
 * as much as possible/appropriate.`
 */
describe('SLDSDatepicker', function () {
	let mountNode;
	let wrapper;

	const triggerClassSelector = '.slds-input__icon';

	describe('Assistive technology', () => {
		/* Detect if presence of accessibility features such as ARIA
		 * roles and screen reader text is present in the DOM.
		 */
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('has aria-haspopup, correct aria-expanded on input trigger.', function () {
			wrapper = mount(<DemoComponent isOpen />, { attachTo: mountNode });

			const inputTrigger = wrapper.find(triggerClassSelector);
			expect(inputTrigger.node.getAttribute('aria-haspopup')).to.equal('true');

			const ariaExpanded = inputTrigger
				.find('button')
				.node.getAttribute('aria-expanded');
			expect(ariaExpanded).to.equal('true');
		});
	});

	// PROPS AND CHILDREN

	describe('Optional props', () => {
		const customPlaceholder = 'With custom Input';
		const optionalProps = {
			children: <Input placeholder={customPlaceholder} value="" />,
		};

		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('has custom input with custom placeholder', function () {
			wrapper = mount(<DemoComponent {...optionalProps} />, {
				attachTo: mountNode,
			});

			expect(wrapper.find('input').node.getAttribute('placeholder')).to.equal(
				customPlaceholder
			);
		});
	});

	// EVENTS

	describe('onClose, onRequestClose, onOpen callbacks are set', function () {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('onOpen is executed when trigger is clicked, onClose is executed when date is selected', function (done) {
			wrapper = mount(
				<DemoComponent
					onClose={() => {
						setTimeout(() => {
							const month = wrapper.find('.datepicker__month');
							expect(month.node).to.not.exist;
							done();
						}, 0);
					}}
					onRequestClose={() => {
						const month = wrapper.find('.datepicker__month');
						expect(month.node).to.exist;
					}}
					onOpen={() => {
						const firstDayOfMonth = wrapper
							.find('.datepicker__month [aria-disabled=false]')
							.first();
						expect(firstDayOfMonth).to.exist;
						firstDayOfMonth.simulate('click', {});
					}}
				/>,
				{ attachTo: mountNode }
			);

			const trigger = wrapper.find(triggerClassSelector);
			trigger.simulate('click', {});
		});

		it('onChange is triggered when date is selected', function (done) {
			wrapper = mount(
				<DemoComponent
					onChange={(event, data) => {
						console.log('onChange');
						setTimeout(() => {
							const input = wrapper.find('input');
							expect(input.node.value).to.equal('1/1/2007');

							// test callback parameters
							expect(data.date.getTime()).to.equal(
								new Date('1/1/2007').getTime()
							);
							expect(data.formattedDate).to.equal('1/1/2007');

							done();
						}, 0);
					}}
					onOpen={() => {
						const firstDayOfMonth = wrapper
							.find('.datepicker__month [aria-disabled=false]')
							.first();
						expect(firstDayOfMonth).to.exist;
						firstDayOfMonth.simulate('click', {});
					}}
				/>,
				{ attachTo: mountNode }
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
			beforeEach(() => {
				mountNode = createMountNode({ context: this });
			});

			afterEach(() => {
				destroyMountNode({ wrapper, mountNode });
			});

			it('opens on trigger click, closes on ESC', function (done) {
				wrapper = mount(
					<DemoComponent
						onClose={() => {
							setTimeout(() => {
								const month = wrapper.find('.datepicker__month');
								expect(month.node).to.not.exist;
								done();
							}, 0);
						}}
						onOpen={() => {
							const firstDayOfMonth = wrapper
								.find('.datepicker__month [aria-disabled=false]')
								.first();
							firstDayOfMonth.simulate('keyDown', {
								key: 'Esc',
								keyCode: KEYS.ESCAPE,
								which: KEYS.ESCAPE,
							});
						}}
					/>,
					{ attachTo: mountNode }
				);

				const trigger = wrapper.find(triggerClassSelector);
				trigger.simulate('click', {});
			});

			it('navigates to next week', function (done) {
				wrapper = mount(
					<DemoComponent
						isOpen
						onCalendarFocus={(event, data) => {
							expect(data.date.getTime()).to.equal(
								new Date(2007, 0, 13).getTime()
							);
							done();
						}}
					/>,
					{ attachTo: mountNode }
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
						onCalendarFocus={(event, data) => {
							expect(data.date.getTime()).to.equal(
								new Date(2007, 0, 7).getTime()
							);
							done();
						}}
					/>,
					{ attachTo: mountNode }
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

			it('navigates to previous week (that is of a previous month)', function (done) {
				wrapper = mount(
					<DemoComponent
						isOpen
						onCalendarFocus={(event, data) => {
							expect(data.date.getTime()).to.equal(
								new Date(2006, 11, 30).getTime()
							);
							done();
						}}
					/>,
					{ attachTo: mountNode }
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
						onCalendarFocus={(event, data) => {
							expect(data.date.getTime()).to.equal(
								new Date(2007, 0, 5).getTime()
							);
							done();
						}}
					/>,
					{ attachTo: mountNode }
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

			it('calendar blur, focus on previous month button', function (done) {
				wrapper = mount(
					<DemoComponent
						isOpen
						onCalendarFocus={(event, data) => {
							expect(data.ref.textContent).to.equal('Previous month');
							done();
						}}
					/>,
					{ attachTo: mountNode }
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
						onCalendarFocus={(event, data) => {
							expect(data.ref.textContent).to.equal('Today');
							done();
						}}
					/>,
					{ attachTo: mountNode }
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
		});
	});

	describe('Disabled', function () {
		const triggerClicked = sinon.spy();
		const dialogOpened = sinon.spy();

		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('onOpen is not called when disabled', function (done) {
			wrapper = mount(
				<DemoComponent
					disabled
					onClick={triggerClicked}
					onOpen={dialogOpened}
				/>,
				{ attachTo: mountNode }
			);

			const trigger = wrapper.find('#sample-datepicker');
			trigger.simulate('click', {});

			setTimeout(() => {
				expect(dialogOpened.callCount).to.equal(0);
				done();
			}, 200);
		});
	});

	describe('Disable dates', () => {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('disable weekends', (done) => {
			wrapper = mount(
				<DemoComponent
					isOpen
					value={new Date(2007, 0, 5)}
					dateDisabled={({ date }) => date.getDay() > 5 || date.getDay() < 1}
				/>,
				{ attachTo: mountNode }
			);

			const input = wrapper.find('input');
			expect(input.node.value).to.equal('1/5/2007');

			const disabledDay = wrapper
				.find('.datepicker__month [aria-disabled=true]')
				.first();
			disabledDay.simulate('click', {});

			expect(input.node.value).to.equal('1/5/2007');

			const day = wrapper
				.find('.datepicker__month [aria-disabled=false]')
				.first();
			day.simulate('click', {});

			expect(input.node.value).to.equal('1/1/2007');
			done();

			const trigger = wrapper.find(triggerClassSelector);
			trigger.simulate('click', {});
		});
	});
});
