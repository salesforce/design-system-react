import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { APP_LAUNCHER } from '../../utilities/constants';

const { PropTypes } = React;

import AppLauncher from '../../components/app-launcher';
import AppLauncherTile from '../../components/app-launcher/tile';
import AppLauncherSection from '../../components/app-launcher/section';
import Icon from '../../components/icon';
import Button from '../../components/button';

import GlobalNavigationBar from '../../components/global-navigation-bar';
import GlobalNavigationBarRegion from '../../components/global-navigation-bar/region';

const standardTileDemoStyles = {
	width: '20rem',
	paddingLeft: '.5rem',
	paddingRight: '.5rem'
};

const smallTileDemoStyles = {
	width: '6rem',
	paddingLeft: '.5rem',
	paddingRight: '.5rem'
};

const DemoAppLauncherTile = React.createClass({
	displayName: 'DemoAppLauncherTile',

	propTypes: {
		search: PropTypes.string,
		size: PropTypes.string
	},

	render () {
		return (
			<AppLauncherTile
				title="Marketing Cloud"
				iconText="MC"
				description="Send emails, track emails, read emails! Emails!"
				onClick={action('Tile clicked!')}
				search={this.props.search}
				size={this.props.size}
			/>
		);
	}
});

const DemoAppLauncherSmallTile = React.createClass({
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
	}
});

const DemoAppLauncherTileWithIconNode = React.createClass({
	displayName: 'DemoAppLauncherTileWithIconNode',

	propTypes: {
		search: PropTypes.string,
		size: PropTypes.string
	},

	render () {
		const icon = <Icon name="map" category="action" className="slds-m-around--x-small" />;

		return (
			<AppLauncherTile
				title="Sales Cloud"
				description="The primary internal Salesforce org."
				iconNode={icon}
				onClick={action('Tile with icon node clicked!')}
				search={this.props.search}
				size={this.props.size}
			/>
		);
	}
});

const DemoAppLauncherTileWithIconText = React.createClass({
	displayName: 'DemoAppLauncherTileWithIconText',

	propTypes: {
		search: PropTypes.string,
		size: PropTypes.string
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
	}
});

const DemoAppLauncherTileWithTruncatedText = React.createClass({
	displayName: 'DemoAppLauncherTileWithTruncatedText',

	propTypes: {
		search: PropTypes.string,
		size: PropTypes.string
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
	}
});

const DemoAppLauncherTileWithSearchText = React.createClass({
	displayName: 'DemoAppLauncherTileWithSearchText',

	propTypes: {
		search: PropTypes.string,
		size: PropTypes.string
	},

	getDefaultProps () {
		return {
			search: 'all'
		};
	},

	render () {
		return (
			<DemoAppLauncherTileWithTruncatedText
				search={this.props.search}
				size={this.props.size}
			/>
		);
	}
});

const DemoAppLauncherSection = React.createClass({
	displayName: 'DemoAppLauncherSection',

	render () {
		return (
			<div>
				<AppLauncherSection title="All Items" onToggleClick={action('Section `All Items` open -->')}>
					<DemoAppLauncherTile />
					<DemoAppLauncherTileWithIconText />
					<DemoAppLauncherTileWithIconNode />
				</AppLauncherSection>
				<AppLauncherSection title="All Apps" onToggleClick={action('Section `All App` open -->')}>
					<DemoAppLauncherTile />
					<DemoAppLauncherTileWithIconNode />
				</AppLauncherSection>
			</div>
		);
	}
});

const DemoAppLauncherSectionWithSmallTiles = React.createClass({
	displayName: 'DemoAppLauncherSectionWithSmallTiles',

	render () {
		return (
			<div>
				<AppLauncherSection title="All Items" onToggleClick={action('Section `All Items` open -->')}>
					<DemoAppLauncherTile />
					<DemoAppLauncherTileWithIconText />
					<DemoAppLauncherTileWithIconNode />
				</AppLauncherSection>
				<AppLauncherSection title="All Apps" onToggleClick={action('Section `All App` open -->')}>
					<DemoAppLauncherTile size="small" />
					<DemoAppLauncherTileWithIconNode size="small" />
				</AppLauncherSection>
			</div>
		);
	}
});

const DemoAppLauncher = React.createClass({
	displayName: 'DemoAppLauncher',

	getInitialState () {
		return {
			search: '',
			appLauncherOpen: false,
			allItemsSectionIsOpen: false
		};
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
		const modalHeaderButton = <Button label="Apps!!!" onclick={action('Modal Button clicked!')} />;

		return (
			<GlobalNavigationBar>
				<GlobalNavigationBarRegion
					region="primary"
				>
					<AppLauncher
						applicationName="App Name"
						onSearch={this.onSearch}
						modalHeaderButton={modalHeaderButton}
						isOpen={this.state.appLauncherOpen}
						triggerOnClick={this.toggleAppLauncher}
						onClose={this.toggleAppLauncher}
					>
						<AppLauncherSection
							title="All Items"
							isOpen={this.state.allItemsSectionIsOpen}
							onToggleClick={this.toggleSection}
						>
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithIconNode search={this.state.search} />
							<DemoAppLauncherTileWithIconText search={this.state.search} />
						</AppLauncherSection>
						<AppLauncherSection title="All Apps">
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithTruncatedText search={this.state.search} />
						</AppLauncherSection>
					</AppLauncher>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		);
	}
});


storiesOf(APP_LAUNCHER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('App Launcher', () => <DemoAppLauncher />)
	.add('Tile', () => <div style={standardTileDemoStyles}><DemoAppLauncherTile /></div>)
	.add('Small Tile', () => <div style={smallTileDemoStyles}><DemoAppLauncherSmallTile /></div>)
	.add('Tile with Icon node', () => <div style={standardTileDemoStyles}><DemoAppLauncherTileWithIconNode /></div>)
	.add('Tile with icon text', () => <div style={standardTileDemoStyles}><DemoAppLauncherTileWithIconText /></div>)
	.add('Tile with search text', () => <div style={standardTileDemoStyles}><DemoAppLauncherTileWithSearchText /></div>)
	.add('Tile with truncated text', () => <div style={standardTileDemoStyles}><DemoAppLauncherTileWithTruncatedText /></div>)
	.add('Section', () => <DemoAppLauncherSection />)
	.add('Section with small tiles', () => <DemoAppLauncherSectionWithSmallTiles />);
