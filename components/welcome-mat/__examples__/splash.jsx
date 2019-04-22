import React from 'react';
import WelcomeMat from '~/components/welcome-mat';

class Example extends React.Component {
	static displayName = 'welcomeMatSplashExample';

	render() {
		return (
			<div style={{ position: 'relative', height: '5rem' }}>
				<div style={{ width: '20rem' }}>
					<WelcomeMat
						title="The Lightning Experience is here!"
						description="Welcome to Lightning Experience, the modern, beautiful
						user experience from Salesforce. With a sales-and service-centric
						 mindset, we focused on reinventing the desktop environment
						 to better support your business processes."
						learnMoreURL="javascript:void(0);"
					/>
				</div>
			</div>
		);
	}
}

export default Example;
