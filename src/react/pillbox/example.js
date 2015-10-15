import React from 'react';
import ReactDOM from 'react-dom';
import Pillbox from './pillbox';

export default function (element) {
	const PillboxExample = React.createClass({
		getInitialState () {
			return {
				selection: [
					{
						text: 'test1',
						id: 1
					},
					{
						text: 'test2',
						id: 2
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

	ReactDOM.render(<PillboxExample/>, element);
}
