import React from 'react';

import Button from '~/components/button';
import Checkbox from '~/components/checkbox';
import IconSettings from '~/components/icon-settings';
import ScopedNotification from '~/components/scoped-notification';
import SetupAssistant from '~/components/setup-assistant';
import SetupAssistantStep from '~/components/setup-assistant/step';
import ProgressIndicator from '~/components/progress-indicator';

const subStepsComplete = [
	{
		id: 0,
		label: 'Turn on Lightning for all users.',
		onRenderSetupAssistantAction: <Checkbox checked variant="toggle" />,
	},
	{
		id: 1,
		label:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		onRenderSetupAssistantAction: (
			<Button label="View in Trailhead" variant="link" />
		),
	},
];

const subStepsIncomplete = [
	{
		id: 0,
		label: 'Turn on Lightning for all users.',
		onRenderSetupAssistantAction: <Checkbox variant="toggle" />,
	},
	{
		id: 1,
		label:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		onRenderSetupAssistantAction: (
			<Button label="View in Trailhead" variant="link" />
		),
	},
];

class Example extends React.Component {
	static displayName = 'SetupAssistantHubWithExpandableSteps';

	constructor(props) {
		super(props);

		this.state = {
			expandedSteps: { 1: true },
			stepTwoCompletedSubSteps: [],
			stepTwoCompletedSubStepsStatus: [false, false, false],
			stepTwoProgress: 0,
		};

		this.state.stepTwoSelectedSubStep = this.getSubSteps()[0];
	}

	getSubSteps() {
		return [
			{
				id: 0,
				label: 'Turn on Lightning for all users.',
				onRenderSetupAssistantAction: (
					<Checkbox
						onChange={(event) => {
							this.toggleSubStepCompletion(0, event.target.checked);
						}}
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
						disabled={!this.state.stepTwoCompletedSubStepsStatus[0]}
						onClick={() => [
							this.toggleSubStepCompletion(
								1,
								!this.state.stepTwoCompletedSubStepsStatus[1]
							),
						]}
						label="View in Trailhead"
						variant="link"
					/>
				),
			},
			{
				id: 2,
				label: 'Lorem ipsum dolor sit amet, lorem ipsum dolor.',
				onRenderSetupAssistantAction: (
					<Button
						disabled={
							!this.state.stepTwoCompletedSubStepsStatus[0] ||
							!this.state.stepTwoCompletedSubStepsStatus[1]
						}
						onClick={() => [
							this.toggleSubStepCompletion(
								2,
								!this.state.stepTwoCompletedSubStepsStatus[2]
							),
						]}
						label="Add Users"
						variant="outline-brand"
					/>
				),
			},
		];
	}

	toggleSubStepCompletion(subStepId, completed) {
		const stepTwoCompletedSubStepsStatus = this.state
			.stepTwoCompletedSubStepsStatus;
		const subSteps = this.getSubSteps();
		let stepsCompleted = 0;
		let stepTwoCompletedSubSteps = this.state.stepTwoCompletedSubSteps;
		let stepTwoSelectedSubStep;

		if (completed) {
			stepTwoCompletedSubSteps.push(subSteps[subStepId]);
			stepTwoCompletedSubStepsStatus[subStepId] = true;
		} else {
			stepTwoCompletedSubSteps = stepTwoCompletedSubSteps.filter(
				(subStep) => subStep.id !== subStepId
			);
			stepTwoCompletedSubStepsStatus[subStepId] = false;
		}

		for (let i = 0; i < stepTwoCompletedSubStepsStatus.length; i++) {
			if (stepTwoCompletedSubStepsStatus[i]) {
				stepsCompleted++;
			}

			if (!stepTwoCompletedSubStepsStatus[i] && !stepTwoSelectedSubStep) {
				stepTwoSelectedSubStep = subSteps[i];
			}
		}

		this.setState({
			stepTwoCompletedSubSteps,
			stepTwoCompletedSubStepsStatus,
			stepTwoProgress: Math.ceil(stepsCompleted / subSteps.length * 100),
			stepTwoSelectedSubStep,
		});
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<SetupAssistant
					onStepToggleIsOpen={(event, data) => {
						const expandedSteps = this.state.expandedSteps;
						expandedSteps[data.index] = !data.isOpen;
						this.setState({ expandedSteps });
					}}
				>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="4 mins"
						heading="Add Users to Your Org"
						isExpandable
						isOpen={this.state.expandedSteps[0] || false}
						progress={100}
						progressIndicator={
							<ProgressIndicator
								completedSteps={subStepsComplete}
								orientation="vertical"
								steps={subStepsComplete}
								variant="setup-assistant"
							/>
						}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="10 mins"
						heading="Create Profiles for Your Users"
						isExpandable
						isOpen={this.state.expandedSteps[1] || false}
						progress={this.state.stepTwoProgress}
						progressIndicator={
							<ProgressIndicator
								completedSteps={this.state.stepTwoCompletedSubSteps}
								orientation="vertical"
								steps={this.getSubSteps()}
								selectedStep={this.state.stepTwoSelectedSubStep}
								variant="setup-assistant"
							/>
						}
						scopedNotification={
							<ScopedNotification theme="light">
								<p>
									It looks as if duplicates exist for this lead.{' '}
									<a href="javascript:void(0);">View Duplicates.</a>
								</p>
							</ScopedNotification>
						}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="15 mins"
						heading="Learn How to Use Profiles to control Visibility"
						isExpandable
						isOpen={this.state.expandedSteps[2] || false}
						progress={100}
						progressIndicator={
							<ProgressIndicator
								completedSteps={subStepsComplete}
								orientation="vertical"
								steps={subStepsComplete}
								variant="setup-assistant"
							/>
						}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="10 mins"
						heading="Turn on tracking for profiles"
						isExpandable
						isOpen={this.state.expandedSteps[3] || false}
						progress={0}
						progressIndicator={
							<ProgressIndicator
								orientation="vertical"
								steps={subStepsIncomplete}
								selectedStep={subStepsIncomplete[0]}
								variant="setup-assistant"
							/>
						}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="10 mins"
						heading="Setup Einstein Visibility for Admins"
						isExpandable
						isOpen={this.state.expandedSteps[4] || false}
						progress={0}
						progressIndicator={
							<ProgressIndicator
								orientation="vertical"
								steps={subStepsIncomplete}
								selectedStep={subStepsIncomplete[0]}
								variant="setup-assistant"
							/>
						}
					/>
				</SetupAssistant>
			</IconSettings>
		);
	}
}

export default Example;
