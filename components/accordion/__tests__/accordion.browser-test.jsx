import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */

import {
	createMountNode,
	destroyMountNode,
} from '../../../tests/enzyme-helpers';

import Accordion from '../../accordion';
import IconSettings from '../../icon-settings';
import Panel from '../../accordion/panel';
import Dropdown from '../../menu-dropdown';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */

chai.use(chaiEnzyme());

/* Re-usable demo component.
 */

const propTypes = {};

const defaultProps = {};

class AccordionExample extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			expandedPanels: {},
			items: [
				{
					id: '1',
					summary: 'Accordion Summary',
					details: 'Accordion details - A',
				},
				{
					id: '2',
					summary: 'Accordion Summary',
					details: 'Accordion details - B',
				},
				{
					id: '3',
					summary: 'Accordion Summary',
					details: 'Accordion details - C',
				},
			],
		};
	}

	menuDropdown (selectedItem) {
		return (
			<Dropdown
				align="right"
				id="ButtonGroupExampleDropdown"
				assistiveText="More Options"
				buttonVariant="icon"
				buttonClassName="slds-shrink-none"
				iconCategory="utility"
				iconName="down"
				iconVariant="border-filled"
				onSelect={(option) => {
					if (option.label === 'delete') {
						this.setState((state) => ({
							...state,
							items: state.items.filter((item) => item.id !== selectedItem.id),
						}));
					} else if (console) {
						console.log('onSelect', event, option);
					}
				}}
				options={[
					{
						label: 'delete',
						value: 'A0',
					},
					{
						label: 'redo',
						value: 'B0',
					},
					{
						label: 'activate',
						value: 'C0',
					},
				]}
				iconSize="x-small"
			/>
		);
	}

	togglePanel (id) {
		this.setState((state) => ({
			...state,
			expandedPanels: {
				...state.expandedPanels,
				[id]: !state.expandedPanels[id],
			},
		}));
	}

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Accordion id="base-example-accordion">
					{this.state.items.map((item) => (
						<Panel
							expanded={!!this.state.expandedPanels[item.id]}
							id={item.id}
							panelContentActions={this.menuDropdown(item)}
							key={item.id}
							onTogglePanel={() => this.togglePanel(item.id)}
							summary={item.summary}
						>
							{item.details}
						</Panel>
					))}
				</Accordion>
			</IconSettings>
		);
	}
}

AccordionExample.displayName = 'AccordionExampleComponent';
AccordionExample.propTypes = propTypes;
AccordionExample.defaultProps = defaultProps;

/* Accordion rendering tests
 */

describe('Accordion', function () {
	describe('Renders Accordion', () => {
		let mountNode;
		let wrapper;

		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('renders an accordion', () => {
			wrapper = mount(<AccordionExample />, { attachTo: mountNode });
			const accordion = wrapper.find(Accordion);
			expect();
		});

		it('renders `panelContentActions` component, if passed', () => {
			wrapper = mount(<AccordionExample />, {
				attachTo: mountNode,
			});
			const panelContentActions = wrapper.find(
				'div .slds-dropdown-trigger .slds-dropdown-trigger--click'
			);
			expect(panelContentActions, 'panel dropdown component exists').to.exist;
		});
	});

	describe('Open panel', () => {
		let mountNode;
		let wrapper;
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('triggers a change callback on panel select', () => {
			wrapper = mount(<AccordionExample />, { attachTo: mountNode });
			const panel = wrapper.find('SLDSAccordionPanel').first();
			expect(panel.props().expanded).to.be.false;
			panel.find('.slds-accordion__summary-action').simulate('click');
			expect(panel.props().expanded).to.be.true;
		});

		it('`aria-expanded` set to true on panel select', () => {
			wrapper = mount(<AccordionExample />, { attachTo: mountNode });
			const panel = wrapper.find('SLDSAccordionPanel').first();
			const button = panel.find('.slds-accordion__summary-action');
			panel.find('.slds-accordion__summary-action').simulate('click');
			expect(button.props()['aria-expanded']).to.be.true;
		});
	});
});
