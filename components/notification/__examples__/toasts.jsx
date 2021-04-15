import React from 'react';

import IconSettings from '~/components/icon-settings';
import Notification from '~/components/notification'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'NotificationExample';

	state = {
		baseIsOpen: false,
		successIsOpen: false,
		warningIsOpen: false,
		errorIsOpen: false,
	};

	toggleOpen = (event, theme) => {
		this.setState({ [`${theme}IsOpen`]: !this.state[`${theme}IsOpen`] });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Button
						label="Open base toast"
						onClick={(event) => {
							this.toggleOpen(event, 'base');
						}}
					/>
					<Notification
						content={['Base Toast']}
						isOpen={this.state.baseIsOpen}
						onDismiss={(event) => {
							this.toggleOpen(event, 'base');
						}}
						variant="toast"
						silenceDeprecationWarning
					/>
					<span />
					<Button
						label="Open success toast"
						onClick={(event) => {
							this.toggleOpen(event, 'success');
						}}
					/>
					<Notification
						content={[
							<span key="new-contact">
								Your new contact <a href="#">Sara Smith</a> was successfully
								created.
							</span>,
						]}
						iconName="notification"
						isOpen={this.state.successIsOpen}
						onDismiss={(event) => {
							this.toggleOpen(event, 'success');
						}}
						theme="success"
						variant="toast"
						silenceDeprecationWarning
					/>
					<span />
					<Button
						label="Open warning toast"
						onClick={(event) => {
							this.toggleOpen(event, 'warning');
						}}
					/>
					<Notification
						content={[
							<span key="required-fields">
								Oops, you&quot;ve missed some required form inputs.
							</span>,
						]}
						isOpen={this.state.warningIsOpen}
						onDismiss={(event) => {
							this.toggleOpen(event, 'warning');
						}}
						theme="warning"
						variant="toast"
						silenceDeprecationWarning
					/>
					<span />
					<Button
						label="Open error toast"
						onClick={(event) => {
							this.toggleOpen(event, 'error');
						}}
					/>
					<Notification
						content={[
							<span key="required-fields">
								You encountered some errors when trying to save edits to Samuel
								Smith.
							</span>,
						]}
						iconName="warning"
						isOpen={this.state.errorIsOpen}
						onDismiss={(event) => {
							this.toggleOpen(event, 'error');
						}}
						theme="error"
						variant="toast"
						silenceDeprecationWarning
					/>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
