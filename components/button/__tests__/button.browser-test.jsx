/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import assign from 'lodash.assign';

import SLDSButton from '../../button';
import IconSettings from '../../icon-settings';

const {
	Simulate,
	findRenderedDOMComponentWithTag,
	findRenderedDOMComponentWithClass,
} = TestUtils;

const mockCallback = sinon.spy();

describe('SLDSButton: ', () => {
	let body;

	const defaultProps = {
		label: 'Neutral',
		onClick: mockCallback,
		variant: 'neutral',
	};

	const renderButton = (inst) => {
		body = document.createElement('div');
		document.body.appendChild(body);
		/* deepscan-disable REACT_ASYNC_RENDER_RETURN_VALUE */
		return ReactDOM.render(
			<IconSettings iconPath="/assets/icons">{inst}</IconSettings>,
			body
		);
		/* deepscan-enable REACT_ASYNC_RENDER_RETURN_VALUE */
	};

	function removeButton() {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	const createButton = (props) =>
		React.createElement(SLDSButton, assign({}, defaultProps, props));
	const getButton = (props) => renderButton(createButton(props));

	describe('Basic Button Props Render', () => {
		let cmp;
		let btn;

		beforeEach(() => {
			cmp = getButton({
				id: 'custom-id',
				text: 'Brand',
				theme: 'brand',
				style: { background: 'rgb(18, 49, 35)' },
			});
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeButton();
		});

		it('renders correct label', () => {
			expect(btn.textContent).to.equal('Neutral');
		});

		it('renders correct variant styles', () => {
			expect(btn.className).to.include('slds-button_neutral');
		});

		it('renders custom id', () => {
			expect(btn.getAttribute('id')).to.equal('custom-id');
		});

		it('renders custom styles', function() {
			btn.style.backgroundColor.should.equal('rgb(18, 49, 35)');
		});
	});

	describe('Form Props Render ', () => {
		let cmp;
		let btn;
		const formAction = 'http://localhost/some/url';

		beforeEach(() => {
			cmp = getButton({
				id: 'custom-id',
				formAction,
			});
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeButton();
		});

		it('renders formAction prop', () => {
			expect(btn.formAction).to.equal(formAction);
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
				variant: 'neutral',
			});
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
			svg = findRenderedDOMComponentWithClass(cmp, 'slds-button__icon');
		});

		afterEach(() => {
			removeButton();
		});

		it('renders label', () => {
			expect(btn.textContent).to.equal('Neutral with Icon');
		});

		it('renders icon', () => {
			expect(svg.className.baseVal).to.include('slds-button__icon_right');
		});
	});

	describe('Icon Button Props render', () => {
		let cmp;
		let asstText;
		let svg;

		beforeEach(() => {
			cmp = getButton({
				assistiveText: { icon: 'my settings' },
				variant: 'icon',
				iconCategory: 'utility',
				iconName: 'settings',
				iconSize: 'small',
				iconVariant: 'bare',
			});
			asstText = findRenderedDOMComponentWithClass(cmp, 'slds-assistive-text');
			svg = findRenderedDOMComponentWithTag(cmp, 'svg');
		});

		afterEach(() => {
			removeButton();
		});

		it('renders label', () => {
			expect(asstText.textContent).to.equal('my settings');
		});

		it('renders icon styles', () => {
			expect(svg.className.baseVal).to.include('slds-button__icon');
		});
	});

	describe('(icon path) Icon Button renders assistive text', () => {
		let cmp;
		let asstText;

		beforeEach(() => {
			cmp = getButton({
				assistiveText: { icon: 'News' },
				iconSize: 'large',
				iconPath: '/assets/icons/utility-sprite/svg/symbols.svg#announcement',
				title: 'announcement',
			});
			asstText = findRenderedDOMComponentWithClass(cmp, 'slds-assistive-text');
		});

		afterEach(() => {
			removeButton();
		});

		it('renders label', () => {
			expect(asstText.textContent).to.equal('News');
		});
	});

	describe('External Path Icon Button renders', () => {
		let cmp;
		let use;
		let svgHref;

		before(() => {
			cmp = getButton({
				assistiveText: { icon: 'announcement' },
				variant: 'icon',
				iconPath: '/assets/icons/utility-sprite/svg/symbols.svg#announcement',
				iconSize: 'large',
				iconVariant: 'bare',
			});
			use = findRenderedDOMComponentWithTag(cmp, 'use');
			svgHref = use.getAttribute('href');
		});

		after(() => {
			removeButton();
		});

		it('renders svg', () => {
			expect(svgHref).to.equal(
				'/assets/icons/utility-sprite/svg/symbols.svg#announcement'
			);
		});
	});

	describe('Button Clickable', () => {
		let cmp;
		let btn;
		let clicked;

		function setClick() {
			clicked = true;
		}

		beforeEach(() => {
			clicked = false;
			cmp = getButton({
				label: 'Neutral',
				variant: 'neutral',
				onClick: setClick,
			});
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeButton();
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
