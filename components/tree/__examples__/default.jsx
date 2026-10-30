import React from 'react';

import IconSettings from '~/components/icon-settings';
import Tree from '~/components/tree';
import log from '~/utilities/log';
import Search from '../../input/search';

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

	// Tree never modifies `nodes`. Selection (`selectedIds`) and expansion (`expandedIds`) are
	// state of their own, so the node data can stay as it is.
	state = {
		nodes: this.props.nodes || sampleNodes,
		expandedIds: this.props.initialExpandedIds || [],
		selectedIds: this.props.initialSelectedIds || [],
		searchTerm: this.props.searchable ? 'fruit' : undefined,
	};

	getNodes = (node) =>
		node.nodes ? node.nodes.map((id) => this.state.nodes[id]) : [];

	// `data.expandedIds` is the requested set of expanded branches
	handleRequestToggle = (event, data) => {
		log({
			action: this.props.action,
			customLog: this.props.log,
			event,
			eventName: 'Expand Branch',
			data,
		});
		this.setState({ expandedIds: data.expandedIds });
	};

	// By default Tree can have multiple selected nodes and folders/branches can be selected. To disable either of these, you can use the following logic.
	handleSelect = (event, data) => {
		log({
			action: this.props.action,
			customLog: this.props.log,
			event,
			eventName: 'Node Selected',
			data,
		});
		if (this.props.noBranchSelection && data.node.type === 'branch') {
			// OPEN BRANCH/FOLDER WHEN CLICKED
			// Although not codified in SLDS, this takes the select callback and turns it into an expand request, and should be used for item only selection.
			this.setState((prevState) => ({
				expandedIds: prevState.expandedIds.includes(data.node.id)
					? prevState.expandedIds.filter((id) => id !== data.node.id)
					: [...prevState.expandedIds, data.node.id],
			}));
		} else if (this.props.multipleSelection) {
			// MULTIPLE SELECTION: `data.selectedIds` is the requested selection
			this.setState({ selectedIds: data.selectedIds });
		} else {
			// SINGLE SELECTION: only the node just selected, or nothing if it was deselected
			this.setState({ selectedIds: data.isSelected ? [data.node.id] : [] });
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
						labels={
							this.props.noHeading ? undefined : { heading: this.props.heading }
						}
						id={this.props.id}
						listStyle={this.props.listStyle}
						listClassName={this.props.listClassName}
						nodes={this.state.nodes['0'].nodes}
						selectedIds={this.state.selectedIds}
						expandedIds={this.state.expandedIds}
						onRequestToggle={
							this.props.onRequestToggle || this.handleRequestToggle
						}
						onSelect={this.props.onSelect || this.handleSelect}
						onScroll={this.props.onScroll || this.handleScroll}
						searchTerm={this.props.searchTerm || this.state.searchTerm}
					/>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
