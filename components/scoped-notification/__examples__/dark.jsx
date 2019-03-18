import React from 'react';
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
				<ScopedNotification theme="dark">
					<p>
						It looks as if duplicates exist for this lead.{' '}
						<a href="javascript:void(0);">View Duplicates.</a>
					</p>
				</ScopedNotification>
			</div>
		);
	}
}
Example.displayName = 'ScopedNotificationLight';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
