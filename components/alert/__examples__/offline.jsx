import React from 'react';
import { action } from '@storybook/addon-actions';

import Alert from '~/components/alert'; // `~` is replaced with design-system-react at runtime
import AlertContainer from '~/components/alert/container'; // `~` is replaced with design-system-react at runtime

import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<AlertContainer>
					<Alert
						labels={{
							heading: 'You are in offline mode.',
							headingLink: 'More information',
						}}
						onClickHeadingLink={action('onClickHeadingLink')}
						variant="offline"
					/>
				</AlertContainer>
			</IconSettings>
		);
	}
}

Example.displayName = 'AlertExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
