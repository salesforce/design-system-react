import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { CONTEXT_BAR } from '../../utilities/constants';

import ContextBar from '../../components/context-bar';
import ContextBarRegion from '../../components/context-bar/region';
import ContextBarDropdown from '../../components/context-bar/dropdown';
import ContextBarLink from '../../components/context-bar/link';
import Icon from '../../components/icon';

const AppSwitcher = () => (
	<div className="slds-context-bar__icon-action">
		<a href="#" aria-haspopup="true" className="slds-button slds-button--icon slds-context-bar__button">
			<Icon category="utility" name="apps" inverse className="slds-icon--small" />
		</a>
	</div>
);

const sampleCollection = [{
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


const getContextBar = (props, primaryProps) => (
	<div>

		<ContextBar {...props}>
			<ContextBarRegion region="primary" {...primaryProps} />
			<ContextBarRegion region="secondary" navigation>
				<ContextBarLink label="Home" href="http://www.salesforce.com" />
				<ContextBarDropdown id="primaryDropdown" label="Context Menu Item 1" options={sampleCollection} />
				<ContextBarLink label="Context Menu Item 2" href="http://www.salesforce.com" />
			</ContextBarRegion>
			<ContextBarRegion region="tertiary">
				<ContextBarLink label="Actions" href="http://www.salesforce.com" />
			</ContextBarRegion>
		</ContextBar>

	</div>
);

storiesOf(CONTEXT_BAR, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getContextBar(
		{},
		{
			applicationSwitcher: <AppSwitcher />,
			applicationName: 'App Name'
		}))
	.add('Marketing Cloud', () => getContextBar(
		{ cloud: 'marketing' },
		{
			applicationSwitcher: <AppSwitcher />,
			truncate: false,
			applicationName: <span>Marketing Cloud<Icon
				category="utility"
				className="slds-m-left--small slds-m-right--small"
				name="email"
				inverse
				size="small"
			/>Email Studio</span>
		}))
	.add('Light Theme', () => getContextBar(
		{ theme: 'light' },
		{
			applicationSwitcher: <AppSwitcher />,
			applicationName: 'App Name'
		}));
