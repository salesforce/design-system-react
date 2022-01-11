import React from 'react';

import IconSettings from '~/components/icon-settings';
import Tree from '~/components/tree';
import log from '~/utilities/log';
import Search from '../../forms/input/search';

const sampleNodes = {
	0: {
		id: 0,
		nodes: [1, 2, 3, 7],
	},
	1: {
		label: 'Grains',
		type: 'item',
		id: 1,
	},
	2: {
		label: 'Fruits',
		type: 'branch',
		id: 2,
		nodes: [4, 5],
	},
	3: {
		label: 'Nuts',
		type: 'branch',
		_iconClass: 'glyphicon-file',
		id: 3,
		nodes: [8, 9, 10, 11],
	},
	4: {
		assistiveText: 'Ground Fruits',
		label: 'Ground Fruits',
		type: 'branch',
		id: 4,
		nodes: [12, 13, 14],
	},
	5: {
		label: 'Tree Fruits',
		type: 'branch',
		id: 5,
		nodes: [15, 16, 17, 18, 19, 6],
	},
	6: {
		label: 'Raspberries',
		type: 'item',
		id: 6,
	},
	7: {
		label: 'Empty folder',
		type: 'branch',
		id: 7,
	},
	8: {
		label: 'Almonds',
		type: 'item',
		id: 8,
	},
	9: {
		label: 'Cashews',
		type: 'item',
		id: 9,
	},
	10: {
		label: 'Pecans',
		type: 'item',
		id: 10,
	},
	11: {
		label: 'Walnuts',
		type: 'item',
		id: 11,
	},
	12: {
		label: 'Watermelon',
		type: 'item',
		id: 12,
	},
	13: {
		label: 'Canteloupe',
		type: 'item',
		_iconClass: 'glyphicon-file',
		id: 13,
	},
	14: {
		label: 'Strawberries',
		type: 'item',
		id: 14,
	},
	15: {
		label: 'Peaches',
		type: 'item',
		id: 15,
	},
	16: {
		label: 'Pears',
		type: 'item',
		_iconClass: 'glyphicon-file',
		id: 16,
	},
	17: {
		label: 'Citrus',
		type: 'branch',
		id: 17,
		nodes: [20, 21, 22, 23],
	},
	18: {
		label: 'Apples',
		type: 'branch',
		id: 18,
		nodes: [24, 25, 26, 27],
	},
	19: {
		label: 'Cherries',
		type: 'branch',
		id: 19,
		nodes: [28, 29, 30, 31, 32, 33],
	},
	20: {
		label: 'Orange',
		type: 'item',
		id: 20,
	},
	21: {
		label: 'Grapefruit',
		type: 'item',
		id: 21,
	},
	22: {
		label: 'Lemon',
		type: 'item',
		id: 22,
	},
	23: {
		label: 'Lime',
		type: 'item',
		id: 23,
	},
	24: {
		label: 'Granny Smith',
		type: 'item',
		id: 24,
	},
	25: {
		label: 'Pinklady',
		type: 'item',
		_iconClass: 'glyphicon-file',
		id: 25,
	},
	26: {
		label: 'Rotten',
		type: 'item',
		id: 26,
	},
	27: {
		label: 'Jonathan',
		type: 'item',
		id: 27,
	},
	28: {
		label: 'Balaton',
		type: 'item',
		id: 28,
	},
	29: {
		label: 'Erdi Botermo',
		type: 'item',
		id: 29,
	},
	30: {
		label: 'Montmorency',
		type: 'item',
		id: 30,
	},
	31: {
		label: 'Queen Ann',
		type: 'item',
		id: 31,
	},
	32: {
		label: 'Ulster',
		type: 'item',
		id: 32,
	},
	33: {
		label: 'Viva',
		type: 'item',
		id: 33,
	},
};

/*
Sample of normalized hash table created
{
	 "0":{
			"id":0,
			"nodes":[
				 1,
				 2,
				 3,
				 7
			]
	 },
	 "1":{
			"label":"Grains",
			"type":"item",
			"id":1
	 },
	 "2":{
			"label":"Fruits",
			"type":"branch",
			"id":2,
			"nodes":[
				 4,
				 5
			]
	 },
	 "3":{
			"label":"Nuts",
			"type":"branch",
			"_iconClass":"glyphicon-file",
			"id":3,
			"nodes":[
				 8,
				 9,
				 10,
				 11
			]
	 },
	 "4":{
			"assistiveText":"Ground Fruits",
			"label":{
				 "type":"span",
				 "key":null,
				 "ref":null,
				 "props":{
						"children":"Ground Fruits"
				 },
				 "_owner":null,
				 "_store":{

				 }
			},
			"type":"branch",
			"id":4,
			"nodes":[
				 12,
				 13,
				 14
			]
	 }
}
 */

class Example extends React.Component {
	static displayName = 'DemoTree';

	static defaultProps = {
		heading: 'Miscellaneous Foods',
		id: 'example-tree',
	};

	state = {
		nodes: this.props.nodes || sampleNodes,
		searchTerm: this.props.searchable ? 'fruit' : undefined,
	};

	getNodes = (node) =>
		node.nodes ? node.nodes.map((id) => this.state.nodes[id]) : [];

	// By default Tree can have multiple selected nodes and folders/branches can be selected. To disable either of these, you can use the following logic. However, `props` are immutable. The node passed in shouldn't be modified. Object and arrays are reference variables.
	handleExpandClick = (event, data) => {
		log({
			action: this.props.action,
			customLog: this.props.log,
			event,
			eventName: 'Expand Branch',
			data,
		});
		const selected = data.select ? true : data.node.selected;
		this.setState((prevState) => ({
			...prevState,
			nodes: {
				...prevState.nodes,
				...{
					[data.node.id]: {
						...data.node,
						expanded: data.expand,
						selected,
					},
				},
			},
		}));
	};

	handleClick = (event, data) => {
		log({
			action: this.props.action,
			customLog: this.props.log,
			event,
			eventName: 'Node Selected',
			data,
		});
		if (this.props.multipleSelection) {
			if (
				!this.props.noBranchSelection ||
				(this.props.noBranchSelection && data.node.type !== 'branch')
			) {
				// Take the previous state, expand it, overwrite the `nodes` key with the previous state's `nodes` key expanded with the id of the node just clicked selected
				this.setState((prevState) => ({
					...prevState,
					nodes: {
						...prevState.nodes,
						...{
							[data.node.id]: { ...data.node, selected: data.select },
						},
					},
				}));
			}
		} else if (this.props.noBranchSelection && data.node.type === 'branch') {
			// OPEN BRANCH/FOLDER WHEN CLICKED
			// Although not codified in SLDS, this takes the click callback and turns it into the expand callback, and should be used for item only selection.
			this.setState((prevState) => ({
				...prevState,
				nodes: {
					...prevState.nodes,
					...{
						[data.node.id]: { ...data.node, expanded: !data.node.expanded },
					},
				},
			}));
		} else {
			// SINGLE SELECTION
			// Take the previous state, expand it, overwrite the `nodes` key with the previous state's `nodes` key expanded with the id of the node just clicked selected and the previously selected node unselected.
			this.setState((prevState) => {
				// Gaurd against no selection with the following. `selectedNode`
				// is the previously selected "current state" that is about to
				// be updated
				const selectedNode = prevState.selectedNode
					? {
							[prevState.selectedNode.id]: {
								...prevState.nodes[prevState.selectedNode.id],
								selected: false,
							},
					  }
					: {};
				return {
					...prevState,
					nodes: {
						...prevState.nodes,
						...{
							[data.node.id]: { ...data.node, selected: data.select },
							...selectedNode,
						},
					},
					selectedNode: data.node,
				};
			});
		}
	};

	handleScroll = (event, data) => {
		log({
			action: this.props.action,
			event,
			eventName: 'Tree scrolled',
			data,
		});
	};

	handleSearchChange = (event) => {
		this.setState({ searchTerm: event.target.value });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					{this.props.searchable ? (
						<div>
							<Search
								assistiveText={{ label: 'Search Tree' }}
								id="example-search"
								value={this.state.searchTerm}
								onChange={this.handleSearchChange}
							/>
							<br />
						</div>
					) : null}
					<Tree
						assistiveText={this.props.assistiveText}
						className={this.props.className}
						getNodes={this.props.getNodes || this.getNodes}
						heading={!this.props.noHeading && this.props.heading}
						id={this.props.id}
						listStyle={this.props.listStyle}
						listClassName={this.props.listClassName}
						nodes={this.state.nodes['0'].nodes}
						onExpandClick={this.props.onExpandClick || this.handleExpandClick}
						onClick={this.props.onClick || this.handleClick}
						onScroll={this.props.onScroll || this.handleScroll}
						searchTerm={this.props.searchTerm || this.state.searchTerm}
					/>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
