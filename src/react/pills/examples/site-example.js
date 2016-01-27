import React from 'react';
import {Pills} from 'design-system-react';
import {sampleData} from 'design-system-utilities-react';

export default React.createClass({
	getInitialState () {
		console.log("[site-example.js:7] sampleData.pills.default.collection:", sampleData.pills.default.collection);

		return {
			selection: [
				{
					text: 'item 1',
					value: 1
				},
				{
					text: 'item 2',
					value: 2
				},
				{
					text: 'item 3',
					value: 3
				}
			],
			open: []
		};
	},

	render () {
		return (
			<div>
				<div className="slds-col example">
					<Pills selection={this.state.selection} onChange={this.handleChanged}/>
				</div>
				<div className="slds-col demo-controls"></div>
			</div>
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	}
});
