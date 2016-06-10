/* eslint-disable react/prop-types */

import React from 'react';
import Icon from '../../../components/icon';

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
			appLauncher: {
				assistiveText: 'Open App Launcher',
				name: 'App Name'
			}
		}
	},
	customCloud: {
		props: {
			cloud: 'marketing'
		},
		primaryRegionProps: {
			truncate: false,
			appLauncher: {
				assistiveText: 'Open App Launcher',
				noTruncate: true,
				customChild: () => (
					<span>Marketing Cloud<Icon
						category="utility"
						className="slds-m-left--small slds-m-right--small"
						name="email"
						inverse
						size="small"
					/>Email Studio</span>
				)
			}
		}
	},
	lightTheme: {
		props: {
			theme: 'light'
		},
		primaryRegionProps: {
			appLauncher: {
				assistiveText: 'Open App Launcher',
				name: 'App Name'
			}
		}
	}
};

module.exports.dropdownCollection = dropdownCollection;
module.exports.propSets = propSets;
