import { useState } from 'react';
import IconSettings from '../../icon-settings';
import SetupAssistant from '../';
import SetupAssistantStep from '../step';
import ProgressBar from '../../progress-bar';

export default {
	title: 'Components/SetupAssistant',
	component: SetupAssistant,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

// Default setup assistant
export const Default = {
	render: () => (
		<SetupAssistant>
			<SetupAssistantStep
				heading="Add Users"
				description="Add users to your organization"
				isComplete
			/>
			<SetupAssistantStep
				heading="Configure Settings"
				description="Set up your organization settings"
				isComplete
			/>
			<SetupAssistantStep
				heading="Import Data"
				description="Import your existing data"
			/>
			<SetupAssistantStep
				heading="Setup Integrations"
				description="Connect with other services"
			/>
		</SetupAssistant>
	),
};

// With card styling
export const WithCard = {
	render: () => {
		const completedSteps = 2;
		const totalSteps = 4;
		const progress = (completedSteps / totalSteps) * 100;

		return (
			<SetupAssistant
				isCard
				progressBar={
					<div>
						<p className="slds-m-bottom_small">
							<strong>{completedSteps} of {totalSteps} steps completed</strong>
						</p>
						<ProgressBar value={progress} />
					</div>
				}
			>
				<SetupAssistantStep
					heading="Add Users"
					description="Add users to your organization"
					isComplete
				/>
				<SetupAssistantStep
					heading="Configure Settings"
					description="Set up your organization settings"
					isComplete
				/>
				<SetupAssistantStep
					heading="Import Data"
					description="Import your existing data"
				/>
				<SetupAssistantStep
					heading="Setup Integrations"
					description="Connect with other services"
				/>
			</SetupAssistant>
		);
	},
};

// Interactive with expandable steps
export const Interactive = {
	render: () => {
		const [openStep, setOpenStep] = useState(null);

		const handleToggle = (event, { index }) => {
			setOpenStep(openStep === index ? null : index);
		};

		return (
			<SetupAssistant onStepToggleIsOpen={handleToggle}>
				<SetupAssistantStep
					heading="Add Users"
					description="Add users to your organization"
					isComplete
					isExpandable
					isOpen={openStep === 0}
					onRenderContent={() => (
						<div className="slds-p-around_medium">
							<p>Step 1 content goes here...</p>
						</div>
					)}
				/>
				<SetupAssistantStep
					heading="Configure Settings"
					description="Set up your organization settings"
					isComplete
					isExpandable
					isOpen={openStep === 1}
					onRenderContent={() => (
						<div className="slds-p-around_medium">
							<p>Step 2 content goes here...</p>
						</div>
					)}
				/>
				<SetupAssistantStep
					heading="Import Data"
					description="Import your existing data"
					isExpandable
					isOpen={openStep === 2}
					onRenderContent={() => (
						<div className="slds-p-around_medium">
							<p>Step 3 content goes here...</p>
						</div>
					)}
				/>
				<SetupAssistantStep
					heading="Setup Integrations"
					description="Connect with other services"
					isExpandable
					isOpen={openStep === 3}
					onRenderContent={() => (
						<div className="slds-p-around_medium">
							<p>Step 4 content goes here...</p>
						</div>
					)}
				/>
			</SetupAssistant>
		);
	},
};
