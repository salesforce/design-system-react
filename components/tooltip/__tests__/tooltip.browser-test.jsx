/* eslint-disable react/no-render-return-value */

import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';

import SLDSPopoverTooltip from '../../popover-tooltip';
import SLDSButton from '../../button';

const {
	Simulate,
	findRenderedDOMComponentWithTag,
	findRenderedDOMComponentWithClass,
} = TestUtils;

describe('SLDSTooltip: ', function () {
	let body;

	const defaultTrigger = <SLDSButton label="Hover me for tooltip" />;
	const defaultTextContent = 'This is more info. blah blah.';
	const defaultProps = {
		content: (
			<span className="tooltip-content" style={{ width: 30 }}>
				{defaultTextContent}
			</span>
		),
		hasStaticAlignment: true,
		id: 'myTooltip123',
	};

	afterEach(() => {
		try {
			Array.prototype.forEach.call(
				document.body.querySelectorAll('.drop'),
				(component) => document.body.removeChild(component),
			);
			if (body) {
				document.body.removeChild(body);
			}
		} catch (e) {
			/* empty */
		}
	});

	const createBody = () => {
		const target = document.createElement('h1');
		target.textContent = 'Tooltip Tip Target';
		body = document.createElement('div');
		body.style.height = '300px';
		body.style.width = '300px';
		body.appendChild(target);
		document.body.appendChild(body);
	};

	const renderTooltip = (inst) => ReactDOM.render(inst, body);

	const createTooltip = (props, kids) =>
		React.createElement(SLDSPopoverTooltip, props, kids);

	const generateTooltip = (props, kids) =>
		renderTooltip(createTooltip(props, kids));

	const getTip = (dom) => dom.querySelector('.slds-popover--tooltip');

	describe('component basic props render', () => {
		let rootNode;

		beforeEach(() => {
			createBody();
			rootNode = generateTooltip(
				{
					...defaultProps,
					align: 'top',
				},
				defaultTrigger,
			);
		});

		it('renders the content as assistive text', () => {
			const span = findRenderedDOMComponentWithClass(
				rootNode,
				'slds-assistive-text',
			);
			expect(span.textContent).to.equal('This is more info. blah blah.');
		});

		it('is not open', () => {
			expect(getTip(document.body)).to.equal(null);
		});

		describe('expanded', () => {
			let tip;
			let trigger;

			beforeEach((done) => {
				trigger = findRenderedDOMComponentWithTag(rootNode, 'button');
				Simulate.mouseEnter(trigger, {});
				setTimeout(() => {
					tip = getTip(document.body);
					done();
				}, 0);
			});

			it('places bottom aligned tooltip at the trigger if no target', (done) => {
				// "Magic Number" in pixels, based on size of trigger, CSS, and DropJS offset
				const tooltipOffset = 46;
				const tipBounds = tip.getBoundingClientRect();
				const triggerBounds = trigger.getBoundingClientRect();
				expect(tipBounds.top).to.be.within(
					triggerBounds.top - tooltipOffset,
					triggerBounds.top,
				);
				done();
			});

			it('adds nubbin', () => {
				expect(tip.className).to.include('slds-nubbin--bottom');
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

	describe('Custom props work as expected', () => {
		it('isOpen is false', (done) => {
			const rootNode = generateTooltip(
				{
					...defaultProps,
					isOpen: false,
				},
				defaultTrigger,
			);

			setTimeout(() => {
				const trigger = findRenderedDOMComponentWithTag(rootNode, 'button');
				Simulate.mouseEnter(trigger, {});
				setTimeout(() => {
					expect(getTip(document.body)).to.be.null;
					done();
				}, 0);
			}, 0);
		});

		it('isOpen is true', (done) => {
			let contentRendered;

			const tooltipContentRendered = (component) => {
				this.tip = getTip(document.body);
				if (!contentRendered) {
					expect(component).to.not.be.null;
					contentRendered = true;
					done();
				}
			};

			generateTooltip(
				{
					...defaultProps,
					// overwrite default content
					content: (
						<span
							ref={tooltipContentRendered}
							className="tooltip-content"
							style={{ width: 30 }}
						>
							{defaultTextContent}
						</span>
					),
					isOpen: true,
				},
				defaultTrigger,
			);
		});
	});

	/*
	// Commented out until fully understood.
	describe('using target', () => {
		let rootNode, trigger;

		beforeEach(() => {
			const content = (<span style={{width: 30}}>This is more info. blah blah.</span>);
			createBody();
			rootNode = generateTooltip({
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
