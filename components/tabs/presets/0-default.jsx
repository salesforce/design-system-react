/* eslint-disable filenames/match-regex */
import * as React from 'react';
import Tabs from '../tabs.jsx';
import TabsPanel from '../tabs-panel';

export default (
	<Tabs uxpId="0" variant="scoped" id="tabs-example-scoped">
		<TabsPanel uxpId="1" label="Item One">Item One Content</TabsPanel>
		<TabsPanel uxpId="2" label="Item Two">Item Two Content</TabsPanel>
		<TabsPanel uxpId="3" label="Item Three">Item Three Content</TabsPanel>
		<TabsPanel uxpId="4" disabled label="Disabled">
			Disabled Content
		</TabsPanel>
	</Tabs>
);
