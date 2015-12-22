import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './tree';
import {sampleData} from 'design-system-facades-utilities';

export default function () {
	const TreeExample = React.createClass({
		getInitialState () {
			return {
				selection: [],
				open: []
			};
		},

		render () {
			return <Tree folderSelect={false} multiSelect={true} autoOpen={false} collection={sampleData.tree.defaultArray} selection={this.state.selection} open={this.state.open} onChanged={this.handleChanged} onOpened={this.handleToggle} onClosed={this.handleToggle} />;
		},

		handleChanged (item, selection) {
			this.setState({ selection });
		},

		handleToggle (item, open) {
			this.setState({ open });
		}
	});

	ReactDOM.render(
		<div>
			<div className="slds-col example">
				<TreeExample/>
			</div>
			<div className="slds-col demo-controls"></div>
		</div>

	, document.getElementById('tree-react-control'));
}
