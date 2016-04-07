import React from 'react';
import Button from '../button';
import ButtonGroup from './index';

// SAMPLE CONTROL CODE -->

const ButtonGroupExample = React.createClass({
	getInitialState () {
		return {
			chartSelected: false,
			filterSelected: false,
			moreSelected: false
		};
	},

	render () {
		return (
			<div>
				<ButtonGroup>
					<Button text="Refresh" theme="neutral"/>
					<Button text="Edit" theme="neutral"/>
					<Button text="Save" theme="neutral"/>
					<Button iconCategory="utility" iconName="down" assistiveText="More Actions" iconStyle="icon-border"/>
				</ButtonGroup>
				<ButtonGroup>
					<Button text="New Lead" theme="neutral"/>
					<Button iconCategory="utility" iconName="down" assistiveText="More Actions" iconStyle="icon-border"/>
				</ButtonGroup>
				<ButtonGroup>
					<Button iconCategory="utility" iconName="chart" iconStyle="icon-border" assistiveText="Chart" selectable selected={this.state.chartSelected} onClick={this.handleClick.bind(this, 'chart')} key="chart" />
					<Button iconCategory="utility" iconName="filterList" iconStyle="icon-border" assistiveText="Filter" selectable selected={this.state.filterSelected} onClick={this.handleClick.bind(this, 'filter')} key="filter"/>
					<Button iconCategory="utility" iconName="sort" iconStyle="icon-more" assistiveText="More" onClick={this.handleClick.bind(this, 'more')} key="more"/>
				</ButtonGroup>
			</div>
		);
	},

	handleClick (key) {
		const selected = {};
		selected[key + 'Selected'] = !this.state[key + 'Selected'];
		this.setState(selected);
	}
});

// <-- SAMPLE CONTROL CODE

export default ButtonGroupExample;
