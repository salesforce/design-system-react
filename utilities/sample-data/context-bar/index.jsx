import React from 'react';
import Icon from '../../../components/icon';

const AppSwitcher = () => (
	<div id="app-switcher" className="slds-context-bar__icon-action">
		<a href="#" aria-haspopup="true" className="slds-button slds-button--icon slds-context-bar__button">
			<Icon category="utility" name="apps" inverse className="slds-icon--small" />
		</a>
	</div>
);
AppSwitcher.displayName = 'AppSwitcher';

const dropdownCollection = [{
	label: 'Menu Item One',
	value: '1',
	iconCategory: 'utility',
	iconName: 'table',
	href: 'http://www.google.com'
}, {
	label: 'Menu Item Two',
	value: '2',
	iconCategory: 'utility',
	iconName: 'kanban',
	href: 'http://www.google.com'
}, {
	label: 'Menu Item Three',
	value: '3',
	iconCategory: 'utility',
	iconName: 'side_list',
	href: 'http://www.google.com'
}];

const propSets = {
	base: {
		props: {},
		primaryRegionProps: {
			applicationSwitcher: <AppSwitcher />,
			applicationName: 'App Name'
		}
	},
	customCloud: {
		props: {
			cloud: 'marketing'
		},
		primaryRegionProps: {
			applicationSwitcher: <AppSwitcher />,
			truncate: false,
			applicationName: <span>Marketing Cloud<Icon
				category="utility"
				className="slds-m-left--small slds-m-right--small"
				name="email"
				inverse
				size="small"
			/>Email Studio</span>
		}
	},
	lightTheme: {
		props: {
			theme: 'light'
		},
		primaryRegionProps: {
			applicationSwitcher: <AppSwitcher />,
			applicationName: 'App Name'
		}
	}
};

module.exports.dropdownCollection = dropdownCollection;
module.exports.propSets = propSets;
