import React from 'react';

import SetupAssistant from '~/components/setup-assistant';
import Step from '~/components/setup-assistant/step';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'SetupAssistantStepProgress';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<SetupAssistant showStepProgress>
					<Step
						title="Add Users to Your Org"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
						enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat."
						time="4 mins"
						button={{ text: 'Add Person', link: 'javascript:void(0);' }}
						progress={100}
					/>
					<Step
						title="Create Profiles for Your Users"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
						enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat."
						button={{ text: 'Add Profiles', link: 'javascript:void(0);' }}
					/>
					<Step
						title="Learn How to Use Profiles to control Visibility"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
						enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat."
						link={{ text: 'View on Trailhead', link: 'javascript:void(0);' }}
						progress={100}
					/>
					<Step
						title="Turn on tracking for profiles"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
						enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat."
						showToggler
					/>
					<Step
						title="Setup Einstein Visibility for Admins"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
						enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat."
						link={{ text: 'Watch Video', link: 'javascript:void(0);' }}
					/>
				</SetupAssistant>
			</IconSettings>
		);
	}
}

export default Example;
