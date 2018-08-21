import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';

import chai from 'chai';

import IconSettings from '../../icon-settings';
import Icon from '../../icon';
import ButtonStateful from '../../button-stateful';

chai.should();

describe('Button Stateful: ', () => {
	// Base defaults
	const requiredProps = {
		assistiveText: { icon: 'like' },
		iconName: 'like',
		iconSize: 'large',
		variant: 'icon',
	};

	// Setup and takedown
	const renderButton = (instance) =>
		function () {
			this.dom = document.createElement('div');
			document.body.appendChild(this.dom);
			this.component = ReactDOM.render(
				<IconSettings iconPath="/assets/icons">{instance}</IconSettings>,
				this.dom
			);
		};
	function removeButton () {
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
		const propsWithActive = assign(requiredProps, { active: true });

		beforeEach(renderButton(<ButtonStateful {...propsWithActive} />));
		afterEach(removeButton);

		it('renders active prop', function () {
			const button = getButton(this.dom);
			button.className.should.include('slds-is-selected');
		});
	});

	// TODO: Write more tests for custom renderers
});
