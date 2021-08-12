/* eslint-disable max-lines */

// Import your external dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import assign from 'lodash.assign';
import { Simulate } from 'react-dom/test-utils';

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
import Tooltip from '../../tooltip';
import List from '../../utilities/menu-list';
import { keyObjects } from '../../../utilities/key-code';
import EventUtil from '../../../utilities/event';

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
		<div className="slds-m-around_medium">
			<div className="slds-tile slds-tile_board slds-m-horizontal_small">
				<p className="tile__title slds-text-heading_small">Art Vandelay</p>
				<div className="slds-tile__detail">
					<p className="slds-truncate">
						<a
							id="custom-dropdown-menu-content-link"
							className="slds-m-right_medium"
							href="#"
							onClick={EventUtil.trappedHandler(props.onClick)}
						>
							Settings
						</a>
						<a href="#" onClick={EventUtil.trappedHandler(props.onClick)}>
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
	render() {
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
	describe('Styling', () => {
		beforeEach(
			mountComponent(
				<DemoComponent menuStyle={{ height: '500px' }} width="small" />
			)
		);

		afterEach(unmountComponent);

		it('has correct CSS classes and style', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.button.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu).to.exist;
			expect(openNodes.menu).to.have.style('height', '500px');
			expect(openNodes.menu.hasClass('slds-dropdown_small')).to.equal(true);
		});
	});

	describe('Inverse', () => {
		beforeEach(mountComponent(<DemoComponent inverse />));

		afterEach(unmountComponent);

		it('has correct CSS class for inverse', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.button.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.hasClass('slds-dropdown_inverse')).to.equal(true);
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
			expect(openNodes.customContent.length).to.equal(1);
		});

		it('closes when custom content is clicked', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.button.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			openNodes.customContentLink.simulate('click', {});
			const closedNodes = getNodes({ wrapper: this.wrapper });
			expect(closedNodes.customContent.length).to.equal(0);
		});

		it("has additional ListItem from list child's options prop", function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			const buttonId = nodes.trigger.prop('id');
			nodes.button.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.find(`li#${buttonId}-item-0`).text()).to.equal(
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
			expect(nodes.menu.length).to.equal(0);
			nodes.trigger.simulate('mouseEnter', {});
			const hoverNodes = getNodes({ wrapper: this.wrapper });
			expect(hoverNodes.menu.length).to.equal(0);
		});

		it('expands/contracts on click', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			expect(nodes.menu.length).to.equal(0);
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.length).to.equal(1);
			openNodes.trigger.simulate('click', {});
			const closedNodes = getNodes({ wrapper: this.wrapper });
			expect(closedNodes.menu.length).to.equal(0);
		});

		it('preserves click behavior', function () {
			onClick.resetHistory();
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
			expect(nodes.menu.length).to.equal(0);
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			openNodes.menu.find('li a').first().simulate('click', {});
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
			expect(openNodes.menu.find('ul')).to.have.attr('role', 'menu');
			const nodeId = openNodes.trigger.prop('id');
			expect(openNodes.menu.find('ul')).attr('aria-labelledby', nodeId);
		});

		it('<a> inside <li> has role menuitem', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			const anchorRole = openNodes.menu.find('li a').first().prop('role');
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
				.at(3)
				.prop('aria-disabled');
			expect(lastItemAriaDisabledRole).to.be.true;
		});
	});

	describe('accessible markup for Icon Only Dropdowns', () => {
		beforeEach(
			mountComponent(
				<DemoComponent
					assistiveText={{ icon: 'more options' }}
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
			expect(nodes.menu.length).to.equal(0);
			nodes.button.simulate('keyDown', keyObjects.ENTER);
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.length).to.equal(1);
		});

		it('opens menu with down arrow key', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			expect(nodes.menu.length).to.equal(0);
			nodes.button.simulate('keyDown', keyObjects.DOWN);
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.length).to.equal(1);
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
			expect(nodes.menu.length).to.equal(0);
			nodes.trigger.simulate('click', {});
			const openNodes = getNodes({ wrapper: this.wrapper });
			expect(openNodes.menu.length).to.equal(1);
			openNodes.menu
				.find('.slds-dropdown__item a')
				.first()
				.simulate('keyDown', keyObjects.ESCAPE);
			const closedNodes = getNodes({ wrapper: this.wrapper });
			expect(closedNodes.menu.length).to.equal(0);
		});
	});

	describe('multiple selection', function () {
		beforeEach(mountComponent(<DemoComponent multiple checkmark />));

		afterEach(unmountComponent);

		it('selects multiple items and renders checkmarks', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.trigger.simulate('click', {});
			let openNodes = getNodes({ wrapper: this.wrapper });
			const firstNode = openNodes.menu.find('.slds-dropdown__item a').at(0);
			firstNode.simulate('click');
			const secondNode = openNodes.menu.find('.slds-dropdown__item a').at(2);
			secondNode.simulate('click');
			const thirdNode = openNodes.menu.find('.slds-dropdown__item a').at(3);
			openNodes = getNodes({ wrapper: this.wrapper });
			// item with checkmark has proper aria markup
			expect(firstNode.getDOMNode().getAttribute('aria-checked')).to.equal(
				'true'
			);
			expect(secondNode.getDOMNode().getAttribute('aria-checked')).to.equal(
				'true'
			);
			expect(thirdNode.getDOMNode().getAttribute('aria-checked')).to.equal(
				null
			);
			expect(firstNode).attr('role', 'menuitemcheckbox');
		});
	});

	// Hover and hybrid hover UX patterns are not approved UX patterns due to accessibility concerns

	describe('Hoverable', () => {
		let body;

		const renderDropdown = (inst) => {
			body = document.createElement('div');
			document.body.appendChild(body);
			/* deepscan-disable REACT_ASYNC_RENDER_RETURN_VALUE */
			// eslint-disable-next-line react/no-render-return-value
			return ReactDOM.render(
				<div>
					<IconSettings iconPath="/assets/icons">{inst}</IconSettings>
				</div>,
				body
			);
			/* deepscan-enable REACT_ASYNC_RENDER_RETURN_VALUE */
		};

		function removeDropdownTrigger() {
			ReactDOM.unmountComponentAtNode(body);
			document.body.removeChild(body);
		}

		const createDropdown = (props) =>
			React.createElement(Dropdown, assign({}, defaultProps, props));
		createDropdown.displayName = 'createDropdown';

		const dropItDown = (props) => renderDropdown(createDropdown(props));

		const getMenu = (dom) => dom.querySelector('.slds-dropdown');

		let cmp;
		let btn;

		beforeEach(() => {
			cmp = dropItDown({
				buttonClassName: 'dijkstrafied',
				openOn: 'hover',
				hoverCloseDelay: 2,
			});
			[btn] = cmp.getElementsByClassName('slds-dropdown-trigger');
		});

		afterEach((done) => {
			// due to hover-close delay, removal from DOM must be delayed
			setTimeout(() => {
				removeDropdownTrigger();
				done();
			}, 100);
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
			}, 3);
		});

		it("doesn't close on quick hover outside", (done) => {
			expect(getMenu(body)).to.equal(null);
			Simulate.mouseEnter(btn, {});
			Simulate.mouseLeave(btn);
			setTimeout(() => {
				Simulate.mouseEnter(btn, {});
				expect(getMenu(body)).to.not.equal(null);
				setTimeout(() => {
					expect(getMenu(body)).to.not.equal(null);
					done();
				}, 3);
			}, 1);
		});
	});

	describe('Hybrid-able', () => {
		let body;

		const renderDropdown = (inst) => {
			body = document.createElement('div');
			document.body.appendChild(body);
			/* deepscan-disable REACT_ASYNC_RENDER_RETURN_VALUE */
			// eslint-disable-next-line react/no-render-return-value
			return ReactDOM.render(
				<div>
					<IconSettings iconPath="/assets/icons">{inst}</IconSettings>
				</div>,
				body
			);
			/* deepscan-enable REACT_ASYNC_RENDER_RETURN_VALUE */
		};

		function removeDropdownTrigger() {
			ReactDOM.unmountComponentAtNode(body);
			document.body.removeChild(body);
		}

		const createDropdown = (props) =>
			React.createElement(Dropdown, assign({}, defaultProps, props));
		createDropdown.displayName = 'createDropdown';

		const dropItDown = (props) => renderDropdown(createDropdown(props));

		const getMenu = (dom) => dom.querySelector('.slds-dropdown');

		let cmp;
		let btn;
		const onClick = sinon.spy();

		beforeEach(() => {
			cmp = dropItDown({ openOn: 'hybrid', onClick, hoverCloseDelay: 1 });
			[btn] = cmp.getElementsByClassName('slds-dropdown-trigger');
		});

		afterEach(() => {
			removeDropdownTrigger();
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
			}, 2);
		});
	});

	describe('Tooltips function as expected', () => {
		beforeEach(
			mountComponent(
				<DemoComponent
					options={[
						{ label: 'Test item A', value: 'A0' },
						{
							label: 'Test item B',
							value: 'B0',
							tooltipContent: 'Testing tooltip content',
						},
						{ label: 'Test item C', value: 'C0' },
					]}
					tooltipMenuItem={<Tooltip />}
				/>
			)
		);

		afterEach(unmountComponent);

		it('Tooltip component shows when focused on menu item.', function () {
			const nodes = getNodes({ wrapper: this.wrapper });
			nodes.trigger.simulate('focus');
			nodes.trigger.simulate('keyDown', keyObjects.ENTER);
			nodes.trigger.simulate('keyDown', keyObjects.DOWN);

			const tooltip = this.wrapper.find('#sample-dropdown-item-1-tooltip');
			expect(tooltip.length).to.equal(1);
		});
	});
});
