/* global describe, it, before, after, beforeEach, afterEach */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { expect } from 'chai';
import assign from 'lodash.assign';
import Button from '../../src/react/button';

const { Simulate,
        scryRenderedDOMComponentsWithClass,
        findRenderedDOMComponentWithTag,
        findRenderedDOMComponentWithClass } = ReactTestUtils;

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
});
