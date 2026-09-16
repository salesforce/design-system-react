import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import IconSettings from '../../icon-settings';
import SLDSButton from '../../button';
import Settings from '../../settings';
import SLDSCheckbox from '../../checkbox';
import SLDSWelcomeMat from '../../welcome-mat';
import SLDSWelcomeMatTile from '../../welcome-mat/tile';
import WelcomeMatInfoBadge from '../../welcome-mat/info-badge';

describe('SLDSWelcomeMat', () => {
	const title = 'The Lightning Experience is here!';
	const description = 'This is a sample description for the welcome mat';

	const labels = {
		title,
		description,
	};

	const tiles = [
		<SLDSWelcomeMatTile
			key="1"
			title="Welcome to Salesforce!"
			description="Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet."
			icon="animal_and_nature"
			href="https://example.com"
			isComplete
		/>,
		<SLDSWelcomeMatTile
			key="2"
			title="Learn About OpenCTI!"
			description="Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet."
			icon="call"
			href="https://example.com"
			isComplete
		/>,
		<SLDSWelcomeMatTile
			key="3"
			title="Power Up the Utility Bar"
			description="Tap into case history or share notes with fellow agents—it all happens on the utility bar."
			href="https://example.com"
			icon="call"
		/>,
		<SLDSWelcomeMatTile
			key="4"
			title="Customize your view"
			description="Tailor your cases to your team&#x27;s workflow with custom list views."
			href="https://example.com"
			icon="upload"
		/>,
		<SLDSWelcomeMatTile
			key="5"
			title="Share the Knowledge"
			description="Harness your team&#x27;s collective know-how with our powerful knowledge base."
			href="https://example.com"
			icon="knowledge_base"
		/>,
	];

	beforeAll(() => {
		// Set "app node" fixture, so no warnings are triggered
		const appNode = document.createElement('span');
		appNode.id = 'app';
		document.body.appendChild(appNode);
		Settings.setAppElement('#app');
	});

	afterAll(() => {
		const appNode = document.getElementById('app');
		if (appNode) {
			document.body.removeChild(appNode);
		}
	});

	describe('Steps Variant', () => {
		it('renders welcome mat', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="steps"
						labels={labels}
						id="welcome-mat-test"
					>
						{tiles}
					</SLDSWelcomeMat>
				</IconSettings>
			);

			// NOTE: WelcomeMat renders to a portal, so we need to query document.body
			const welcomeMatContainer = document.body.querySelector('.slds-welcome-mat');
			expect(welcomeMatContainer).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__content')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__info')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__tiles')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__tiles')
					.childElementCount
			).toBe(5);
			expect(
				welcomeMatContainer.querySelectorAll('.slds-welcome-mat__tile_complete')
					.length
			).toBe(2);
		});

		it('tile links have correct href', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="steps"
						labels={labels}
						id="welcome-mat-test"
					>
						{tiles}
					</SLDSWelcomeMat>
				</IconSettings>
			);

			const welcomeMatTiles = document.body.querySelectorAll(
				'.slds-welcome-mat__tile a'
			);
			welcomeMatTiles.forEach((tile) => {
				expect(tile.href).toBe('https://example.com/');
			});
		});

		it('shows labels correctly', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="steps"
						labels={labels}
						id="welcome-mat-test"
					>
						{tiles}
					</SLDSWelcomeMat>
				</IconSettings>
			);

			const welcomeMatInfo = document.body.querySelector('.slds-welcome-mat__info');
			expect(
				welcomeMatInfo.querySelector('.slds-welcome-mat__info-title').textContent
			).toBe(title);
			expect(
				welcomeMatInfo.querySelector('.slds-welcome-mat__info-description')
					.textContent
			).toBe(description);
			expect(
				welcomeMatInfo.querySelector('.slds-welcome-mat__info-progress p')
					.textContent
			).toBe('2/5 units completed');
		});
	});

	describe('Info-Only Variant', () => {
		it('renders welcome mat', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="info-only"
						labels={labels}
						id="welcome-mat-test"
						doNotShowAgainCheckbox={
							<SLDSCheckbox
								assistiveText={{
									label: `Don't show this again`,
								}}
								labels={{
									label: `Don't show this again`,
								}}
							/>
						}
						onRenderInfoActions={() => (
							<SLDSButton
								type="button"
								variant="brand"
								title="Learn More"
								label="Learn More"
							/>
						)}
					>
						{tiles}
					</SLDSWelcomeMat>
				</IconSettings>
			);

			const welcomeMatContainer = document.body.querySelector('.slds-welcome-mat');
			expect(welcomeMatContainer).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__content')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__info')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__tiles')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelectorAll(
					'.slds-welcome-mat__tile_info-only'
				).length
			).toBe(5);
		});

		it('shows info action button and do not show checkbox', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="info-only"
						labels={labels}
						id="welcome-mat-test"
						doNotShowAgainCheckbox={
							<SLDSCheckbox
								assistiveText={{
									label: `Don't show this again`,
								}}
								labels={{
									label: `Don't show this again`,
								}}
							/>
						}
						onRenderInfoActions={() => (
							<SLDSButton
								type="button"
								variant="brand"
								title="Learn More"
								label="Learn More"
							/>
						)}
					>
						{tiles}
					</SLDSWelcomeMat>
				</IconSettings>
			);

			const welcomeMatContainer = document.body.querySelector('.slds-welcome-mat');
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__info-actions')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector(
					'.slds-welcome-mat__info-actions button'
				)
			).toBeInTheDocument();
			expect(welcomeMatContainer.querySelector('.slds-checkbox')).toBeInTheDocument();
		});
	});

	describe('Splash Variant', () => {
		it('renders welcome mat', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="splash"
						labels={labels}
						id="welcome-mat-test"
						doNotShowAgainCheckbox={
							<SLDSCheckbox
								assistiveText={{
									label: `Don't show this again`,
								}}
								labels={{
									label: `Don't show this again`,
								}}
							/>
						}
						onRenderInfoActions={() => (
							<SLDSButton
								type="button"
								variant="brand"
								title="Learn More"
								label="Learn More"
							/>
						)}
					/>
				</IconSettings>
			);

			const welcomeMatContainer = document.body.querySelector('.slds-welcome-mat');
			expect(welcomeMatContainer).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__content')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__info')
			).toBeInTheDocument();
		});

		it('does not render any tiles', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="splash"
						labels={labels}
						id="welcome-mat-test"
						doNotShowAgainCheckbox={
							<SLDSCheckbox
								assistiveText={{
									label: `Don't show this again`,
								}}
								labels={{
									label: `Don't show this again`,
								}}
							/>
						}
						onRenderInfoActions={() => (
							<SLDSButton
								type="button"
								variant="brand"
								title="Learn More"
								label="Learn More"
							/>
						)}
					/>
				</IconSettings>
			);

			const welcomeMatContainer = document.body.querySelector('.slds-welcome-mat');
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__tiles')
			).not.toBeInTheDocument();
		});

		it('shows info action button and do not show checkbox', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="splash"
						labels={labels}
						id="welcome-mat-test"
						doNotShowAgainCheckbox={
							<SLDSCheckbox
								assistiveText={{
									label: `Don't show this again`,
								}}
								labels={{
									label: `Don't show this again`,
								}}
							/>
						}
						onRenderInfoActions={() => (
							<SLDSButton
								type="button"
								variant="brand"
								title="Learn More"
								label="Learn More"
							/>
						)}
					/>
				</IconSettings>
			);

			const welcomeMatContainer = document.body.querySelector('.slds-welcome-mat');
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__info-actions')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector(
					'.slds-welcome-mat__info-actions button'
				)
			).toBeInTheDocument();
			expect(welcomeMatContainer.querySelector('.slds-checkbox')).toBeInTheDocument();
		});
	});

	describe('Trailhead Variant', () => {
		it('renders welcome mat', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="trailhead-connected"
						labels={labels}
						id="welcome-mat-test"
						infoBadge={
							<WelcomeMatInfoBadge
								image="/assets/images/welcome-mat/trailhead_badge@2x.png"
								onCompleteRenderActions={() => (
									<React.Fragment>
										<p>Cha-ching! You earned the badge.</p>
										<SLDSButton
											className="slds-m-top_medium"
											type="button"
											variant="brand"
											title="View on your Trailblazer Profile"
											label="View on your Trailblazer Profile"
										/>
									</React.Fragment>
								)}
							>
								<p>
									<strong>Lightning Explorer</strong>
								</p>
							</WelcomeMatInfoBadge>
						}
					>
						{tiles}
					</SLDSWelcomeMat>
				</IconSettings>
			);

			const welcomeMatContainer = document.body.querySelector('.slds-welcome-mat');
			expect(welcomeMatContainer).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__content')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__info')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__tiles')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__tiles')
					.childElementCount
			).toBe(5);
			expect(
				welcomeMatContainer.querySelectorAll('.slds-welcome-mat__tile_complete')
					.length
			).toBe(2);
		});

		it('shows trailhead badge', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="trailhead-connected"
						labels={labels}
						id="welcome-mat-test"
						infoBadge={
							<WelcomeMatInfoBadge
								image="/assets/images/welcome-mat/trailhead_badge@2x.png"
								onCompleteRenderActions={() => (
									<React.Fragment>
										<p>Cha-ching! You earned the badge.</p>
										<SLDSButton
											className="slds-m-top_medium"
											type="button"
											variant="brand"
											title="View on your Trailblazer Profile"
											label="View on your Trailblazer Profile"
										/>
									</React.Fragment>
								)}
							>
								<p>
									<strong>Lightning Explorer</strong>
								</p>
							</WelcomeMatInfoBadge>
						}
					>
						{tiles}
					</SLDSWelcomeMat>
				</IconSettings>
			);

			const welcomeMatInfo = document.body.querySelector('.slds-welcome-mat__info');
			expect(
				welcomeMatInfo.querySelector('.slds-welcome-mat__info-badge')
			).toBeInTheDocument();
			expect(
				welcomeMatInfo.querySelector(
					'.slds-welcome-mat__info-progress p strong'
				).textContent
			).toBe('Lightning Explorer');
		});

		it('shows labels correctly', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="trailhead-connected"
						labels={labels}
						id="welcome-mat-test"
						infoBadge={
							<WelcomeMatInfoBadge
								image="/assets/images/welcome-mat/trailhead_badge@2x.png"
								onCompleteRenderActions={() => (
									<React.Fragment>
										<p>Cha-ching! You earned the badge.</p>
										<SLDSButton
											className="slds-m-top_medium"
											type="button"
											variant="brand"
											title="View on your Trailblazer Profile"
											label="View on your Trailblazer Profile"
										/>
									</React.Fragment>
								)}
							>
								<p>
									<strong>Lightning Explorer</strong>
								</p>
							</WelcomeMatInfoBadge>
						}
					>
						{tiles}
					</SLDSWelcomeMat>
				</IconSettings>
			);

			const welcomeMatInfo = document.body.querySelector('.slds-welcome-mat__info');
			expect(
				welcomeMatInfo.querySelector('.slds-welcome-mat__info-title').textContent
			).toBe(title);
			expect(
				welcomeMatInfo.querySelector('.slds-welcome-mat__info-description')
					.textContent
			).toBe(description);
		});
	});
});
