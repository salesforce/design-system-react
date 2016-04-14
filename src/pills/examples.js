import React from 'react';
import Pills from './index';

// SAMPLE COMPONENT CODE -->

const PillsExample = React.createClass({
	getInitialState () {
		const selection = [
			{
				text: 'item 1', value: 1
			}, {
				text: 'item 2', value: 2
			}, {
				text: 'item 3', value: 3
			}
		];

		return {
			selection: selection
		};
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


// <-- SAMPLE COMPONENT CODE

export default PillsExample;
