import React, { PropTypes } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { TREE } from '../../utilities/constants';
import {
	treeNodes,
	initialExpanded as sampleExpanded,
	initialSelection as sampleSelection,
	loading as sampleLoading
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
			nodes: treeNodes,
			// Open: Fruits, Tree Fruits, Citrus, Apples, Empty Folder (2, 5, 17, 18, 7)
			expanded: this.props.initialExpanded,
			loading: this.props.loading,
			// Selected: Peaches
			selection: this.props.initialSelection
		};
	},

	handleExpandClick (expanded, ...rest) {
		branchExpandClicked('Expand Branch')(expanded, ...rest);
		this.state.expanded = expanded;
		this.state.loading = expanded;
	},

	// By default Tree can have multiple selected nodes and folders/branches can be
	// selected. To disable either of these, use the following conditions.
	handleClick (selection, clickedItem, ...rest) {
		if (!this.props.singleSelection) {
			if (!this.props.noBranchSelection ||
				(this.props.noBranchSelection && clickedItem.type !== 'folder')) {
				this.state.selection = selection;
				itemClicked('Node Clicked')(selection, clickedItem, ...rest);
			}
		} else {
			this.state.selection = [clickedItem];
			itemClicked('Node Clicked')(selection, clickedItem, ...rest);
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
		loading={sampleLoading}
	/>)
	.add('No Branch Select', () => <DemoTree heading="Miscellaneous Foods" noBranchSelection />)
	.add('Single Selection', () => <DemoTree heading="Miscellaneous Foods" singleSelection />)
	.add('Assistive Heading', () => <DemoTree assistiveText="Miscellaneous Foods" />);
