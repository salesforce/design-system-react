import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { storiesOf, action } from '@storybook/react';

import { APP_LAUNCHER } from '../../../utilities/constants';

import AppLauncher from '../../app-launcher';
import AppLauncherTile from '../../app-launcher/tile';
import AppLauncherSection from '../../app-launcher/section';
import Icon from '../../icon';
import Button from '../../button';
import Search from '../../input/search';

import GlobalNavigationBar from '../../global-navigation-bar';
import GlobalNavigationBarRegion from '../../global-navigation-bar/region';

import IconSettings from '../../icon-settings';
import SLDSSettings from '../../SLDSSettings';

SLDSSettings.setAppElement('#root'); // used by Modal component

const standardTileDemoStyles = {
	width: '20rem',
	paddingLeft: '.5rem',
	paddingRight: '.5rem',
};

const smallTileDemoStyles = {
	width: '6rem',
	paddingLeft: '.5rem',
	paddingRight: '.5rem',
};

const DemoAppLauncherTile = createReactClass({
	displayName: 'DemoAppLauncherTile',

	propTypes: {
		search: PropTypes.string,
		size: PropTypes.string,
	},

	render () {
		return (
			<AppLauncherTile
				title="Marketing Cloud"
				iconText="MC"
				description="Send emails, track emails, read emails! Emails!"
				href="https://www.marketingcloud.com/"
				onClick={action('Tile clicked! Actual href should be ignored')}
				search={this.props.search}
				size={this.props.size}
			/>
		);
	},
});

const DemoAppLauncherSmallTile = createReactClass({
	displayName: 'DemoAppLauncherSmallTile',

	render () {
		return (
			<AppLauncherTile
				title="Journey Builder"
				iconText="JB"
				size="small"
				onClick={action('Tiny tile clicked!')}
			/>
		);
	},
});

const DemoAppLauncherTileWithIconNode = createReactClass({
	displayName: 'DemoAppLauncherTileWithIconNode',

	propTypes: {
		search: PropTypes.string,
		size: PropTypes.string,
	},

	render () {
		const icon = <Icon name="campaign" category="standard" size="large" />;

		return (
			<AppLauncherTile
				title="Sales Cloud"
				description="The primary internal Salesforce org."
				href="https://www.salesforce.com/"
				iconNode={icon}
				onClick={action('Tile with icon node clicked!')}
				search={this.props.search}
				size={this.props.size}
			/>
		);
	},
});

const DemoAppLauncherTileWithIconText = createReactClass({
	displayName: 'DemoAppLauncherTileWithIconText',

	propTypes: {
		search: PropTypes.string,
		size: PropTypes.string,
	},

	render () {
		return (
			<AppLauncherTile
				title="Sales Cloud"
				description="The primary internal Salesforce org."
				iconText="SC"
				onClick={action('Tile with icon text clicked!')}
				search={this.props.search}
				size={this.props.size}
			/>
		);
	},
});

const DemoAppLauncherTileWithTruncatedText = createReactClass({
	displayName: 'DemoAppLauncherTileWithTruncatedText',

	propTypes: {
		search: PropTypes.string,
		size: PropTypes.string,
	},

	render () {
		return (
			<AppLauncherTile
				title="Call Center"
				description="The key to call center and contact center is not to use too many words!"
				iconText="CC"
				onClick={action('Tile with icon text clicked!')}
				search={this.props.search}
				size={this.props.size}
			/>
		);
	},
});

const DemoAppLauncherTileWithDescriptionHeading = createReactClass({
	displayName: 'DemoAppLauncherTileWithDescriptionHeading',

	propTypes: {
		search: PropTypes.string,
		size: PropTypes.string,
	},

	getDefaultProps () {
		return {
			search: 'journey',
		};
	},

	render () {
		return (
			<AppLauncherTile
				title="Journey Builder"
				description="Build 1:1 journeys blah blah blah and use way too many words"
				descriptionHeading="Journey Builder"
				iconText="SC"
				onClick={action('Tile with description heading clicked!')}
				search={this.props.search}
				size={this.props.size}
			/>
		);
	},
});

const DemoAppLauncherTileWithSearchText = createReactClass({
	displayName: 'DemoAppLauncherTileWithSearchText',

	propTypes: {
		search: PropTypes.string,
		size: PropTypes.string,
	},

	getDefaultProps () {
		return {
			search: 'Call',
		};
	},

	render () {
		return (
			<DemoAppLauncherTileWithTruncatedText
				search={this.props.search}
				size={this.props.size}
			/>
		);
	},
});

const DemoAppLauncherSection = createReactClass({
	displayName: 'DemoAppLauncherSection',

	render () {
		return (
			<div>
				<AppLauncherSection
					assistiveText={{ collapseSection: 'Collapse Section' }}
					title="All Items"
					toggleable
					onToggleClick={action('Section `All Items` open -->')}
				>
					<DemoAppLauncherTile />
					<DemoAppLauncherTileWithIconText />
					<DemoAppLauncherTileWithIconNode />
				</AppLauncherSection>
				<AppLauncherSection
					title="All Apps"
					onToggleClick={action('Section `All App` open -->')}
				>
					<DemoAppLauncherTile />
					<DemoAppLauncherTileWithIconNode />
				</AppLauncherSection>
			</div>
		);
	},
});

const DemoAppLauncherSectionWithSmallTiles = createReactClass({
	displayName: 'DemoAppLauncherSectionWithSmallTiles',

	render () {
		return (
			<div>
				<AppLauncherSection
					title="All Items"
					onToggleClick={action('Section `All Items` open -->')}
				>
					<DemoAppLauncherTile />
					<DemoAppLauncherTileWithIconText />
					<DemoAppLauncherTileWithIconNode />
				</AppLauncherSection>
				<AppLauncherSection
					title="All Apps"
					onToggleClick={action('Section `All App` open -->')}
				>
					<DemoAppLauncherTile size="small" />
					<DemoAppLauncherTileWithIconNode size="small" />
				</AppLauncherSection>
			</div>
		);
	},
});

const DemoAppLauncher = createReactClass({
	displayName: 'DemoAppLauncher',

	getInitialState () {
		return {
			search: '',
			appLauncherOpen: this.props.isOpen || false, // eslint-disable-line react/prop-types
			allItemsSectionIsOpen: false,
		};
	},

	onClear () {
		this.setState({ search: '' });
	},

	onSearch (event) {
		this.setState({ search: event.target.value });
	},

	toggleAppLauncher () {
		this.setState({ appLauncherOpen: !this.state.appLauncherOpen });
	},

	toggleSection () {
		this.setState({ allItemsSectionIsOpen: !this.state.allItemsSectionIsOpen });
	},

	render () {
		const search = (
			<Search
				clearable={this.state.search !== ''}
				onChange={this.onSearch}
				onClear={this.onClear}
				placeholder="Find an app"
				assistiveText={{ label: 'Find an app' }}
				value={this.state.search}
			/>
		);
		const modalHeaderButton = (
			<Button label="App Exchange" onClick={action('Modal Button clicked!')} />
		);

		return (
			<GlobalNavigationBar>
				<GlobalNavigationBarRegion region="primary">
					<AppLauncher
						assistiveText={{ trigger: 'Open App Launcher' }}
						triggerName="App Name"
						search={search}
						modalClassName="custom-modal-class"
						modalHeaderButton={modalHeaderButton}
						isOpen={this.state.appLauncherOpen}
						triggerOnClick={this.toggleAppLauncher}
						onClose={this.toggleAppLauncher}
					>
						<AppLauncherSection
							toggleable
							title="All Items"
							isOpen={this.state.allItemsSectionIsOpen}
							onToggleClick={this.toggleSection}
						>
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithIconNode search={this.state.search} />
							<DemoAppLauncherTileWithIconText search={this.state.search} />
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithIconNode search={this.state.search} />
							<DemoAppLauncherTileWithIconText search={this.state.search} />
						</AppLauncherSection>
						<AppLauncherSection title="All Apps" toggleable>
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithTruncatedText
								search={this.state.search}
							/>
							<DemoAppLauncherTileWithDescriptionHeading
								search={this.state.search}
							/>
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithTruncatedText
								search={this.state.search}
							/>
							<DemoAppLauncherTileWithDescriptionHeading
								search={this.state.search}
							/>
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithTruncatedText
								search={this.state.search}
							/>
							<DemoAppLauncherTileWithDescriptionHeading
								search={this.state.search}
							/>
						</AppLauncherSection>
					</AppLauncher>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		);
	},
});

const DemoAppLauncherNoHeaderButton = createReactClass({
	displayName: 'DemoAppLauncherNoHeaderButton',

	getInitialState () {
		return {
			search: '',
			appLauncherOpen: false,
			allItemsSectionIsOpen: false,
		};
	},

	onSearch (event) {
		this.setState({ search: event.target.value });
	},

	toggleAppLauncher () {
		this.setState({ appLauncherOpen: !this.state.appLauncherOpen });
	},

	render () {
		const search = (
			<Search
				onChange={this.onSearch}
				placeholder="Find an app"
				assistiveText={{ label: 'Find an app' }}
			/>
		);

		return (
			<GlobalNavigationBar>
				<GlobalNavigationBarRegion region="primary">
					<AppLauncher
						triggerName="App Name"
						search={search}
						isOpen={this.state.appLauncherOpen}
						triggerOnClick={this.toggleAppLauncher}
						onClose={this.toggleAppLauncher}
					>
						<AppLauncherSection toggleable title="All Items">
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithIconNode search={this.state.search} />
							<DemoAppLauncherTileWithIconText search={this.state.search} />
						</AppLauncherSection>
						<AppLauncherSection title="All Apps" toggleable>
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithTruncatedText
								search={this.state.search}
							/>
						</AppLauncherSection>
					</AppLauncher>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		);
	},
});

const DemoAppLauncherNoSearch = createReactClass({
	displayName: 'DemoAppLauncherNoSearch',

	getInitialState () {
		return {
			appLauncherOpen: false,
			allItemsSectionIsOpen: false,
		};
	},

	toggleAppLauncher () {
		this.setState({ appLauncherOpen: !this.state.appLauncherOpen });
	},

	render () {
		const modalHeaderButton = (
			<Button label="App Exchange" onclick={action('Modal Button clicked!')} />
		);

		return (
			<GlobalNavigationBar>
				<GlobalNavigationBarRegion region="primary">
					<AppLauncher
						triggerName="App Name"
						modalHeaderButton={modalHeaderButton}
						isOpen={this.state.appLauncherOpen}
						triggerOnClick={this.toggleAppLauncher}
						onClose={this.toggleAppLauncher}
					>
						<AppLauncherSection toggleable title="All Items">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithIconText />
						</AppLauncherSection>
						<AppLauncherSection title="All Apps" toggleable>
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherSection>
					</AppLauncher>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		);
	},
});

const DemoAppLauncherWithSeveralSections = createReactClass({
	displayName: 'DemoAppLauncherWithSeveralSections',

	onSearch () {
		// stub
	},

	render () {
		const search = (
			<Search
				onChange={this.onSearch}
				placeholder="Find an app"
				assistiveText={{ label: 'Find an app' }}
			/>
		);
		const modalHeaderButton = (
			<Button label="App Exchange" onclick={action('Modal Button clicked!')} />
		);

		return (
			<GlobalNavigationBar>
				<GlobalNavigationBarRegion region="primary">
					<AppLauncher
						triggerName="App Name"
						search={search}
						modalHeaderButton={modalHeaderButton}
					>
						<AppLauncherSection title="First Section">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherSection>
						<AppLauncherSection title="Second Section">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherSection>
						<AppLauncherSection title="Third Section">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherSection>
						<AppLauncherSection title="Fourth Section">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherSection>
						<AppLauncherSection title="Fifth Section">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherSection>
					</AppLauncher>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		);
	},
});

storiesOf(APP_LAUNCHER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('App Launcher (open)', () => <DemoAppLauncher isOpen />)
	.add('App Launcher', () => <DemoAppLauncher />)
	.add('App Launcher no header button', () => <DemoAppLauncherNoHeaderButton />)
	.add('App Launcher no search', () => <DemoAppLauncherNoSearch />)
	.add('App Launcher with several sections (no toggle)', () => (
		<DemoAppLauncherWithSeveralSections />
	))
	.add('Tile', () => (
		<div style={standardTileDemoStyles}>
			<DemoAppLauncherTile />
		</div>
	))
	.add('Small Tile', () => (
		<div style={smallTileDemoStyles}>
			<DemoAppLauncherSmallTile />
		</div>
	))
	.add('Tile with Icon node', () => (
		<div style={standardTileDemoStyles}>
			<DemoAppLauncherTileWithIconNode />
		</div>
	))
	.add('Tile with icon text', () => (
		<div style={standardTileDemoStyles}>
			<DemoAppLauncherTileWithIconText />
		</div>
	))
	.add('Tile with search text', () => (
		<div style={standardTileDemoStyles}>
			<DemoAppLauncherTileWithSearchText />
		</div>
	))
	.add('Tile with truncated text', () => (
		<div style={standardTileDemoStyles}>
			<DemoAppLauncherTileWithTruncatedText />
		</div>
	))
	.add('Tile with description heading', () => (
		<div style={standardTileDemoStyles}>
			<DemoAppLauncherTileWithDescriptionHeading />
		</div>
	))
	.add('Section', () => <DemoAppLauncherSection />)
	.add('Section with small tiles', () => (
		<DemoAppLauncherSectionWithSmallTiles />
	));
