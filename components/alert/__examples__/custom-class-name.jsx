import React from 'react';

import Alert from '~/components/alert'; // `~` is replaced with design-system-react at runtime
import AlertContainer from '~/components/alert/container'; // `~` is replaced with design-system-react at runtime
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<AlertContainer className="this-is-the-container">
					<Alert
						className="this-is-the-alert"
						icon={<Icon category="utility" name="user" />}
						labels={{
							heading: 'Logged in as John Smith (johnsmith@acme.com).',
							headingLink: 'Log out',
						}}
						onClickHeadingLink={() => console.log('onClickHeadingLink')}
					/>
				</AlertContainer>
			</IconSettings>
		);
	}
}

Example.displayName = 'AlertExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
