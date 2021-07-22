import React from 'react';

import TreeGrid from '~/components/tree-grid';
import Dropdown from '~/components/menu-dropdown';
import TreeGridColumn from '~/components/tree-grid/column';
import IconSettings from '~/components/icon-settings';

import log from '~/utilities/log';

const sampleData = {
	0: {
		id: 0,
		nodes: [1, 2, 3, 4],
	},
	1: {
		id: 1,
		type: 'item',
		name: '123555',
		accountName: 'Rewis Inc',
	},
	2: {
		id: 2,
		type: 'branch',
		name: '123556',
		accountName: 'Acme Corporation',
		nodes: [5, 6],
	},
	3: {
		id: 3,
		type: 'branch',
		name: '123557',
		accountName: 'Rhode Enterprises',
		nodes: [7],
	},
	4: {
		id: 4,
		type: 'branch',
		name: '123558',
		accountName: 'Tech Labs',
		nodes: [8],
	},
	5: {
		id: 5,
		type: 'branch',
		name: '123556-A',
		accountName: 'Acme Corporation (Bay Area)',
		nodes: [9, 10],
	},
	6: {
		id: 6,
		type: 'branch',
		name: '123556-B',
		accountName: 'Acme Corporation (East)',
		nodes: [11, 12],
	},
	7: {
		id: 7,
		type: 'item',
		name: '123557-A',
		accountName: 'Rhode Enterprises (UCA)',
	},
	8: {
		id: 8,
		type: 'item',
		name: '123558-A',
		accountName: 'Opportunity Resources Inc',
	},
	9: {
		id: 9,
		type: 'item',
		name: '123556-A-A',
		accountName: 'Acme Corporation (Oakland)',
	},
	10: {
		id: 10,
		type: 'item',
		name: '123556-A-B',
		accountName: 'Acme Corporation (San Francisco)',
	},
	11: {
		id: 11,
		type: 'item',
		name: '123556-B-A',
		accountName: 'Acme Corporation (NY)',
	},
	12: {
		id: 12,
		type: 'branch',
		name: '123556-B-B',
		accountName: 'Acme Corporation (VA)',
		nodes: [13],
	},
	13: {
		id: 13,
		type: 'branch',
		name: '123556-B-B-A',
		accountName: 'Allied Technologies',
		nodes: [14],
	},
	14: {
		id: 14,
		type: 'item',
		name: '123556-B-B-A-A',
		accountName: 'Allied Technologies (UV)',
	},
};

class Example extends React.Component {
	static displayName = 'TreeGridExample';

	state = {
		nodes: this.props.nodes || sampleData,
	};

	getNodes = (node) =>
		node.nodes ? node.nodes.map((id) => this.state.nodes[id]) : [];

	handleExpansion = (event, data) => {
		log({
			action: this.props.action,
			event,
			eventName: 'Expand Branch',
			data,
		});
		const { nodes } = this.state;
		const updated = {
			...nodes,
			...{
				[data.node.id]: {
					...data.node,
					expanded: data.expanded,
				},
			},
		};
		this.setState({ nodes: updated });
	};

	findChildren = (node) => {
		if (node.type === 'branch') {
			let list = [];
			node.nodes.forEach((child) => {
				const c = this.findChildren(this.state.nodes[child]);
				list = [...c, child, ...list];
			});
			return list;
		}
		return [];
	};

	handleSelection = (event, data) => {
		log({
			action: this.props.action,
			event,
			eventName: 'Select Branch',
			data,
		});
		const curr = this.state.nodes;
		curr[data.node.id].selected = data.selected;
		const children = this.findChildren(data.node);
		children.forEach((child) => {
			curr[child].selected = data.selected;
		});
		this.setState({ nodes: curr });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ overflow: 'auto' }}>
					<TreeGrid
						isHeadless
						isBorderless={this.props.isBorderless}
						selectRows={this.props.selectRows}
						nodes={this.state.nodes['0'].nodes}
						getNodes={this.getNodes}
						onExpand={this.handleExpansion}
						onSelect={this.handleSelection}
						moreActionsDropdown={
							<Dropdown
								id="file-more-actions"
								iconCategory="utility"
								iconName="down"
								iconVariant="border-filled"
								iconSize="x-small"
								align="right"
								onSelect={(event, data) => {
									log({
										action: this.props.action,
										event,
										eventName: 'More actions button of row clicked',
										data,
									});
								}}
								options={[
									{ label: 'Menu Item One', value: 'A0' },
									{ label: 'Menu Item Two', value: 'B0' },
								]}
								value="A0"
							/>
						}
					>
						<TreeGridColumn
							type="text"
							key="account"
							label="Account Name"
							property="accountName"
							initialWidth={300}
							isPrimaryColumn
						/>
					</TreeGrid>
				</div>
			</IconSettings>
		);
	}
}

export default Example;
