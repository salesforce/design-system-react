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
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import assign from 'lodash.assign';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import { mountComponent, unmountComponent } from '../enzyme-helpers';

const { Simulate,
	findRenderedDOMComponentWithTag,
	findRenderedDOMComponentWithClass } = TestUtils;

import { SLDSProgressIndicator } from '../../components';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const defaultProps = {
	id: 'sample-progress-indicator'
};

const mockCallback = sinon.spy();

const DemoComponent = React.createClass({
	displayName: 'ProgressIndicatorDemoComponent',
	propTypes: {
		onStepClick: mockCallback,
		onStepFocus: mockCallback
	},

	getDefaultProps () {
		return defaultProps;
	},

	render () {
		return (
			<SLDSProgressIndicator {...this.props} />
		);
	}
});

describe('SLDSProgressIndicator: ', () => {
	describe('Basic Props Render', () => {
		const currentStep = 2;

		beforeEach(mountComponent(
			<DemoComponent currentStep={currentStep} />
		));

		afterEach(unmountComponent);

		// PROPS
		it('has five steps by default', function () {
			const item = this.wrapper.find('.slds-progress').find('li');
			expect(item).to.have.length(5);
		});

		it('has only one active step', function () {
			const item = this.wrapper.find('.slds-progress').find('li.slds-is-active');
			expect(item).to.have.length(1);
		});

		it('does not have an error step', function () {
			const item = this.wrapper.find('.slds-progress').find('li.slds-has-error');
			expect(item).to.have.length(0);
		});

		it('has correct number of completed steps', function () {
			const item = this.wrapper.find('.slds-progress').find('li.slds-is-completed');
			expect(item).to.have.length(currentStep);
		});

		it('has a white background', function () {
			const item = this.wrapper.find('.slds-progress_shade');
			expect(item).to.have.length(0);
		});
	});

	describe('Within-Modal Props Render (Without Error)', () => {
		const currentStep = 2;

		beforeEach(mountComponent(
			<DemoComponent currentStep={currentStep} variant="modal" />
		));

		afterEach(unmountComponent);

		// PROPS
		it('has 5 steps by default', function () {
			const item = this.wrapper.find('.slds-progress').find('li');
			expect(item).to.have.length(5);
		});

		it('has no error step', function () {
			const item = this.wrapper.find('.slds-progress').find('li.slds-has-error');
			expect(item).to.have.length(0);
		});

		it('has 1 active step', function () {
			const item = this.wrapper.find('.slds-progress').find('li.slds-is-active');
			expect(item).to.have.length(1);
		});

		it('has correct number of completed steps', function () {
			const item = this.wrapper.find('.slds-progress').find('li.slds-is-completed');
			expect(item).to.have.length(currentStep);
		});

		it('has a gray background', function () {
			const item = this.wrapper.find('.slds-progress_shade');
			expect(item).to.have.length(1);
		});
	});

	describe('Within-Modal Props Render (With Error)', () => {
		const currentStep = 2;

		beforeEach(mountComponent(
			<DemoComponent currentStep={currentStep} variant="modal" hasError />
		));

		afterEach(unmountComponent);

		// PROPS
		it('has 1 error step', function () {
			const item = this.wrapper.find('.slds-progress').find('li.slds-has-error');
			expect(item).to.have.length(1);
		});

		it('has no active step', function () {
			const item = this.wrapper.find('.slds-progress').find('li.slds-is-active');
			expect(item).to.have.length(0);
		});

		it('has correct number of completed steps', function () {
			const item = this.wrapper.find('.slds-progress').find('li.slds-is-completed');
			expect(item).to.have.length(currentStep);
		});
	});

	describe('Tooltip Props Render', () => {
		const currentStep = 2;
		const steps = [{ description: 'tooltip test #1' },
						{ description: 'tooltip test #2' },
						{ description: 'tooltip test #3' },
						{ description: 'tooltip test #4' },
						{ description: 'tooltip test #5' },
						{ description: 'tooltip test #6' }];

		beforeEach(mountComponent(
			<DemoComponent currentStep={currentStep} hasError steps={steps} />
		));

		afterEach(unmountComponent);

		// PROPS
		it('has an error step', function () {
			const item = this.wrapper.find('.slds-progress').find('li.slds-has-error');
			expect(item).to.have.length(1);
		});

		it('has a tooltip attached to every step', function () {
			const item = this.wrapper.find('.slds-progress').find('.slds-tooltip-trigger');
			expect(item).to.have.length(6);
		});

		// EVENTS
		it('shows tooltip on hover', function () {
			const step = this.wrapper.find('.slds-progress').find('.slds-tooltip-trigger').find('li').first();
			step.simulate('mouseEnter');
			const item = this.wrapper.find('.slds-progress').find('.drop-target');
			expect(item).to.have.length(1);
		});

		it('hides tooltip on hover', function () {
			const step = this.wrapper.find('.slds-progress').find('.slds-tooltip-trigger').find('li').first();
			step.simulate('mouseLeave');
			const item = this.wrapper.find('.slds-progress').find('.drop-target');
			expect(item).to.have.length(0);
		});
	});

	describe('Click Event', () => {
		const clickHandler = sinon.spy();
		
		beforeEach(mountComponent(
			<DemoComponent onStepClick={clickHandler} />
		));

		afterEach(unmountComponent);

		// EVENTS
		it('calls onStepClick()', function () {
			const step = this.wrapper.find('.slds-progress').find('li').find('button').first();
			step.simulate('click');
			expect(clickHandler.callCount).to.equal(1);
		});
	});

	describe('Assistive Technology', () => {
		/* Detect if presence of accessibility features such as ARIA
		 * roles and screen reader text is present in the DOM.
		 */
		const focusHandler = sinon.spy();
		
		beforeEach(mountComponent(
			<DemoComponent onStepFocus={focusHandler} />
		));

		afterEach(unmountComponent);

		// A11Y FEATURES
		it('specifies the role for progress bar', function () {
			const progressbarRole = this.wrapper.find('div[role="progressbar"]');
			expect(progressbarRole).to.have.length(1);
		});

		it('renders assistive text for progress bar', function () {
			const item = this.wrapper.find('.slds-progress-bar').find('.slds-assistive-text').first();
			expect(item.text()).to.include('Progress:');
			expect(item.text()).to.include('%');
		});

		it('renders assistive text for steps', function () {
			const item = this.wrapper.find('.slds-progress').find('.slds-tooltip-trigger').find('li')
                                    .find('.slds-button')
                                    .find('.slds-assistive-text')
                                    .first();
			expect(item.text()).to.include('Step');
		});

		// EVENTS
		it('shows tooltip on focus', function () {
			const step = this.wrapper.find('.slds-progress').find('.slds-tooltip-trigger').find('li').first();
			step.simulate('focus');
			const item = this.wrapper.find('.slds-progress').find('.drop-target');
			expect(item).to.have.length(1);
		});

		it('hides tooltip on blur', function () {
			const step = this.wrapper.find('.slds-progress').find('.slds-tooltip-trigger').find('li').first();
			step.simulate('blur');
			const item = this.wrapper.find('.slds-progress').find('.drop-target');
			expect(item).to.have.length(0);
		});


		it('calls onStepFocus()', function () {
			const step = this.wrapper.find('.slds-progress').find('li').find('button').first();
			step.simulate('focus');
			expect(focusHandler.callCount).to.equal(1);
		});
	});
});
