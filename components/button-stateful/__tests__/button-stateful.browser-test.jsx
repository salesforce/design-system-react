import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';

import chai from 'chai';

import IconSettings from '../../icon-settings';
import ButtonStateful from '../../button-stateful';

chai.should();

describe('Button Stateful: ', () => {
	// Base defaults
	const requiredPropsNoVariant = {
		assistiveText: { icon: 'like' },
		iconName: 'like',
		iconSize: 'large',
	};
	const requiredProps = {
		...requiredPropsNoVariant,
		variant: 'icon',
	};

	// Setup and takedown
	const renderButton = (instance) =>
		function renderButtonFunction() {
			this.dom = document.createElement('div');
			document.body.appendChild(this.dom);
			/* deepscan-disable REACT_ASYNC_RENDER_RETURN_VALUE */
			// eslint-disable-next-line react/no-render-return-value
			this.component = ReactDOM.render(
				<IconSettings iconPath="/assets/icons">{instance}</IconSettings>,
				this.dom
			);
			/* deepscan-enable REACT_ASYNC_RENDER_RETURN_VALUE */
		};
	function removeButton() {
		ReactDOM.unmountComponentAtNode(this.dom);
		document.body.removeChild(this.dom);
	}

	const getButton = (dom) => dom.querySelector('.slds-button');

	// Tests
	describe('Default Structure', () => {
		beforeEach(renderButton(<ButtonStateful {...requiredProps} />));
		afterEach(removeButton);

		it('button exists - is not undefined', function () {
			const button = getButton(this.dom);
			button.should.not.be.undefined;
		});

		it('if no active prop, is not active', function () {
			const button = getButton(this.dom);
			button.className.should.include('slds-not-selected');
		});
	});

	describe('External active props works', () => {
		const propsWithActive = assign({ active: true }, requiredProps);

		beforeEach(renderButton(<ButtonStateful {...propsWithActive} />));
		afterEach(removeButton);

		it('renders active prop', function () {
			const button = getButton(this.dom);
			button.className.should.include('slds-is-selected');
		});
	});

	describe('Aria-* is supported', () => {
		const propsWithAria = assign(
			{ 'aria-pressed': true, 'aria-label': 'abc', 'aria-live': null },
			requiredProps
		);
		beforeEach(renderButton(<ButtonStateful {...propsWithAria} />));
		afterEach(removeButton);

		it('honors aria override', function () {
			const button = getButton(this.dom);
			button.getAttribute('aria-pressed').should.equal('true');
			button.getAttribute('aria-label').should.equal('abc');
			chai.expect(button.getAttribute('aria-live')).to.be.null;
		});
	});

	describe('Aria default for icon button', () => {
		const propsToUse = assign({ variant: 'icon' }, requiredPropsNoVariant);
		beforeEach(renderButton(<ButtonStateful {...propsToUse} />));
		afterEach(removeButton);

		it('gives correct aria default for buttons with icon', function () {
			const button = getButton(this.dom);
			button.getAttribute('aria-live').should.equal('polite');
		});
	});

	describe('Aria default for icon-filled button', () => {
		const propsToUse = assign(
			{ variant: 'icon-filled' },
			requiredPropsNoVariant
		);
		beforeEach(renderButton(<ButtonStateful {...propsToUse} />));
		afterEach(removeButton);

		it('gives correct aria default for buttons with icon-filled', function () {
			const button = getButton(this.dom);
			button.getAttribute('aria-live').should.equal('polite');
		});
	});

	describe('Aria default for non-icon button', () => {
		const propsToUse = assign({ variant: 'base' }, requiredPropsNoVariant);
		beforeEach(renderButton(<ButtonStateful {...propsToUse} />));
		afterEach(removeButton);

		it('gives correct aria default for non-icon buttons', function () {
			const button = getButton(this.dom);
			button.getAttribute('aria-live').should.equal('assertive');
		});
	});

	// TODO: Write more tests for custom renderers
});
