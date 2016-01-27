import React from 'react';
import {Tree} from 'design-system-react';
import {sampleData} from 'design-system-utilities-react';

export default React.createClass({
	getInitialState () {
		return {
			selection: [],
			open: []
		};
	},

	render () {
		return (
			<Tree
				folderSelect={false}
				multiSelect={true}
				autoOpen={false}
				heading={sampleData.tree.default.heading}
				collection={sampleData.tree.default.collection}
				selection={this.state.selection}
				open={this.state.open}
				onChange={this.handleChanged}
				onOpened={this.handleToggle}
				onClosed={this.handleToggle} />
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	},

	handleToggle (item, open) {
		this.setState({ open });
	}
});
