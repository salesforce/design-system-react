import React from 'react';

import Button from '~/components/button';
import Checkbox from '~/components/checkbox';
import IconSettings from '~/components/icon-settings';
import ScopedNotification from '~/components/scoped-notification';
import SetupAssistant from '~/components/setup-assistant';
import ProgressIndicator from '~/components/progress-indicator';

const subStepsComplete = [
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
];

const subStepsIncomplete = [
	{
		id: 0,
		label: 'Turn on Lightning for all users.',
		onRenderSetupAssistantAction: (
			<Checkbox
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
];

class Example extends React.Component {
	static displayName = 'SetupAssistantHubWithExpandableSteps';

	constructor (props) {
		super(props);

		this.subSteps = [
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
				)
			},
			{
				id: 1,
				label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				onRenderSetupAssistantAction: (
					<Button
						onClick={() => [
							this.toggleSubStepCompletion(1, !this.state.stepTwoCompletedSubStepsStatus[1])
						]}
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
						onClick={() => [
							this.toggleSubStepCompletion(2, !this.state.stepTwoCompletedSubStepsStatus[2])
						]}
						label="Add Users"
						variant="outline-brand"
					/>
				)
			},
		];

		this.state = {
			expandedSteps: { 1: true },
			stepTwoCompletedSubSteps: [],
			stepTwoCompletedSubStepsStatus: [false, false, false],
			stepTwoSelectedSubStep: this.subSteps[0],
			stepTwoProgress: 0
		};
	}

	getSteps () {
		return (
			[
				{
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					estimatedTime: '4 mins',
					heading: 'Add Users to Your Org',
					isExpandable: true,
					isOpen: this.state.expandedSteps[0] || false,
					progress: 100,
					progressIndicator: (
						<ProgressIndicator
							completedSteps={subStepsComplete}
							orientation="vertical"
							steps={subStepsComplete}
							variant="setup-assistant"
						/>
					),
				},
				{
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					estimatedTime: '10 mins',
					heading: 'Create Profiles for Your Users',
					isExpandable: true,
					isOpen: this.state.expandedSteps[1] || false,
					progress: this.state.stepTwoProgress,
					progressIndicator: (
						<ProgressIndicator
							completedSteps={this.state.stepTwoCompletedSubSteps}
							orientation="vertical"
							steps={this.subSteps}
							selectedStep={this.state.stepTwoSelectedSubStep}
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
					isOpen: this.state.expandedSteps[2] || false,
					progress: 100,
					progressIndicator: (
						<ProgressIndicator
							completedSteps={subStepsComplete}
							orientation="vertical"
							steps={subStepsComplete}
							variant="setup-assistant"
						/>
					),
				},
				{
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					estimatedTime: '10 mins',
					heading: 'Turn on tracking for profiles',
					isExpandable: true,
					isOpen: this.state.expandedSteps[3] || false,
					progress: 0,
					progressIndicator: (
						<ProgressIndicator
							orientation="vertical"
							steps={subStepsIncomplete}
							selectedStep={subStepsIncomplete[0]}
							variant="setup-assistant"
						/>
					),
				},
				{
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					estimatedTime: '10 mins',
					heading: 'Setup Einstein Visibility for Admins',
					isExpandable: true,
					isOpen: this.state.expandedSteps[4] || false,
					progress: 0,
					progressIndicator: (
						<ProgressIndicator
							orientation="vertical"
							steps={subStepsIncomplete}
							selectedStep={subStepsIncomplete[0]}
							variant="setup-assistant"
						/>
					),
				}
			]
		);
	}

	toggleSubStepCompletion (subStepId, completed) {
		const stepTwoCompletedSubStepsStatus = this.state.stepTwoCompletedSubStepsStatus;
		let stepTwoCompletedSubSteps = this.state.stepTwoCompletedSubSteps;
		let stepTwoProgress = 0;
		let stepTwoSelectedSubStep;

		if (completed) {
			stepTwoCompletedSubSteps.push(this.subSteps[subStepId]);
			stepTwoCompletedSubStepsStatus[subStepId] = true;
		} else {
			stepTwoCompletedSubSteps = stepTwoCompletedSubSteps.filter((subStep) => subStep.id !== subStepId);
			stepTwoCompletedSubStepsStatus[subStepId] = false;
		}

		for (let i = 0; i < stepTwoCompletedSubStepsStatus.length; i++) {
			if (stepTwoCompletedSubStepsStatus[i]) {
				stepTwoProgress += 33;
			}

			if (!stepTwoCompletedSubStepsStatus[i] && !stepTwoSelectedSubStep) {
				stepTwoSelectedSubStep = this.subSteps[i];
			}
		}

		this.setState({
			stepTwoCompletedSubSteps,
			stepTwoCompletedSubStepsStatus,
			stepTwoProgress: stepTwoProgress >= 99 ? 100 : stepTwoProgress,
			stepTwoSelectedSubStep
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
					steps={this.getSteps()}
				/>
			</IconSettings>);
	}
}

export default Example;
