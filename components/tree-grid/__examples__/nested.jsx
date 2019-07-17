import React from 'react';
import TreeGrid from '~/components/tree-grid';
import IconSettings from '~/components/icon-settings';

const data = {
	cols: [
		{
			id: '1',
			label: 'Account Name',
			href: 'javascript:void(0);',
		},
		{
			id: '2',
			label: 'Employees',
			href: 'javascript:void(0);',
		},
		{
			id: '3',
			label: 'Phone Number',
			href: 'javascript:void(0);',
		},
		{
			id: '4',
			label: 'Account Owner',
			href: 'javascript:void(0);',
		},
		{
			id: '5',
			label: 'Billing City',
			href: 'javascript:void(0);',
		},
	],
	rows: [
		{
			id: '1',
			cols: [
				{
					label: 'Rewis Inc',
				},
				{
					label: '3100',
				},
				{
					label: '837-555-1212',
				},
				{
					label: 'Jane Doe',
					href: 'javascript:void(0);',
				},
				{
					label: 'Phoenix, AZ',
				},
			],
		},
		{
			id: '2',
			cols: [
				{
					label: 'Acme Corporation',
				},
				{
					label: '10000',
				},
				{
					label: '837-555-1212',
				},
				{
					label: 'Jane Doe',
					href: 'javascript:void(0);',
				},
				{
					label: 'San Francisco, CA',
				},
			],
			subRows: [
				{
					cols: [
						{
							label: 'Acme Corporation (Oakland)',
						},
						{
							label: '745',
						},
						{
							label: '837-555-1212',
						},
						{
							label: 'Jane Doe',
							href: 'javascript:void(0);',
						},
						{
							label: 'New York, NY',
						},
					],
				},
			],
		},
		{
			id: '3',
			cols: [
				{
					label: 'Rohde Enterprises',
				},
				{
					label: '6000',
				},
				{
					label: '837-555-1212',
				},
				{
					label: 'Jane Doe',
					href: 'javascript:void(0);',
				},
				{
					label: 'New York, NY',
				},
			],
		},
		{
			id: '4',
			cols: [
				{
					label: 'Cheese Corp',
				},
				{
					label: '1234',
				},
				{
					label: '837-555-1212',
				},
				{
					label: 'Jane Doe',
					href: 'javascript:void(0);',
				},
				{
					label: 'Paris, France',
				},
			],
		},
	],
};

class Example extends React.Component {
	static displayName = 'treeGridNestedExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<TreeGrid data={data} />
			</IconSettings>
		);
	}
}

export default Example;
