import React from 'react';
import Accordion from '../../components/accordion'; // `~` is replaced with design-system-react at runtime
import Panel from '~/components/accordion/private/panel'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings'; // `~` is replaced with design-system-react at runtime
import Dropdown from '../../components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

export default class Example extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			expandedPanels: {},
			items: [
				{
					id: '1',
					summary: 'The first Item',
					details:
						'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ' +
						'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At v' +
						'ero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, ' +
						'no sea takimata sanctus est Lorem ipsum dolor sit amet.'
				},
				{
					id: '2',
					summary: 'The second Item',
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
					summary: 'The third Item',
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

Example.displayName = 'AccordionExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
