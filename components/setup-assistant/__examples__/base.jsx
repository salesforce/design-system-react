import React from 'react';

import Button from '~/components/button';
import Checkbox from '~/components/checkbox';
import IconSettings from '~/components/icon-settings';
import SetupAssistant from '~/components/setup-assistant';
import SetupAssistantStep from '~/components/setup-assistant/step';

class Example extends React.Component {
	static displayName = 'SetupAssistantBaseExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<SetupAssistant id="base-setup-assistant">
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="4 mins"
						heading="Add Users to Your Org"
						id="base-step-1"
						onRenderAction={() => (
							<Button
								id="base-step-1-action"
								label="Add Users"
								variant="outline-brand"
							/>
						)}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						heading="Create Profiles for Your Users"
						id="base-step-2"
						onRenderAction={() => (
							<Button
								id="base-step-2-action"
								label="Add Profiles"
								variant="outline-brand"
							/>
						)}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						estimatedTime="15 mins"
						heading="Learn How to Use Profiles to control Visibility"
						id="base-step-3"
						onRenderAction={() => (
							<Button
								id="base-step-3-action"
								label="View on Trailhead"
								variant="link"
							/>
						)}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						heading="Turn on tracking for profiles"
						id="base-step-4"
						onRenderAction={() => (
							<Checkbox
								id="base-step-4-action"
								oldEventParameterOrder={false}
								variant="toggle"
							/>
						)}
					/>
					<SetupAssistantStep
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						heading="Setup Einstein Visibility for Admins"
						id="base-step-5"
						onRenderAction={() => (
							<Button
								id="base-step-5-action"
								label="Watch Video"
								variant="link"
							/>
						)}
					/>
				</SetupAssistant>
			</IconSettings>
		);
	}
}

export default Example;
