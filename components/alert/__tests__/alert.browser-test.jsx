/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React, { Component } from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

import Alert from '../';
import AlertContainer from '../container';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

chai.use(chaiEnzyme());

class DemoComponent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			isOpen: true,
		};
	}

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<AlertContainer>
						{this.state.isOpen ? (
							<Alert
								dismissible
								icon={<Icon category="utility" name="user" />}
								labels={{
									heading: 'Logged in as John Smith (johnsmith@acme.com).',
									headingLink: 'Log out',
								}}
								onClickHeadingLink={this.props.onClickHeadingLink}
								onRequestClose={() => {
									this.setState({ isOpen: false });
								}}
							/>
						) : null}
					</AlertContainer>
				</div>
			</IconSettings>
		);
	}
}

DemoComponent.displayName = 'AlertExample';

describe('SLDSAlert: ', function () {
	let wrapper;
	const onClickHeadingLink = sinon.spy();

	describe('Dismiss alert', () => {
		beforeEach(
			mountComponent(<DemoComponent onClickHeadingLink={onClickHeadingLink} />),
		);

		afterEach(unmountComponent);

		/* Please notice the of `function () {}` and not () => {}.
		 * It allows access to the Mocha test context via `this`.
		 */
		it('calls onRequestClose handler', function () {
			const button = this.wrapper.find('.slds-notify__close');
			// If applicable, use second parameter to pass the data object
			expect(this.wrapper.find('.slds-notify').length).to.equal(1);
			button.simulate('click', {});
			expect(this.wrapper.find('.slds-notify').length).to.equal(0);
		});
		it('calls onClickHeadingLink handler', function () {
			const link = this.wrapper.find('a');
			// If applicable, use second parameter to pass the data object
			link.simulate('click', {});
			expect(onClickHeadingLink.calledOnce).to.be.true;
		});
	});
});
