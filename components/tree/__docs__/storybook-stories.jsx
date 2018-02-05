import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { TREE } from '../../../utilities/constants';
import sampleNodes from '../../../utilities/sample-data/tree';

import Tree from '../../tree';
import Search from '../../forms/input/search';

const branchExpandClicked = action;
const itemClicked = action;
const treeScrolled = action;

const DemoTree = createReactClass({
	displayName: 'DemoTree',

	// ### Prop Types
	propTypes: {
		exampleNodesIndex: PropTypes.string,
		noBranchSelection: PropTypes.bool,
		searchTerm: PropTypes.string,
		searchable: PropTypes.bool,
		singleSelection: PropTypes.bool,
	},

	getDefaultProps () {
		return {
			exampleNodesIndex: 'sampleNodesDefault',
			id: 'example-tree',
		};
	},

	getInitialState () {
		const initalNodes = this.props.exampleNodesIndex
			? sampleNodes[this.props.exampleNodesIndex]
			: sampleNodes.sampleNodesDefault;
		return {
			nodes: initalNodes,
			selectedNode: undefined,
			searchTerm: this.props.searchable ? 'fruit' : undefined,
		};
	},

	// By default Tree can have multiple selected nodes and folders/branches can be selected. To disable either of these, you can use the following logic. However, `props` are immutable. The node passed in shouldn't be modified, and due to object and arrays being reference variables, forceUpate is needed. This is just a "working example" not a prescription.
	handleExpandClick (event, data) {
		branchExpandClicked('Expand Branch')(event, data);
		data.node.loading = data.expand ? true : undefined;

		// Fake delay to demonstrate use of loading node attibute
		setTimeout(
			(node) => {
				node.loading = false;
				this.forceUpdate();
			},
			500,
			data.node,
		);
		data.node.expanded = data.expand;
	},

	handleClick (event, data) {
		if (this.props.singleSelection) {
			data.node.selected = data.select;
			this.setState(() => {
				if (
					this.state.selectedNode &&
					this.state.selectedNode.id !== data.node.id
				) {
					this.state.selectedNode.selected = false;
				}

				return { selectedNode: data.node };
			});
			itemClicked('Node Clicked')(event, data);
		} else if (
			!this.props.noBranchSelection ||
			(this.props.noBranchSelection && data.node.type !== 'branch')
		) {
			data.node.selected = data.select;
			// trigger render
			this.setState((prevState) => ({ ...prevState }));
			itemClicked('Node Clicked')(event, data);
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
			<div>
				{this.props.searchable ? (
					<div>
						<Search
							assistiveText="Search Tree"
							value={this.state.searchTerm}
							onChange={this.handleSearchChange}
						/>
						<br />
					</div>
				) : null}
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
	},
});

storiesOf(TREE, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => <DemoTree heading="Miscellaneous Foods" />)
	.add('Initial Expanded/Selection', () => (
		<DemoTree
			heading="Miscellaneous Foods"
			exampleNodesIndex="sampleNodesWithInitialState"
		/>
	))
	.add('No Branch Select', () => (
		<DemoTree heading="Miscellaneous Foods" noBranchSelection />
	))
	.add('Single Selection', () => (
		<DemoTree heading="Miscellaneous Foods" singleSelection />
	))
	.add('Assistive Heading', () => (
		<DemoTree assistiveText="Miscellaneous Foods" />
	))
	.add('Overflow Hidden', () => (
		<DemoTree
			heading="Miscellaneous Foods"
			exampleNodesIndex="sampleNodesWithLargeDataset"
			listStyle={{
				height: '300px',
				overflowY: 'auto',
			}}
		/>
	))
	.add('Large dataset (300+)', () => (
		<DemoTree
			heading="Miscellaneous Foods"
			exampleNodesIndex="sampleNodesWithLargeDataset"
		/>
	))
	.add('Highlighted Search', () => (
		<DemoTree heading="Results for fruit" searchable />
	));
