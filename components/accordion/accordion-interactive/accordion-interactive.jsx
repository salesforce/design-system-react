import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../accordion';
import AccordionPanel from '../accordion-panel';


export default class AccordionInteractive extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expandedPanels: {},
			items: []
		}
	}

	componentDidMount() {
		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({items: this.props.items})
	}

	togglePanel(event, data) {
		this.setState((state) => ({
			...state,
			expandedPanels: {
				...state.expandedPanels,
				[data.id]: !state.expandedPanels[data.id],
			},
		}));
		if (this.props.action) {
			const dataAsArray = Object.keys(data).map((id) => data[id]);
			this.props.action('onClick')(event, ...dataAsArray);
		} else if (console) {
			// eslint-disable-next-line no-console
			console.log('[onSelect] (event, data)', event, data);
		}
	}


	render() {
		return (
			<Accordion id="base-example-accordion" style={this.props.style}>
			{this.state.items.map(item => (
				<AccordionPanel
					expanded={!!this.state.expandedPanels[item.id]}
					id={item.id}
					key={item.id}
					onTogglePanel={() => this.togglePanel(event, item)}
					summary={item.summary}
					style={this.props.style}
				>
					{item.details}
				</AccordionPanel>
			))}
		</Accordion>
		);
	}
}

AccordionInteractive.propTypes = {
	items: PropTypes.shape({
		id: PropTypes.string,
		summary: PropTypes.string,
		details: PropTypes.string
	})
}
