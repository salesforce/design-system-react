/* eslint-env mocha */
/* global sinon */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */

import React from 'react';

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
// `this.wrapper` and `this.dom` is set in the helpers file
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

chai.use(chaiEnzyme());

import Icon from '../../icon';
import IconSettings from '../../icon-settings';

class DemoIcon extends React.Component {
	static displayName = 'DemoIcon';

	render() {
		return <Icon {...this.props} />;
	}
}

describe('SLDSIcon: ', function describeFunction() {
	describe('Standard Icon Props Render', function () {
		let svg;

		beforeEach(
			mountComponent(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Log a Call' }}
						category="standard"
						name="log_a_call"
						style={{ backgroundColor: 'rgb(218, 165, 32)' }}
						size="large"
					/>
				</IconSettings>
			)
		);

		afterEach(unmountComponent);

		it('renders container class', function () {
			expect(this.wrapper).to.have.className('slds-icon_container');
		});

		it('renders assistive text', function () {
			expect(this.wrapper.find('.slds-assistive-text')).to.have.text(
				'Log a Call'
			);
		});

		it('renders icon name class on svg', function () {
			// also tests that all '_' are replaced with '-'
			expect(this.wrapper).to.have.className('slds-icon-standard-log-a-call');
		});

		it('renders custom background color', function () {
			svg = this.wrapper.find('svg');
			expect(svg).to.have.style('backgroundColor', 'rgb(218, 165, 32)');
		});

		it('renders icon size class', function () {
			svg = this.wrapper.find('svg');
			expect(svg.hasClass('slds-icon_large')).to.be.true;
		});
	});

	describe('Custom Icon Props Render', function describeFunction2() {
		let svg;

		beforeEach(
			mountComponent(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Heart' }}
						category="custom"
						name="custom1"
						size="small"
					/>
				</IconSettings>
			)
		);

		afterEach(unmountComponent);

		it('renders container class', function () {
			expect(this.wrapper).to.have.className('slds-icon_container');
		});

		it('renders assistive text', function () {
			expect(this.wrapper.find('.slds-assistive-text')).to.have.text('Heart');
		});

		it('renders icon name class on svg', function () {
			// also tests that all '_' are replaced with '-'
			expect(this.wrapper).to.have.className('slds-icon-custom-custom1');
		});

		it('renders icon size class', function () {
			svg = this.wrapper.find('svg');
			expect(svg.hasClass('slds-icon_small')).to.be.true;
		});
	});

	describe('Action Icon Props Render', function describeFunction() {
		let svg;

		beforeEach(
			mountComponent(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'Announcements' }}
						category="action"
						name="announcement"
						size="large"
						title="custom title"
						className="slds-m-around_x-small"
					/>
				</IconSettings>
			)
		);

		afterEach(unmountComponent);

		it('renders container class', function () {
			expect(this.wrapper).to.have.className('slds-icon_container');
		});

		it('renders assistive text', function () {
			expect(this.wrapper.find('.slds-assistive-text')).to.have.text(
				'Announcements'
			);
		});

		it('renders round container', function () {
			expect(this.wrapper).to.have.className('slds-icon_container_circle');
		});

		it('renders icon name class on svg', function () {
			// also tests that all '_' are replaced with '-'
			expect(this.wrapper).to.have.className('slds-icon-action-announcement');
		});

		it('renders icon size class', function () {
			svg = this.wrapper.find('svg');
			expect(svg.hasClass('slds-icon_large')).to.be.true;
		});

		it('renders title', function () {
			expect(this.wrapper.find('[title="custom title"]')).to.exist;
		});
	});

	describe('Utility Icon Props Render', function describeFunction() {
		beforeEach(
			mountComponent(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon category="utility" name="open_folder" size="medium" />
				</IconSettings>
			)
		);

		afterEach(unmountComponent);

		it('does NOT render container class', function () {
			expect(this.wrapper.hasClass('slds-icon_container')).to.be.false;
		});

		it('medium size does not render size class', function () {
			// also tests that all '_' are replaced with '-'
			expect(this.wrapper.hasClass('slds-icon_medium')).to.be.false;
		});

		it('utility icons do not render name class on svg', function () {
			// also tests that all '_' are replaced with '-'
			expect(this.wrapper.hasClass('slds-icon-text-default')).to.be.false;
		});
	});

	describe('Icon with external path renders', function describeFunction() {
		beforeEach(
			mountComponent(
				<IconSettings iconPath="/assets/icons">
					<DemoIcon
						assistiveText={{ label: 'New stuff!' }}
						inverse
						path="/assets/icons/utility-sprite/svg/symbols.svg#announcement"
						size="medium"
					/>
				</IconSettings>
			)
		);

		afterEach(unmountComponent);

		it('does NOT render slds-icon-standard class', function () {
			expect(this.wrapper.hasClass('slds-icon-standard-')).to.be.false;
		});

		it('path prop is passed to svg', function () {
			expect(this.wrapper.find('use')).to.have.attr(
				'href',
				'/assets/icons/utility-sprite/svg/symbols.svg#announcement'
			);
		});
	});
});
