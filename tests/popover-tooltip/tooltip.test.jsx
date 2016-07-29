/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-expressions */

import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';


import SLDSPopoverTooltip from '../../components/popover-tooltip';
import SLDSButton from '../../components/button';

const { Simulate,
				findRenderedDOMComponentWithTag,
				findRenderedDOMComponentWithClass } = TestUtils;

describe('SLDSPopoverTooltip: ', function () {
	let body;

	afterEach(() => {
		try {
			Array.prototype.forEach.call(document.body.querySelectorAll('.drop'), component => document.body.removeChild(component));
			if (body) {
				document.body.removeChild(body);
			}
		} catch (e) { /* empty */ }
	});

	const createBody = () => {
		const target = document.createElement('h1');
		target.textContent = 'Tooltip Tip Target';
		body = document.createElement('div');
		body.appendChild(target);
		document.body.appendChild(body);
	};

	const renderTooltip = inst => ReactDOM.render(inst, body);

	const createTooltip = (props, kids) => React.createElement(SLDSPopoverTooltip, props, kids);

	const generateTooltip = (props, kids) => renderTooltip(createTooltip(props, kids));

	const getTip = (dom) => dom.querySelector('.slds-popover--tooltip');

	describe('component basic props render', () => {
		let cmp;

		beforeEach(() => {
			const content = (<span style={{ width: 30 }}>This is more info. blah blah.</span>);
			createBody();
			cmp = generateTooltip({
				id: 'myTooltip123',
				align: 'bottom',
				content
			}, React.createElement(SLDSButton, { label: 'Hover me for tooltip' }));
		});

		it('renders the content as assistive text', () => {
			const span = findRenderedDOMComponentWithClass(cmp, 'slds-assistive-text');
			expect(span.textContent).to.equal('This is more info. blah blah.');
		});

		it('is not open', () => {
			expect(getTip(document.body)).to.equal(null);
		});

		describe('expanded', () => {
			let tip;
			let trigger;

			beforeEach((done) => {
				expect(getTip(document.body)).to.equal(null);

				setTimeout(() => {
					trigger = findRenderedDOMComponentWithTag(cmp, 'button');
					Simulate.mouseEnter(trigger, {});
					setTimeout(() => {
						tip = getTip(document.body);
						done();
					}, 200);
				}, 200);
			});

			it('places bottom aligned tooltip at the trigger if no target', (done) => {
				// "Magic Number" in pixels, based on size of trigger and CSS
				const tooltipOffset = 40;
				const tipBounds = tip.getBoundingClientRect();
				const triggerBounds = trigger.getBoundingClientRect();
				expect(tipBounds.bottom).to.be.within(triggerBounds.bottom, triggerBounds.bottom + tooltipOffset);
				done();
			});

			it('adds nubbin', () => {
				expect(tip.className).to.include('slds-nubbin--top');
			});

			it('closes', (done) => {
				Simulate.mouseLeave(trigger, {});
				setTimeout(() => {
					expect(getTip(document.body)).to.be.null;
					done();
				}, 600);
			});
		});
	});

	/*
	// Commented out until fully understood.
	describe('using target', () => {
		let cmp, trigger;

		beforeEach(() => {
			const content = (<span style={{width: 30}}>This is more info. blah blah.</span>);
			createBody();
			cmp = generateTooltip({
				align: 'bottom',
				content: content,
				target: body.firstChild
			}, React.createElement(SLDSButton, {}), ['Hover me for tooltip']);
			trigger = document.body.querySelector('[role=tooltip]').firstChild;
		})

		describe('expanded', () => {
			let tip;

			beforeEach((done) => {
				expect(getTip(document.body)).to.equal(null);

				setTimeout(() => {
					Simulate.mouseEnter(trigger, {})
					setTimeout(() => {
						tip = getTip(document.body);
						done();
					}, 200);
				}, 200);
			});

			it('sets the tooltip close to the target, not the trigger', () => {
				// "Magic Number" in pixels, based on size of trigger and CSS
				const tooltipOffset = 40;
				const tipBounds = tip.getBoundingClientRect();
				const targetBounds = body.firstChild.getBoundingClientRect();
				console.log(tipBounds);
				console.log(targetBounds);
				expect(tipBounds.bottom).to.be.within(targetBounds.bottom, targetBounds.bottom + tooltipOffset);
			})
		})
	})
	*/
});
