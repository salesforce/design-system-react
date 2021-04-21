import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';
// import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';

import IconSettings from '../../icon-settings';
import SLDSButton from '../../button';
import Settings from '../../settings';
import SLDSCheckbox from '../../checkbox';

// const { Simulate } = TestUtils;

import SLDSWelcomeMat from '../../welcome-mat';
import SLDSWelcomeMatTile from '../../welcome-mat/tile';
import WelcomeMatInfoBadge from '../../welcome-mat/info-badge';

describe('SLDSWelcomeMat: ', function () {
	let container;
	let renderedNode;

	// set "app node" fixture, so no warnings are triggered.
	let appNode = document.createElement('span');
	appNode.id = 'app';
	document.body.appendChild(appNode);
	Settings.setAppElement('#app');

	after(() => {
		document.body.removeChild(appNode);
		appNode = null;
	});

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(container);
		document.body.removeChild(container);
		container = null;
	});

	const renderWelcomeMat = (welcomeMatInstance) => {
		container = document.createElement('div');

		const opener = (
			<IconSettings iconPath="/assets/icons">{welcomeMatInstance}</IconSettings>
		);
		document.body.appendChild(container);
		// eslint-disable-next-line react/no-render-return-value
		renderedNode = ReactDOM.render(opener, container); // deepscan-disable-line REACT_ASYNC_RENDER_RETURN_VALUE
		return renderedNode;
	};

	const title = 'The Lightning Experience is here!';
	const description = 'This is a sample description for the welcome mat';

	const labels = {
		title,
		description,
	};

	const defaultProps = {
		isOpen: true,
		labels,
	};
	const createWelcomeMat = (props) =>
		React.createElement(SLDSWelcomeMat, assign({}, defaultProps, props));

	const getWelcomeMat = (props) => renderWelcomeMat(createWelcomeMat(props));

	const getWelcomeMatNode = (dom) => dom.querySelector('.slds-modal');

	const tiles = [
		<SLDSWelcomeMatTile
			title="Welcome to Salesforce!"
			description="Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet."
			icon="animal_and_nature"
			href="https://example.com"
			isComplete
		/>,
		<SLDSWelcomeMatTile
			title="Learn About OpenCTI!"
			description="Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet."
			icon="call"
			href="https://example.com"
			isComplete
		/>,
		<SLDSWelcomeMatTile
			title="Power Up the Utility Bar"
			description="Tap into case history or share notes with fellow agents—it all happens on the utility bar."
			href="https://example.com"
			icon="call"
		/>,
		<SLDSWelcomeMatTile
			title="Customize your view"
			description="Tailor your cases to your team&#x27;s workflow with custom list views."
			href="https://example.com"
			icon="upload"
		/>,
		<SLDSWelcomeMatTile
			title="Share the Knowledge"
			description="Harness your team&#x27;s collective know-how with our powerful knowledge base."
			href="https://example.com"
			icon="knowledge_base"
		/>,
	];

	describe('Steps Variant', () => {
		beforeEach(() => {
			getWelcomeMat({
				variant: 'steps',
				labels,
				children: tiles,
				id: 'welcome-mat-test',
			});
		});
		it('renders welcome mat', () => {
			const WelcomeMatContainer = getWelcomeMatNode(
				document.body
			).querySelector('.slds-welcome-mat');
			expect(WelcomeMatContainer).to.exist;
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__content')).to
				.exist;
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__info')).to
				.exist;
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__tiles')).to
				.exist;
			expect(
				WelcomeMatContainer.querySelector('.slds-welcome-mat__tiles')
					.childElementCount
			).to.eql(5);
			expect(
				WelcomeMatContainer.querySelectorAll('.slds-welcome-mat__tile_complete')
					.length
			).to.eql(2);
		});
		it('tile links have correct href', () => {
			const WelcomeMatTiles = getWelcomeMatNode(document.body).querySelectorAll(
				'.slds-welcome-mat__tile a'
			);
			WelcomeMatTiles.forEach((tile) => {
				expect(tile.href).to.eql.toString('https://example.com');
			});
		});
		it('shows labels correctly', () => {
			const WelcomeMatInfo = getWelcomeMatNode(document.body).querySelector(
				'.slds-welcome-mat__info'
			);
			expect(
				WelcomeMatInfo.querySelector('.slds-welcome-mat__info-title')
					.textContent
			).to.eql(title);
			expect(
				WelcomeMatInfo.querySelector('.slds-welcome-mat__info-description')
					.textContent
			).to.eql(description);
			expect(
				WelcomeMatInfo.querySelector('.slds-welcome-mat__info-progress p')
					.textContent
			).to.eql('2/5 units completed');
		});
	});

	describe('Info-Only Variant', () => {
		beforeEach(() => {
			getWelcomeMat({
				variant: 'info-only',
				labels,
				id: 'welcome-mat-test',
				children: tiles,
				doNotShowAgainCheckbox: (
					<SLDSCheckbox
						assistiveText={{
							label: `Don't show this again`,
						}}
						labels={{
							label: `Don't show this again`,
						}}
					/>
				),
				onRenderInfoActions: () => (
					<SLDSButton
						type="button"
						variant="brand"
						title="Learn More"
						label="Learn More"
					/>
				),
			});
		});
		it('renders welcome mat', () => {
			const WelcomeMatContainer = getWelcomeMatNode(
				document.body
			).querySelector('.slds-welcome-mat');
			expect(WelcomeMatContainer).to.exist;
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__content')).to
				.exist;
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__info')).to
				.exist;
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__tiles')).to
				.exist;
			expect(
				WelcomeMatContainer.querySelectorAll(
					'.slds-welcome-mat__tile_info-only'
				).length
			).to.eql(5);
		});
		it('shows info action button and do not show checkbox', () => {
			const WelcomeMatContainer = getWelcomeMatNode(
				document.body
			).querySelector('.slds-welcome-mat');
			expect(
				WelcomeMatContainer.querySelector('.slds-welcome-mat__info-actions')
			).to.exist;
			expect(
				WelcomeMatContainer.querySelector(
					'.slds-welcome-mat__info-actions button'
				)
			).to.exist;
			expect(WelcomeMatContainer.querySelector('.slds-checkbox')).to.exist;
		});
	});

	describe('Splash Variant', () => {
		beforeEach(() => {
			getWelcomeMat({
				variant: 'splash',
				labels,
				id: 'welcome-mat-test',
				doNotShowAgainCheckbox: (
					<SLDSCheckbox
						assistiveText={{
							label: `Don't show this again`,
						}}
						labels={{
							label: `Don't show this again`,
						}}
					/>
				),
				onRenderInfoActions: () => (
					<SLDSButton
						type="button"
						variant="brand"
						title="Learn More"
						label="Learn More"
					/>
				),
			});
		});
		it('renders welcome mat', () => {
			const WelcomeMatContainer = getWelcomeMatNode(
				document.body
			).querySelector('.slds-welcome-mat');
			expect(WelcomeMatContainer).to.exist;
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__content')).to
				.exist;
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__info')).to
				.exist;
		});

		it('does not render any tiles', () => {
			const WelcomeMatContainer = getWelcomeMatNode(
				document.body
			).querySelector('.slds-welcome-mat');
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__tiles')).to
				.not.exist;
		});
		it('shows info action button and do not show checkbox', () => {
			const WelcomeMatContainer = getWelcomeMatNode(
				document.body
			).querySelector('.slds-welcome-mat');
			expect(
				WelcomeMatContainer.querySelector('.slds-welcome-mat__info-actions')
			).to.exist;
			expect(
				WelcomeMatContainer.querySelector(
					'.slds-welcome-mat__info-actions button'
				)
			).to.exist;
			expect(WelcomeMatContainer.querySelector('.slds-checkbox')).to.exist;
		});
	});

	describe('Trailhead Variant', () => {
		beforeEach(() => {
			getWelcomeMat({
				variant: 'trailhead-connected',
				labels,
				children: tiles,
				infoBadge: (
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
				),
				id: 'welcome-mat-test',
			});
		});
		it('renders welcome mat', () => {
			const WelcomeMatContainer = getWelcomeMatNode(
				document.body
			).querySelector('.slds-welcome-mat');
			expect(WelcomeMatContainer).to.exist;
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__content')).to
				.exist;
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__info')).to
				.exist;
			expect(WelcomeMatContainer.querySelector('.slds-welcome-mat__tiles')).to
				.exist;
			ReactDOM.unmountComponentAtNode(container);
			expect(
				WelcomeMatContainer.querySelector('.slds-welcome-mat__tiles')
					.childElementCount
			).to.eql(5);
			expect(
				WelcomeMatContainer.querySelectorAll('.slds-welcome-mat__tile_complete')
					.length
			).to.eql(2);
		});
		it('shows trailhead badge', () => {
			const WelcomeMatInfo = getWelcomeMatNode(document.body).querySelector(
				'.slds-welcome-mat__info'
			);
			expect(WelcomeMatInfo.querySelector('.slds-welcome-mat__info-badge')).to
				.exist;
			expect(
				WelcomeMatInfo.querySelector(
					'.slds-welcome-mat__info-progress p strong'
				).textContent
			).to.eql('Lightning Explorer');
		});
		it('shows labels correctly', () => {
			const WelcomeMatInfo = getWelcomeMatNode(document.body).querySelector(
				'.slds-welcome-mat__info'
			);
			expect(
				WelcomeMatInfo.querySelector('.slds-welcome-mat__info-title')
					.textContent
			).to.eql(title);
			expect(
				WelcomeMatInfo.querySelector('.slds-welcome-mat__info-description')
					.textContent
			).to.eql(description);
		});
	});
});
