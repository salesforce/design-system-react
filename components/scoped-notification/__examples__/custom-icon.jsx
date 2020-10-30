import React from 'react';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';
import ScopedNotification from '~/components/scoped-notification';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<ScopedNotification
					icon={
						<Icon
							assistiveText={{
								label: 'Warning',
							}}
							category="utility"
							colorVariant="warning"
							name="warning"
							size="small"
						/>
					}
					theme="light"
				>
					Einstein needs more data to prepare your results. Check back later.
				</ScopedNotification>
			</IconSettings>
		);
	}
}
Example.displayName = 'ScopedNotificationLight';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
