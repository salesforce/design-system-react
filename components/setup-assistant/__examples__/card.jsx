import React from 'react';

import Button from '~/components/button';
import Checkbox from '~/components/checkbox';
import IconSettings from '~/components/icon-settings';
import ScopedNotification from '~/components/scoped-notification';
import SetupAssistant from '~/components/setup-assistant';
import SetupAssistantStep from '~/components/setup-assistant/step';
import ProgressBar from '~/components/progress-bar';
import ProgressIndicator from '~/components/progress-indicator';

const subSteps = (step) => [
	{
		id: `step-${step}-substep0`,
		label: 'Turn on Lightning for all users.',
		onRenderSetupAssistantAction: (
			<Checkbox
				id={`step-${step}-substep0-action`}
				checked
				oldEventParameterOrder={false}
				variant="toggle"
			/>
		),
	},
	{
		id: `step-${step}-substep1`,
		label:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		onRenderSetupAssistantAction: (
			<Button
				id={`step-${step}-substep1-action`}
				label="View in Trailhead"
				variant="link"
			/>
		),
	},
	{
		id: `step-${step}-substep2`,
		label: 'Lorem ipsum dolor sit amet, lorem ipsum dolor.',
		onRenderSetupAssistantAction: (
			<Button
				id={`step-${step}-substep2-action`}
				label="Add Users"
				variant="outline-brand"
			/>
		),
	},
];

const subStepsComplete = (step) => [
	{
		id: `step-${step}-substep0`,
		label: 'Turn on Lightning for all users.',
		onRenderSetupAssistantAction: (
			<Checkbox
				id={`step-${step}-substep0-action`}
				checked
				oldEventParameterOrder={false}
				variant="toggle"
			/>
		),
	},
	{
		id: `step-${step}-substep1`,
		label:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		onRenderSetupAssistantAction: (
			<Button
				id={`step-${step}-substep1-action`}
				label="View in Trailhead"
				variant="link"
			/>
		),
	},
];

const subStepsIncomplete = (step) => [
	{
		id: `step-${step}-substep0`,
		label: 'Turn on Lightning for all users.',
		onRenderSetupAssistantAction: (
			<Checkbox
				id={`step-${step}-substep0-action`}
				oldEventParameterOrder={false}
				variant="toggle"
			/>
		),
	},
	{
		id: `step-${step}-substep1`,
		label:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		onRenderSetupAssistantAction: (
			<Button
				id={`step-${step}-substep1-action`}
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
								completedSteps={subStepsComplete('complete')}
								id="card-step-1-progress-indicator"
								orientation="vertical"
								steps={subStepsComplete('complete')}
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
									completedSteps={[subSteps('2')[0]]}
									id="card-step-2-progress-indicator"
									orientation="vertical"
									steps={subSteps('2')}
									selectedStep={subSteps('2')[1]}
									variant="setup-assistant"
								/>
								<ScopedNotification
									id="card-step-2-scoped-notification"
									theme="light"
								>
									<p>
										It looks as if duplicates exist for this lead.{' '}
										<a href="#">View Duplicates.</a>
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
								completedSteps={subStepsComplete('complete2')}
								id="card-step-3-progress-indicator"
								orientation="vertical"
								steps={subStepsComplete('complete2')}
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
								steps={subStepsIncomplete('incomplete1')}
								selectedStep={subStepsIncomplete('incomplete1')[0]}
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
								steps={subStepsIncomplete('incomplete2')}
								selectedStep={subStepsIncomplete('incomplete2')[0]}
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
