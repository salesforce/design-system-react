/* Adds all of the Mocha (eg `it` and `should`) and sinon testing global
 * variables to the global namespace for eslint purposes.
 */
/* eslint-env mocha */
/* global sinon */

// Additional modifiers to [eslint-config-slds](https://github.com/salesforce-ux/eslint-config-slds) for convenience
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/display-name */

// Import your external dependencies
import React, { PropTypes } from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import { createMountNode, destroyMountNode } from '../enzyme-helpers';

// Import your internal dependencies (for example):
import Popover from '../../components/popover';
import Button from '../../components/button';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const defaultProps = {
	id: 'sample-popover',
	body: <span id="sample-body">This is the body</span>,
	heading: <span id="sample-heading">This is the heading</span>
};

const defaultIds = {
	trigger: defaultProps.id,
	popover: `${defaultProps.id}-popover`,
	body: `${defaultProps.id}-dialog-body`,
	heading: `${defaultProps.id}-dialog-heading`
};

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
const DemoComponent = React.createClass({
	displayName: 'PopoverDemoComponent',
	propTypes: {
		isOpen: PropTypes.bool
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
			<div>
				<Popover {...this.props}>
					<Button label="Trigger Popover" />
				</Popover>
				<Button id="not-the-trigger" label="Not Trigger Popover" />
			</div>
		);
	}
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
	let portalWrapper;
	let wrapper;

	// BASIC STRUCTURE

	describe('Default structure and css', function () {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('is open, has heading, body, close button', (done) => {
			wrapper = mount(<DemoComponent
				isOpen
				portalMount={(reactElement, domContainerNode) => {
					portalWrapper = mount(reactElement, { attachTo: domContainerNode });
				}}
				onOpen={() => {
					expect(portalWrapper.find(`#${defaultIds.heading}`)).to.exist;
					expect(portalWrapper.find(`#${defaultIds.body}`)).to.exist;
					expect(portalWrapper.find('.slds-popover__close')).to.exist;
					done();
				}}
			/>, { attachTo: mountNode });
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

		it('has aria-haspopup, correct aria-expanded on trigger, aria-labelledby/aria-describedby on popover', function (done) {
			wrapper = mount(<DemoComponent
				isOpen
				portalMount={(reactElement, domContainerNode) => {
					portalWrapper = mount(reactElement, { attachTo: domContainerNode });
				}}
				onOpen={() => {
					const trigger = wrapper.find('#sample-popover');
					expect(trigger.node.getAttribute('aria-haspopup')).to.equal('true');
					const ariaExpanded = trigger.find('button').node.getAttribute('aria-expanded');
					expect(ariaExpanded).to.equal('true');

					const popover = portalWrapper.find(`#${defaultIds.popover}`);
					expect(popover.node.getAttribute('aria-labelledby')).to.equal(`${defaultIds.heading}`);
					expect(popover.node.getAttribute('aria-describedby')).to.equal(`${defaultIds.body}`);
					done();
				}}
			/>, { attachTo: mountNode });
		});
	});

	// // PROPS AND CHILDREN

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
			style: { background: popoverBackgroundColor }
		};

		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('has correct className, closeButtonAssistiveText, style, and footer', function (done) {
			wrapper = mount(<DemoComponent
				{...optionalProps}
				isOpen
				portalMount={(reactElement, domContainerNode) => {
					portalWrapper = mount(reactElement, { attachTo: domContainerNode });
				}}
				onOpen={() => {
					const popover = portalWrapper.find(`#${defaultIds.popover}`);

					expect(popover.node.classList.contains(optionalProps.className)).to.be.true;
					expect(popover.find('.slds-popover__close').node.textContent).to.equal(optionalProps.closeButtonAssistiveText);
					expect(popover.find('#footer')).to.exist;
					expect(popover.node.style.background).to.equal(popoverBackgroundColor);
					done();
				}}
			/>, { attachTo: mountNode });
		});
	});

	// // EVENTS

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
				wrapper = mount(<DemoComponent
					onClick={triggerClicked}
					portalMount={(reactElement, domContainerNode) => {
						portalWrapper = mount(reactElement, { attachTo: domContainerNode });
					}}
					onClose={(data) => {
						if (!data.componentWillUnmount) {
							setTimeout(() => {
								const popover = portalWrapper.find(`#${defaultIds.popover}`);
								expect(popover.node).to.not.exist;
								done();
							}, 0);
						}
					}}
					onOpen={() => {
						const popover = portalWrapper.find(`#${defaultIds.popover}`);

						expect(popover).to.exist;
						expect(triggerClicked.callCount).to.equal(1);

						popover.find('.slds-popover__close').simulate('click', {});
					}}
				/>, { attachTo: mountNode });

				const trigger = wrapper.find(`#${defaultIds.trigger}`);
				trigger.simulate('click', {});
			});

			it('opens on click, closes on ESC', function (done) {
				wrapper = mount(<DemoComponent
					portalMount={(reactElement, domContainerNode) => {
						portalWrapper = mount(reactElement, { attachTo: domContainerNode });
					}}
					onClose={(data) => {
						if (!data.componentWillUnmount) {
							setTimeout(() => {
								const popover = portalWrapper.find(`#${defaultIds.popover}`);
								expect(popover.node).to.not.exist;
								done();
							}, 0);
						}
					}}
					onOpen={() => {
						const popover = portalWrapper.find(`#${defaultIds.popover}`);
						popover.simulate('keyDown', { key: 'Esc', keyCode: 27, which: 27 });
					}}
				/>, { attachTo: mountNode });

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
			wrapper = mount(<DemoComponent
				disabled
				onClick={triggerClicked}
				onOpen={popoverOpened}
			/>, { attachTo: mountNode });

			const trigger = wrapper.find(`#${defaultIds.trigger}`);
			trigger.simulate('click', {});

			setTimeout(() => {
				expect(popoverOpened.callCount).to.equal(0);
				done();
			}, 200);
		});
	});
});
