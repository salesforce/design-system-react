import React from 'react';
import IconSettings from '~/components/icon-settings';
import ScopedNotification from '~/components/scoped-notification';

class Example extends React.Component {
	render() {
		return (
			<div
				style={{
					padding: '4rem 1rem 0px',
					background: 'rgb(244, 246, 249)',
				}}
			>
				<IconSettings iconPath="/assets/icons">
					<ScopedNotification theme="light">
						<p>
							It looks as if duplicates exist for this lead.{' '}
							<a href="javascript:void(0);">View Duplicates.</a>
						</p>
					</ScopedNotification>
				</IconSettings>
			</div>
		);
	}
}
Example.displayName = 'ScopedNotificationLight';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
