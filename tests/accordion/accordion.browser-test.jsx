import React from 'react';
import PropTypes from 'prop-types';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { shape } from 'airbnb-prop-types';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import { createMountNode, destroyMountNode } from '../enzyme-helpers';

import Accordion from '../../components/accordion';
import IconSettings from '~/components/icon-settings';
import Panel from '../../components/accordion/private/panel';
import Dropdown from '../../components/menu-dropdown';

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
					summary: 'The first item',
					details:
						'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ' +
						'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At v' +
						'ero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, ' +
						'no sea takimata sanctus est Lorem ipsum dolor sit amet.'
				},
				{
					id: '2',
					summary: 'The second item',
					details: (
						<div>
							<p>Lorem ipsum dolor sit amet,</p>
							<p>consetetur sadipscing elitr,</p>
							<p>
								sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
								aliquyam erat,
							</p>
							<p>sed diam voluptua.</p>
							<p>At vero eos et accusam et justo duo dolores et ea rebum.</p>
							<p>Stet clita kasd gubergren,</p>
							<p>no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
						</div>
					)
				},
				{
					id: '3',
					summary: 'The third item',
					details: (
						<div>
							<p>
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
								diam nonumy eirmod tempor invidunt ut labore et dolore magna
								aliquyam erat, sed diam voluptua.
							</p>
							<p>
								At vero eos et accusam et justo duo dolores et ea rebum. Stet
								clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
								dolor sit amet.
							</p>
						</div>
					)
				}
			]
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
				iconName="down"
				iconVariant="border-filled"
				onSelect={(option) => {
					if (option.label === 'delete') {
						this.setState((state) => ({
							...state,
							items: state.items.filter((item) => item.id !== selectedItem.id)
						}));
					} else if (console) {
						console.log('onSelect', event, option);
					}
				}}
				openOn="click"
				options={[
					{
						label: 'delete',
						value: 'A0'
					},
					{
						label: 'redo',
						value: 'B0'
					},
					{
						label: 'activate',
						value: 'C0'
					}
				]}
				iconSize="x-small"
			/>
		);
	}

	togglePanel (id) {
		console.log('togglePanel triggered', id);
		this.setState((state) => ({
			...state,
			expandedPanels: {
				...state.expandedPanels,
				[id]: !state.expandedPanels[id]
			}
		}));
	}

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Accordion id="base-example-accordion" openOn="click">
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

		it('renders expected number of accordion panels', () => {
			wrapper = mount(<AccordionExample />, {
				attachTo: mountNode
			});
			const panels = wrapper.find('SLDSAccordionPanel');
			expect(panels).to.have.lengthOf(3, 'there are three panels');
		});

		it('renders with aria-controls and aria-expanded attributes on summary button ', () => {});

		it('renders summary text on accordion panel', () => {
			wrapper = mount(<AccordionExample />, { attachTo: mountNode });
			const panel = wrapper.find('SLDSAccordionPanel').first();
			const span = panel.find('.slds-truncate');
			expect(span.text()).to.equal('The first item');
		});

		it('renders `panelContentActions` component, if passed', () => {
			wrapper = mount(<AccordionExample />, {
				attachTo: mountNode
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

		it('toggles `slds-is-open` class and `aria-expanded` on panel select', () => {
			wrapper = mount(<AccordionExample />, { attachTo: mountNode });
			const panel = wrapper.find('SLDSAccordionPanel').first();
			const button = panel.find('.slds-accordion__summary-action');
			let openPanelSection = panel.find('.slds-is-open');
			expect(openPanelSection).to.not.exist;
			panel.find('.slds-accordion__summary-action').simulate('click');
			openPanelSection = panel.find('.slds-is-open');
			expect(openPanelSection, 'panel changes from closed to open').to.exist;
			expect(button.props()['aria-expanded']).to.be.true;
		});

		it('toggles section content on panel select', () => {});
	});
});
