/* eslint-disable no-console, react/prop-types */
import React from 'react';

// Higher Order Components such as `react-onclickoutside` use the DOM and Jest snapshot testing must be DOMless
import Navigation from '~/components/navigation';

const sampleCategories = [
	{id: 'reports', label: 'Reports', items:
		[
			{id: 'recent_reports', label: 'Recent'},
			{id: 'my_reports', label: 'Created by Me'},
			{id: 'private_reports', label: 'Private Reports'},
			{id: 'public_reports', label: 'Public Reports'},
			{id: 'all_reports', label: 'All Reports'}
		]
	},
	{id: 'folders', label: 'Folders', items:
		[
			{id: 'my_folders', label: 'Created by Me'},
			{id: 'shared_folders', label: 'Shared with Me'},
			{id: 'all_folders', label: 'All Folders'}
		]
	}
];

const Example = React.createClass({
	displayName: 'NavigationExample',

	render () {
		return (
			<Navigation
				id='sample-navigation'
				categories={sampleCategories}
				{...this.props}
			/>
		);
	}
});

export default Example;
