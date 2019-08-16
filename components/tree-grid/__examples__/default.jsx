import React from 'react';

import TreeGrid from '~/components/tree-grid';
import TreeGridColumn from '~/components/tree-grid/column';
import Dropdown from '~/components/menu-dropdown';
import IconSettings from '~/components/icon-settings';

import log from '~/utilities/log';

class Example extends React.Component {
	static displayName = 'TreeGridExample';

	state = {
		items: [
			{
				name: '123555',
				accountName: 'Rewis Inc',
				employees: 3100,
				phone: '837-555-1212',
				accountOwner: 'http://example.com/jane-doe',
				accountOwnerName: 'Jane Doe',
				billingCity: 'Phoeniz, AZ',
			},
			{
				name: '123556',
				accountName: 'Acme Corporation',
				employees: 10000,
				phone: '837-555-1212',
				accountOwner: 'http://example.com/john-doe',
				accountOwnerName: 'John Doe',
				billingCity: 'San Francisco, CA',
				nodes: [
					{
						name: '123556-A',
						accountName: 'Acme Corporation (Bay Area)',
						employees: 3000,
						phone: '837-555-1212',
						accountOwner: 'http://example.com/john-doe',
						accountOwnerName: 'John Doe',
						billingCity: 'New York, NY',
						nodes: [
							{
								name: '123556-A-A',
								accountName: 'Acme Corporation (Oakland)',
								employees: 745,
								phone: '837-555-1212',
								accountOwner: 'http://example.com/john-doe',
								accountOwnerName: 'John Doe',
								billingCity: 'New York, NY',
							},
							{
								name: '123556-A-B',
								accountName: 'Acme Corporation (San Francisco)',
								employees: 578,
								phone: '837-555-1212',
								accountOwner: 'http://example.com/jane-doe',
								accountOwnerName: 'Jane Doe',
								billingCity: 'Los Angeles, CA',
							},
						],
					},
					{
						name: '123556-B',
						accountName: 'Acme Corporation (East)',
						employees: 430,
						phone: '837-555-1212',
						accountOwner: 'http://example.com/john-doe',
						accountOwnerName: 'John Doe',
						billingCity: 'San Francisco, CA',
						nodes: [
							{
								name: '123556-B-A',
								accountName: 'Acme Corporation (NY)',
								employees: 1210,
								phone: '837-555-1212',
								accountOwner: 'http://example.com/jane-doe',
								accountOwnerName: 'Jane Doe',
								billingCity: 'New York, NY',
							},
							{
								name: '123556-B-B',
								accountName: 'Acme Corporation (VA)',
								employees: 410,
								phone: '837-555-1212',
								accountOwner: 'http://example.com/john-doe',
								accountOwnerName: 'John Doe',
								billingCity: 'New York, NY',
								nodes: [
									{
										name: '123556-B-B-A',
										accountName: 'Allied Technologies',
										employees: 390,
										phone: '837-555-1212',
										accountOwner: 'http://example.com/jane-doe',
										accountOwnerName: 'Jane Doe',
										billingCity: 'Los Angeles, CA',
										nodes: [
											{
												name: '123556-B-B-A-A',
												accountName: 'Allied Technologies (UV)',
												employees: 270,
												phone: '837-555-1212',
												accountOwner: 'http://example.com/john-doe',
												accountOwnerName: 'John Doe',
												billingCity: 'San Francisco, CA',
											},
										],
									},
								],
							},
						],
					},
				],
			},

			{
				name: '123557',
				accountName: 'Rhode Enterprises',
				employees: 6000,
				phone: '837-555-1212',
				accountOwner: 'http://example.com/john-doe',
				accountOwnerName: 'John Doe',
				billingCity: 'New York, NY',
				nodes: [
					{
						name: '123557-A',
						accountName: 'Rhode Enterprises (UCA)',
						employees: 2540,
						phone: '837-555-1212',
						accountOwner: 'http://example.com/john-doe',
						accountOwnerName: 'John Doe',
						billingCity: 'New York, NY',
					},
				],
			},
			{
				name: '123558',
				accountName: 'Tech Labs',
				employees: 1856,
				phone: '837-555-1212',
				accountOwner: 'http://example.com/john-doe',
				accountOwnerName: 'John Doe',
				billingCity: 'New York, NY',
				nodes: [
					{
						name: '123558-A',
						accountName: 'Opportunity Resources Inc',
						employees: 1934,
						phone: '837-555-1212',
						accountOwner: 'http://example.com/john-doe',
						accountOwnerName: 'John Doe',
						billingCity: 'Los Angeles, CA',
					},
				],
			},
		],
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ overflow: 'auto' }}>
					<TreeGrid
						items={this.state.items}
						selectRows={this.props.selectRows}
						events={{
							onSelectAll: (event) =>
								log({
									action: this.props.action,
									event,
									eventName: 'All rows selected',
									data: null,
								}),
							onDeselectAll: (event) =>
								log({
									action: this.props.action,
									event,
									eventName: 'All rows diselected',
									data: null,
								}),
							onRowChange: (event, data) =>
								log({
									action: this.props.action,
									event,
									eventName: 'Row selection changed',
									data,
								}),
							onExpandRow: (event, data) =>
								log({
									action: this.props.action,
									event,
									eventName: `Row Expanded`,
									data,
								}),
							onCollapseRow: (event, data) =>
								log({
									action: this.props.action,
									event,
									eventName: `Row Collapsed`,
									data,
								}),
						}}
						moreActionsDropdown={
							<Dropdown
								iconCategory="utility"
								iconName="down"
								iconVariant="bare"
								align="right"
								variant="icon"
								menuStyle={{ minWidth: '50px', width: '125px' }}
								onSelect={(event, data) => {
									console.log('selected: ', data.id);
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
									iconName="down"
									iconVariant="bare"
									align="right"
									variant="icon"
									menuStyle={{ minWidth: '50px', width: '125px' }}
									onSelect={(value) => {
										console.log('selected: ', value);
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
									iconName="down"
									iconVariant="bare"
									align="right"
									menuStyle={{ minWidth: '50px', width: '125px' }}
									onSelect={(value) => {
										console.log('selected: ', value);
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
									iconName="down"
									iconVariant="bare"
									align="right"
									menuStyle={{ minWidth: '50px', width: '125px' }}
									onSelect={(value) => {
										console.log('selected: ', value);
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
							variant="icon"
							initialWidth={150}
							typeAttributes={{
								label: { fieldName: 'accountOwnerName' },
							}}
							onClickMoreActions={(event) =>
								log({
									action: this.props.action,
									event,
									eventName: 'More Actions Button of owner column clicked',
									data: null,
								})
							}
							moreActionsDropdown={
								<Dropdown
									id="file-more-actions"
									iconCategory="utility"
									iconName="down"
									iconVariant="bare"
									align="right"
									menuStyle={{ minWidth: '50px', width: '125px' }}
									onSelect={(value) => {
										console.log('selected: ', value);
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
							onClickMoreActions={(event) =>
								log({
									action: this.props.action,
									event,
									eventName: 'More Actions Button of city column clicked',
									data: null,
								})
							}
							moreActionsDropdown={
								<Dropdown
									id="file-more-actions"
									iconCategory="utility"
									iconName="down"
									iconVariant="bare"
									align="right"
									menuStyle={{ minWidth: '50px', width: '125px' }}
									onSelect={(value) => {
										console.log('selected: ', value);
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
