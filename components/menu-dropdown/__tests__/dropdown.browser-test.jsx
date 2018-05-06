// Import your external dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import assign from 'lodash.assign';
import {
	Simulate,
	findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

// Import your internal dependencies (for example):
import Dropdown from '../../menu-dropdown';
import IconSettings from '../../icon-settings';
import List from '../../utilities/menu-list';
import KEYS, { keyObjects } from '../../../utilities/key-code';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const menuOptions = [
	{ label: 'A super short', value: 'A0' },
	{ label: 'B Option Super Super Long', value: 'B0' },
	{ label: 'C Option', value: 'C0' },
	{ disabled: true, label: 'D Option', value: 'D0' },
];

const defaultProps = {
	iconCategory: 'utility',
	iconName: 'down',
	id: 'sample-dropdown',
	label: 'Test',
	menuPosition: 'relative',
	openOn: 'click',
	options: menuOptions,
	placeholder: 'Select a contact',
	value: 'B0',
};

/* eslint-disable react/prop-types */
const DropdownCustomContent = (props) => (
	<div id="custom-dropdown-menu-content">
		<div className="slds-m-around--medium">
			<div className="slds-tile slds-tile--board slds-m-horizontal--small">
				<p className="tile__title slds-text-heading--small">Art Vandelay</p>
				<div className="slds-tile__detail">
					<p className="slds-truncate">
						<a
							id="custom-dropdown-menu-content-link"
							className="slds-m-right--medium"
							href="javascript:void(0);"
							onClick={props.onClick}
						>
							Settings
						</a>
						<a href="javascript:void(0);" onClick={props.onClick}>
							Log Out
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
);
DropdownCustomContent.displayName = 'DropdownCustomContent';

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
class DemoComponent extends React.Component {
	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Dropdown {...defaultProps} {...this.props}>
					{this.props.children}
				</Dropdown>
			</IconSettings>
		);
	}
}

DemoComponent.displayName = 'DropdownDemoComponent';
DemoComponent.defaultProps = defaultProps;

const getNodes = ({ wrapper }) => ({
	trigger: wrapper.find('.slds-dropdown-trigger'),
	button: wrapper.find('.slds-dropdown-trigger button'),
	menu: wrapper.find('.slds-dropdown'),
	customContent: wrapper.find('#custom-dropdown-menu-content'),
	customContentLink: wrapper.find(
		'#custom-dropdown-menu-content #custom-dropdown-menu-content-link'
	),
});

/* All tests for component being tested should be wrapped in a root `describe`,
 * which should be named after the component being tested.
 * When read aloud, the cumulative `describe` and `it` names should form a coherent
 * sentence, eg "Date Picker default structure and css is present with expected
 * attributes set". If you are having trouble constructing a cumulative short
 * sentence, this may be an indicator that your test is poorly structured.
 * String provided as first parameter names the `describe` section. Limit to nouns
 * as much as possible/appropriate.`
 */
describe('SLDSMenuDropdown', function () {
	let wrapper;

	describe('Styling', () => {
		beforeEach(
			mountComponent(<DemoComponent menuStyle={{ height: '500px' }} />)
		);

		afterEach(unmountComponent);

		it('has correct CSS classes and style', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.button.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu).to.exist;
			expect(openNodes.menu).to.have.style('height', '500px');
		});
	});

	describe('Custom Content Present', () => {
		beforeEach(
			mountComponent(
				<DemoComponent nubbinPosition="top left" openOn="click">
					<DropdownCustomContent />
					<List
						options={[{ label: 'Custom Content Option' }, ...menuOptions]}
					/>
				</DemoComponent>
			)
		);

		afterEach(unmountComponent);

		it('has content with custom ID is present', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.button.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.customContent.nodes.length).to.equal(1);
		});

		it('closes when custom content is clicked', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.button.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			openNodes.customContentLink.simulate('click', {});
			const closedNodes = getNodes({ wrapper: this.wrapper });
			expect(closedNodes.customContent.nodes.length).to.equal(0);
		});

		it("has additional ListItem from list child's options prop", function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			const buttonId = nodes.trigger.node.id;
			nodes.button.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.find(`#${buttonId}-item-0`).text()).to.equal(
				'Custom Content Option'
			);
		});
	});

	describe('Clickable', () => {
		const onClick = sinon.spy();

		beforeEach(mountComponent(<DemoComponent onClick={onClick} />));

		afterEach(unmountComponent);

		it('does not expand on hover', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			expect(nodes.menu.nodes.length).to.equal(0);
			nodes.trigger.simulate('mouseEnter', {});
			const hoverNodes = getNodes({ wrapper: this.wrapper });
			expect(hoverNodes.menu.nodes.length).to.equal(0);
		});

		it('expands/contracts on click', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			expect(nodes.menu.nodes.length).to.equal(0);
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.nodes.length).to.equal(1);
			openNodes.trigger.simulate('click', {});
			const closedNodes = getNodes({ wrapper: this.wrapper });
			expect(closedNodes.menu.nodes.length).to.equal(0);
		});

		it('preserves click behavior', function () {
			onClick.reset();
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.trigger.simulate('click', {});
			expect(onClick.calledOnce);
		});
	});

	describe('Expanded', () => {
		let selected;

		beforeEach(
			mountComponent(
				<DemoComponent
					onSelect={(selectedOption) => {
						selected = selectedOption;
					}}
				/>
			)
		);

		afterEach(unmountComponent);

		it('selects an item on click', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			expect(nodes.menu.nodes.length).to.equal(0);
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			openNodes.menu
				.find('li a')
				.first()
				.simulate('click', {});
			expect(selected.value).to.equal('A0');
		});
	});

	describe('accessible markup for label Dropdowns', () => {
		beforeEach(mountComponent(<DemoComponent />));

		afterEach(unmountComponent);

		it('<ul> has role menu & aria-labelledby', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.find('ul').node.getAttribute('role')).to.equal(
				'menu'
			);
			expect(
				openNodes.menu.find('ul').node.getAttribute('aria-labelledby')
			).to.equal(openNodes.trigger.node.getAttribute('id'));
		});

		it('<a> inside <li> has role menuitem', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			const anchorRole = openNodes.menu
				.find('li a')
				.first()
				.node.getAttribute('role');
			const match =
				anchorRole === 'menuitem' ||
				anchorRole === 'menuitemradio' ||
				anchorRole === 'menuitemcheckbox';
			expect(match).to.be.true;
		});

		it('if option.disabled, add aria-disabled to <a> that has role menuitem', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			const lastItemAriaDisabledRole = openNodes.menu
				.find('li a')
				.get(3)
				.getAttribute('aria-disabled');
			expect(lastItemAriaDisabledRole).to.equal('true');
		});
	});

	describe('accessible markup for Icon Only Dropdowns', () => {
		beforeEach(
			mountComponent(
				<DemoComponent
					assistiveText="more options"
					buttonVariant="icon"
					checkmark
					iconCategory="utility"
					iconName="down"
					iconVariant="border-filled"
				/>
			)
		);

		afterEach(unmountComponent);

		it('<button> has assistiveText', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			console.log(nodes.button);
			expect(nodes.button.find('.slds-assistive-text').text()).to.equal(
				'more options'
			);
		});
	});

	describe('Keyboard behavior', () => {
		let selected;

		beforeEach(
			mountComponent(
				<DemoComponent
					onSelect={(selectedOption) => {
						selected = selectedOption;
					}}
				/>
			)
		);

		afterEach(unmountComponent);

		it('opens menu with enter', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			expect(nodes.menu.nodes.length).to.equal(0);
			nodes.button.simulate('keyDown', keyObjects.ENTER);
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.nodes.length).to.equal(1);
		});

		it('opens menu with down arrow key', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			expect(nodes.menu.nodes.length).to.equal(0);
			nodes.button.simulate('keyDown', keyObjects.DOWN);
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.nodes.length).to.equal(1);
		});

		it('selects an item with keyboard', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			openNodes.menu.simulate('keyDown', keyObjects.DOWN);
			openNodes.menu.simulate('keyDown', keyObjects.DOWN);
			openNodes.menu.simulate('keyDown', keyObjects.ENTER);
			expect(selected.value).to.equal('B0');
		});

		it('closes Menu on esc', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			expect(nodes.menu.nodes.length).to.equal(0);
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.nodes.length).to.equal(1);
			openNodes.menu
				.find('.slds-dropdown__item a')
				.first()
				.simulate('keyDown', keyObjects.ESCAPE);
			const closedNodes = getNodes({ wrapper: this.wrapper });
			expect(closedNodes.menu.nodes.length).to.equal(0);
		});
	});

	describe('multiple selection', function () {
		beforeEach(mountComponent(<DemoComponent multiple checkmark />));

		afterEach(unmountComponent);

		it('selects multiple items and renders checkmarks', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(
				openNodes.menu.find('.slds-dropdown__item svg').nodes.length
			).to.equal(1);
			openNodes.menu
				.find('.slds-dropdown__item a')
				.first()
				.simulate('click', {});
			expect(
				openNodes.menu.find('.slds-dropdown__item svg').nodes.length
			).to.equal(2);
		});
	});

	// Hover and hybrid hover UX patterns are not approved UX patterns due to accessibility concerns

	describe('Hoverable', () => {
		let body;

		const renderDropdown = (inst) => {
			body = document.createElement('div');
			document.body.appendChild(body);
			// eslint-disable-next-line react/no-render-return-value
			return ReactDOM.render(
				<IconSettings iconPath="/assets/icons">{inst}</IconSettings>,
				body
			);
		};

		function removeDropdownTrigger () {
			ReactDOM.unmountComponentAtNode(body);
			document.body.removeChild(body);
		}

		const createDropdown = (props) =>
			React.createElement(Dropdown, assign({}, defaultProps, props));
		createDropdown.displayName = 'createDropdown';

		const dropItDown = (props, children) =>
			renderDropdown(createDropdown(props, children));

		const getMenu = (dom) => dom.querySelector('.slds-dropdown');

		let cmp;
		let btn;

		beforeEach(() => {
			cmp = dropItDown({ buttonClassName: 'dijkstrafied', openOn: 'hover' });
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-dropdown-trigger');
		});

		afterEach(() => {
			removeDropdownTrigger(btn);
		});

		it('gives the button correct aria properties', () => {
			expect(btn.firstChild.getAttribute('aria-haspopup')).to.equal('true');
		});

		it('sets the label', () => {
			expect(btn.textContent).to.equal('Test');
		});

		it('expands the dropdown on hover', () => {
			expect(getMenu(body)).to.equal(null);
			Simulate.mouseEnter(btn, {});
			expect(getMenu(body).className).to.include('slds-dropdown');
			Simulate.mouseLeave(btn, {});
		});

		it('closes on blur based on timeout delay', (done) => {
			expect(getMenu(body)).to.equal(null);
			Simulate.mouseEnter(btn, {});
			Simulate.mouseLeave(btn);
			expect(getMenu(body)).to.not.equal(null);
			setTimeout(() => {
				expect(getMenu(body)).to.equal(null);
				done();
			}, 600);
		});

		it("doesn't close on quick hover outside", (done) => {
			expect(getMenu(body)).to.equal(null);
			Simulate.mouseEnter(btn, {});
			Simulate.mouseLeave(btn);
			setTimeout(() => {
				expect(getMenu(body)).to.not.equal(null);
				setTimeout(() => {
					expect(getMenu(body)).to.equal(null);
					done();
				}, 600);
			}, 100);
		});
	});

	describe('Hybrid-able', () => {
		let body;

		const renderDropdown = (inst) => {
			body = document.createElement('div');
			document.body.appendChild(body);
			// eslint-disable-next-line react/no-render-return-value
			return ReactDOM.render(
				<IconSettings iconPath="/assets/icons">{inst}</IconSettings>,
				body
			);
		};

		function removeDropdownTrigger () {
			ReactDOM.unmountComponentAtNode(body);
			document.body.removeChild(body);
		}

		const createDropdown = (props) =>
			React.createElement(Dropdown, assign({}, defaultProps, props));
		createDropdown.displayName = 'createDropdown';

		const dropItDown = (props, children) =>
			renderDropdown(createDropdown(props, children));

		const getMenu = (dom) => dom.querySelector('.slds-dropdown');

		let cmp;
		let btn;
		const onClick = sinon.spy();

		beforeEach(() => {
			cmp = dropItDown({ openOn: 'hybrid', onClick });
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-dropdown-trigger');
		});

		afterEach(() => {
			removeDropdownTrigger(btn);
		});

		it('doesnt expand on hover', () => {
			expect(getMenu(body)).to.equal(null);
			Simulate.mouseEnter(btn, {});
			expect(getMenu(body)).to.equal(null);
		});

		it('opens on click, closes on mouseLeave', (done) => {
			// open
			expect(getMenu(body)).to.equal(null);
			Simulate.click(btn, {});
			expect(getMenu(body).className).to.include('slds-dropdown');

			// close
			Simulate.mouseEnter(btn, {});
			Simulate.mouseLeave(btn);
			expect(getMenu(body)).to.not.equal(null);
			setTimeout(() => {
				expect(getMenu(body)).to.equal(null);
				done();
			}, 600);
		});
	});
});
