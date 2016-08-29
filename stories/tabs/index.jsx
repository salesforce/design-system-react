import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { TABS, TABS_LIST, TAB, TAB_ITEM, TAB_PANEL } from '../../utilities/constants';

import Tabs from '../../components/tabs';
// import Tab from '../../components/tabs/tab';
// import TabsList from '../../components/tabs/tabs-list';
// import TabPanel from '../../components/tabs/tab-panel';
import Pane from '../../components/tabs/pane';

// ### Helpers from Utilities
import {
	EventUtil
} from '../../utilities';


const handleSelect = action;


// const handleClick = (event, props, other) => {
// 	EventUtil.trap(event);
// 	console.log("event", event);
// 	console.log("props", props);
// 	console.log("other", other);
// 		props.onClick(event, {
// 			props: !props.selected
// 		});
// 	}
// };

/* eslint-disable react/display-name */
const getTabs = (props) => (
	<div>
		<Tabs selectedIndex={0}>
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

		<br />
		
		<Tabs selectedIndex={0}>
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
	</div>
);

//  eslint-disable react/display-name 
// const getTabs = (props) => (
//   <Tabs
//     onSelect={handleSelect}
//     selectedIndex={2}
//   >
//     <TabsList>
//       <Tab>Foo</Tab>
//       <Tab>Bar</Tab>
//       <Tab>Baz</Tab>
//     </TabsList>
//     <TabPanel>
//       <h2>Hello from Foo</h2>
//     </TabPanel>
//     <TabPanel>
//       <h2>Hello from Bar</h2>
//     </TabPanel>
//     <TabPanel>
//       <h2>Hello from Baz</h2>
//     </TabPanel>
//   </Tabs>
// );

storiesOf(TABS, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getTabs());

module.exports = getTabs;
