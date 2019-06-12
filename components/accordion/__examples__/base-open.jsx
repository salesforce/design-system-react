import React from 'react';
import Accordion from '~/components/accordion'; // `~` is replaced with design-system-react at runtime
import Panel from '~/components/accordion/panel'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings'; // `~` is replaced with design-system-react at runtime

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

	togglePanel(event, data) {
		this.setState((state) => ({
			...state,
			expandedPanels: {
				...state.expandedPanels,
				[data.id]: !state.expandedPanels[data.id],
			},
		}));
		console.log('onClick', data);
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Accordion id="base-example-accordion">
					{this.state.items.map((item) => (
						<Panel
							expanded
							id={item.id}
							key={item.id}
							onTogglePanel={() => this.togglePanel(event, item)}
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
export default Example;
