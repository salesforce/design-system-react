/* eslint-disable no-console, react/prop-types */
import React from 'react';

// Higher Order Components such as `react-onclickoutside` use the DOM and Jest snapshot testing must be DOMless
import VerticalNavigation from '~/components/vertical-navigation';
import IconSettings from '~/components/icon-settings';

import { sampleReportCategories } from '~/utilities/sample-data/vertical-navigation';

function Example(props) {
	return (
		<IconSettings iconPath="/assets/icons">
			<VerticalNavigation
				id="sample-navigation"
				categories={sampleReportCategories}
				{...props}
			/>
		</IconSettings>
	);
}

Example.displayName = 'NavigationExample';

export default Example;
