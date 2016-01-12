import React from 'react';
import {Button, ButtonGroup} from 'design-system-react';

export default React.createClass({
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
					<Button icon="utility.down" assistiveText="More Actions" iconStyle="icon-border"/>
				</ButtonGroup>
				<ButtonGroup>
					<Button text="New Lead" theme="neutral"/>
					<Button icon="utility.down" assistiveText="More Actions" iconStyle="icon-border"/>
				</ButtonGroup>
				<ButtonGroup>
					<Button icon="utility.chart" iconStyle="icon-border" assistiveText="Chart" selectable selected={this.state.chartSelected} onClick={this.handleClick.bind(this, 'chart')} key="chart" />
					<Button icon="utility.filterList" iconStyle="icon-border" assistiveText="Filter" selectable selected={this.state.filterSelected} onClick={this.handleClick.bind(this, 'filter')} key="filter"/>
					<Button icon="utility.sort" iconStyle="icon-more" assistiveText="More" onClick={this.handleClick.bind(this, 'more')} key="more"/>
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
