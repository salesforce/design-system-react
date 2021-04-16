import React from 'react';

import Button from '~/components/button';
import Checkbox from '~/components/checkbox';
import IconSettings from '~/components/icon-settings';
import ScopedNotification from '~/components/scoped-notification';
import SetupAssistant from '~/components/setup-assistant';
import SetupAssistantStep from '~/components/setup-assistant/step';
import ProgressIndicator from '~/components/progress-indicator';

import log from '~/utilities/log';

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
	static displayName = 'SetupAssistantHubWithExpandableStepsExample';

	constructor(props) {
		super(props);

		this.state = {
			expandedSteps: { 1: true },
			stepTwoCompletedSubSteps: [],
			stepTwoCompletedSubStepsStatus: [false, false, false],
			stepTwoProgress: 0,
		};

		this.state.stepTwoSelectedSubStep = this.getSubSteps()[0]; // eslint-disable-line prefer-destructuring
	}

	getSubSteps() {
		return [
			{
				id: 0,
				label: 'Turn on Lightning for all users.',
				onRenderSetupAssistantAction: (
					<Checkbox
						id="substep-0-action"
						oldEventParameterOrder={false}
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
						id="substep-1-action"
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
						id="substep-2-action"
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
		const { stepTwoCompletedSubStepsStatus } = this.state;
		const subSteps = this.getSubSteps();
		let stepsCompleted = 0;
		let { stepTwoCompletedSubSteps } = this.state;
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

		for (let i = 0; i < stepTwoCompletedSubStepsStatus.length; i += 1) {
			if (stepTwoCompletedSubStepsStatus[i]) {
				stepsCompleted += 1;
			}

			if (!stepTwoCompletedSubStepsStatus[i] && !stepTwoSelectedSubStep) {
				stepTwoSelectedSubStep = subSteps[i];
			}
		}

		this.setState({
			stepTwoCompletedSubSteps,
			stepTwoCompletedSubStepsStatus,
			stepTwoProgress: Math.ceil((stepsCompleted / subSteps.length) * 100),
			stepTwoSelectedSubStep,
		});

		return false;
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<SetupAssistant
					id="hub-expandable-steps-setup-assistant"
					onStepToggleIsOpen={(event, data) => {
						log({
							action: this.props.action,
							event,
							eventName: 'onStepToggleIsOpen',
							data,
						});

						const { expandedSteps } = this.state;
						expandedSteps[data.index] = !data.isOpen;
						this.setState({ expandedSteps });
					}}
				>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="4 mins"
						heading="Add Users to Your Org"
						id="hub-expandable-step-1"
						isExpandable
						isOpen={this.state.expandedSteps[0] || false}
						onRenderContent={() => (
							<ProgressIndicator
								completedSteps={subStepsComplete('complete1')}
								id="hub-expandable-step-1-progress-indicator"
								orientation="vertical"
								steps={subStepsComplete('complete1')}
								variant="setup-assistant"
							/>
						)}
						progress={100}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="10 mins"
						heading="Create Profiles for Your Users"
						id="hub-expandable-step-2"
						isExpandable
						isOpen={this.state.expandedSteps[1] || false}
						onRenderContent={() => (
							<React.Fragment>
								<ProgressIndicator
									completedSteps={this.state.stepTwoCompletedSubSteps}
									id="hub-expandable-step-2-progress-indicator"
									orientation="vertical"
									steps={this.getSubSteps()}
									selectedStep={this.state.stepTwoSelectedSubStep}
									variant="setup-assistant"
								/>
								<ScopedNotification
									id="hub-expandable-step-2-scoped-notification"
									theme="light"
								>
									<p>
										It looks as if duplicates exist for this lead.{' '}
										<a href="#">View Duplicates.</a>
									</p>
								</ScopedNotification>
							</React.Fragment>
						)}
						progress={this.state.stepTwoProgress}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="15 mins"
						heading="Learn How to Use Profiles to control Visibility"
						id="hub-expandable-step-3"
						isExpandable
						isOpen={this.state.expandedSteps[2] || false}
						onRenderContent={() => (
							<ProgressIndicator
								completedSteps={subStepsComplete('complete2')}
								id="hub-expandable-step-3-progress-indicator"
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
						id="hub-expandable-step-4"
						isExpandable
						isOpen={this.state.expandedSteps[3] || false}
						onRenderContent={() => (
							<ProgressIndicator
								id="hub-expandable-step-4-progress-indicator"
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
						id="hub-expandable-step-5"
						isExpandable
						isOpen={this.state.expandedSteps[4] || false}
						onRenderContent={() => (
							<ProgressIndicator
								id="hub-expandable-step-5-progress-indicator"
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
