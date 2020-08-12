/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* global sinon */

import React from 'react';

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
// `this.wrapper` and `this.dom` is set in the helpers file
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

import Illustration from '../../illustration';

chai.use(chaiEnzyme());

class DemoIllustration extends React.Component {
	static displayName = 'DemoIllustration';

	render() {
		return <Illustration {...this.props} silenceDeprecationWarning />;
	}
}

describe('SLDSIllustration: ', function describeFunction() {
	describe('Image with heading and message render', function describeFunction2() {
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
			expect(this.wrapper).to.have.className('slds-illustration');
			expect(this.wrapper).to.have.className('custom-illustration');
		});
		it('renders illustration size class', function () {
			expect(this.wrapper).to.have.className('slds-illustration_small');
		});
		it('sets svg aria-hidden to true', function () {
			svg = this.wrapper.find('svg');
			expect(svg).to.have.attr('aria-hidden', 'true');
		});
		it('renders illustration svg class', function () {
			svg = this.wrapper.find('svg');
			expect(svg.hasClass('slds-illustration__svg')).to.be.true; // chai-enzyme is buggy with an svg
		});
		it('renders svg name attribute', function () {
			svg = this.wrapper.find('svg');
			// also tests that all '_' and ' ' are replaced with '-'
			expect(svg).to.have.attr('name', 'no-access');
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

	describe('Heading and message render', function describeFunction2() {
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
			expect(svg).not.to.be.present();
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

	describe('Heading only renders', function describeFunction2() {
		let svg;
		let heading;

		beforeEach(
			mountComponent(
				<DemoIllustration internalIllustration heading="Lorem ipsum dolor" />
			)
		);

		afterEach(unmountComponent);

		it('does not render svg', function () {
			svg = this.wrapper.find('svg');
			expect(svg).not.to.be.present();
		});
		it('renders heading', function () {
			heading = this.wrapper.find('.slds-text-heading_medium');
			expect(heading.text()).to.equal('Lorem ipsum dolor');
		});
		it('does not render message body', function () {
			expect(this.wrapper.find('.slds-text-body_regular')).not.to.be.present();
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
			expect(svg).not.to.be.present();
		});
		it('does not render heading', function () {
			heading = this.wrapper.find('.slds-text-heading_medium');
			expect(heading).not.to.be.present();
		});
		it('renders message body', function () {
			messageBody = this.wrapper.find('.slds-text-body_regular');
			expect(messageBody.text()).to.equal(
				'Lorem ipsum dolor sit amet, consectetur'
			);
		});
	});
});
