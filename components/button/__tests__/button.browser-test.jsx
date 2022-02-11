/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import assign from 'lodash.assign';

import SLDSButton from '../../button';
import IconSettings from '../../icon-settings';

const { Simulate } = TestUtils;

const mockCallback = sinon.spy();

describe('SLDSButton: ', () => {
	const defaultProps = {
		label: 'Neutral',
		onClick: mockCallback,
		variant: 'neutral',
	};

	const renderButton = (instance) => {
		const ref = React.createRef();
		TestUtils.renderIntoDocument(
			<IconSettings iconPath="/assets/icons">
				<div ref={ref}>{instance}</div>
			</IconSettings>
		);
		return ReactDOM.findDOMNode(ref.current);
	};

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
			[btn] = cmp.getElementsByClassName('slds-button');
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

		it('renders custom styles', function () {
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
			[btn] = cmp.getElementsByClassName('slds-button');
		});

		it('renders formAction prop', () => {
			expect(btn.formAction).to.equal(formAction);
		});
	});

	describe('Data Props Render ', () => {
		let cmp;
		let btn;

		beforeEach(() => {
			cmp = getButton({
				id: 'custom-id',
				'data-some-attribute': 'some value',
			});
			[btn] = cmp.getElementsByClassName('slds-button');
		});

		it('renders data-some-attribute prop', () => {
			expect(btn.getAttribute('data-some-attribute')).to.equal('some value');
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
			[btn] = cmp.getElementsByClassName('slds-button');
			[svg] = cmp.getElementsByClassName('slds-button__icon');
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
			[asstText] = cmp.getElementsByClassName('slds-assistive-text');
			[svg] = cmp.getElementsByTagName('svg');
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
			[asstText] = cmp.getElementsByClassName('slds-assistive-text');
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
			[use] = cmp.getElementsByTagName('use');
			svgHref = use.getAttribute('href');
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
			[btn] = cmp.getElementsByClassName('slds-button');
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
