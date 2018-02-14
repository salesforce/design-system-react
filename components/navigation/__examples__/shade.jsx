/* eslint-disable no-console, react/prop-types */
import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Navigation from '~/components/navigation';

const sampleSearchCategories = [
	{
		id: 'search_results',
		label: 'Search Results',
		items: [
			{ id: 'top', label: 'Top Results' },
			{ id: 'accounts', label: 'Accounts' },
			{ id: 'contacts', label: 'Contacts' },
			{ id: 'opportunities', label: 'Opportunities' },
			{ id: 'leads', label: 'Leads' },
			{ id: 'groups', label: 'Groups' },
			{ id: 'files', label: 'Files' },
			{ id: 'dashboards', label: 'Dashboards' },
			{ id: 'reports', label: 'Reports' },
			{ id: 'feeds', label: 'Feeds' },
		],
	},
	{
		id: 'external_results',
		label: 'External Results',
		items: [
			{ id: 'app_one', label: 'App One' },
			{ id: 'app_two', label: 'App Two' },
			{ id: 'app_three', label: 'App Three' },
		],
	},
];

const Example = createReactClass({
	displayName: 'NavigationExample',

	getInitialState () {
		return {
			selectedId: 'top',
		};
	},

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ width: '320px', backgroundColor: '#FAFAFB' }}>
					<Navigation
						id="sample-navigation"
						variant="shade"
						categories={sampleSearchCategories}
						selectedId={this.state.selectedId}
						onSelect={(event, data) => {
							this.setState({ selectedId: data.item.id });
							if (this.props.action) {
								const dataAsArray = Object.keys(data).map((key) => data[key]);
								this.props.action('onSelect')(event, data, ...dataAsArray);
							} else if (console) {
								console.log('[onSelect] (event, data)', event, data);
							}
						}}
					/>
				</div>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
