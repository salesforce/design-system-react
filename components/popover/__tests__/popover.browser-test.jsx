import React from 'react';
import createReactClass from 'create-react-class';
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

// Import your internal dependencies (for example):
import Popover from '../../popover';
import Button from '../../button';
import IconSettings from '../../icon-settings';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const defaultProps = {
	id: 'sample-popover',
	body: <span id="sample-body">This is the body</span>,
	heading: <span id="sample-heading">This is the heading</span>,
};

const defaultIds = {
	trigger: defaultProps.id,
	popover: `${defaultProps.id}-popover`,
	body: `${defaultProps.id}-dialog-body`,
	heading: `${defaultProps.id}-dialog-heading`,
};

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
const DemoComponent = createReactClass({
	displayName: 'PopoverDemoComponent',
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
				<div>
					<Popover {...this.props}>
						<Button label="Trigger Popover" />
					</Popover>
					<Button id="not-the-trigger" label="Not Trigger Popover" />
				</div>
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
describe('SLDSPopover', function () {
	let mountNode;
	let wrapper;

	// BASIC STRUCTURE

	describe('Default structure and css', function () {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('is open, has heading, body, close button', () => {
			wrapper = mount(<DemoComponent isOpen />, { attachTo: mountNode });

			expect(wrapper.find(`#${defaultIds.heading}`)).to.exist;
			expect(wrapper.find(`#${defaultIds.body}`)).to.exist;
			expect(wrapper.find('.slds-popover__close')).to.exist;
		});
	});

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

		it('has aria-labelledby/aria-describedby on popover', function () {
			wrapper = mount(<DemoComponent isOpen />, { attachTo: mountNode });

			const trigger = wrapper.find('#sample-popover');
			const popover = wrapper.find(`#${defaultIds.popover}`);
			expect(popover.node.getAttribute('aria-labelledby')).to.equal(
				`${defaultIds.heading}`,
			);
			expect(popover.node.getAttribute('aria-describedby')).to.equal(
				`${defaultIds.body}`,
			);
		});
	});

	// PROPS AND CHILDREN

	describe('Optional props', () => {
		const popoverBackgroundColor = 'rgb(255, 80, 121)';
		const containerBackgroundColor = 'rgb(255, 127, 80)';
		// What should be present in the DOM when style and className are applied?
		const optionalProps = {
			className: 'sample-classname',
			closeButtonAssistiveText: 'Shut it now!',
			containerClassName: 'sample-container-classname',
			containerStyle: { background: containerBackgroundColor },
			footer: <p id="footer">Footer</p>,
			style: { background: popoverBackgroundColor },
		};

		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('has correct className, closeButtonAssistiveText, style, and footer', function () {
			wrapper = mount(<DemoComponent {...optionalProps} isOpen />, {
				attachTo: mountNode,
			});

			const popover = wrapper.find(`#${defaultIds.popover}`);

			expect(popover.node.classList.contains(optionalProps.className)).to.be
				.true;
			expect(popover.find('.slds-popover__close').node.textContent).to.equal(
				optionalProps.closeButtonAssistiveText,
			);
			expect(popover.find('#footer')).to.exist;
			expect(popover.node.style.background).to.equal(popoverBackgroundColor);
		});
	});

	// EVENTS

	describe('Mouse and keyboard interactions', () => {
		/* Test event callback functions using Simulate. For more information, view
		 * https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/simulate.md
		 */
		describe('onClick', function () {
			const triggerClicked = sinon.spy();

			beforeEach(() => {
				mountNode = createMountNode({ context: this });
			});

			afterEach(() => {
				destroyMountNode({ wrapper, mountNode });
			});

			it('calls onClick handler on trigger, click on popover close closes', function (done) {
				wrapper = mount(
					<DemoComponent
						onClick={triggerClicked}
						onClose={() => {
							setTimeout(() => {
								const popover = wrapper.find(`#${defaultIds.popover}`);
								expect(popover.node).to.not.exist;
								done();
							}, 0);
						}}
						onOpen={() => {
							const popover = wrapper.find(`#${defaultIds.popover}`);

							expect(popover).to.exist;
							expect(triggerClicked.callCount).to.equal(1);

							popover.find('.slds-popover__close').simulate('click', {});
						}}
					/>,
					{ attachTo: mountNode },
				);

				const trigger = wrapper.find(`#${defaultIds.trigger}`);
				trigger.simulate('click', {});
			});

			it('opens on click, closes on ESC', function (done) {
				wrapper = mount(
					<DemoComponent
						onClose={() => {
							setTimeout(() => {
								const popover = wrapper.find(`#${defaultIds.popover}`);
								expect(popover.node).to.not.exist;
								done();
							}, 0);
						}}
						onOpen={() => {
							const popover = wrapper.find(`#${defaultIds.popover}`);
							popover.simulate('keyDown', {
								key: 'Esc',
								keyCode: 27,
								which: 27,
							});
						}}
					/>,
					{ attachTo: mountNode },
				);

				const trigger = wrapper.find(`#${defaultIds.trigger}`);
				trigger.simulate('click', {});
			});
		});
	});

	describe('Disabled', function () {
		const triggerClicked = sinon.spy();
		const popoverOpened = sinon.spy();

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
					onOpen={popoverOpened}
				/>,
				{ attachTo: mountNode },
			);

			const trigger = wrapper.find(`#${defaultIds.trigger}`);
			trigger.simulate('click', {});

			setTimeout(() => {
				expect(popoverOpened.callCount).to.equal(0);
				done();
			}, 200);
		});
	});
});
