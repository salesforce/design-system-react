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
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import { mountComponent, unmountComponent } from '../enzyme-helpers';

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
	heading: <span id="sample-heading">This is the heading</span>,
	onOpen: (dialogRootNode) => {
		const dialogOpen = new CustomEvent('dialogOpen', {
			detail: {
				rootNode: dialogRootNode
			},
			bubbles: true
		});
		ReactDOM.findDOMNode(dialogRootNode).dispatchEvent(dialogOpen);
	}
};

const defaultIds = {
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
				<Button label="Not Trigger Popover" />
			</div>
		);
	}
});

const getPopover = (rootNode) => rootNode.querySelector(`#${defaultIds.popover}`);
const getHeading = (rootNode) => rootNode.querySelector(`#${defaultIds.heading}`);
const getBody = (rootNode) => rootNode.querySelector(`#${defaultIds.body}`);

/* All tests for component being tested should be wrapped in a root `describe`,
 * which should be named after the component being tested.
 * When read aloud, the cumulative `describe` and `it` names should form a coherent
 * sentence, eg "Date Picker default structure and css is present with expected
 * attributes set". If you are having trouble constructing a cumulative short
 * sentence, this may be an indicator that your test is poorly structured.
 * String provided as first parameter names the `describe` section. Limit to nouns
 * as much as possible/appropriate.`
 */
describe('SLDSPopover', () => {
	/* Below you will find some examples of minimum areas to be tested.
	 * This should not be considered an exhaustive list. Please ensure
	 * thorough testing of your code.
	 */

	// BASIC STRUCTURE

	describe('default structure and css', () => {
		// Test DOM with minimal props set
		beforeEach(mountComponent(
			<DemoComponent
				isOpen
			/>
		));

		afterEach(unmountComponent);

		/* Please notice the of `function () {}` and not () => {}.
		 * It allows access to the Mocha test context via `this`.
		 */
		it('is open, has heading, body, close button', function (done) {
			const test = function (event) {
				const rootNode = event.detail.rootNode;

				expect(rootNode).to.exist;
				expect(getPopover(rootNode)).to.exist;
				expect(getHeading(rootNode).querySelector('#sample-heading')).to.exist;
				expect(getBody(rootNode).querySelector('#sample-body')).to.exist;
				expect(getPopover(rootNode).querySelector('.slds-popover__close')).to.exist;

				document.removeEventListener('dialogOpen', test);
				done();
			};

			document.addEventListener('dialogOpen', test);
		});
	});

	describe('assistive technology', () => {
		/* Detect if presence of accessibility features such as ARIA
		 * roles and screen reader text is present in the DOM.
		 * If your component has an ARIA role in application, and
		 * does not use `tab-index`, test that the correct keyboard
		 * navigation is present.
		 */
	});
	// PROPS AND CHILDREN

	describe('Optional Props', () => {
		const popoverBackgroundColor = 'rgb(255, 80, 121)';
		const containerBackgroundColor = 'rgb(255, 127, 80)';
		// What should be present in the DOM when style and className are applied?
		const optionalProps = {
			className: 'sample-classname',
			closeButtonAssistiveText: 'Shut it now!',
			containerClassName: 'sample-container-classname',
			containerStyle: { background: containerBackgroundColor },
			style: { background: popoverBackgroundColor }
		};

		beforeEach(mountComponent(
			<DemoComponent
				isOpen
				{...optionalProps}
			/>
		));

		afterEach(unmountComponent);

		it('has correct className, closeButtonAssistiveText, containerClassName, containerStyle, style', function (done) {
			// document.addEv		it('is Open, has heading, body, close button', function (done) {
			const test = function (event) {
				const rootNode = event.detail.rootNode;

				expect(getPopover(rootNode).classList.contains(optionalProps.className)).to.be.true;
				expect(getPopover(rootNode).querySelector('.slds-popover__close').textContent).to.equal(optionalProps.closeButtonAssistiveText);
				expect(getPopover(rootNode).style.background).to.equal(popoverBackgroundColor);
				expect(rootNode.classList.contains(optionalProps.containerClassName)).to.be.true;
				expect(rootNode.style.background).to.equal(containerBackgroundColor);

				document.removeEventListener('dialogOpen', test);
				done();
			};

			document.addEventListener('dialogOpen', test);
		});
	});

	// EVENTS

	describe('Mouse and keyboard interactions', () => {
		/* Test event callback functions using Simulate. For more information, view
		 * https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/simulate.md
		 */

		describe('onClick', () => {
			const triggerClicked = sinon.spy();
			const handleClose = sinon.spy();
			const handleOpen = sinon.spy();

			beforeEach(mountComponent(
				<DemoComponent
					onClick={triggerClicked}
					onClose={handleClose}
					onOpen={handleOpen}
				/>
			));

			afterEach(unmountComponent);

			it('calls event handler', function () {
				const trigger = this.wrapper.find('#sample-popover');
				// If applicable, use second parameter to pass the data object
				trigger.simulate('click', {});
				expect(triggerClicked.callCount).to.equal(1);
			});

			// it('opens on enter', function () {
			// 	const trigger = this.wrapper.find('#sample-popover');
			// 	// If applicable, use second parameter to pass the data object
			// 	trigger.simulate('keydown', { key: 'Enter', keyCode: 13, which: 13 });
			// 	expect(triggerClicked.callCount).to.equal(1);
			// });
		});
	});
});
