import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
	describe,
	it,
	expect,
	vi,
	beforeAll,
	afterAll,
	afterEach,
} from 'vitest';

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

	describe('onRequestClose', () => {
		const renderWelcomeMat = (onRequestClose) =>
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						labels={labels}
						id="welcome-mat-close-test"
						onRequestClose={onRequestClose}
					>
						{tiles}
					</SLDSWelcomeMat>
				</IconSettings>
			);

		it('forwards the close button click event and trigger "close-button"', () => {
			const onRequestClose = vi.fn();
			renderWelcomeMat(onRequestClose);

			fireEvent.click(document.body.querySelector('.slds-modal__close'));

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			const [event, data] = onRequestClose.mock.calls[0];
			expect(event).toEqual(expect.objectContaining({ type: 'click' }));
			expect(data).toEqual({ trigger: 'close-button' });
		});

		it('forwards the Escape keydown event and trigger "escape"', () => {
			const onRequestClose = vi.fn();
			renderWelcomeMat(onRequestClose);

			fireEvent.keyDown(document.body.querySelector('.slds-modal'), {
				key: 'Escape',
				keyCode: 27,
			});

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			const [event, data] = onRequestClose.mock.calls[0];
			expect(event).toEqual(
				expect.objectContaining({ type: 'keydown', key: 'Escape' })
			);
			expect(data).toEqual({ trigger: 'escape' });
		});
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
			const welcomeMatContainer =
				document.body.querySelector('.slds-welcome-mat');
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

			const welcomeMatInfo = document.body.querySelector(
				'.slds-welcome-mat__info'
			);
			expect(
				welcomeMatInfo.querySelector('.slds-welcome-mat__info-title')
					.textContent
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
						infoActions={
							<SLDSButton
								type="button"
								variant="brand"
								title="Learn More"
								label="Learn More"
							/>
						}
					>
						{tiles}
					</SLDSWelcomeMat>
				</IconSettings>
			);

			const welcomeMatContainer =
				document.body.querySelector('.slds-welcome-mat');
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
						infoActions={
							<SLDSButton
								type="button"
								variant="brand"
								title="Learn More"
								label="Learn More"
							/>
						}
					>
						{tiles}
					</SLDSWelcomeMat>
				</IconSettings>
			);

			const welcomeMatContainer =
				document.body.querySelector('.slds-welcome-mat');
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__info-actions')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector(
					'.slds-welcome-mat__info-actions button'
				)
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-checkbox')
			).toBeInTheDocument();
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
						infoActions={
							<SLDSButton
								type="button"
								variant="brand"
								title="Learn More"
								label="Learn More"
							/>
						}
					/>
				</IconSettings>
			);

			const welcomeMatContainer =
				document.body.querySelector('.slds-welcome-mat');
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
						infoActions={
							<SLDSButton
								type="button"
								variant="brand"
								title="Learn More"
								label="Learn More"
							/>
						}
					/>
				</IconSettings>
			);

			const welcomeMatContainer =
				document.body.querySelector('.slds-welcome-mat');
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
						infoActions={
							<SLDSButton
								type="button"
								variant="brand"
								title="Learn More"
								label="Learn More"
							/>
						}
					/>
				</IconSettings>
			);

			const welcomeMatContainer =
				document.body.querySelector('.slds-welcome-mat');
			expect(
				welcomeMatContainer.querySelector('.slds-welcome-mat__info-actions')
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector(
					'.slds-welcome-mat__info-actions button'
				)
			).toBeInTheDocument();
			expect(
				welcomeMatContainer.querySelector('.slds-checkbox')
			).toBeInTheDocument();
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
								completeActions={
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
								}
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

			const welcomeMatContainer =
				document.body.querySelector('.slds-welcome-mat');
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
								completeActions={
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
								}
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

			const welcomeMatInfo = document.body.querySelector(
				'.slds-welcome-mat__info'
			);
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
								completeActions={
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
								}
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

			const welcomeMatInfo = document.body.querySelector(
				'.slds-welcome-mat__info'
			);
			expect(
				welcomeMatInfo.querySelector('.slds-welcome-mat__info-title')
					.textContent
			).toBe(title);
			expect(
				welcomeMatInfo.querySelector('.slds-welcome-mat__info-description')
					.textContent
			).toBe(description);
		});
	});

	describe('Action slots', () => {
		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('renders the infoActions slot', () => {
			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="splash"
						labels={labels}
						id="welcome-mat-test"
						infoActions={<button type="button">Learn More</button>}
					/>
				</IconSettings>
			);

			const infoActions = document.body.querySelector(
				'.slds-welcome-mat__info-actions'
			);
			expect(infoActions.querySelector('button').textContent).toBe(
				'Learn More'
			);
		});

		it('renders the completeActions slot only when complete', () => {
			const { container, rerender } = render(
				<IconSettings iconPath="/assets/icons">
					<WelcomeMatInfoBadge completeActions={<p>Cha-ching!</p>} />
				</IconSettings>
			);

			expect(container).not.toHaveTextContent('Cha-ching!');

			rerender(
				<IconSettings iconPath="/assets/icons">
					<WelcomeMatInfoBadge isComplete completeActions={<p>Cha-ching!</p>} />
				</IconSettings>
			);

			expect(container).toHaveTextContent('Cha-ching!');
		});

		it('still renders the deprecated onRenderInfoActions and onCompleteRenderActions and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			render(
				<IconSettings iconPath="/assets/icons">
					<SLDSWelcomeMat
						isOpen
						variant="splash"
						labels={labels}
						id="welcome-mat-test"
						onRenderInfoActions={() => (
							<button type="button">Learn More</button>
						)}
					/>
				</IconSettings>
			);
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<WelcomeMatInfoBadge
						isComplete
						onCompleteRenderActions={() => <p>Cha-ching!</p>}
					/>
				</IconSettings>
			);

			const infoActions = document.body.querySelector(
				'.slds-welcome-mat__info-actions'
			);
			expect(infoActions.querySelector('button').textContent).toBe(
				'Learn More'
			);
			expect(container).toHaveTextContent('Cha-ching!');

			const messages = consoleError.mock.calls.map((args) => args.join(' '));
			expect(messages.some((m) => m.includes('onRenderInfoActions'))).toBe(
				true
			);
			expect(messages.some((m) => m.includes('onCompleteRenderActions'))).toBe(
				true
			);
		});
	});
});
