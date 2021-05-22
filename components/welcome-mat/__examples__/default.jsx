import React from 'react';
import WelcomeMat from '~/components/welcome-mat';
import WelcomeMatTile from '~/components/welcome-mat/tile';
import Button from '~/components/button';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'welcomeMatExample';

	state = {
		isOpen: this.props.isOpen || false,
	};

	toggleOpen = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Button label="Open Default WelcomeMat" onClick={this.toggleOpen} />
				<div style={{ position: 'relative', height: '5rem' }}>
					<div style={{ width: '20rem' }}>
						<WelcomeMat
							id="welcome-mat-default-example"
							labels={{
								title: 'The Lightning Experience is here!',
								description:
									'Welcome to Lightning Experience, the modern, beautiful user experience from Salesforce. With a sales-and service-centric mindset, we focused on reinventing the desktop environment to better support your business processes.',
							}}
							isOpen={this.state.isOpen}
							onRequestClose={this.toggleOpen}
							variant="steps"
						>
							<WelcomeMatTile
								title="Welcome to Salesforce!"
								description="Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet."
								icon={<Icon category="utility" name="animal_and_nature" />}
								id="welcome-mat-tile-1"
								href="https://example.com"
								isComplete
							/>
							<WelcomeMatTile
								title="Learn About OpenCTI!"
								description="Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet."
								icon={<Icon category="utility" name="call" />}
								id="welcome-mat-tile-2"
								href="https://example.com"
								isComplete
							/>
							<WelcomeMatTile
								title="Power Up the Utility Bar"
								description="Tap into case history or share notes with fellow agents—it all happens on the utility bar."
								id="welcome-mat-tile-3"
								href="https://example.com"
								icon={<Icon category="utility" name="upload" />}
							/>
							<WelcomeMatTile
								title="Customize your view"
								description="Tailor your cases to your team&#x27;s workflow with custom list views."
								id="welcome-mat-tile-4"
								href="https://example.com"
								icon={<Icon category="utility" name="magicwand" />}
							/>
							<WelcomeMatTile
								title="Share the Knowledge"
								description="Harness your team&#x27;s collective know-how with our powerful knowledge base."
								id="welcome-mat-tile-5"
								href="https://example.com"
								icon={<Icon category="utility" name="knowledge_base" />}
							/>
						</WelcomeMat>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example;
