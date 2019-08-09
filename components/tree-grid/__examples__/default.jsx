import React from 'react';

import TreeGrid from '~/components/tree-grid';
import TreeGridColumn from '~/components/tree-grid/column';
import IconSettings from '~/components/icon-settings';

import log from '~/utilities/log';

const columns = [
	<TreeGridColumn
		type="text"
		key="account"
		label="Account Name"
		property="accountName"
		initialWidth={300}
		isPrimaryColumn
	/>,
	<TreeGridColumn
		type="number"
		key="employees"
		label="Employees"
		property="employees"
		initialWidth={150}
	/>,
	<TreeGridColumn
		type="phone"
		key="phone"
		label="Phone Number"
		property="phone"
		initialWidth={200}
	/>,
	<TreeGridColumn
		type="url"
		key="owner"
		label="Account Owner"
		property="accountOwner"
		initialWidth={150}
		typeAttributes={{
			label: { fieldName: 'accountOwnerName' },
		}}
	/>,
	<TreeGridColumn
		type="text"
		key="city"
		label="Billing City"
		property="billingCity"
		initialWidth={200}
	/>,
];

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
						events={{
							onClickMoreActions: (event, value) =>
								log({
									action: this.props.action,
									event,
									eventName: 'More Actions Button Clicked',
									data: value,
								}),
						}}
					>
						{columns}
					</TreeGrid>
				</div>
			</IconSettings>
		);
	}
}

export default Example;
