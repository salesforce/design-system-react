import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { APP_LAUNCHER } from '../../utilities/constants';

const { PropTypes } = React;

import AppLauncher from '../../components/app-launcher';
import AppLauncherTile from '../../components/app-launcher/tile';
import AppLauncherSection from '../../components/app-launcher/section';
import Icon from '../../components/icon';

// const DemoAppLauncher = React.createClass({
// 	displayName: 'DemoAppLauncher',

// 	render () {
// 		return (
// 			<AppLauncher
// 				title="App Launcher"
// 				searchLabel="Find an app"
// 				onSearch={()=>{}}
// 				buttonLabel="App Exchange"
// 				onButtonClick={()=>{}}
// 				modalClassName=""
// 			>
// 				<AppLauncherSection title="All Apps" className="">
// 					<AppLauncherTile
// 						icon={<Icon />} or iconName="" or iconText=""
// 						title=""
// 						description=""
// 						size="small"
// 						moreLabel=""
// 						onClick={}
// 						className=""
// 					>
// 						{children}
// 					</AppLauncherTile>
// 					<AppLauncherTile />
// 					<AppLauncherTile />
// 					<AppLauncherTile />
// 				</AppLauncherSection>
// 			</AppLauncher>
// 		);
// 	}
// });

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
		search: PropTypes.string
	},

	render () {
		return (
			<AppLauncherTile
				title="Marketing Cloud"
				iconText="MC"
				description="Send emails, track emails, read emails! Emails!"
				onClick={action('Tile clicked!')}
				search={this.props.search}
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
		search: PropTypes.string
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
			/>
		);
	}
});

const DemoAppLauncherTileWithIconText = React.createClass({
	displayName: 'DemoAppLauncherTileWithIconText',

	propTypes: {
		search: PropTypes.string
	},

	render () {
		return (
			<AppLauncherTile
				title="Sales Cloud"
				description="The primary internal Salesforce org."
				iconText="SC"
				onClick={action('Tile with icon text clicked!')}
				search={this.props.search}
			/>
		);
	}
});

const DemoAppLauncherTileWithTruncatedText = React.createClass({
	displayName: 'DemoAppLauncherTileWithTruncatedText',

	propTypes: {
		search: PropTypes.string
	},

	render () {
		return (
			<AppLauncherTile
				title="Call Center"
				description="The key to call center and contact center is not to use too many words!"
				iconText="CC"
				onClick={action('Tile with icon text clicked!')}
				search={this.props.search}
			/>
		);
	}
});

const DemoAppLauncherTileWithSearchText = React.createClass({
	displayName: 'DemoAppLauncherTileWithSearchText',

	propTypes: {
		search: PropTypes.string
	},

	getDefaultProps () {
		return {
			search: 'all'
		};
	},

	render () {
		return <DemoAppLauncherTileWithTruncatedText search={this.props.search} />;
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

const DemoAppLauncher = React.createClass({
	displayName: 'DemoAppLauncher',

	getInitialState () {
		return {
			search: ''
		};
	},

	onSearch (event) {
		this.setState({ search: event.target.value });
	},

	render () {
		return (
			<AppLauncher
				onSearch={this.onSearch}
			>
				<AppLauncherSection title="All Items">
					<DemoAppLauncherTile search={this.state.search} />
					<DemoAppLauncherTileWithIconNode search={this.state.search} />
					<DemoAppLauncherTileWithIconText search={this.state.search} />
				</AppLauncherSection>
				<AppLauncherSection title="All Apps">
					<DemoAppLauncherTile search={this.state.search} />
					<DemoAppLauncherTileWithTruncatedText search={this.state.search} />
				</AppLauncherSection>
			</AppLauncher>
		);
	}
});


storiesOf(APP_LAUNCHER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Tile', () => <div style={standardTileDemoStyles}><DemoAppLauncherTile /></div>)
	.add('Small Tile', () => <div style={smallTileDemoStyles}><DemoAppLauncherSmallTile /></div>)
	.add('Tile with Icon node', () => <div style={standardTileDemoStyles}><DemoAppLauncherTileWithIconNode /></div>)
	.add('Tile with icon text', () => <div style={standardTileDemoStyles}><DemoAppLauncherTileWithIconText /></div>)
	.add('Tile with search text', () => <div style={standardTileDemoStyles}><DemoAppLauncherTileWithSearchText /></div>)
	.add('Tile with truncated text', () => <div style={standardTileDemoStyles}><DemoAppLauncherTileWithTruncatedText /></div>)
	.add('Section', () => <DemoAppLauncherSection />)
	.add('App Launcher', () => <DemoAppLauncher />);
