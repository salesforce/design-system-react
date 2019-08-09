import React from 'react';

import TreeGrid from '~/components/tree-grid';
import TreeGridColumn from '~/components/tree-grid/column';
import IconSettings from '~/components/icon-settings';

const columns = [
	<TreeGridColumn
		type="text"
		key="account"
		label="Account Name"
		property="accountName"
		initialWidth={300}
		isPrimaryColumn
	/>,
];

class Example extends React.Component {
	static displayName = 'TreeGridExample';

	state = {
		items: [
			{ accountName: 'Rewis Inc' },
			{
				accountName: 'Acme Corporation',
				nodes: [
					{
						accountName: 'Acme Corporation (Bay Area)',
						nodes: [
							{ accountName: 'Acme Corporation (Oakland)' },
							{ accountName: 'Acme Corporation (San Francisco)' },
						],
					},
					{
						accountName: 'Acme Corporation (East)',
						nodes: [
							{ accountName: 'Acme Corporation (NY)' },
							{
								accountName: 'Acme Corporation (VA)',
								nodes: [
									{
										accountName: 'Allied Technologies',
										nodes: [{ accountName: 'Allied Technologies (UV)' }],
									},
								],
							},
						],
					},
				],
			},
			{
				accountName: 'Rhode Enterprises',
				nodes: [{ accountName: 'Rhode Enterprises (UCA)' }],
			},
			{
				accountName: 'Tech Labs',
				nodes: [{ accountName: 'Opportunity Resources Inc' }],
			},
		],
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ overflow: 'auto' }}>
					<TreeGrid
						items={this.state.items}
						isHeadless
						isBorderless={this.props.isBorderless}
					>
						{columns}
					</TreeGrid>
				</div>
			</IconSettings>
		);
	}
}

export default Example;
