import React from 'react';
import ReactDOM from 'react-dom';
import Lookup from './lookup';
import sampleData from '../../../sample-data/lookup';

export default function () {
	const LookupExample = React.createClass({
		propTypes: {
			models: React.PropTypes.arrayOf(React.PropTypes.object)
		},

		getInitialState () {
			return {
				collection: sampleData.defaultArray
			};
		},

		render () {
			return (
				<div className="slds-col example">
					<Lookup collection={this.state.collection} selection={this.state.selection} onChanged={this._handleModelChange}/>
				</div>
			);
		},

		_handleModelChange (item, selection) {
			this.setState({ selection });
		}
	});

	ReactDOM.render(<LookupExample />, document.getElementById('lookup-react-control'));
}
