/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { CONTEXT_BAR } from '../../utilities/constants';

import ContextBar from '../../components/context-bar';
import ContextBarDropdown from '../../components/context-bar/dropdown';
import ContextBarLink from '../../components/context-bar/link';
import ContextBarNavGroup from '../../components/context-bar/nav-group';
import ContextBarTitle from '../../components/context-bar/title';
import Icon from '../../components/icon';

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

const getContextBar = (props) => (
	<ContextBar
	className="mctheme"
	>
		<ContextBarTitle>
		Marketing Cloud&nbsp;&nbsp;&nbsp;
			<Icon category="utility" name="email" inverse className="slds-icon--x-small" />
		&nbsp;&nbsp;&nbsp;Email Studio
		</ContextBarTitle>
		<ContextBarNavGroup>
			<ContextBarLink label="Top Level Link 1" href="http://www.salesforce.com" />
			<ContextBarDropdown id="primaryDropdown" label="Dropdown menu" options={sampleCollection} />
			<ContextBarLink label="Top Level Link 2" href="http://www.salesforce.com" />
		</ContextBarNavGroup>
		<ContextBarNavGroup alignment="right">
			<ContextBarLink label="Shortcut 1" href="http://www.salesforce.com" />
			<ContextBarDropdown id="tasks" label="Tasks" options={sampleCollection} />
			<ContextBarLink label="Shortcut 2" href="http://www.salesforce.com" />
		</ContextBarNavGroup>
	</ContextBar>
);

storiesOf(CONTEXT_BAR, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getContextBar({ label: 'Base', variant: 'base' }));
