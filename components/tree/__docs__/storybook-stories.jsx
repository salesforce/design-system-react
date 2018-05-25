import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { storiesOf, action } from '@storybook/react';
import { normalize, schema } from 'normalizr';

import IconSettings from '../../icon-settings';
import { TREE } from '../../../utilities/constants';
import sampleNodes from '../../../utilities/sample-data/tree';

import Tree from '../../tree';
import Search from '../../forms/input/search';

const branchExpandClicked = action;
const itemClicked = action;
const treeScrolled = action;

const nodeEntity = new schema.Entity('nodes');
const nodes = new schema.Array(nodeEntity);
nodeEntity.define({ nodes });
const normalizedData = normalize(sampleNodes.sampleNodesDefault, nodeEntity).entities.nodes;
console.log(normalizedData);

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
		return {
			nodes: normalizedData,
			searchTerm: this.props.searchable ? 'fruit' : undefined,
		};
	},

	getNodes (node) {
		return node.nodes ? node.nodes.map((id) => this.state.nodes[id]) : [];
	},

	// By default Tree can have multiple selected nodes and folders/branches can be selected. To disable either of these, you can use the following logic. However, `props` are immutable. The node passed in shouldn't be modified. Object and arrays are reference variables.
	handleExpandClick (event, data) {
		branchExpandClicked('Expand Branch')(event, data);
		this.setState((state) => ({
			...state,
			nodes: {
				...state.nodes,
				...{
					[data.node.id]: { ...data.node, expanded: data.expand }
				}
			},
		}));
	},

	handleClick (event, data) {
		this.setState((state) => ({
			...state,
			nodes: {
				...state.nodes,
				...{
					[data.node.id]: { ...data.node, selected: data.select }
				}
			},
		}));

		itemClicked('Node Selected')(event, data);
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
					getNodes={this.getNodes}
					nodes={this.state.nodes['0'].nodes}
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
