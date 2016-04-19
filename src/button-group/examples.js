// SAMPLE COMPONENT CODE -->
import React from 'react';

import ButtonGroup from 'slds-for-react/button-group';
import Button from 'slds-for-react/button';
import Dropdown from 'slds-for-react/dropdown';
import Trigger from 'slds-for-react/dropdown/button-trigger';

const sampleData = [
	{
		id: 0,
		text: 'Menu Item One',
		value: '1'
	}, {
		id: 1,
		text: 'Menu Item Two',
		value: '2'
	}, {
		id: 2,
		text: 'Navigate to Google',
		value: '3',
		href: 'http://google.com'
	}
];

const ButtonGroupExample = React.createClass({
	displayName: 'ButtonGroupExample',

	getInitialState () {
		return {
			chartSelected: false,
			filterSelected: false
		};
	},

	render () {
		return (
			<div className="slds-grid slds-grid--vertical">
				<div className="slds-col | slds-m-bottom--medium">
					<ButtonGroup>
						<Button text="Refresh" theme="neutral" />
						<Button text="Edit" theme="neutral" />
						<Button text="Save" theme="neutral" />
						<Dropdown collection={sampleData} id="button-group-dropdown-example-1">
							<Trigger className="slds-button--last">
								<Button assistiveText="More Actions" iconStyle="icon-border" />
							</Trigger>
						</Dropdown>
					</ButtonGroup>
				</div>
				<div className="slds-col | slds-m-bottom--medium">
					<ButtonGroup>
						<Button
							iconCategory="utility"
							iconName="chart"
							iconStyle="icon-border"
							assistiveText="Chart"
							selectable
							selected={this.state.chartSelected}
							onClick={this.handleChartClick}
						/>
						<Button
							iconCategory="utility"
							iconName="filterList"
							iconStyle="icon-border"
							assistiveText="Filter"
							selectable
							selected={this.state.filterSelected}
							onClick={this.handleFilterClick}
						/>
						<Dropdown collection={sampleData} id="button-group-dropdown-example-2">
							<Trigger className="slds-button--last">
								<Button iconCategory="utility" iconName="sort" iconStyle="icon-more" assistiveText="More Actions" />
							</Trigger>
						</Dropdown>
					</ButtonGroup>
				</div>
			</div>
		);
	},

	handleChartClick () {
		this.setState({
			chartSelected: !this.state.chartSelected
		});
	},

	handleFilterClick () {
		this.setState({
			filterSelected: !this.state.filterSelected
		});
	}
});

// <-- SAMPLE COMPONENT CODE

export default ButtonGroupExample;
