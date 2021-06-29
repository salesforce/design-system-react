import React from 'react';

import IconSettings from '~/components/icon-settings';
import Notification from '~/components/notification'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'NotificationExample';

	state = {
		baseIsOpen: false,
		successIsOpen: false,
		errorIsOpen: false,
		offlineIsOpen: false,
	};

	toggleOpen = (event, theme) => {
		this.setState({ [`${theme}IsOpen`]: !this.state[`${theme}IsOpen`] });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Button
						label="Open base alert"
						onClick={(event) => {
							this.toggleOpen(event, 'base');
						}}
					/>
					<Notification
						content={['Base System Alert']}
						isOpen={this.state.baseIsOpen}
						onDismiss={(event) => {
							this.toggleOpen(event, 'base');
						}}
						texture
						variant="alert"
						silenceDeprecationWarning
					/>
					<span />
					<Button
						label="Open success alert"
						onClick={(event) => {
							this.toggleOpen(event, 'success');
						}}
					/>
					<Notification
						content={[
							<span key="maintenance">
								Scheduled Maintenance Notification: Sunday March 15, 8:00
								AM–10:00 PST <a href="#">More Information</a>
							</span>,
						]}
						iconName="notification"
						isOpen={this.state.successIsOpen}
						onDismiss={(event) => {
							this.toggleOpen(event, 'success');
						}}
						texture
						theme="success"
						variant="alert"
						silenceDeprecationWarning
					/>
					<span />
					<Button
						label="Open error alert"
						onClick={(event) => {
							this.toggleOpen(event, 'error');
						}}
					/>
					<Notification
						content={[
							<span key="browser">
								Your browser is currently not supported. Your Salesforce may be
								degraded. <a href="#">More Information</a>
							</span>,
						]}
						iconName="ban"
						isOpen={this.state.errorIsOpen}
						onDismiss={(event) => {
							this.toggleOpen(event, 'error');
						}}
						texture
						theme="error"
						variant="alert"
						silenceDeprecationWarning
					/>
					<span />
					<Button
						label="Open offline alert"
						onClick={(event) => {
							this.toggleOpen(event, 'offline');
						}}
					/>
					<Notification
						content={[
							<span key="offline">
								You are in offline mode <a href="#">More Information</a>
							</span>,
						]}
						iconName="offline"
						isOpen={this.state.offlineIsOpen}
						onDismiss={(event) => {
							this.toggleOpen(event, 'offline');
						}}
						texture
						theme="offline"
						variant="alert"
						silenceDeprecationWarning
					/>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
