import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { APP_LAUNCHER } from '../../utilities/constants';

import AppLauncherTile from '../../components/app-launcher/tile';
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

	render () {
		return (
			<div style={standardTileDemoStyles}>
				<AppLauncherTile
					title="Marketing Cloud"
					description="Send emails, track emails, read emails! Emails!"
					onClick={action('Tile clicked!')}
				/>
			</div>
		);
	}
});

const DemoAppLauncherSmallTile = React.createClass({
	displayName: 'DemoAppLauncherSmallTile',

	render () {
		return (
			<div style={smallTileDemoStyles}>
				<AppLauncherTile
					title="Journey Builder"
					size="small"
					onClick={action('Tiny tile clicked!')}
				/>
			</div>
		);
	}
});

const DemoAppLauncherTileWithIconNode = React.createClass({
	displayName: 'DemoAppLauncherTileWithIconNode',


	render () {
		const icon = <Icon name="map" category="action" className="slds-m-around--x-small" />;

		return (
			<div style={standardTileDemoStyles}>
				<AppLauncherTile
					title="Sales Cloud"
					description="The primary internal Salesforce org."
					iconNode={icon}
					onClick={action('Tile with icon node clicked!')}
				/>
			</div>
		);
	}
});
	// 	<AppLauncherTile
	// 	icon={<Icon />} or iconName="" or iconText=""
	// 	title=""
	// 	description=""
	// 	size="small"
	// 	moreLabel=""
	// 	onClick={}
	// 	className=""
	// >


storiesOf(APP_LAUNCHER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Tile', () => <DemoAppLauncherTile />)
	.add('Small Tile', () => <DemoAppLauncherSmallTile />)
	.add('Tile with Icon node', () => <DemoAppLauncherTileWithIconNode />);
