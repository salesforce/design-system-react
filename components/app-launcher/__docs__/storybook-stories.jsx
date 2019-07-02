/* eslint-disable max-lines */
import React from 'react';

import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { APP_LAUNCHER, APP_LAUNCHER_TILE } from '../../../utilities/constants';

import AppLauncher from '../../app-launcher';
import AppLauncherLink from '../../app-launcher/link';
import AppLauncherTile from '../../app-launcher/tile';
import AppLauncherExpandableSection from '../../app-launcher/expandable-section';
import Icon from '../../icon';
import Button from '../../button';
import Search from '../../input/search';

import GlobalNavigationBar from '../../global-navigation-bar';
import GlobalNavigationBarRegion from '../../global-navigation-bar/region';

import IconSettings from '../../icon-settings';
import SLDSSettings from '../../SLDSSettings';

import DefaultExample from '../__examples__/default';

import { canUseDOM } from '../../../utilities/execution-environment';

// used by Modal component
if (canUseDOM && document.querySelector('#root')) {
	SLDSSettings.setAppElement('#root');
} else if (canUseDOM) {
	SLDSSettings.setAppElement(document.createElement('div'));
}

const tileDemoStyles = {
	width: '20rem',
	paddingLeft: '.5rem',
	paddingRight: '.5rem',
};

class DemoAppLauncherTile extends React.Component {
	static displayName = APP_LAUNCHER_TILE;

	static propTypes = {
		search: PropTypes.string,
	};

	render() {
		return (
			<AppLauncherTile
				title="Sales Cloud"
				iconText="SC"
				description="The primary internal Salesforce org. Used to run our online sales business and manage accounts."
				href="https://www.salesforce.com/"
				onClick={action('Tile clicked! Actual href should be ignored')}
				search={this.props.search}
			/>
		);
	}
}
DemoAppLauncherTile.displayName = APP_LAUNCHER_TILE;

class DemoAppLauncherTileWithIconNode extends React.Component {
	static displayName = APP_LAUNCHER_TILE;

	static propTypes = {
		search: PropTypes.string,
	};

	render() {
		const icon = <Icon name="email_chatter" category="standard" size="large" />;

		return (
			<AppLauncherTile
				title="Marketing Cloud"
				description="Salesforce Marketing Cloud lets businesses of any size engage with their customers through multiple channels of messaging."
				href="https://www.marketingcloud.com/"
				iconNode={icon}
				onClick={action('Tile with icon node clicked!')}
				search={this.props.search}
			/>
		);
	}
}

class DemoAppLauncherTileWithIconBackgroundColor extends React.Component {
	static displayName = APP_LAUNCHER_TILE;

	static propTypes = {
		search: PropTypes.string,
	};

	render() {
		return (
			<AppLauncherTile
				description="Manage your finances across multiple financial platforms and make the most of your capital."
				iconBackgroundColor="#73c07b"
				iconText="MM"
				search={this.props.search}
				title="My Money"
			/>
		);
	}
}

class DemoAppLauncherTileWithTruncatedText extends React.Component {
	static displayName = APP_LAUNCHER_TILE;

	static propTypes = {
		search: PropTypes.string,
	};

	render() {
		return (
			<AppLauncherTile
				title="Call Center"
				description="The key to call center and contact center management is more simple than you think with this amazing application!"
				iconText="CC"
				onClick={action('Tile with icon text clicked!')}
				search={this.props.search}
			/>
		);
	}
}

class DemoAppLauncherTileWithSearchText extends React.Component {
	static displayName = APP_LAUNCHER_TILE;

	static propTypes = {
		search: PropTypes.string,
	};

	static defaultProps = {
		search: 'Call',
	};

	render() {
		return <DemoAppLauncherTileWithTruncatedText search={this.props.search} />;
	}
}

class DemoAppLauncherExpandableSection extends React.Component {
	static displayName = 'DemoAppLauncherExpandableSection';

	state = {
		allAppsOpen: true,
	};

	render() {
		return (
			<div>
				<AppLauncherExpandableSection
					assistiveText={{ toggleSection: 'Expand/Collapse Section' }}
					isOpen={this.state.allAppsOpen}
					onToggleOpen={() => {
						action('Section `All App` open -->');
						this.setState({ allAppsOpen: !this.state.allAppsOpen });
					}}
					title="All Apps"
				>
					<DemoAppLauncherTile />
					<DemoAppLauncherTileWithIconBackgroundColor />
					<DemoAppLauncherTileWithIconNode />
					<DemoAppLauncherTile />
					<DemoAppLauncherTileWithTruncatedText />
					<DemoAppLauncherTile />
				</AppLauncherExpandableSection>
				<AppLauncherExpandableSection nonCollapsible title="All Items">
					<AppLauncherLink>Accounts</AppLauncherLink>
					<AppLauncherLink>Announcements</AppLauncherLink>
					<AppLauncherLink>Approvals</AppLauncherLink>
					<AppLauncherLink>Campaigns</AppLauncherLink>
					<AppLauncherLink>Cases</AppLauncherLink>
					<AppLauncherLink>Coaching</AppLauncherLink>
					<AppLauncherLink>Contacts</AppLauncherLink>
				</AppLauncherExpandableSection>
			</div>
		);
	}
}

class DemoAppLauncher extends React.Component {
	static displayName = 'DemoAppLauncher';

	state = {
		search: '',
		appLauncherOpen: this.props.isOpen || false, // eslint-disable-line react/prop-types
		allItemsSectionIsOpen: true,
	};

	onClear = () => {
		this.setState({ search: '' });
	};

	onSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	toggleAppLauncher = () => {
		this.setState({ appLauncherOpen: !this.state.appLauncherOpen });
	};

	toggleSection = () => {
		this.setState({ allItemsSectionIsOpen: !this.state.allItemsSectionIsOpen });
	};

	render() {
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
						<AppLauncherExpandableSection title="All Apps" toggleable>
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithIconNode search={this.state.search} />
							<DemoAppLauncherTileWithIconBackgroundColor
								search={this.state.search}
							/>
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithTruncatedText
								search={this.state.search}
							/>
							<DemoAppLauncherTile search={this.state.search} />
						</AppLauncherExpandableSection>
						<hr />
						<AppLauncherExpandableSection
							title="All Items"
							isOpen={this.state.allItemsSectionIsOpen}
							onToggleOpen={this.toggleSection}
						>
							<AppLauncherLink>Accounts</AppLauncherLink>
							<AppLauncherLink>Announcements</AppLauncherLink>
							<AppLauncherLink>Approvals</AppLauncherLink>
							<AppLauncherLink>Campaigns</AppLauncherLink>
							<AppLauncherLink>Cases</AppLauncherLink>
							<AppLauncherLink>Coaching</AppLauncherLink>
							<AppLauncherLink>Contacts</AppLauncherLink>
						</AppLauncherExpandableSection>
					</AppLauncher>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		);
	}
}

class DemoAppLauncherNoHeaderButton extends React.Component {
	static displayName = 'DemoAppLauncherNoHeaderButton';

	state = {
		search: '',
		appLauncherOpen: false,
		allItemsSectionIsOpen: false,
	};

	onSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	toggleAppLauncher = () => {
		this.setState({ appLauncherOpen: !this.state.appLauncherOpen });
	};

	render() {
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
						<AppLauncherExpandableSection toggleable title="All Items">
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithIconNode search={this.state.search} />
							<DemoAppLauncherTileWithIconBackgroundColor
								search={this.state.search}
							/>
						</AppLauncherExpandableSection>
						<AppLauncherExpandableSection title="All Apps" toggleable>
							<DemoAppLauncherTile search={this.state.search} />
							<DemoAppLauncherTileWithTruncatedText
								search={this.state.search}
							/>
						</AppLauncherExpandableSection>
					</AppLauncher>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		);
	}
}

class DemoAppLauncherNoSearch extends React.Component {
	static displayName = 'DemoAppLauncherNoSearch';

	state = {
		appLauncherOpen: false,
		allItemsSectionIsOpen: false,
	};

	toggleAppLauncher = () => {
		this.setState({ appLauncherOpen: !this.state.appLauncherOpen });
	};

	render() {
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
						<AppLauncherExpandableSection toggleable title="All Items">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithIconBackgroundColor />
						</AppLauncherExpandableSection>
						<AppLauncherExpandableSection title="All Apps" toggleable>
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherExpandableSection>
					</AppLauncher>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		);
	}
}

class DemoAppLauncherWithSeveralSections extends React.Component {
	static displayName = 'DemoAppLauncherWithSeveralSections';

	onSearch = () => {
		// stub
	};

	render() {
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
						<AppLauncherExpandableSection nonCollapsible title="First Section">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherExpandableSection>
						<AppLauncherExpandableSection nonCollapsible title="Second Section">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherExpandableSection>
						<AppLauncherExpandableSection nonCollapsible title="Third Section">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherExpandableSection>
						<AppLauncherExpandableSection nonCollapsible title="Fourth Section">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherExpandableSection>
						<AppLauncherExpandableSection nonCollapsible title="Fifth Section">
							<DemoAppLauncherTile />
							<DemoAppLauncherTileWithIconNode />
							<DemoAppLauncherTileWithTruncatedText />
						</AppLauncherExpandableSection>
					</AppLauncher>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		);
	}
}

class DemoAppLauncherLink extends React.Component {
	static displayName = 'DemoAppLauncherLink';

	render() {
		return (
			<div>
				<div>
					<AppLauncherLink>Accounts</AppLauncherLink>
				</div>
				<div>
					<AppLauncherLink className="custom-class">
						Announcements
					</AppLauncherLink>
				</div>
				<div>
					<AppLauncherLink href="http://www.salesforce.com">
						Approvals
					</AppLauncherLink>
				</div>
				<div>
					<AppLauncherLink onClick={action('Link clicked!')}>
						Campaigns
					</AppLauncherLink>
				</div>
				<div>
					<AppLauncherLink search="se">Cases</AppLauncherLink>
				</div>
				<div>
					<AppLauncherLink title="Custom Title">Coaching</AppLauncherLink>
				</div>
				<div>
					<AppLauncherLink>Contacts</AppLauncherLink>
				</div>
			</div>
		);
	}
}

storiesOf(APP_LAUNCHER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('App Launcher', () => <DemoAppLauncher />)
	.add('App Launcher (open)', () => <DemoAppLauncher isOpen />)
	.add('App Launcher no header button', () => <DemoAppLauncherNoHeaderButton />)
	.add('App Launcher no search', () => <DemoAppLauncherNoSearch />)
	.add('App Launcher with several sections (non-collapsible)', () => (
		<DemoAppLauncherWithSeveralSections />
	))
	.add('Tile', () => (
		<div style={tileDemoStyles}>
			<DemoAppLauncherTile />
		</div>
	))
	.add('Tile with Icon node', () => (
		<div style={tileDemoStyles}>
			<DemoAppLauncherTileWithIconNode />
		</div>
	))
	.add('Tile with Icon background color', () => (
		<div style={tileDemoStyles}>
			<DemoAppLauncherTileWithIconBackgroundColor />
		</div>
	))
	.add('Tile with search text', () => (
		<div style={tileDemoStyles}>
			<DemoAppLauncherTileWithSearchText />
		</div>
	))
	.add('Tile with truncated text', () => (
		<div style={tileDemoStyles}>
			<DemoAppLauncherTileWithTruncatedText />
		</div>
	))
	.add('Expandable Section', () => <DemoAppLauncherExpandableSection />)
	.add('Link', () => <DemoAppLauncherLink />)
	.add('Doc site example', () => <DefaultExample />);
