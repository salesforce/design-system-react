import React from 'react';
import IconSettings from '~/components/icon-settings';
import ScopedNotification from '~/components/scoped-notification';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<ScopedNotification theme="dark">
					<p>
						It looks as if duplicates exist for this lead.{' '}
						<a href="#">View Duplicates.</a>
					</p>
				</ScopedNotification>
			</IconSettings>
		);
	}
}
Example.displayName = 'ScopedNotificationLight';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
