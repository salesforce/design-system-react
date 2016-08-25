import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { TABS, TABS_LIST, TAB, TAB_ITEM, TAB_PANEL } from '../../utilities/constants';

import Tabs from '../../components/tabs';
import Tab from '../../components/tabs/tab';
import TabsList from '../../components/tabs/tabs-list';
import TabPanel from '../../components/tabs/tab-panel';


const handleSelect = action;

/* eslint-disable react/display-name */
const getTabs = (props) => (
	
      <Tabs
        onSelect={handleSelect}
        selectedIndex={0}
      >
        <TabsList>
          <Tab>Item One</Tab>
          <Tab>Item Two</Tab>
          <Tab>Item Three</Tab>
        </TabsList>
        <TabPanel>
          <h2 className="slds-text-heading--medium">Item One Content</h2>
          <p>This is content from panel one.</p>
        </TabPanel>
        <TabPanel>
          <h2 className="slds-text-heading--medium">Item Two Content</h2>
          <p>This is content from panel two.</p>
        </TabPanel>
        <TabPanel>
          <h2 className="slds-text-heading--medium">Item Three Content</h2>
          <p>This is content from panel three.</p>
        </TabPanel>
      </Tabs>
    );


storiesOf(TABS, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getTabs());

module.exports = getTabs;
