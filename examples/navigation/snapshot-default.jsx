/* eslint-disable no-console, react/prop-types */
import React from 'react';

// Higher Order Components such as `react-onclickoutside` use the DOM and Jest snapshot testing must be DOMless
import Navigation from '~/components/navigation';
import globalSettings from '../../components/settings';

globalSettings.setIconsPath('/assets/icons');

import { sampleReportCategories } from '../../utilities/sample-data/navigation';

const Example = React.createClass({
	displayName: 'NavigationExample',

	render () {
		return (
			<Navigation
				id="sample-navigation"
				categories={sampleReportCategories}
				{...this.props}
			/>
		);
	}
});

export default Example;
