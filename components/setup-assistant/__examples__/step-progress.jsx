import React from 'react';

import Button from '~/components/button';
import Checkbox from '~/components/checkbox';
import IconSettings from '~/components/icon-settings';
import SetupAssistant from '~/components/setup-assistant';

const steps = [
	{
		action: <Button label="Add Users" variant="outline-brand" />,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		estimatedTime: '4 mins',
		heading: 'Add Users to Your Org',
		progress: 100,
	},
	{
		action: <Button label="Add Profiles" variant="outline-brand" />,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		heading: 'Create Profiles for Your Users',
		progress: 0,
	},
	{
		action: <Button label="View on Trailhead" variant="link" />,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		estimatedTime: '15 mins',
		heading: 'Learn How to Use Profiles to control Visibility',
		progress: 100,
	},
	{
		action: <Checkbox variant="toggle" />,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		heading: 'Turn on tracking for profiles',
		progress: 0,
	},
	{
		action: <Button label="Watch Video" variant="link" />,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		heading: 'Setup Einstein Visibility for Admins',
		progress: 0,
	},
];

class Example extends React.Component {
	static displayName = 'SetupAssistantStepProgress';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<SetupAssistant steps={steps} />
			</IconSettings>
		);
	}
}

export default Example;
