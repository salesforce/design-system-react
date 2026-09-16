import { useState } from 'react';
import IconSettings from '../../icon-settings';
import SetupAssistant from '../';
import SetupAssistantStep from '../step';
import ProgressBar from '../../progress-bar';
import ProgressIndicator from '../../progress-indicator';
import Checkbox from '../../checkbox';
import Button from '../../button';
import ScopedNotification from '../../scoped-notification';

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
							<strong>
								{completedSteps} of {totalSteps} steps completed
							</strong>
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

// Expandable steps with a large progress icon on the left and interactive
// sub-step actions (toggle / links / buttons) on the right — rendered via a
// vertical ProgressIndicator in the `setup-assistant` variant. Mirrors the
// reference at design-system-react-site .../components/setup-assistant/.
const loremDescription =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const buildSubSteps = ({ toggleChecked, onToggle }) => [
	{
		id: 'substep-0',
		label: 'Turn on Lightning for all users.',
		onRenderSetupAssistantAction: (
			<Checkbox
				id="substep-0-action"
				checked={toggleChecked}
				labels={{ toggleEnabled: 'Enabled', toggleDisabled: 'Disabled' }}
				onChange={
					onToggle ? (event) => onToggle(event.target.checked) : undefined
				}
				variant="toggle"
			/>
		),
	},
	{
		id: 'substep-1',
		label:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		onRenderSetupAssistantAction: (
			<Button id="substep-1-action" label="View in Trailhead" variant="link" />
		),
	},
	{
		id: 'substep-2',
		label: 'Lorem ipsum dolor sit amet, lorem ipsum dolor.',
		onRenderSetupAssistantAction: (
			<Button id="substep-2-action" label="Add Users" variant="outline-brand" />
		),
	},
];

export const ExpandableSteps = {
	render: () => {
		const [openStep, setOpenStep] = useState(1);
		const [toggleChecked, setToggleChecked] = useState(false);

		const handleToggle = (event, { index, isOpen }) => {
			setOpenStep(isOpen ? null : index);
		};

		const subSteps = buildSubSteps({
			toggleChecked,
			onToggle: (checked) => setToggleChecked(checked),
		});

		return (
			<SetupAssistant onStepToggleIsOpen={handleToggle}>
				<SetupAssistantStep
					heading="Add Users to Your Org"
					description={loremDescription}
					estimatedTime="4 mins"
					progress={100}
					isExpandable
					isOpen={openStep === 0}
					onRenderContent={() => (
						<ProgressIndicator
							id="setup-assistant-step-1-progress"
							variant="setup-assistant"
							orientation="vertical"
							steps={buildSubSteps({ toggleChecked: true })}
							completedSteps={buildSubSteps({ toggleChecked: true })}
						/>
					)}
				/>
				<SetupAssistantStep
					heading="Create Profiles for Your Users"
					description={loremDescription}
					estimatedTime="10 mins"
					progress={33}
					stepNumber={2}
					isExpandable
					isOpen={openStep === 1}
					onRenderContent={() => (
						<>
							<ProgressIndicator
								id="setup-assistant-step-2-progress"
								variant="setup-assistant"
								orientation="vertical"
								steps={subSteps}
								selectedStep={subSteps[0]}
							/>
							<ScopedNotification
								id="setup-assistant-step-2-notification"
								theme="light"
							>
								<p>
									It looks as if duplicates exist for this lead.{' '}
									<a href="#">View Duplicates.</a>
								</p>
							</ScopedNotification>
						</>
					)}
				/>
				<SetupAssistantStep
					heading="Learn How to Control Visibility"
					description={loremDescription}
					estimatedTime="15 mins"
					progress={0}
					isExpandable
					isOpen={openStep === 2}
					onRenderContent={() => (
						<ProgressIndicator
							id="setup-assistant-step-3-progress"
							variant="setup-assistant"
							orientation="vertical"
							steps={buildSubSteps({ toggleChecked: false })}
							selectedStep={buildSubSteps({ toggleChecked: false })[0]}
						/>
					)}
				/>
			</SetupAssistant>
		);
	},
};
