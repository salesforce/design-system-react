/* global describe, it, before, after, beforeEach, afterEach, sinon */
/* eslint-disable react/display-name */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import assign from 'lodash.assign';

const { Simulate,
	findRenderedDOMComponentWithTag,
	findRenderedDOMComponentWithClass } = TestUtils;

import { SLDSButton } from '../../components';

const mockCallback = sinon.spy();

describe('SLDSButton: ', () => {
	let body;

	const defaultProps = {
		label: 'Neutral',
		onClick: mockCallback,
		variant: 'neutral'
	};

	const renderButton = inst => {
		body = document.createElement('div');
		document.body.appendChild(body);
		return ReactDOM.render(inst, body);
	};

	function removeButton () {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	const createButton = (props) => React.createElement(SLDSButton, assign({}, defaultProps, props));
	const getButton = (props) => renderButton(createButton(props));

	describe('Basic Button Props Render', () => {
		let cmp;
		let btn;

		beforeEach(() => {
			cmp = getButton({
				id: 'custom-id',
				text: 'Brand',
				theme: 'brand'
			});
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeButton(btn);
		});

		it('renders correct label', () => {
			expect(btn.textContent).to.equal('Neutral');
		});

		it('renders correct variant styles', () => {
			expect(btn.className).to.include('slds-button--neutral');
		});

		it('renders custom id', () => {
			expect(btn.getAttribute('id')).to.equal('custom-id');
		});
	});

	describe('Icon with Label Button Props Render', () => {
		let cmp;
		let btn;
		let svg;

		beforeEach(() => {
			cmp = getButton({
				label: 'Neutral with Icon',
				iconName: 'download',
				iconCategory: 'action',
				iconPosition: 'right',
				variant: 'neutral'
			});
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
			svg = findRenderedDOMComponentWithClass(cmp, 'slds-button__icon');
		});

		afterEach(() => {
			removeButton(btn);
		});

		it('renders label', () => {
			expect(btn.textContent).to.equal('Neutral with Icon');
		});

		it('renders icon', () => {
			expect(svg.className.baseVal).to.include('slds-button__icon--right');
		});
	});

	describe('Icon Button Props render', () => {
		let cmp;
		let btn;
		let asstText;
		let svg;

		beforeEach(() => {
			cmp = getButton({
				assistiveText: 'my settings',
				variant: 'icon',
				iconName: 'settings',
				iconSize: 'small',
				iconVariant: 'bare'
			});
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
			asstText = findRenderedDOMComponentWithClass(cmp, 'slds-assistive-text');
			svg = findRenderedDOMComponentWithTag(cmp, 'svg');
		});

		afterEach(() => {
			removeButton(btn);
		});

		it('renders label', () => {
			expect(asstText.textContent).to.equal('my settings');
		});

		it('renders icon styles', () => {
			expect(svg.className.baseVal).to.include('slds-button__icon');
		});
	});

	describe('Button Clickable', () => {
		let cmp;
		let btn;
		let clicked;

		function setClick () {
			clicked = true;
		}

		beforeEach(() => {
			clicked = false;
			cmp = getButton({
				label: 'Neutral',
				variant: 'neutral',
				onClick: setClick
			});
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeButton(btn);
		});

		it('can be clicked', () => {
			/* eslint-disable no-unused-expressions */
			expect(clicked).to.be.false;
			Simulate.click(btn, {});
			expect(clicked).to.be.true;
			/* eslint-enable no-unused-expressions */
		});
	});
});
