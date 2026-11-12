import React, { useState } from 'react';

import Button from '~/components/button';
import Checkbox from '~/components/checkbox';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';
import SetupAssistant from '~/components/setup-assistant';
import SetupAssistantStep from '~/components/setup-assistant/step';

// Checkbox is controlled, so the toggle action keeps its own state.
const ToggleAction = ({ id, initialChecked = false }) => {
	const [checked, setChecked] = useState(initialChecked);
	return (
		<Checkbox
			checked={checked}
			id={id}
			onChange={(event, data) => setChecked(data.checked)}
			variant="toggle"
		/>
	);
};

class Example extends React.Component {
	static displayName = 'SetupAssistantWithIconsExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<SetupAssistant id="step-progress-setup-assistant">
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="4 mins"
						heading="Add Users to Your Org"
						id="step-progress-step-1"
						action={
							<Button
								id="step-progress-step-1-action"
								label="Add Users"
								variant="outline-brand"
							/>
						}
						figure={
							<Icon
								assistiveText={{
									label: 'User',
								}}
								category="standard"
								name="user"
								size="small"
								title="User"
							/>
						}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						heading="Create Profiles for Your Users"
						id="step-progress-step-2"
						action={
							<Button
								id="step-progress-step-2-action"
								label="Add Profiles"
								variant="outline-brand"
							/>
						}
						figure={
							<Icon
								assistiveText={{
									label: 'User',
								}}
								category="standard"
								name="user_role"
								size="small"
								title="User"
							/>
						}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="15 mins"
						heading="Learn How to Use Profiles to control Visibility"
						id="step-progress-step-3"
						action={
							<Button
								id="step-progress-step-3-action"
								label="View on Trailhead"
								variant="link"
							/>
						}
						figure={
							<Icon
								assistiveText={{
									label: 'User',
								}}
								category="standard"
								name="knowledge"
								size="small"
								title="User"
							/>
						}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						heading="Turn on tracking for profiles"
						id="step-progress-step-4"
						action={<ToggleAction id="step-progress-step-4-action" />}
						figure={
							<Icon
								assistiveText={{
									label: 'User',
								}}
								category="standard"
								name="record"
								size="small"
								title="User"
							/>
						}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						heading="Setup Einstein Visibility for Admins"
						id="step-progress-step-5"
						action={
							<Button
								id="step-progress-step-5-action"
								label="Watch Video"
								variant="link"
							/>
						}
						figure={
							<Icon
								assistiveText={{
									label: 'User',
								}}
								category="standard"
								name="lightning_usage"
								size="small"
								title="User"
							/>
						}
					/>
				</SetupAssistant>
			</IconSettings>
		);
	}
}

export default Example;
