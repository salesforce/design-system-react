import React          from 'react';
import { Tree }       from 'design-system-react';
import { sampleData } from 'design-system-utilities-react';

const SAMPLE_DATA_ACCESSOR = 'tree';
const SAMPLE_DATA = sampleData[SAMPLE_DATA_ACCESSOR];
const SAMPLE_DATA_DEFAULT = SAMPLE_DATA_DEFAULT;


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
				heading={SAMPLE_DATA_DEFAULT.heading}
				collection={SAMPLE_DATA_DEFAULT.collection}
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
