import { useState } from 'react';
import IconSettings from '../../icon-settings';
import ProgressIndicator from '../';

const steps = [
	{ id: 0, label: 'Step 1: Introduction' },
	{ id: 1, label: 'Step 2: Configuration' },
	{ id: 2, label: 'Step 3: Review' },
	{ id: 3, label: 'Step 4: Confirmation' },
	{ id: 4, label: 'Step 5: Complete' },
];

const stages = [
	{ id: 0, label: 'Contacted' },
	{ id: 1, label: 'Open' },
	{ id: 2, label: 'Unqualified' },
	{ id: 3, label: 'Nurturing' },
	{ id: 4, label: 'Closed' },
];

// Returns copies of `list` with `statuses[index]` as each step's `status`
const withStatus = (list, statuses) =>
	list.map((step, index) => ({ ...step, status: statuses[index] }));

export default {
	title: 'Components/ProgressIndicator',
	component: ProgressIndicator,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		orientation: {
			control: { type: 'select' },
			options: ['horizontal', 'vertical'],
		},
		type: {
			control: { type: 'select' },
			options: ['base', 'path'],
		},
		variant: {
			control: { type: 'select' },
			options: ['base', 'shade', 'modal', 'setup-assistant'],
		},
	},
};

// Default progress indicator
export const Default = {
	render: () => (
		<ProgressIndicator
			steps={withStatus(steps, ['completed', 'completed'])}
			selectedStep={2}
		/>
	),
};

// Interactive example
const InteractiveExample = () => {
	const [currentStep, setCurrentStep] = useState(0);

	const handleStepClick = (event, { step }) => {
		const stepIndex = steps.findIndex((s) => s.id === step.id);
		if (stepIndex !== -1) {
			setCurrentStep(stepIndex);
		}
	};

	return (
		<div>
			<ProgressIndicator
				steps={withStatus(steps, Array(currentStep).fill('completed'))}
				selectedStep={currentStep}
				onStepClick={handleStepClick}
			/>
			<div className="slds-m-top_large slds-grid slds-grid_align-center">
				<button
					className="slds-button slds-button_neutral slds-m-right_small"
					onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
					disabled={currentStep === 0}
				>
					Previous
				</button>
				<button
					className="slds-button slds-button_brand"
					onClick={() =>
						setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
					}
					disabled={currentStep === steps.length - 1}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export const Interactive = {
	render: () => <InteractiveExample />,
};

// Vertical orientation
export const Vertical = {
	render: () => (
		<ProgressIndicator
			steps={withStatus(steps, ['completed', 'completed'])}
			selectedStep={2}
			orientation="vertical"
		/>
	),
};

// With error step
export const WithError = {
	render: () => (
		<ProgressIndicator
			steps={withStatus(steps, ['completed', 'completed', 'error'])}
			selectedStep={2}
		/>
	),
};

// With disabled steps
export const WithDisabledSteps = {
	render: () => (
		<ProgressIndicator
			steps={withStatus(steps, [
				'completed',
				undefined,
				undefined,
				'disabled',
				'disabled',
			])}
			selectedStep={1}
		/>
	),
};

// Shade variant
export const ShadeVariant = {
	render: () => (
		<div className="slds-theme_shade slds-p-around_medium">
			<ProgressIndicator
				steps={withStatus(steps, ['completed', 'completed'])}
				selectedStep={2}
				variant="shade"
			/>
		</div>
	),
};

// Modal variant
export const ModalVariant = {
	render: () => (
		<ProgressIndicator
			steps={withStatus(steps, ['completed', 'completed'])}
			selectedStep={2}
			variant="modal"
		/>
	),
};

// Setup assistant variant (automatically vertical)
export const SetupAssistantVariant = {
	render: () => (
		<ProgressIndicator
			steps={withStatus(steps, ['completed', 'completed'])}
			selectedStep={2}
			variant="setup-assistant"
		/>
	),
};

// All steps complete
export const AllComplete = {
	render: () => (
		<ProgressIndicator
			steps={withStatus(steps, Array(5).fill('completed'))}
			selectedStep={4}
		/>
	),
};

// Path type
export const Path = {
	render: () => (
		<ProgressIndicator
			type="path"
			steps={withStatus(stages, ['completed', 'completed'])}
			selectedStep={2}
		/>
	),
};

// Interactive path: click a stage, or Tab to the path and use the arrow keys
const InteractivePathExample = () => {
	const [currentStage, setCurrentStage] = useState(1);

	const handleStepClick = (event, { step }) => {
		const stageIndex = stages.findIndex((s) => s.id === step.id);
		if (stageIndex !== -1) {
			setCurrentStage(stageIndex);
		}
	};

	return (
		<ProgressIndicator
			type="path"
			steps={withStatus(stages, Array(currentStage).fill('completed'))}
			selectedStep={currentStage}
			onStepClick={handleStepClick}
		/>
	);
};

export const InteractivePath = {
	render: () => <InteractivePathExample />,
};
