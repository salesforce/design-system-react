import React, { PropTypes } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { TREE } from '../../utilities/constants';
import sampleNodes from '../../utilities/sample-data/tree';

import Tree from '../../components/tree';
import Search from '../../components/forms/input/search';

const branchExpandClicked = action;
const itemClicked = action;
const treeScrolled = action;

const DemoTree = React.createClass({
	displayName: 'DemoTree',

	// ### Prop Types
	propTypes: {
		exampleNodesIndex: PropTypes.string,
		noBranchSelection: PropTypes.bool,
		searchTerm: PropTypes.string,
		searchable: PropTypes.bool,
		singleSelection: PropTypes.bool
	},

	getDefaultProps () {
		return {
			exampleNodesIndex: 'treeNodes',
			id: 'TreeStory'
		};
	},

	getInitialState () {
		const initalNodes = this.props.exampleNodesIndex
		? sampleNodes[this.props.exampleNodesIndex]
		: sampleNodes.treeNodes;
		return {
			nodes: initalNodes,
			searchTerm: this.props.searchable ? 'fruit' : undefined
		};
	},

	// By default Tree can have multiple selected nodes and folders/branches can be selected. To disable either of these, you can use the following logic. However, `props` are immutable. The node passed in shouldn't be modified, and due to object and arrays being reference variables, forceUpate is needed. This is just a "working example" not a prescription.
	handleExpandClick (event, data) {
		branchExpandClicked('Expand Branch')(event, data);
		data.node.loading = data.expand ? true : undefined;

		// Fake delay to demonstrate use of loading node attibute
		setTimeout((node) => {
			node.loading = false;
			this.forceUpdate();
		}, 500, data.node);
		data.node.expanded = data.expand;
	},

	handleClick (event, data) {
		if (this.props.singleSelection) {
			data.node.selected = data.select;
			this.setState({ singleSelection: data.node });
			if (this.state.singleSelection) {
				this.state.singleSelection.selected = undefined;
			}
			this.forceUpdate();
			itemClicked('Node Clicked')(event, data);
		} else {
			if (!this.props.noBranchSelection ||
				(this.props.noBranchSelection && data.node.type !== 'folder')) {
				data.node.selected = data.select;
				this.forceUpdate();
				itemClicked('Node Clicked')(event, data);
			}
		}
	},

	handleScroll (event, data) {
		treeScrolled('Tree scrolled')(event, data);
	},

	handleSearchChange (event) {
		this.setState({ searchTerm: event.target.value });
	},

	render () {
		return (
			<div>{
				this.props.searchable
				? <div>
					<Search assistiveText="Search Tree" value={this.state.searchTerm} onChange={this.handleSearchChange} />
					<br />
				</div>
				: null
			}
				<Tree
					nodes={this.state.nodes}
					onExpandClick={this.handleExpandClick}
					onClick={this.handleClick}
					onScroll={this.handleScroll}
					searchTerm={this.state.searchTerm}
					{...this.props}
				/>
			</div>
		);
	}
});

storiesOf(TREE, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => <DemoTree heading="Miscellaneous Foods" />)
	.add('Initial Expanded/Selection', () => <DemoTree
		heading="Miscellaneous Foods"
		exampleNodesIndex="treeNodesWithState"
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
	.add('Overflow Hidden', () =>
		<DemoTree
			heading="Miscellaneous Foods"
			exampleNodesIndex="manyNodes"
			style={{
				height: '300px',
				overflowY: 'auto'
			}}
		/>
	)
	.add('Large dataset (300+)', () => <DemoTree
		heading="Miscellaneous Foods"
		exampleNodesIndex="manyNodes"
	/>)
	.add('Highlighted Search', () => <DemoTree
		heading="Results for fruit"
		searchable
	/>);
