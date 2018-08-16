// Import your external dependencies
import React from 'react';
import PropTypes from 'prop-types';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import assign from 'lodash.assign';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import {
	createMountNode,
	destroyMountNode,
} from '../../../tests/enzyme-helpers';

// Import your internal dependencies (for example):
import Combobox from '../../../components/combobox';
import Icon from '../../../components/icon';
import filter from '../../../components/combobox/filter';
import KEYS, { keyObjects } from '../../../utilities/key-code';
import LETTERKEYS, {
	keyObjects as letterKeyObjects,
} from '../../../utilities/letter-key-code';
import IconSettings from '../../../components/icon-settings';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const accounts = [
	{
		id: '1',
		label: 'Acme',
		subTitle: 'Account • San Francisco',
		type: 'account',
	},
	{
		id: '2',
		label: 'Salesforce.com, Inc.',
		subTitle: 'Account • San Francisco',
		type: 'account',
	},
	{
		id: '3',
		label: "Paddy's Pub",
		subTitle: 'Account • Boston, MA',
		type: 'account',
	},
	{
		id: '4',
		label: 'Tyrell Corp',
		subTitle: 'Account • San Francisco, CA',
		type: 'account',
	},
	{
		id: '5',
		label: 'Paper St. Soap Company',
		subTitle: 'Account • Beloit, WI',
		type: 'account',
	},
	{
		id: '6',
		label: 'Nakatomi Investments',
		subTitle: 'Account • Chicago, IL',
		type: 'account',
	},
	{ id: '7', label: 'Acme Landscaping', type: 'account' },
	{
		id: '8',
		label: 'Acme Construction',
		subTitle: 'Account • Grand Marais, MN',
		type: 'account',
	},
];

const accountsWithIcon = accounts.map((elem) =>
	assign(elem, {
		icon: (
			<Icon
				assistiveText={{ label: 'Account' }}
				category="standard"
				name={elem.type}
			/>
		),
	})
);

const defaultProps = {
	id: 'combobox-unique-id',
	labels: {
		label: 'Search',
		placeholder: 'Search Salesforce',
	},
	menuPosition: 'relative',
	onOpen: () => {},
};

const propTypes = {
	componentWillUpdate: PropTypes.func,
	initialSelection: PropTypes.array,
};

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
class DemoComponent extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			inputValue: '',
			selection: this.props.initialSelection || [],
		};
	}

	componentWillUpdate (nextProps, nextState) {
		if (this.props.componentWillUpdate) {
			this.props.componentWillUpdate(nextState);
		}
	}

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Combobox
					events={{
						onChange: (event, { value }) => {
							this.setState({ inputValue: value });
						},
						onRequestRemoveSelectedOption: (event, data) => {
							console.log(data);
							this.setState({
								inputValue: '',
								selection: data.selection,
							});
						},
						onSubmit: (event, { value }) => {
							this.setState({
								inputValue: '',
								selection: [
									...this.state.selection,
									{
										label: value,
										icon: (
											<Icon
												assistiveText="Account"
												category="standard"
												name="account"
											/>
										),
									},
								],
							});
						},
						onSelect: (event, data) => {
							this.setState({
								inputValue: '',
								selection: data.selection,
							});
						},
						onOpen: (event) => {
							this.props.onOpen();
						},
					}}
					options={filter({
						inputValue: this.state.inputValue,
						options: accountsWithIcon,
						selection: this.state.selection,
					})}
					selection={this.state.selection}
					value={this.state.inputValue}
					{...this.props}
				/>
			</IconSettings>
		);
	}
}

DemoComponent.displayName = 'ComboboxDemoComponent';
DemoComponent.propTypes = propTypes;
DemoComponent.defaultProps = defaultProps;

const getNodes = ({ wrapper }) => ({
	combobox: wrapper.find('.slds-combobox'),
	input: wrapper.find('.slds-combobox input'),
	menuListbox: wrapper.find('.slds-combobox .slds-listbox.slds-dropdown'),
	removeSingleItem: wrapper.find('.slds-combobox .slds-input__icon'),
	selectedListbox: wrapper.find(
		`#${defaultProps.id}-selected-listbox .slds-listbox`
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
describe('SLDSCombobox', function () {
	let mountNode;
	let wrapper;

	describe('Assistive technology and keyboard interactions', () => {
		/* Detect if presence of accessibility features such as ARIA
		 * roles and screen reader text is present in the DOM.
		 */
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('has aria-haspopup, aria-expanded is false when closed, aria-expanded is true when open', function () {
			wrapper = mount(<DemoComponent multiple />, { attachTo: mountNode });
			const nodes = getNodes({ wrapper });
			expect(nodes.combobox.node.getAttribute('aria-haspopup')).to.equal(
				'listbox'
			);
			// closed
			expect(nodes.combobox.node.getAttribute('aria-expanded')).to.equal(
				'false'
			);
			// open
			nodes.input.simulate('click', {});
			expect(nodes.combobox.node.getAttribute('aria-expanded')).to.equal(
				'true'
			);
		});

		it('menu filters to second item, menu listbox menu item 2 aria-selected is true, input activedescendent has item 2 id, after pressing down arrow, enter selects item 2', function () {
			wrapper = mount(<DemoComponent multiple isOpen />, {
				attachTo: mountNode,
			});
			let nodes = getNodes({ wrapper });
			nodes.input.simulate('focus');
			nodes.input.simulate('change', { target: { value: accounts[1].label } });
			nodes.input.simulate('keyDown', keyObjects.DOWN);
			expect(
				nodes.menuListbox.node.firstChild.firstChild.getAttribute(
					'aria-selected'
				)
			).to.equal('true');
			expect(nodes.input.node.getAttribute('aria-activedescendant')).to.equal(
				`${defaultProps.id}-listbox-option-2`
			);
			// select
			nodes.input.simulate('keyDown', keyObjects.ENTER);
			nodes = getNodes({ wrapper });
			expect(nodes.input.node.getAttribute('value')).to.equal('');
			expect(nodes.selectedListbox.find('.slds-pill__label').text()).to.equal(
				accounts[1].label
			);
		});

		it('Selected Listbox: remove initial first pill, remove third initial item, cycles focus (first to last), removes last and initial fifth pill, cycles focus (last to first), remove inital second and fourth pill', function (done) {
			const getSelectedListboxPills = ({ nodes, index }) =>
				nodes.selectedListbox
					.children()
					.at(index)
					.childAt(0);
			const getFocusedPillLabel = () =>
				document.activeElement.querySelector('.slds-pill__label').innerText;
			const selectionKeyedStates = {
				removeInitialFirstPill: [
					accountsWithIcon[1],
					accountsWithIcon[2],
					accountsWithIcon[3],
					accountsWithIcon[4],
				],
				removeThirdInitialItem: [
					accountsWithIcon[1],
					accountsWithIcon[3],
					accountsWithIcon[4],
				],
				removesLastAndInitialFifthPill: [
					accountsWithIcon[1],
					accountsWithIcon[3],
				],
				removeInitalSecondAndFourthPill: [accountsWithIcon[3]],
				allPillsRemoved: [],
			};
			const selectionIndexedStates = Object.keys(selectionKeyedStates).map(
				(key, index) => selectionKeyedStates[key]
			);

			let counter = 0;
			wrapper = mount(
				<DemoComponent
					componentWillUpdate={(prevState) => {
						expect(prevState.selection).to.have.members(
							selectionIndexedStates[counter]
						);
						if (counter === 4) {
							done();
						}
						counter += 1;
					}}
					initialSelection={[
						accounts[0],
						accounts[1],
						accounts[2],
						accounts[3],
						accounts[4],
					]}
					multiple
				/>,
				{ attachTo: mountNode }
			);
			const nodes = getNodes({ wrapper });
			nodes.input.simulate('focus');
			nodes.input.simulate('keyDown', keyObjects.TAB);
			getSelectedListboxPills({ nodes, index: 0 }).simulate(
				'keyDown',
				keyObjects.DELETE
			);
			expect(getFocusedPillLabel()).to.equal(accountsWithIcon[1].label);
			getSelectedListboxPills({ nodes, index: 0 }).simulate(
				'keyDown',
				keyObjects.RIGHT
			);
			expect(getFocusedPillLabel()).to.equal(accountsWithIcon[2].label);
			getSelectedListboxPills({ nodes, index: 1 }).simulate(
				'keyDown',
				keyObjects.DELETE
			);
			expect(getFocusedPillLabel()).to.equal(accountsWithIcon[3].label);
			getSelectedListboxPills({ nodes, index: 1 }).simulate(
				'keyDown',
				keyObjects.LEFT
			);
			getSelectedListboxPills({ nodes, index: 0 }).simulate(
				'keyDown',
				keyObjects.LEFT
			);
			expect(getFocusedPillLabel()).to.equal(accountsWithIcon[4].label);
			getSelectedListboxPills({ nodes, index: 2 }).simulate(
				'keyDown',
				keyObjects.DELETE
			);
			expect(getFocusedPillLabel()).to.equal(accountsWithIcon[3].label);
			getSelectedListboxPills({ nodes, index: 1 }).simulate(
				'keyDown',
				keyObjects.RIGHT
			);
			expect(getFocusedPillLabel()).to.equal(accountsWithIcon[1].label);
			getSelectedListboxPills({ nodes, index: 0 }).simulate(
				'keyDown',
				keyObjects.DELETE
			);
			getSelectedListboxPills({ nodes, index: 0 }).simulate(
				'keydown',
				keyObjects.DELETE
			);
		});
	});

	describe('Variant-specific', () => {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('Limit to pre-defined choices', function () {
			wrapper = mount(<DemoComponent multiple predefinedOptionsOnly />, {
				attachTo: mountNode,
			});
			let nodes = getNodes({ wrapper });
			nodes.input.simulate('focus');
			nodes.input.simulate('keyDown', letterKeyObjects.A);
			nodes.input.simulate('keyDown', keyObjects.ENTER);
			nodes = getNodes({ wrapper });
			expect(nodes.selectedListbox.node).to.be.an('undefined');
		});

		it('Inline Single Selection Remove selection', function () {
			wrapper = mount(<DemoComponent variant="inline-listbox" />, {
				attachTo: mountNode,
			});
			let nodes = getNodes({ wrapper });

			// add selection
			nodes.input.simulate('focus');
			nodes.input.simulate('change', { target: { value: accounts[1].label } });
			nodes.input.simulate('keyDown', keyObjects.ENTER);
			expect(nodes.input.node.value).to.equal('Salesforce.com, Inc.');
			nodes = getNodes({ wrapper });

			// remove selection
			nodes.removeSingleItem.simulate('click');
			nodes = getNodes({ wrapper });
			expect(nodes.input.node.value).to.equal('');
		});
	});

	describe('Optional Props', () => {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('Displays No match found', function () {
			wrapper = mount(<DemoComponent isOpen />, { attachTo: mountNode });
			let nodes = getNodes({ wrapper });
			nodes.input.simulate('focus');
			nodes.input.simulate('change', { target: { value: 'Random text' } });
			// nodes.input.simulate('keyDown', keyObjects.ENTER);
			nodes = getNodes({ wrapper });
			expect(
				nodes.menuListbox
					.find('.slds-listbox__item.slds-listbox__status')
					.text()
			).to.equal('No matches found.');
		});
	});

	describe('Input Onclick', () => {
		const onOpenCallback = sinon.spy();
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('onOpen callback is called', function () {
			wrapper = mount(<DemoComponent onOpen={onOpenCallback} />, {
				attachTo: mountNode,
			});
			const nodes = getNodes({ wrapper });
			nodes.input.simulate('click', {});
			expect(onOpenCallback.callCount).to.equal(1);
		});
	});
});
