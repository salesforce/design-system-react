import React          from 'react';
import { Pills }      from 'design-system-react';
import { sampleData } from 'design-system-utilities';

export default React.createClass({
	getInitialState () {
		console.log("[site-example.js:7] sampleData.pills.default.collection:", sampleData.pills.default);
		return sampleData.pills.default;
	},

	render () {
		return (
			<div>
				<Pills selection={this.state.selection} onChange={this.handleChanged}/>
			</div>
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	}
});
