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
						icon={<Icon category="utility" name="warning" />}
						label={<span>Your browser is outdated. Your Salesforce experience may be degraded. <a href="javascript:void(0);">More Information</a></span>}
						variant="warning"
					/>
				</AlertContainer>
			</IconSettings>
		);
	}
}

Example.displayName = 'AlertExample';

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
