import React from 'react';
import Accordion from '~/components/accordion'; // `~` is replaced with design-system-react at runtime
import AccordionPanel from '~/components/accordion/panel'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings'; // `~` is replaced with design-system-react at runtime
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	constructor(props) {
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

	menuDropdown(selectedItem) {
		return (
			<Dropdown
				align="right"
				id={selectedItem.id}
				assistiveText={{ icon: 'More Options' }}
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

	togglePanel(event, data) {
		this.setState((state) => ({
			...state,
			expandedPanels: {
				[data.id]: !state.expandedPanels[data.id],
			},
		}));
		if (this.props.action) {
			const dataAsArray = Object.keys(data).map((id) => data[id]);
			this.props.action('onClick')(event, ...dataAsArray);
		} else if (console) {
			console.log('[onSelect] (event, data)', event, data);
		}
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Accordion id="base-example-accordion">
					{this.state.items.map((item, i) => {
						return (
							<AccordionPanel
								expanded={!!this.state.expandedPanels[item.id]}
								id={item.id}
								panelContentActions={this.menuDropdown(item)}
								key={item.id}
								onTogglePanel={(event) => this.togglePanel(event, item)}
								summary={item.summary}
							>
								{item.details}
							</AccordionPanel>
						);
					})}
				</Accordion>
			</IconSettings>
		);
	}
}

Example.displayName = 'AccordionExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
