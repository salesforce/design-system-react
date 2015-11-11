import React from 'react';
import ReactDOM from 'react-dom';
import Pillbox from './pillbox';

export default function () {
	const PillboxExample = React.createClass({
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
			return <Pillbox selection={this.state.selection} onChanged={this.handleChanged}/>;
		},

		handleChanged (item, selection) {
			this.setState({ selection });
		}
	});

	ReactDOM.render(
		<div>
			<div className="slds-col example">
				<PillboxExample/>
			</div>
			<div className="slds-col demo-controls"></div>
		</div>
	, document.getElementById('pillbox-react-control'));
}
