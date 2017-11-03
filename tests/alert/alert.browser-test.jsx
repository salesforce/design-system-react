/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mountComponent, unmountComponent } from '../enzyme-helpers';

chai.use(chaiEnzyme());

import Alert from '~/components/alert'; // `~` is replaced with design-system-react at runtime
import AlertContainer from '~/components/alert/container'; // `~` is replaced with design-system-react at runtime
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button'; // `~` is replaced with design-system-react at runtime
import IconSettings from '../../components/icon-settings';

class DemoComponent extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			isOpen: true
		};
	}

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<AlertContainer>
						{this.state.isOpen
							? <Alert
								dismissible
								icon={<Icon category="utility" name="user" />}
								labels={{
									heading: 'Logged in as John Smith (johnsmith@acme.com).',
									headingLink: 'Log out'
								}}
								onClickHeadingLink={this.props.onClickHeadingLink}
								onRequestClose={() => { this.setState({ isOpen: false }); }}
							/>
							: null }
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
		beforeEach(mountComponent(
			<DemoComponent onClickHeadingLink={onClickHeadingLink} />
		));

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
