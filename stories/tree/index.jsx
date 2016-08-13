import React, { PropTypes } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { TREE } from '../../utilities/constants';
import {
	treeNodes,
	manyNodes,
	initialExpanded as sampleExpanded,
	initialSelection as sampleSelection
} from '../../utilities/sample-data/tree';

import Tree from '../../components/tree';

const branchExpandClicked = action;
const itemClicked = action;

const DemoTree = React.createClass({
	displayName: 'DemoTree',

	// ### Prop Types
	propTypes: {
		initialExpanded: PropTypes.array,
		initialSelection: PropTypes.array,
		loading: PropTypes.array,
		nodes: PropTypes.array,
		noBranchSelection: PropTypes.bool,
		singleSelection: PropTypes.bool
	},

	getDefaultProps () {
		return {
			initialExpanded: [],
			initialSelection: []
		};
	},

	getInitialState () {
		return {
			nodes: this.props.nodes || treeNodes,
			// Open: Fruits, Tree Fruits, Citrus, Apples, Empty Folder (2, 5, 17, 18, 7)
			expanded: this.props.initialExpanded,
			loading: this.props.loading,
			// Selected: Peaches
			selection: this.props.initialSelection
		};
	},

	removeLoading (expanded, treeIndex) {
		this.setState({ loading: [] });
		this.setState({ expanded });
		console.log(`Insert new data at node: ${treeIndex}`);	// eslint-disable-line no-console
	},

	handleExpandClick (event, data) {
		branchExpandClicked('Expand Branch')(event, data);
		if (data.expand) {
			this.setState({ loading: [data.node] });
		}
		// Fake delay for visual effect
		setTimeout(this.removeLoading, 500, data.expanded, data.treeIndex);
	},

	// By default Tree can have multiple selected nodes and folders/branches can be
	// selected. To disable either of these, use the following conditions.
	handleClick (event, data) {
		if (!this.props.singleSelection) {
			if (!this.props.noBranchSelection ||
				(this.props.noBranchSelection && data.node.type !== 'folder')) {
				this.setState({ selection: data.selection });
				itemClicked('Node Clicked')(event, data);
			}
		} else {
			this.setState({ selection: [data.node] });
			itemClicked('Node Clicked')(event, data);
		}
	},

	render () {
		return (
			<Tree
				nodes={this.state.nodes}
				onExpandClick={this.handleExpandClick}
				onClick={this.handleClick}
				expanded={this.state.expanded}
				loading={this.state.loading}
				selection={this.state.selection}
				{...this.props}
			/>
		);
	}
});

storiesOf(TREE, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => <DemoTree heading="Miscellaneous Foods" />)
	.add('Initial Expanded/Selection', () => <DemoTree
		heading="Miscellaneous Foods"
		initialExpanded={sampleExpanded}
		initialSelection={sampleSelection}
	/>)
	.add('No Branch Select', () => <DemoTree
		heading="Miscellaneous Foods"
		noBranchSelection
	/>)
	.add('Single Selection', () => <DemoTree
		heading="Miscellaneous Foods"
		singleSelection
	/>)
	.add('Assistive Heading', () => <DemoTree assistiveText="Miscellaneous Foods" />)
	.add('Large dataset (300+)', () => <DemoTree
		assistiveText="Miscellaneous Foods"
		nodes={manyNodes}
		nodeKeys={{
			nodes: 'nodes',
			label: 'text',
			type: 'type'
		}}
	/>);
