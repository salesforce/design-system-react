/* eslint-disable no-console, react/prop-types */
import React from 'react';

import IconSettings from '~/components/icon-settings';
import VerticalNavigation from '~/components/vertical-navigation';
import Badge from '~/components/badge';

const sampleReportWitchNotificationCategories = [
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
			{
				id: 'my_folders',
				label: 'Created by Me',
				notificationBadge: <Badge content="3" id="notification-badge" />,
			},
			{ id: 'shared_folders', label: 'Shared with Me' },
			{ id: 'all_folders', label: 'All Folders' },
		],
	},
];

class Example extends React.Component {
	static displayName = 'NavigationExample';

	state = {
		selectedId: 'recent_reports',
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ width: '320px' }}>
					<VerticalNavigation
						id="sample-navigation"
						categories={sampleReportWitchNotificationCategories}
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
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
