import React from 'react';
import {Tree} from 'design-system-react';
import {sampleData} from 'design-system-utilities';

export default React.createClass({
	getInitialState () {
		return {
			selection: [],
			open: []
		};
	},

	render () {
		return (
			<div>
				<div className="slds-col example">
					<Tree
						folderSelect={false}
						multiSelect={true}
						autoOpen={false}
						heading={sampleData.tree.heading}
						collection={sampleData.tree.defaultArray}
						selection={this.state.selection}
						open={this.state.open}
						onChange={this.handleChanged}
						onOpened={this.handleToggle}
						onClosed={this.handleToggle} />
				</div>
				<div className="slds-col demo-controls"></div>
			</div>
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	},

	handleToggle (item, open) {
		this.setState({ open });
	}
});
