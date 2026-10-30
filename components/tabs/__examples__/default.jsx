import { useState } from 'react';

import IconSettings from '~/components/icon-settings';
import Tabs from '~/components/tabs'; // `~` is replaced with design-system-react at runtime
import TabsPanel from '~/components/tabs/panel';

const Example = () => {
	// Tabs is controlled: keep the selected `value` in state and update it in `onSelect`.
	const [value, setValue] = useState('item-one');

	return (
		<IconSettings iconPath="/assets/icons">
			<Tabs
				id="tabs-example-default"
				onSelect={(event, data) => setValue(data.value)}
				value={value}
			>
				<TabsPanel label="Item One" value="item-one">
					Item One Content
				</TabsPanel>
				<TabsPanel label="Item Two" value="item-two">
					Item Two Content
				</TabsPanel>
				<TabsPanel label="Item Three" value="item-three">
					Item Three Content
				</TabsPanel>
				<TabsPanel disabled label="Disabled" value="disabled">
					Disabled Content
				</TabsPanel>
			</Tabs>
		</IconSettings>
	);
};

Example.displayName = 'TabsExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
