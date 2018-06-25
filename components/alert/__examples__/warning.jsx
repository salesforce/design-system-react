import React from 'react';
import Alert from '~/components/alert'; // `~` is replaced with design-system-react at runtime
import AlertContainer from '~/components/alert/container'; // `~` is replaced with design-system-react at runtime
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<AlertContainer>
					<Alert
						labels={{
							heading:
								'Your browser is outdated. Your Salesforce experience may be degraded.',
							headingLink: 'More Information',
						}}
						onClickHeadingLink={() => {
							console.log('Link clicked.');
						}}
						variant="warning"
					/>
				</AlertContainer>
			</IconSettings>
		);
	}
}

Example.displayName = 'AlertExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
