import React from 'react';

import TreeGrid from '~/components/tree-grid';
import TreeGridColumn from '~/components/tree-grid/column';
import Dropdown from '~/components/menu-dropdown';
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
		employees: 3100,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/jane-doe',
		accountOwnerName: 'Jane Doe',
		billingCity: 'Phoeniz, AZ',
	},
	2: {
		id: 2,
		type: 'branch',
		name: '123556',
		accountName: 'Acme Corporation',
		employees: 10000,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/john-doe',
		accountOwnerName: 'John Doe',
		billingCity: 'San Francisco, CA',
		nodes: [5, 6],
	},
	3: {
		id: 3,
		type: 'branch',
		name: '123557',
		accountName: 'Rhode Enterprises',
		employees: 6000,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/john-doe',
		accountOwnerName: 'John Doe',
		billingCity: 'New York, NY',
		nodes: [7],
	},
	4: {
		id: 4,
		type: 'branch',
		name: '123558',
		accountName: 'Tech Labs',
		employees: 1856,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/john-doe',
		accountOwnerName: 'John Doe',
		billingCity: 'New York, NY',
		nodes: [8],
	},
	5: {
		id: 5,
		type: 'branch',
		name: '123556-A',
		accountName: 'Acme Corporation (Bay Area)',
		employees: 3000,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/john-doe',
		accountOwnerName: 'John Doe',
		billingCity: 'New York, NY',
		nodes: [9, 10],
	},
	6: {
		id: 6,
		type: 'branch',
		name: '123556-B',
		accountName: 'Acme Corporation (East)',
		employees: 430,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/john-doe',
		accountOwnerName: 'John Doe',
		billingCity: 'San Francisco, CA',
		nodes: [11, 12],
	},
	7: {
		id: 7,
		type: 'item',
		name: '123557-A',
		accountName: 'Rhode Enterprises (UCA)',
		employees: 2540,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/john-doe',
		accountOwnerName: 'John Doe',
		billingCity: 'New York, NY',
	},
	8: {
		id: 8,
		type: 'item',
		name: '123558-A',
		accountName: 'Opportunity Resources Inc',
		employees: 1934,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/john-doe',
		accountOwnerName: 'John Doe',
		billingCity: 'Los Angeles, CA',
	},
	9: {
		id: 9,
		type: 'item',
		name: '123556-A-A',
		accountName: 'Acme Corporation (Oakland)',
		employees: 745,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/john-doe',
		accountOwnerName: 'John Doe',
		billingCity: 'New York, NY',
	},
	10: {
		id: 10,
		type: 'item',
		name: '123556-A-B',
		accountName: 'Acme Corporation (San Francisco)',
		employees: 578,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/jane-doe',
		accountOwnerName: 'Jane Doe',
		billingCity: 'Los Angeles, CA',
	},
	11: {
		id: 11,
		type: 'item',
		name: '123556-B-A',
		accountName: 'Acme Corporation (NY)',
		employees: 1210,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/jane-doe',
		accountOwnerName: 'Jane Doe',
		billingCity: 'New York, NY',
	},
	12: {
		id: 12,
		type: 'branch',
		name: '123556-B-B',
		accountName: 'Acme Corporation (VA)',
		employees: 410,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/john-doe',
		accountOwnerName: 'John Doe',
		billingCity: 'New York, NY',
		nodes: [13],
	},
	13: {
		id: 13,
		type: 'branch',
		name: '123556-B-B-A',
		accountName: 'Allied Technologies',
		employees: 390,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/jane-doe',
		accountOwnerName: 'Jane Doe',
		billingCity: 'Los Angeles, CA',
		nodes: [14],
	},
	14: {
		id: 14,
		type: 'item',
		name: '123556-B-B-A-A',
		accountName: 'Allied Technologies (UV)',
		employees: 270,
		phone: '837-555-1212',
		accountOwner: 'http://example.com/john-doe',
		accountOwnerName: 'John Doe',
		billingCity: 'San Francisco, CA',
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
			eventName: `${data.expanded ? 'Expand' : 'Collapse'} Branch`,
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

	handleSelectAll = (event) => {
		const selected = this.state.nodes;
		const curr = this.state.allSelect;
		for (const [key, value] of Object.entries(selected)) {
			if (key) {
				value = { ...value, selected: !curr };
				selected[key] = value;
			}
		}
		const presentState = { nodes: selected, allSelect: !curr };
		log({
			action: this.props.action,
			event,
			eventName: 'Selected All',
			data: presentState,
		});
		this.setState(presentState);
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ overflow: 'auto' }}>
					<TreeGrid
						id="example"
						nodes={this.state.nodes['0'].nodes}
						getNodes={this.getNodes}
						onExpand={this.handleExpansion}
						onSelect={this.handleSelection}
						onSelectAll={this.handleSelectAll}
						selectRows={this.props.selectRows}
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
							moreActionsDropdown={
								<Dropdown
									id="file-more-actions"
									iconCategory="utility"
									iconName="chevrondown"
									iconVariant="small"
									iconSize="x-small"
									align="right"
									onSelect={(event, data) => {
										log({
											action: this.props.action,
											event,
											eventName:
												'More Actions Button of accountName column clicked',
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
						/>
						<TreeGridColumn
							type="number"
							key="employees"
							label="Employees"
							property="employees"
							initialWidth={150}
							variant="icon"
							moreActionsDropdown={
								<Dropdown
									id="file-more-actions"
									iconCategory="utility"
									iconName="chevrondown"
									iconVariant="small"
									iconSize="x-small"
									align="right"
									onSelect={(event, data) => {
										log({
											action: this.props.action,
											event,
											eventName:
												'More Actions Button of employees column clicked',
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
						/>
						<TreeGridColumn
							type="phone"
							key="phone"
							label="Phone Number"
							property="phone"
							initialWidth={200}
							variant="icon"
							moreActionsDropdown={
								<Dropdown
									id="file-more-actions"
									iconCategory="utility"
									iconName="chevrondown"
									iconVariant="small"
									iconSize="x-small"
									align="right"
									onSelect={(event, data) => {
										log({
											action: this.props.action,
											event,
											eventName: 'More Actions Button of phone column clicked',
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
						/>
						<TreeGridColumn
							type="url"
							key="owner"
							label="Account Owner"
							property="accountOwner"
							iconSize="x-small"
							variant="icon"
							initialWidth={150}
							typeAttributes={{
								label: { fieldName: 'accountOwnerName' },
							}}
							moreActionsDropdown={
								<Dropdown
									id="file-more-actions"
									iconCategory="utility"
									iconName="chevrondown"
									iconVariant="small"
									iconSize="x-small"
									align="right"
									onSelect={(event, data) => {
										log({
											action: this.props.action,
											event,
											eventName:
												'More Actions Button of accountOwner column clicked',
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
						/>
						<TreeGridColumn
							type="text"
							key="city"
							label="Billing City"
							property="billingCity"
							initialWidth={200}
							variant="icon"
							moreActionsDropdown={
								<Dropdown
									id="file-more-actions"
									iconCategory="utility"
									iconName="chevrondown"
									iconVariant="small"
									iconSize="x-small"
									align="right"
									onSelect={(event, data) => {
										log({
											action: this.props.action,
											event,
											eventName: 'More Actions Button of city column clicked',
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
						/>
					</TreeGrid>
				</div>
			</IconSettings>
		);
	}
}

export default Example;
