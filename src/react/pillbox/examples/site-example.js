import React from 'react';
import {Pillbox} from 'design-system-react';

export default React.createClass({
	getInitialState () {
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
					<Pillbox selection={this.state.selection} onChange={this.handleChanged}/>
				</div>
				<div className="slds-col demo-controls"></div>
			</div>
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	}
});
