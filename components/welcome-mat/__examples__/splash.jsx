import React from 'react';
import WelcomeMat from '~/components/welcome-mat';
import Button from '~/components/button';
import IconSettings from '~/components/icon-settings';
import Checkbox from '~/components/checkbox';

class Example extends React.Component {
	static displayName = 'welcomeMatSplashExample';

	state = {
		isOpen: this.props.isOpen || false,
	};

	toggleOpen = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Button label="Open Splash WelcomeMat" onClick={this.toggleOpen} />
				<div style={{ position: 'relative', height: '5rem' }}>
					<div style={{ width: '20rem' }}>
						<WelcomeMat
							id="welcome-mat-splash-example"
							labels={{
								title: 'The Lightning Experience is here!',
								description:
									'Welcome to Lightning Experience, the modern, beautiful user experience from Salesforce. With a sales-and service-centric mindset, we focused on reinventing the desktop environment to better support your business processes.',
							}}
							doNotShowAgainCheckbox={
								<Checkbox
									id="welcome-mat-checkbox"
									assistiveText={{
										label: `Don't show this again`,
									}}
									labels={{
										label: `Don't show this again`,
									}}
								/>
							}
							onRenderInfoActions={() => (
								<Button
									type="button"
									variant="brand"
									title="Learn More"
									label="Learn More"
									id="welcome-mat-button"
								/>
							)}
							isOpen={this.state.isOpen}
							onRequestClose={this.toggleOpen}
							variant="splash"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example;
