/* eslint-env mocha */
/* global sinon */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
// `this.wrapper` and `this.dom` is set in the helpers file
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

import Illustration from '../../illustration';

chai.use(chaiEnzyme());

const DemoIllustration = createReactClass({
	displayName: 'DemoIllustration',

	render () {
		return <Illustration {...this.props} />;
	},
});

describe('SLDSIllustration: ', function () {
	describe('Image with heading and message render', function () {
		let svg;
		let heading;
		let messageBody;

		beforeEach(
			mountComponent(
				<DemoIllustration
					className="custom-illustration"
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
					name="No Access"
					path="/assets/images/illustrations/empty-state-no-access.svg#no-access"
					size="small"
					style={{ backgroundColor: 'rgb(218, 165, 32)' }}
				/>
			)
		);

		afterEach(unmountComponent);

		it('renders container class', function () {
			expect(this.wrapper.hasClass('slds-illustration')).to.be.true;
			expect(this.wrapper.hasClass('custom-illustration')).to.be.true;
		});
		it('renders illustration size class', function () {
			expect(this.wrapper.hasClass('slds-illustration_small')).to.be.true;
		});
		it('sets svg aria-hidden to true', function () {
			svg = this.wrapper.find('svg');
			expect(svg.node.getAttribute('aria-hidden')).to.equal('true');
		});
		it('renders illustration svg class', function () {
			expect(svg.hasClass('slds-illustration__svg')).to.be.true;
		});
		it('renders svg name attribute', function () {
			svg = this.wrapper.find('svg');
			// also tests that all '_' and ' ' are replaced with '-'
			expect(svg.node.getAttribute('name')).to.equal('no-access');
		});
		it('renders svg custom background color', function () {
			svg = this.wrapper.find('svg');
			expect(svg).to.have.style('backgroundColor', 'rgb(218, 165, 32)');
		});
		it('renders heading', function () {
			heading = this.wrapper.find('.slds-text-heading_medium');
			expect(heading.text()).to.equal('Lorem ipsum dolor');
		});
		it('renders message body', function () {
			messageBody = this.wrapper.find('.slds-text-body_regular');
			expect(messageBody.text()).to.equal(
				'Lorem ipsum dolor sit amet, consectetur'
			);
		});
	});

	describe('Heading and message render', function () {
		let svg;
		let heading;
		let messageBody;

		beforeEach(
			mountComponent(
				<DemoIllustration
					internalIllustration
					heading="Lorem ipsum dolor"
					messageBody="Lorem ipsum dolor sit amet, consectetur"
				/>
			)
		);

		afterEach(unmountComponent);

		it('does not render svg', function () {
			svg = this.wrapper.find('svg');
			expect(svg.node).to.be.undefined;
		});
		it('renders heading', function () {
			heading = this.wrapper.find('.slds-text-heading_medium');
			expect(heading.text()).to.equal('Lorem ipsum dolor');
		});
		it('renders message body', function () {
			messageBody = this.wrapper.find('.slds-text-body_regular');
			expect(messageBody.text()).to.equal(
				'Lorem ipsum dolor sit amet, consectetur'
			);
		});
	});

	describe('Heading only renders', function () {
		let svg;
		let heading;
		let messageBody;

		beforeEach(
			mountComponent(
				<DemoIllustration internalIllustration heading="Lorem ipsum dolor" />
			)
		);

		afterEach(unmountComponent);

		it('does not render svg', function () {
			svg = this.wrapper.find('svg');
			expect(svg.node).to.be.undefined;
		});
		it('renders heading', function () {
			heading = this.wrapper.find('.slds-text-heading_medium');
			expect(heading.text()).to.equal('Lorem ipsum dolor');
		});
		it('does not render message body', function () {
			messageBody = this.wrapper.find('.slds-text-body_regular');
			expect(messageBody.node).to.be.undefined;
		});
	});

	describe('Message only renders', function () {
		let svg;
		let heading;
		let messageBody;

		beforeEach(
			mountComponent(
				<DemoIllustration
					internalIllustration
					messageBody="Lorem ipsum dolor sit amet, consectetur"
				/>
			)
		);

		afterEach(unmountComponent);

		it('does not render svg', function () {
			svg = this.wrapper.find('svg');
			expect(svg.node).to.be.undefined;
		});
		it('does not render heading', function () {
			heading = this.wrapper.find('.slds-text-heading_medium');
			expect(heading.node).to.be.undefined;
		});
		it('renders message body', function () {
			messageBody = this.wrapper.find('.slds-text-body_regular');
			expect(messageBody.text()).to.equal(
				'Lorem ipsum dolor sit amet, consectetur'
			);
		});
	});
});
