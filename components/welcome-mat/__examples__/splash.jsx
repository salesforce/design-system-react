import React from 'react';
import WelcomeMat from '~/components/welcome-mat';
import Button from '~/components/button';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'welcomeMatSplashExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ position: 'relative', height: '5rem' }}>
					<div style={{ width: '20rem' }}>
						<WelcomeMat
							labels={{
								title: 'The Lightning Experience is here!',
								description:
									'Welcome to Lightning Experience, the modern, beautiful user experience from Salesforce. With a sales-and service-centric mindset, we focused on reinventing the desktop environment to better support your business processes."',
							}}
							onRenderInfoActions={() => (
								<Button
									type="button"
									variant="brand"
									title="Learn More"
									label="Learn More"
								/>
							)}
							variant="splash"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example;
