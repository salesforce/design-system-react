import React from 'react';
import WelcomeMat from '~/components/welcome-mat';
import Step from '~/components/welcome-mat/step';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'welcomeMatExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ position: 'relative', height: '5rem' }}>
					<div style={{ width: '20rem' }}>
						<WelcomeMat
							title="The Lightning Experience is here!"
							description="Welcome to Lightning Experience, the modern, beautiful
							user experience from Salesforce. With a sales-and service-centric
							 mindset, we focused on reinventing the desktop environment
							 to better support your business processes."
						>
							<Step
								title="Welcome to Salesforce!"
								description="Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet."
								icon="animal_and_nature"
								onClick="javascript:void(0);"
								isComplete
							/>
							<Step
								title="Learn About OpenCTI!"
								description="Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet."
								icon="call"
								onClick="javascript:void(0);"
								isComplete
							/>
							<Step
								title="Power Up the Utility Bar"
								description="Tap into case history or share notes with fellow agents—it all happens on the utility bar."
								onClick="javascript:void(0);"
								icon="call"
							/>
							<Step
								title="Customize your view"
								description="Tailor your cases to your team&#x27;s workflow with custom list views."
								icon="upload"
							/>
							<Step
								title="Share the Knowledge"
								description="Harness your team&#x27;s collective know-how with our powerful knowledge base."
								onClick="javascript:void(0);"
								icon="knowledge_base"
							/>
						</WelcomeMat>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example;
