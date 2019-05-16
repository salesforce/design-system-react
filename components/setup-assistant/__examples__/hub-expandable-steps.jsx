import React from 'react';

import Button from '~/components/button';
import Checkbox from '~/components/checkbox';
import IconSettings from '~/components/icon-settings';
import ScopedNotification from '~/components/scoped-notification';
import SetupAssistant from '~/components/setup-assistant';
import ProgressIndicator from '~/components/progress-indicator';

const subSteps = [
	{
		id: 0,
		label: 'Turn on Lightning for all users.',
		onRenderSetupAssistantAction: (
			<Checkbox
				checked
				variant="toggle"
			/>
		)
	},
	{
		id: 1,
		label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		onRenderSetupAssistantAction: (
			<Button
				label="View in Trailhead"
				variant="link"
			/>
		)
	},
	{
		id: 2,
		label: 'Lorem ipsum dolor sit amet, lorem ipsum dolor.',
		onRenderSetupAssistantAction: (
			<Button
				label="Add Users"
				variant="outline-brand"
			/>
		)
	},
];

class Example extends React.Component {
	static displayName = 'SetupAssistantHubWithExpandableSteps';

	constructor (props) {
		super(props);
		this.state = {
			steps: [
				{
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					estimatedTime: '4 mins',
					heading: 'Add Users to Your Org',
					isExpandable: true,
					progress: 100
				},
				{
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					estimatedTime: '10 mins',
					heading: 'Create Profiles for Your Users',
					isExpandable: true,
					isOpen: true,
					progress: 33,
					progressIndicator: (
						<ProgressIndicator
							completedSteps={[subSteps[0]]}
							orientation="vertical"
							steps={subSteps}
							selectedStep={subSteps[1]}
							variant="setup-assistant"
						/>
					),
					scopedNotification: (
						<ScopedNotification theme="light">
							<p>It looks as if duplicates exist for this lead. <a href="javascript:void(0);">View Duplicates.</a></p>
						</ScopedNotification>
					)
				},
				{
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					estimatedTime: '15 mins',
					heading: 'Learn How to Use Profiles to control Visibility',
					isExpandable: true,
					progress: 100
				},
				{
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					estimatedTime: '10 mins',
					heading: 'Turn on tracking for profiles',
					isExpandable: true,
					progress: 0
				},
				{
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					estimatedTime: '10 mins',
					heading: 'Setup Einstein Visibility for Admins',
					isExpandable: true,
					progress: 0
				}
			]
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<SetupAssistant
					onStepToggleIsOpen={(event, data) => {
						const steps = this.state.steps;
						steps[data.index].isOpen = !data.isOpen;
						this.setState({ steps });
					}}
					steps={this.state.steps}
				/>
			</IconSettings>);
	}
}

export default Example;
