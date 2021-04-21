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

import { expect } from 'chai';

import SLDSProgressIndicator from '../../progress-indicator';
import IconSettings from '../../icon-settings';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

const defaultProps = {
	id: 'sample-progress-indicator',
};

const mockCallback = sinon.spy();

class DemoComponent extends React.Component {
	static displayName = 'ProgressIndicatorDemoComponent';

	static propTypes = {
		onStepClick: mockCallback,
		onStepFocus: mockCallback,
	};

	static defaultProps = defaultProps;

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<SLDSProgressIndicator {...this.props} />
			</IconSettings>
		);
	}
}

const steps = [
	{ id: 0, label: 'tooltip label #1' },
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: 'tooltip label #3' },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
];

const sixSteps = [
	{ id: 0, label: 'custom tooltip #1' },
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: 'tooltip label #3' },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
	{ id: 5, label: 'tooltip label #6' },
];

describe('SLDSProgressIndicator: ', () => {
	describe('Basic Props Render', () => {
		beforeEach(
			mountComponent(
				<DemoComponent
					steps={steps}
					selectedStep={steps[2]}
					completedSteps={steps.slice(0, 2)}
				/>
			)
		);

		afterEach(unmountComponent);

		// PROPS
		it('has five steps by default', function () {
			const item = this.wrapper.find('.slds-progress').find('li');
			expect(item).to.have.length(5);
		});

		it('has only one active step', function () {
			const item = this.wrapper
				.find('.slds-progress')
				.find('li.slds-is-active');
			expect(item).to.have.length(1);
		});

		it('does not have an error step', function () {
			const item = this.wrapper
				.find('.slds-progress')
				.find('li.slds-has-error');
			expect(item).to.have.length(0);
		});

		it('has correct number of completed steps', function () {
			const item = this.wrapper
				.find('.slds-progress')
				.find('li.slds-is-completed');
			expect(item).to.have.length(2);
		});

		it('has a white background', function () {
			const item = this.wrapper.find('.slds-progress_shade');
			expect(item).to.have.length(0);
		});
	});

	describe('Within-Modal Props Render (Without Error)', () => {
		beforeEach(
			mountComponent(
				<DemoComponent
					steps={steps}
					selectedStep={steps[2]}
					completedSteps={steps.slice(0, 2)}
					variant="modal"
				/>
			)
		);

		afterEach(unmountComponent);

		// PROPS
		it('has 5 steps by default', function () {
			const item = this.wrapper.find('.slds-progress').find('li');
			expect(item).to.have.length(5);
		});

		it('has no error step', function () {
			const item = this.wrapper
				.find('.slds-progress')
				.find('li.slds-has-error');
			expect(item).to.have.length(0);
		});

		it('has 1 active step', function () {
			const item = this.wrapper
				.find('.slds-progress')
				.find('li.slds-is-active');
			expect(item).to.have.length(1);
		});

		it('has correct number of completed steps', function () {
			const item = this.wrapper
				.find('.slds-progress')
				.find('li.slds-is-completed');
			expect(item).to.have.length(2);
		});

		it('has a gray background', function () {
			const item = this.wrapper.find('.slds-progress_shade');
			expect(item).to.have.length(1);
		});
	});

	describe('Within-Modal Props Render (With Error)', () => {
		beforeEach(
			mountComponent(
				<DemoComponent
					steps={steps}
					selectedStep={steps[2]}
					errorSteps={steps.slice(2, 3)}
					completedSteps={steps.slice(0, 2)}
					variant="modal"
				/>
			)
		);

		afterEach(unmountComponent);

		// PROPS
		it('has 1 error step', function () {
			const item = this.wrapper
				.find('.slds-progress')
				.find('li.slds-has-error');
			expect(item).to.have.length(1);
		});

		it('has no active step', function () {
			const item = this.wrapper
				.find('.slds-progress')
				.find('li.slds-is-active');
			expect(item).to.have.length(0);
		});

		it('has correct number of completed steps', function () {
			const item = this.wrapper
				.find('.slds-progress')
				.find('li.slds-is-completed');
			expect(item).to.have.length(2);
		});
	});

	describe('Tooltip Props Render', () => {
		beforeEach(
			mountComponent(
				<DemoComponent
					steps={sixSteps}
					selectedStep={sixSteps[2]}
					errorSteps={sixSteps.slice(2, 3)}
					completedSteps={sixSteps.slice(0, 2)}
				/>
			)
		);

		afterEach(unmountComponent);

		// PROPS
		it('has an error step', function () {
			const item = this.wrapper
				.find('.slds-progress')
				.find('li.slds-has-error');
			expect(item).to.have.length(1);
		});

		it('has a tooltip attached to every step', function () {
			const item = this.wrapper
				.find('.slds-progress')
				.find('.slds-tooltip-trigger');
			expect(item).to.have.length(6);
		});
	});

	describe('Click Event', () => {
		const clickHandler = sinon.spy();

		beforeEach(
			mountComponent(
				<DemoComponent
					steps={steps}
					selectedStep={steps[2]}
					completedSteps={steps.slice(0, 2)}
					onStepClick={clickHandler}
				/>
			)
		);

		afterEach(unmountComponent);

		// EVENTS
		it('calls onStepClick()', function () {
			const step = this.wrapper
				.find('.slds-progress')
				.find('li')
				.find('button')
				.first();
			step.simulate('click'); // <-- this is causing some errors on tab tests
			expect(clickHandler.callCount).to.equal(1);
		});
	});

	describe('Click Event for Vertical Orientation', () => {
		const clickHandler = sinon.spy();

		beforeEach(
			mountComponent(
				<DemoComponent
					steps={steps}
					selectedStep={steps[2]}
					completedSteps={steps.slice(0, 2)}
					onStepClick={clickHandler}
					orientation="vertical"
				/>
			)
		);

		afterEach(unmountComponent);

		// EVENTS
		it('calls onStepClick()', function () {
			const step = this.wrapper
				.find('.slds-progress')
				.find('li')
				.find('span')
				.first();
			step.simulate('click'); // <-- this is causing some errors on tab tests
			expect(clickHandler.callCount).to.equal(1);
		});
	});

	describe('Assistive Technology', () => {
		/* Detect if presence of accessibility features such as ARIA
		 * roles and screen reader text is present in the DOM.
		 */
		const focusHandler = sinon.spy();

		beforeEach(
			mountComponent(
				<DemoComponent
					steps={steps}
					selectedStep={steps[2]}
					completedSteps={steps.slice(0, 2)}
					onStepFocus={focusHandler}
				/>
			)
		);

		afterEach(unmountComponent);

		// A11Y FEATURES
		it('specifies the role for progress bar', function () {
			const progressbarRole = this.wrapper.find('div[role="progressbar"]');
			expect(progressbarRole).to.have.length(1);
		});

		it('renders assistive text for progress bar', function () {
			const item = this.wrapper
				.find('.slds-progress-bar')
				.find('.slds-assistive-text')
				.first();
			expect(item.text()).to.include('Progress:');
			expect(item.text()).to.include('%');
		});
	});

	/**
	 * TODO in the future:
	 * we may want to extend test cases when TetherJS is removed for future dev
	 * The following cases may be considered:
	 *   1. test tooltips behave properly (show/hide/with correct label) *on hover*
	 *   2. test tooltips behave properly *on focus/blur*
	 */
});
