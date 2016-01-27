import React from 'react';
import {Pills} from 'design-system-react';
import {sampleData} from 'design-system-utilities-react';

export default React.createClass({
	getInitialState () {
		return sampleData.pills.default;
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
