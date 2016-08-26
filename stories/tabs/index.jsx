import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { TABS, TABS_LIST, TAB, TAB_ITEM, TAB_PANEL } from '../../utilities/constants';

import Tabs from '../../components/tabs';
// import Tab from '../../components/tabs/tab';
// import TabsList from '../../components/tabs/tabs-list';
// import TabPanel from '../../components/tabs/tab-panel';
import Pane from '../../components/tabs/pane';


const handleSelect = action;

/* eslint-disable react/display-name */
const getTabs = (props) => (
	<Tabs selected={0}>
		<Pane label="Tab 1">
			<div>This is my tab 1 contents!</div>
		</Pane>
		<Pane label="Tab 2">
			<div>This is my tab 2 contents!</div>
		</Pane>
		<Pane label="Tab 3">
			<div>This is my tab 3 contents!</div>
		</Pane>
	</Tabs>
);


storiesOf(TABS, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getTabs());

module.exports = getTabs;
