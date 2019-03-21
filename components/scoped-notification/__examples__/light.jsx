import React from 'react';
import ScopedNotification from '~/components/scoped-notification';

class Example extends React.Component {
	render() {
		return (
			<ScopedNotification theme="light">
				<p>
					It looks as if duplicates exist for this lead.{' '}
					<a href="javascript:void(0);">View Duplicates.</a>
				</p>
			</ScopedNotification>
		);
	}
}
Example.displayName = 'ScopedNotificationLight';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
