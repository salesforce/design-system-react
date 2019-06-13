import React from 'react';

import Button from '~/components/button';
import Checkbox from '~/components/checkbox';
import IconSettings from '~/components/icon-settings';
import ScopedNotification from '~/components/scoped-notification';
import SetupAssistant from '~/components/setup-assistant';
import SetupAssistantStep from '~/components/setup-assistant/step';
import ProgressBar from '~/components/progress-bar';
import ProgressIndicator from '~/components/progress-indicator';

const subSteps = [
	{
		id: 0,
		label: 'Turn on Lightning for all users.',
		onRenderSetupAssistantAction: (
			<Checkbox
				id="substep-0-action"
				checked
				oldEventParameterOrder={false}
				variant="toggle"
			/>
		),
	},
	{
		id: 1,
		label:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		onRenderSetupAssistantAction: (
			<Button id="substep-1-action" label="View in Trailhead" variant="link" />
		),
	},
	{
		id: 2,
		label: 'Lorem ipsum dolor sit amet, lorem ipsum dolor.',
		onRenderSetupAssistantAction: (
			<Button id="substep-2-action" label="Add Users" variant="outline-brand" />
		),
	},
];

const subStepsComplete = [
	{
		id: 0,
		label: 'Turn on Lightning for all users.',
		onRenderSetupAssistantAction: (
			<Checkbox
				id="substep-complete-0-action"
				checked
				oldEventParameterOrder={false}
				variant="toggle"
			/>
		),
	},
	{
		id: 1,
		label:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		onRenderSetupAssistantAction: (
			<Button
				id="substep-complete-1-action"
				label="View in Trailhead"
				variant="link"
			/>
		),
	},
];

const subStepsIncomplete = [
	{
		id: 0,
		label: 'Turn on Lightning for all users.',
		onRenderSetupAssistantAction: (
			<Checkbox
				id="substep-incomplete-0-action"
				oldEventParameterOrder={false}
				variant="toggle"
			/>
		),
	},
	{
		id: 1,
		label:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		onRenderSetupAssistantAction: (
			<Button
				id="substep-incomplete-1-action"
				label="View in Trailhead"
				variant="link"
			/>
		),
	},
];

class Example extends React.Component {
	static displayName = 'SetupAssistantInACardExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<SetupAssistant
					id="card-setup-assistant"
					isCard
					progressBar={
						<ProgressBar
							color="success"
							id="card-setup-assistant-progress-bar"
							labels={{
								label:
									'Complete all the steps below to finish setting up Einstein Visibility',
							}}
							radius="circular"
							value={50}
							variant="light"
						/>
					}
				>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="4 mins"
						heading="Add Users to Your Org"
						id="card-step-1"
						isExpandable
						onRenderContent={() => (
							<ProgressIndicator
								completedSteps={subStepsComplete}
								id="card-step-1-progress-indicator"
								orientation="vertical"
								steps={subStepsComplete}
								variant="setup-assistant"
							/>
						)}
						progress={100}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="10 mins"
						heading="Create Profiles for Your Users"
						id="card-step-2"
						isExpandable
						onRenderContent={() => (
							<React.Fragment>
								<ProgressIndicator
									completedSteps={[subSteps[0]]}
									id="card-step-2-progress-indicator"
									orientation="vertical"
									steps={subSteps}
									selectedStep={subSteps[1]}
									variant="setup-assistant"
								/>
								<ScopedNotification
									id="card-step-2-scoped-notification"
									theme="light"
								>
									<p>
										It looks as if duplicates exist for this lead.{' '}
										<a href="javascript:void(0);">View Duplicates.</a>
									</p>
								</ScopedNotification>
							</React.Fragment>
						)}
						progress={33}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="15 mins"
						heading="Learn How to Use Profiles to control Visibility"
						id="card-step-3"
						isExpandable
						onRenderContent={() => (
							<ProgressIndicator
								completedSteps={subStepsComplete}
								id="card-step-3-progress-indicator"
								orientation="vertical"
								steps={subStepsComplete}
								variant="setup-assistant"
							/>
						)}
						progress={100}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="10 mins"
						heading="Turn on tracking for profiles"
						id="card-step-4"
						isExpandable
						onRenderContent={() => (
							<ProgressIndicator
								id="card-step-4-progress-indicator"
								orientation="vertical"
								steps={subStepsIncomplete}
								selectedStep={subStepsIncomplete[0]}
								variant="setup-assistant"
							/>
						)}
						progress={0}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="10 mins"
						heading="Setup Einstein Visibility for Admins"
						id="card-step-5"
						isExpandable
						onRenderContent={() => (
							<ProgressIndicator
								id="card-step-5-progress-indicator"
								orientation="vertical"
								steps={subStepsIncomplete}
								selectedStep={subStepsIncomplete[0]}
								variant="setup-assistant"
							/>
						)}
						progress={0}
					/>
				</SetupAssistant>
			</IconSettings>
		);
	}
}

export default Example;
