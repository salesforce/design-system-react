/* eslint-disable no-console, react/prop-types */
import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Navigation from '~/components/navigation';

const sampleReportCategories = [
	{
		id: 'reports',
		label: 'Reports',
		items: [
			{ id: 'recent_reports', label: 'Recent' },
			{ id: 'my_reports', label: 'Created by Me' },
			{ id: 'private_reports', label: 'Private Reports' },
			{ id: 'public_reports', label: 'Public Reports' },
			{ id: 'all_reports', label: 'All Reports' },
		],
	},
	{
		id: 'folders',
		label: 'Folders',
		items: [
			{ id: 'my_folders', label: 'Created by Me' },
			{ id: 'shared_folders', label: 'Shared with Me' },
			{ id: 'all_folders', label: 'All Folders' },
		],
	},
];

const Example = createReactClass({
	displayName: 'NavigationExample',

	getInitialState () {
		return {
			selectedId: 'recent_reports',
		};
	},

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ width: '320px' }}>
					<Navigation
						id="sample-navigation"
						categories={sampleReportCategories}
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
