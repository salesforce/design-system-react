import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import PropTypes from 'prop-types';
import Tree from '~/components/tree';

const sampleNodes = {
	sampleNodesWithInitialState: [
		{
			label: 'Grains',
			type: 'item',
			id: 1,
			selected: true,
		},
		{
			label: 'Fruits',
			type: 'branch',
			id: 2,
			expanded: true,
			nodes: [
				{
					label: 'Ground Fruits',
					type: 'branch',
					id: 4,
					nodes: [
						{
							label: 'Watermelon',
							type: 'item',
							id: 12,
						},
						{
							label: 'Canteloupe',
							type: 'item',
							_iconClass: 'glyphicon-file',
							id: 13,
						},
						{
							label: 'Strawberries',
							type: 'item',
							id: 14,
						},
					],
				},
				{
					label: 'Tree Fruits',
					type: 'branch',
					id: 5,
					selected: true,
					nodes: [
						{
							label: 'Peaches',
							type: 'item',
							id: 15,
						},
						{
							label: 'Pears',
							type: 'item',
							_iconClass: 'glyphicon-file',
							id: 16,
						},
						{
							label: 'Citrus',
							type: 'branch',
							id: 17,
							nodes: [
								{
									label: 'Orange',
									type: 'item',
									id: 20,
								},
								{
									label: 'Grapefruit',
									type: 'item',
									id: 21,
								},
								{
									label: 'Lemon',
									type: 'item',
									id: 22,
								},
								{
									label: 'Lime',
									type: 'item',
									id: 23,
								},
							],
						},
						{
							label: 'Apples',
							type: 'branch',
							id: 18,
							nodes: [
								{
									label: 'Granny Smith',
									type: 'item',
									id: 24,
								},
								{
									label: 'Pinklady',
									type: 'item',
									_iconClass: 'glyphicon-file',
									id: 25,
								},
								{
									label: 'Rotten',
									type: 'item',
									id: 26,
								},
								{
									label: 'Jonathan',
									type: 'item',
									id: 27,
								},
							],
						},
						{
							label: 'Cherries',
							type: 'branch',
							id: 19,
							nodes: [
								{
									label: 'Balaton',
									type: 'item',
									id: 28,
								},
								{
									label: 'Erdi Botermo',
									type: 'item',
									id: 29,
								},
								{
									label: 'Montmorency',
									type: 'item',
									id: 30,
								},
								{
									label: 'Queen Ann',
									type: 'item',
									id: 31,
								},
								{
									label: 'Ulster',
									type: 'item',
									id: 32,
								},
								{
									label: 'Viva',
									type: 'item',
									id: 33,
								},
							],
						},
						{
							label: 'Raspberries',
							type: 'item',
							id: 6,
						},
					],
				},
			],
		},
		{
			label: 'Nuts',
			type: 'branch',
			_iconClass: 'glyphicon-file',
			id: 3,
			nodes: [
				{
					label: 'Almonds',
					type: 'item',
					id: 8,
				},
				{
					label: 'Cashews',
					type: 'item',
					id: 9,
				},
				{
					label: 'Pecans',
					type: 'item',
					id: 10,
				},
				{
					label: 'Walnuts',
					type: 'item',
					id: 11,
				},
			],
		},
		{
			label: 'Empty folder',
			type: 'branch',
			id: 7,
			expanded: true,
		},
	],

	sampleNodesDefault: [
		{
			label: 'Grains',
			type: 'item',
			id: 1,
		},
		{
			label: 'Fruits',
			type: 'branch',
			id: 2,
			nodes: [
				{
					label: 'Ground Fruits',
					type: 'branch',
					id: 4,
					nodes: [
						{
							label: 'Watermelon',
							type: 'item',
							id: 12,
						},
						{
							label: 'Canteloupe',
							type: 'item',
							_iconClass: 'glyphicon-file',
							id: 13,
						},
						{
							label: 'Strawberries',
							type: 'item',
							id: 14,
						},
					],
				},
				{
					label: 'Tree Fruits',
					type: 'branch',
					id: 5,
					nodes: [
						{
							label: 'Peaches',
							type: 'item',
							id: 15,
						},
						{
							label: 'Pears',
							type: 'item',
							_iconClass: 'glyphicon-file',
							id: 16,
						},
						{
							label: 'Citrus',
							type: 'branch',
							id: 17,
							nodes: [
								{
									label: 'Orange',
									type: 'item',
									id: 20,
								},
								{
									label: 'Grapefruit',
									type: 'item',
									id: 21,
								},
								{
									label: 'Lemon',
									type: 'item',
									id: 22,
								},
								{
									label: 'Lime',
									type: 'item',
									id: 23,
								},
							],
						},
						{
							label: 'Apples',
							type: 'branch',
							id: 18,
							nodes: [
								{
									label: 'Granny Smith',
									type: 'item',
									id: 24,
								},
								{
									label: 'Pinklady',
									type: 'item',
									_iconClass: 'glyphicon-file',
									id: 25,
								},
								{
									label: 'Rotten',
									type: 'item',
									id: 26,
								},
								{
									label: 'Jonathan',
									type: 'item',
									id: 27,
								},
							],
						},
						{
							label: 'Cherries',
							type: 'branch',
							id: 19,
							nodes: [
								{
									label: 'Balaton',
									type: 'item',
									id: 28,
								},
								{
									label: 'Erdi Botermo',
									type: 'item',
									id: 29,
								},
								{
									label: 'Montmorency',
									type: 'item',
									id: 30,
								},
								{
									label: 'Queen Ann',
									type: 'item',
									id: 31,
								},
								{
									label: 'Ulster',
									type: 'item',
									id: 32,
								},
								{
									label: 'Viva',
									type: 'item',
									id: 33,
								},
							],
						},
						{
							label: 'Raspberries',
							type: 'item',
							id: 6,
						},
					],
				},
			],
		},
		{
			label: 'Nuts',
			type: 'branch',
			_iconClass: 'glyphicon-file',
			id: 3,
			nodes: [
				{
					label: 'Almonds',
					type: 'item',
					id: 8,
				},
				{
					label: 'Cashews',
					type: 'item',
					id: 9,
				},
				{
					label: 'Pecans',
					type: 'item',
					id: 10,
				},
				{
					label: 'Walnuts',
					type: 'item',
					id: 11,
				},
			],
		},
		{
			label: 'Empty folder',
			type: 'branch',
			id: 7,
		},
	],
};

const Example = createReactClass({
	displayName: 'TreeExample',

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
			searchTerm: this.props.searchable ? 'fruit' : undefined,
		};
	},

	// By default Tree can have multiple selected nodes and folders/branches can be selected. To disable either of these, you can use the following logic. However, `props` are immutable. The node passed in shouldn't be modified, and due to object and arrays being reference variables, forceUpate is needed. This is just a "working example" not a prescription.
	handleExpandClick (event, data) {
		console.log('[handleExpandClick] (event, data)', event, data);
		data.node.loading = data.expand ? true : undefined;

		// Fake delay to demonstrate use of loading node attibute
		setTimeout(
			(node) => {
				node.loading = false;
				this.forceUpdate();
			},
			500,
			data.node
		);
		data.node.expanded = data.expand;
	},

	handleClick (event, data) {
		if (this.props.singleSelection) {
			data.node.selected = data.select;
			this.setState((prevState) => {
				if (
					this.state.selectedNode &&
					this.state.selectedNode.id !== data.node.id
				) {
					this.state.selectedNode.selected = false;
				}
				return { selectedNode: data.node };
			});
			console.log('[handleClick] (event, data)', event, data);
		} else if (
			!this.props.noBranchSelection ||
			(this.props.noBranchSelection && data.node.type !== 'branch')
		) {
			data.node.selected = data.select;
			// trigger render
			this.setState((prevState) => ({ ...prevState }));
			console.log('[handleClick] (event, data)', event, data);
		}
	},

	handleScroll (event, data) {
		console.log('[handleScroll] (event, data)', event, data);
	},

	handleSearchChange (event) {
		this.setState({ searchTerm: event.target.value });
	},

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Tree
						heading="Miscellaneous Foods"
						nodes={this.state.nodes}
						onExpandClick={this.handleExpandClick}
						onClick={this.handleClick}
						onScroll={this.handleScroll}
						searchTerm={this.state.searchTerm}
					/>
				</div>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
