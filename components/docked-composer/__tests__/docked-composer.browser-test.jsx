import React from 'react';

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import IconSettings from '../../icon-settings';
import DockedComposer from '../../docked-composer';

chai.use(chaiEnzyme());
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
						onRequestMinimize: this.handleMinimize,
						onRequestExpand: this.handleExpand,
						onRequestClose: this.handleClose,
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

	it('onRequestMinimize, onRequestExpand, onRequestClose callbacks', () => {
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
