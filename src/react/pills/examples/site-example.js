import React from 'react';
import {Pills} from 'design-system-react';
import {sampleData} from 'design-system-utilities-react';

export default React.createClass({
	getInitialState () {
		console.log("[site-example.js:7] sampleData.pills.default.selection:", sampleData.pills.default.selection);
		console.log("[site-example.js:7] sampleData.pills.default.open:", sampleData.pills.default.open);
		console.log("[site-example.js:9] sampleData.pills.default:", sampleData.pills.default);
		return {
			selection: sampleData.pills.default.selection,
			open: sampleData.pills.default.open
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
