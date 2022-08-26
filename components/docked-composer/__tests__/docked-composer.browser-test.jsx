// Import your external dependencies
import React from 'react';

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import IconSettings from '../../icon-settings';

// Import your internal dependencies (for example):
import DockedComposer from '../../docked-composer';
/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
class DemoComponent extends React.Component {
	static displayName = 'DockedComposerDemoComponent';

	state = {
		isOpen: true,
		isClosed: false,
	};

	handleMinimize = () => {
		this.setState({ isOpen: false });
	};

	handleExpand = () => {
		this.setState({ isOpen: true });
	};

	handleClose = () => {
		this.setState({ isClosed: true });
	};

	render() {
		const component = (
			<IconSettings iconPath="/assets/icons">
				<DockedComposer
					header="What's New this Release?"
					body={<div id="composer-body">Hello</div>}
					id="docked-composer-demo"
					events={{
						onMinimize: this.handleMinimize,
						onExpand: this.handleExpand,
						onClose: this.handleClose,
					}}
					isOpen={this.state.isOpen}
				/>
				<div id={this.state.isOpen ? 'open' : 'collapsed'} />
				<div id={this.state.isClosed ? 'closed' : 'notClosed'} />
			</IconSettings>
		);

		return component;
	}
}

describe('SLDSDockedComposer', function describeFunction() {
	let wrapper;

	it('onMinimize, onExpand, onClose callbacks', () => {
		afterEach(() => wrapper.unmount());

		wrapper = mount(<DemoComponent />);

		// Composer should be initially open
		expect(wrapper.find('#open')).to.have.length(1);
		expect(wrapper.find('#closed')).to.have.length(0);

		// Click the minimize button
		wrapper
			.find('button#docked-composer-demo-minimize-button')
			.simulate('click');

		expect(wrapper.find('#collapsed')).to.have.length(1);
		expect(wrapper.find('#closed')).to.have.length(0);

		// Clicking the minimize button again doesn't do anyting
		wrapper
			.find('button#docked-composer-demo-minimize-button')
			.simulate('click');

		expect(wrapper.find('#collapsed')).to.have.length(1);
		expect(wrapper.find('#closed')).to.have.length(0);

		// Click the expand button now
		wrapper.find('button#docked-composer-demo-expand-button').simulate('click');

		expect(wrapper.find('#open')).to.have.length(1);
		expect(wrapper.find('#closed')).to.have.length(0);

		// Clicking the close button sets the close state
		wrapper.find('button#docked-composer-demo-close-button').simulate('click');

		expect(wrapper.find('#open')).to.have.length(1);
		expect(wrapper.find('#closed')).to.have.length(1);
	});
});
