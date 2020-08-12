/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

import Toast from '../../toast'; // `~` is replaced with design-system-react at runtime
import ToastContainer from '../../toast/container'; // `~` is replaced with design-system-react at runtime
import Icon from '../../icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '../../icon-settings';

chai.use(chaiEnzyme());

class DemoComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: true,
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<ToastContainer>
						{this.state.isOpen ? (
							<Toast
								dismissible
								icon={<Icon category="utility" name="user" />}
								labels={{
									heading: 'Logged in as John Smith (johnsmith@acme.com).',
									headingLink: 'Log out',
								}}
								onRequestClose={() => {
									this.setState({ isOpen: false });
								}}
								{...this.props}
							/>
						) : null}
					</ToastContainer>
				</div>
			</IconSettings>
		);
	}
}

DemoComponent.displayName = 'ToastExample';

describe('SLDSToast: ', function () {
	const onClickHeadingLink = sinon.spy();

	describe('Dismiss Toast', () => {
		beforeEach(
			mountComponent(<DemoComponent onClickHeadingLink={onClickHeadingLink} />)
		);

		afterEach(unmountComponent);

		/* Please notice the of `function () {}` and not () => {}.
		 * It allows access to the Mocha test context via `this`.
		 */
		it('calls onRequestClose handler', function () {
			const button = this.wrapper.find('button.slds-notify__close');
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

	describe('Toast with duration auto-closes itself', () => {
		beforeEach(mountComponent(<DemoComponent duration={1} />));

		// afterEach(unmountComponent);

		/* Please notice the of `function () {}` and not () => {}.
		 * It allows access to the Mocha test context via `this`.
		 */
		it('it calls onRequestClose after 1ms', function (done) {
			expect(this.wrapper).to.have.state('isOpen', true);

			setTimeout(() => {
				expect(this.wrapper).to.have.state('isOpen', false);
				done();
			}, 2);
		});
	});

	describe('Basic Toast Props Render', function () {
		beforeEach(
			mountComponent(
				<DemoComponent style={{ backgroundColor: 'rgb(18, 49, 35)' }} />
			)
		);

		afterEach(unmountComponent);

		it('renders custom styles', function () {
			expect(
				this.wrapper.find('.slds-notify').prop('style').backgroundColor
			).to.equal('rgb(18, 49, 35)');
		});
	});
});
