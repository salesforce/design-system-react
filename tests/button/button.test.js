/* global describe, it, before, after, beforeEach, afterEach */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { expect } from 'chai';
import assign from 'lodash.assign';
import { Button } from '../../src/dist';

const { Simulate,
				scryRenderedDOMComponentsWithClass,
				findRenderedDOMComponentWithTag,
				findRenderedDOMComponentWithClass } = TestUtils;

chai.should();
const handleClick = itemClicked => console.log(itemClicked, ' was clicked.');

describe('Button: ', () => {
	const defaultProps = {
		text: 'Neutral',
		onClick: handleClick,
		theme: 'neutral'
	};

	const renderButton = inst => {
		const body = document.createElement('div');
		document.body.appendChild(body);
		return ReactDOM.render(inst, body);
	};

	const createButton = props => React.createElement(Button, assign({}, defaultProps, props));
	const getButton = ps => renderButton(createButton(ps));

	describe('Basic Button Props Render', () => {
		let cmp;
		let btn;
		let clicked;

		beforeEach(() => {
			clicked = false;
			cmp = getButton({
				text: 'Brand',
				theme: 'brand',
				onClick: () => clicked = true });
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		it('renders correct text', () => {
			expect(btn.innerText).to.equal('Brand');
		});

		it('renders correct theme styles', () => {
			expect(btn.className).to.include('slds-button--brand');
		});
	});

	describe('Icon with Label Button Props Render', () => {
		let cmp, btn, clicked;

		beforeEach(() => {
			clicked = false;
			cmp = getButton({label: "Neutral with Icon", iconName:"download", iconPosition:"right", variant: "neutral", onClick: () => clicked = true })
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
			svg = findRenderedDOMComponentWithClass(cmp, 'slds-button__icon');
		})

		it('renders label', () => {
			expect(btn.innerText).to.equal("Neutral with Icon");
		})

		it('renders icon', () => {
			expect(svg.className.baseVal).to.include("slds-button__icon--right");
		})

	});

	describe('Icon Button Props render', () => {
		let cmp, btn, asstText, svg, clicked;

		beforeEach(() => {
			clicked = false;
			cmp = getButton({assistiveText: "my settings",
											variant: "icon",
											iconName: "settings",
											iconSize: "small",
											iconVariant: "bare",
											onClick: () => clicked = true });
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
			asstText = findRenderedDOMComponentWithClass(cmp, 'slds-assistive-text');
			svg = findRenderedDOMComponentWithTag(cmp, 'svg');
		})

		it('renders label', () => {
			expect(asstText.innerText).to.equal("my settings");
		})

		it('renders icon styles', () => {
			expect(svg.className.baseVal).to.include("slds-button__icon");
		})
	});


	describe('Button Clickable', () => {
		let cmp, btn, clicked;

		beforeEach(() => {
			clicked = false;
			cmp = getButton({label: "Neutral", variant: "neutral", onClick: () => clicked = true })
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
		})

		it('can be clicked', () => {
			expect(clicked).to.be.false
			Simulate.click(btn, {})
			expect(clicked).to.be.true
		})

	});
});
