import React from 'react';

import IconSettings from '~/components/icon-settings';
import Tabs from '~/components/tabs'; // `~` is replaced with design-system-react at runtime
import TabsPanel from '~/components/tabs/panel';

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<Tabs variant="vertical" id="tabs-example-scoped">
				<TabsPanel label="Item One">Item One Content</TabsPanel>
				<TabsPanel label="Item Two">Item Two Content</TabsPanel>
				<TabsPanel label="Item Three">Item Three Content</TabsPanel>
				<TabsPanel disabled label="Disabled">
					Disabled Content
				</TabsPanel>
			</Tabs>
		</IconSettings>
	);
}

Example.displayName = 'TabsExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
