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
		variant: {
			control: { type: 'select' },
			options: ['base', 'modal', 'setup-assistant'],
		},
	},
};

// Default progress indicator
export const Default = {
	render: () => (
		<ProgressIndicator
			steps={steps}
			selectedStep={steps[2]}
			completedSteps={[steps[0], steps[1]]}
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

	const completedSteps = steps.slice(0, currentStep);

	return (
		<div>
			<ProgressIndicator
				steps={steps}
				selectedStep={steps[currentStep]}
				completedSteps={completedSteps}
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
					onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
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
			steps={steps}
			selectedStep={steps[2]}
			completedSteps={[steps[0], steps[1]]}
			orientation="vertical"
		/>
	),
};

// With error step
export const WithError = {
	render: () => (
		<ProgressIndicator
			steps={steps}
			selectedStep={steps[2]}
			completedSteps={[steps[0], steps[1]]}
			errorSteps={[steps[2]]}
		/>
	),
};

// With disabled steps
export const WithDisabledSteps = {
	render: () => (
		<ProgressIndicator
			steps={steps}
			selectedStep={steps[1]}
			completedSteps={[steps[0]]}
			disabledSteps={[steps[3], steps[4]]}
		/>
	),
};

// Modal variant
export const ModalVariant = {
	render: () => (
		<ProgressIndicator
			steps={steps}
			selectedStep={steps[2]}
			completedSteps={[steps[0], steps[1]]}
			variant="modal"
		/>
	),
};

// Setup assistant variant (automatically vertical)
export const SetupAssistantVariant = {
	render: () => (
		<ProgressIndicator
			steps={steps}
			selectedStep={steps[2]}
			completedSteps={[steps[0], steps[1]]}
			variant="setup-assistant"
		/>
	),
};

// All steps complete
export const AllComplete = {
	render: () => (
		<ProgressIndicator
			steps={steps}
			selectedStep={steps[4]}
			completedSteps={steps}
		/>
	),
};
